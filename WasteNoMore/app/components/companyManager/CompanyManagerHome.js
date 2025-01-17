import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, Image, ActivityIndicator, Picker, TextInput, Keyboard,Alert,TouchableOpacity,Button } from 'react-native';
import { TabNavigator } from "react-navigation";
import ChartView from 'react-native-highcharts';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from 'react-native-modal-picker';
import Moment from 'moment';

//import NoDataDisplay from 'highcharts-no-data-to-display';

export default class CompanyManagerHome extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('WasteNoMore/resources/icons/home-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render(){

    return(
      <AppNavigationManager />
    );
  }
}

class Graph1 extends Component{

  constructor(){
    super();

    this.state = {
      grpah1Data:[],
      graph1Category:[],
      graph1gotData:false,
      branchId:'',
      isPremium:false,
      isDateTimePickerVisible1:false,
      isDateTimePickerVisible2:false,
      toDate:'',
      toDateBeauty:'',
      fromDate:'',
      fromDateBeauty:'',
      branches:[],
    }
  }

  componentDidMount() {
    this.getGraphData();
  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });


  _handleDatePicked1 = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ fromDate: date });
    this.setState({fromDateBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker1();
  };

  _handleDatePicked2 = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ toDate: date });
    this.setState({toDateBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker2();
  };

  rstDate = () => {
    this.setState({toDate:'',toDateBeauty:'',fromDate:'',fromDateBeauty:''});
  }

  getGraphData = async () => {
    //  this.setState({graph1gotData:false});

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      fetch('https://murmuring-citadel-23511.herokuapp.com/api/getWasteGraph1', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + TOKEN
        },

        body: JSON.stringify({
          "branch":this.state.branchId,
          "fromDate":this.state.fromDate,
          "toDate":this.state.toDate
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.categories);
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error");
        }else if(responseData.status == "success"){
          console.log(responseData.data);
          this.setState({ graph1Category:responseData.categories,grpah1Data: responseData.data, graph1gotData:true,branches:responseData.branches , isPremium:responseData.premium},console.log(this.state.grpah1Data)); //isLoading: false,
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);

    } finally {

    }

  }

  render(){
    if(this.state.graph1gotData){
      var Highcharts='Highcharts';
      if(this.state.branchId == '' || this.state.branchId == '0'){
        var conf={
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Waste Percentage By Category'
          },
          xAxis: {
            categories:this.state.graph1Category
          },
          yAxis: {
            title: {
              text: 'Waste %'
            },
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          series: this.state.grpah1Data
          ,
          lang: {
            noData: "No Data to Display"
          },
        };
      }else{
        var conf={
          chart: {
            type: 'bar',

          },
          title: {
            text: 'Waste Percentage By Category'
          },
          xAxis: {
            categories:this.state.graph1Category
          },
          yAxis: {
            title: {
              text: 'Waste %'
            },
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          series: [{
            data: this.state.grpah1Data
          }],
          lang: {
            noData: "No Data to Display"
          },
        };
      }
      if(this.state.isPremium){

        if(this.state.grpah1Data.length > 0){
          return (
            <View >
              <ChartView style={{height:320}} config={conf}></ChartView>

              <View style={{  position:'absolute',top:325,flex:1}}>
                <View style={styles.modalLines}>
                  <Text style={styles.label}>
                    Date From:
                  </Text>
                  <TextInput style={styles.tinput}
                    ref='FirstInput'
                    //  editable={false}
                    onFocus={() => {Keyboard.dismiss();this._showDateTimePicker1();}}
                    value = {this.state.fromDateBeauty}
                  >

                  </TextInput>
                  <Text style={styles.label}>
                    Date To:
                  </Text>
                  <TextInput style={styles.tinput}
                    ref='SecondInput'
                    //  editable={false}
                    onFocus={() => {Keyboard.dismiss();this._showDateTimePicker2();}}
                    value = {this.state.toDateBeauty}
                  >
                  </TextInput>
                </View>

                <View style={[styles.modalLines,{marginLeft:80}]}>

                  <ModalPicker
                    data={this.state.branches}
                    initValue={"Choose Branch"}
                    onChange={(option) => {
                      if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                      return Alert.alert("Set Both Dates");

                      if(this.state.fromDate > this.state.toDate)
                      return Alert.alert("Start Date should be less than End Date");

                      this.setState({branchId: option.key},this.getGraphData)
                    }}>

                  </ModalPicker>
                  <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                    <Text style={{color:'black'}}>
                      Reset Dates
                    </Text>
                  </TouchableOpacity>

                </View>

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible1}
                  onConfirm={this._handleDatePicked1}
                  onCancel={this._hideDateTimePicker1}
                  date ={new Date()}
                  mode="date"
                />

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible2}
                  onConfirm={this._handleDatePicked2}
                  onCancel={this._hideDateTimePicker2}
                  date ={new Date()}
                  mode="date"
                />

              </View>
            </View>
              );
            }else{

              return (
                <View >
                  <View>
                    <Text style={styles.label}>
                      No Data to Display
                    </Text>
                  </View>

                  <View style={{  position:'absolute',top:350,flex:1}}>
                    <View style={styles.modalLines}>
                      <Text style={styles.label}>
                        Date From:
                      </Text>
                      <TextInput style={styles.tinput}
                        ref='FirstInput'
                        onFocus={() => {Keyboard.dismiss();this._showDateTimePicker1();}}
                        value = {this.state.fromDateBeauty}
                      >

                      </TextInput>
                      <Text style={styles.label}>
                        Date To:
                      </Text>
                      <TextInput style={styles.tinput}
                        ref='SecondInput'
                        onFocus={() => {Keyboard.dismiss();this._showDateTimePicker2();}}
                        value = {this.state.toDateBeauty}
                      >
                      </TextInput>
                    </View>

                    <View style={styles.modalLines}>

                      <ModalPicker
                        data={this.state.branches}
                        initValue={"Choose Branch"}
                        onChange={(option) => {
                          if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                          return Alert.alert("Set Both Dates");

                          if(this.state.fromDate > this.state.toDate)
                          return Alert.alert("Start Date should be less than End Date");

                          this.setState({branchId: option.key},this.getGraphData)
                        }}>

                      </ModalPicker>
                      <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                        <Text style={{color:'black'}}>
                          Reset Dates
                        </Text>
                      </TouchableOpacity>

                    </View>

                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible1}
                      onConfirm={this._handleDatePicked1}
                      onCancel={this._hideDateTimePicker1}
                      date ={new Date()}
                      mode="date"
                    />

                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible2}
                      onConfirm={this._handleDatePicked2}
                      onCancel={this._hideDateTimePicker2}
                      date ={new Date()}
                      mode="date"
                    />

                  </View>
                </View>
                  );

                }
              }else{
                if(this.state.grpah1Data.length > 0){
                  return(
                    <View>
                      <ChartView style={{height:320}} config={conf}></ChartView>
                    </View>
                  );
                }else{
                  return(
                    <View>
                      <Text style={styles.label}>
                        No Data To Display
                      </Text>
                    </View>
                  );

                }
              }
            }else{
              return(
                <View style={styles.container}>
                  <ActivityIndicator
                    animating={!this.state.attrExist}
                    size={"large"}
                    hidesWhenStopped={true}
                  >
                  </ActivityIndicator>

                </View>
                );
              }
            }
          }

          class Graph2 extends Component{
            constructor(){
              super();

              this.state = {
                grpah1Data:[],
                graph1Category:[],
                graph1gotData:false,
                branchId:'',
                isPremium:false,
                isDateTimePickerVisible1:false,
                isDateTimePickerVisible2:false,
                toDate:'',
                toDateBeauty:'',
                fromDate:'',
                fromDateBeauty:'',
                branches:[],
              }
            }

            componentDidMount() {
              this.getGraphData();
            }

            _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

            _hideDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: false });

            _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

            _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });


            _handleDatePicked1 = (date) => {
              console.log('A date has been picked: ', date);
              console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
              this.setState({ fromDate: date });
              this.setState({fromDateBeauty: Moment(date).format('MMM-DD-YYYY')});
              this._hideDateTimePicker1();
            };

            _handleDatePicked2 = (date) => {
              console.log('A date has been picked: ', date);
              console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
              this.setState({ toDate: date });
              this.setState({toDateBeauty: Moment(date).format('MMM-DD-YYYY')});
              this._hideDateTimePicker2();
            };

            rstDate = () => {
              this.setState({toDate:'',toDateBeauty:'',fromDate:'',fromDateBeauty:''});
            }

            getGraphData = async () => {
              //  this.setState({graph1gotData:false});

              try {

                var TOKEN = await AsyncStorage.getItem('token');
                fetch('https://murmuring-citadel-23511.herokuapp.com/api/getWasteGraph2', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + TOKEN

                  },

                  body: JSON.stringify({
                    "branch":this.state.branchId,
                    "fromDate":this.state.fromDate,
                    "toDate":this.state.toDate
                  })
                })
                .then((response) => response.json())
                .then((responseData) => {
                  console.log(responseData.categories);
                  if("message" in responseData){
                    console.log(responseData.message);
                  }
                  if(responseData.status == "error"){
                    console.log("error");
                  }else if(responseData.status == "success"){
                    this.setState({ graph1Category:responseData.categories,grpah1Data: responseData.data, graph1gotData:true,branches:responseData.branches , isPremium:responseData.premium},console.log(this.state.grpah1Data)); //isLoading: false,
                  }
                }).catch((error) => {
                  console.error(error);
                })
                .done();

              } catch (e) {
                console.error(e);
              } finally {

              }
            }

            render(){
              if(this.state.graph1gotData){
                var Highcharts='Highcharts';
                if(this.state.branchId == '' || this.state.branchId == '0'){
                  var conf={
                    chart: {
                      type: 'bar',
                    },
                    title: {
                      text: 'Waste/Purchase By Category'
                    },
                    xAxis: {
                      categories:this.state.graph1Category
                    },
                    yAxis: {
                      title: {
                        text: 'Waste/Purchase %'
                      },
                    },
                    legend: {
                      enabled: false
                    },
                    exporting: {
                      enabled: false
                    },
                    series: this.state.grpah1Data
                    ,
                    lang: {
                      noData: "No Data to Display"
                    },
                  };
                }else{
                  var conf={
                    chart: {
                      type: 'bar',

                    },
                    title: {
                      text: 'Waste Percentage By Category'
                    },
                    xAxis: {
                      categories:this.state.graph1Category
                    },
                    yAxis: {
                      title: {
                        text: 'Waste %'
                      },
                    },
                    legend: {
                      enabled: false
                    },
                    exporting: {
                      enabled: false
                    },
                    series: [{
                      data: this.state.grpah1Data
                    }],
                    lang: {
                      noData: "No Data to Display"
                    },
                  };
                }
                if(this.state.isPremium){

                  if(this.state.grpah1Data.length > 0){
                    return (
                      <View >
                        <ChartView style={{height:320}} config={conf}></ChartView>

                        <View style={{  position:'absolute',top:325,flex:1}}>
                          <View style={styles.modalLines}>
                            <Text style={styles.label}>
                              Date From:
                            </Text>
                            <TextInput style={styles.tinput}
                              ref='FirstInput'
                              //  editable={false}
                              onFocus={() => {Keyboard.dismiss();this._showDateTimePicker1();}}
                              value = {this.state.fromDateBeauty}
                            >

                            </TextInput>
                            <Text style={styles.label}>
                              Date To:
                            </Text>
                            <TextInput style={styles.tinput}
                              ref='SecondInput'
                              //  editable={false}
                              onFocus={() => {Keyboard.dismiss();this._showDateTimePicker2();}}
                              value = {this.state.toDateBeauty}
                            >
                            </TextInput>
                          </View>

                          <View style={[styles.modalLines,{marginLeft:80}]}>

                            <ModalPicker
                              data={this.state.branches}
                              initValue={"Choose Branch"}
                              onChange={(option) => {
                                if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                                return Alert.alert("Set Both Dates");

                                if(this.state.fromDate > this.state.toDate)
                                return Alert.alert("Start Date should be less than End Date");

                                this.setState({branchId: option.key},this.getGraphData)
                              }}>

                            </ModalPicker>
                            <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                              <Text style={{color:'black'}}>
                                Reset Dates
                              </Text>
                            </TouchableOpacity>

                          </View>

                          <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible1}
                            onConfirm={this._handleDatePicked1}
                            onCancel={this._hideDateTimePicker1}
                            date ={new Date()}
                            mode="date"
                          />

                          <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible2}
                            onConfirm={this._handleDatePicked2}
                            onCancel={this._hideDateTimePicker2}
                            date ={new Date()}
                            mode="date"
                          />

                        </View>
                      </View>
                        );
                      }else{

                        return (
                          <View >
                            <View>
                              <Text style={styles.label}>
                                No Data to Display
                              </Text>
                            </View>

                            <View style={{  position:'absolute',top:350,flex:1}}>
                              <View style={styles.modalLines}>
                                <Text style={styles.label}>
                                  Date From:
                                </Text>
                                <TextInput style={styles.tinput}
                                  ref='FirstInput'
                                  onFocus={() => {Keyboard.dismiss();this._showDateTimePicker1();}}
                                  value = {this.state.fromDateBeauty}
                                >

                                </TextInput>
                                <Text style={styles.label}>
                                  Date To:
                                </Text>
                                <TextInput style={styles.tinput}
                                  ref='SecondInput'
                                  onFocus={() => {Keyboard.dismiss();this._showDateTimePicker2();}}
                                  value = {this.state.toDateBeauty}
                                >
                                </TextInput>
                              </View>

                              <View style={styles.modalLines}>

                                <ModalPicker
                                  data={this.state.branches}
                                  initValue={"Choose Branch"}
                                  onChange={(option) => {
                                    if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                                    return Alert.alert("Set Both Dates");

                                    if(this.state.fromDate > this.state.toDate)
                                    return Alert.alert("Start Date should be less than End Date");

                                    this.setState({branchId: option.key},this.getGraphData)
                                  }}>

                                </ModalPicker>
                                <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                                  <Text style={{color:'black'}}>
                                    Reset Dates
                                  </Text>
                                </TouchableOpacity>

                              </View>

                              <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible1}
                                onConfirm={this._handleDatePicked1}
                                onCancel={this._hideDateTimePicker1}
                                date ={new Date()}
                                mode="date"
                              />

                              <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible2}
                                onConfirm={this._handleDatePicked2}
                                onCancel={this._hideDateTimePicker2}
                                date ={new Date()}
                                mode="date"
                              />

                            </View>
                          </View>
                            );

                          }
                        }else{
                          if(this.state.grpah1Data.length > 0){
                            return(
                              <View>
                                <ChartView style={{height:320}} config={conf}></ChartView>
                              </View>
                            );
                          }else{
                            return(
                              <View>
                                <Text style={styles.label}>
                                  No Data To Display
                                </Text>
                              </View>
                            );

                          }
                        }
                      }else{
                        return(
                          <View style={styles.container}>
                            <ActivityIndicator
                              animating={!this.state.attrExist}
                              size={"large"}
                              hidesWhenStopped={true}
                            >
                            </ActivityIndicator>

                          </View>
                          );
                        }
                      }
                    }

                    class Graph3 extends Component{

                      constructor(){
                        super();

                        this.state = {
                          grpah1Data:[],
                          graph1gotData:false,
                          branchId:'',
                          isPremium:false,
                          branches:[],
                          selectedBranch:'Choose Branch'
                        }
                      }

                      getGraphData = async () => {
                        try {

                          var TOKEN = await AsyncStorage.getItem('token');
                          fetch('https://murmuring-citadel-23511.herokuapp.com/api/getPurchaseTimeSeries', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Authorization': 'Bearer ' + TOKEN

                            },

                            body: JSON.stringify({
                              "branch":this.state.branchId,
                            })
                          })
                          .then((response) => response.json())
                          .then((responseData) => {

                            if("message" in responseData){
                              console.log(responseData.message);
                            }
                            if(responseData.status == "error"){
                              console.log("error");
                            }else if(responseData.status == "success"){
                              console.log(responseData.data);
                              this.setState({ grpah1Data: responseData.data, graph1gotData:true,branches:responseData.branches , isPremium:responseData.premium}); //isLoading: false,
                            }
                          }).catch((error) => {
                            console.error(error);
                          })
                          .done();

                        } catch (e) {
                          console.error(e);

                        } finally {

                        }

                      }

                      componentDidMount() {
                        this.getGraphData();
                      }

                      render(){
                        if(this.state.graph1gotData){
                          var Highcharts='Highcharts';
                          var conf={

                            rangeSelector: {
                              selected: 1
                            },

                            yAxis: {
                              title: {
                                text: 'KG'
                              },
                            },
                            title: {
                              text: 'Waste TimeSeries'
                            },

                            tooltip: {
                              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                              valueDecimals: 2,
                              split: true
                            },
                            exporting: {
                              enabled: false
                            },

                            series:this.state.grpah1Data
                          };

                          if(this.state.isPremium){
                            if(this.state.grpah1Data.length >0){

                              return(
                                <View>
                                  <ChartView style={{height:320}} stock={true} config={conf}></ChartView>


                                  <View style={styles.singlePicker}>

                                    <ModalPicker
                                      data={this.state.branches}
                                      initValue={"Choose Branch"}
                                      onChange={(option) => {
                                        this.setState({branchId: option.key, selectedBranch:option.label},this.getGraphData)
                                      }}>

                                    </ModalPicker>
                                  </View>
                                </View>
                              );
                            }else{
                              return(
                                <View >

                                  <View>
                                    <Text style={styles.label}>
                                      No Data to Display
                                    </Text>
                                  </View>
                                  <View style={[styles.singlePicker,{position:'absolute',top:350}]}>

                                    <ModalPicker
                                      data={this.state.branches}
                                      initValue={"Choose Branch"}
                                      onChange={(option) => {
                                        this.setState({branchId: option.key, selectedBranch:option.label},this.getGraphData)
                                      }}>

                                    </ModalPicker>
                                  </View>
                                </View>
                              );
                            }


                          }else{

                            if(this.state.grpah1Data.length > 0){
                              return(
                                <View>
                                  <ChartView style={{height:320}} stock={true} config={conf}></ChartView>
                                </View>
                              );
                            }else{
                              return(
                                <View>
                                  <Text style={styles.label}>
                                    No Data To Display
                                  </Text>
                                </View>
                              );

                            }

                          }
                        }else{
                          return(
                            <View style={styles.container}>
                              <ActivityIndicator
                                animating={!this.state.attrExist}
                                size={"large"}
                                hidesWhenStopped={true}
                              >
                              </ActivityIndicator>

                            </View>
                            );
                          }
                        }
                      }

                      class Graph4 extends Component{
                        constructor(){
                          super();

                          this.state = {
                            grpah1Data:[],
                            graph1gotData:false,
                            branchId:'',
                            isPremium:false,
                            branches:[],
                            selectedBranch:'Choose Branch'
                          }
                        }

                        getGraphData = async () => {
                          try {

                            var TOKEN = await AsyncStorage.getItem('token');
                            fetch('https://murmuring-citadel-23511.herokuapp.com/api/getWasteTimeSeries', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + TOKEN

                              },

                              body: JSON.stringify({
                                "branch":this.state.branchId,
                              })
                            })
                            .then((response) => response.json())
                            .then((responseData) => {

                              if("message" in responseData){
                                console.log(responseData.message);
                              }
                              if(responseData.status == "error"){
                                console.log("error");
                              }else if(responseData.status == "success"){
                                console.log(responseData.data);
                                this.setState({ grpah1Data: responseData.data, graph1gotData:true,branches:responseData.branches , isPremium:responseData.premium}); //isLoading: false,
                              }
                            }).catch((error) => {
                              console.error(error);
                            })
                            .done();

                          } catch (e) {
                            console.error(e);

                          } finally {

                          }

                        }

                        componentDidMount() {
                          this.getGraphData();
                        }

                        render(){
                          if(this.state.graph1gotData){
                            var Highcharts='Highcharts';
                            var conf={

                              rangeSelector: {
                                selected: 1
                              },

                              yAxis: {
                                title: {
                                  text: 'KG'
                                },
                              },
                              title: {
                                text: 'Purchase TimeSeries'
                              },

                              tooltip: {
                                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                                valueDecimals: 2,
                                split: true
                              },
                              exporting: {
                                enabled: false
                              },

                              series:this.state.grpah1Data
                            };

                            if(this.state.isPremium){

                              if(this.state.grpah1Data.length >0){

                                return(
                                  <View>
                                    <ChartView style={{height:320}} stock={true} config={conf}></ChartView>


                                    <View style={styles.singlePicker}>

                                      <ModalPicker
                                        data={this.state.branches}
                                        initValue={"Choose Branch"}
                                        onChange={(option) => {
                                          this.setState({branchId: option.key, selectedBranch:option.label},this.getGraphData)
                                        }}>

                                      </ModalPicker>
                                    </View>
                                  </View>
                                );

                              }else{
                                return(
                                  <View >

                                    <View>
                                      <Text style={styles.label}>
                                        No Data to Display
                                      </Text>
                                    </View>
                                    <View style={[styles.singlePicker,{position:'absolute',top:350}]}>

                                      <ModalPicker
                                        data={this.state.branches}
                                        initValue={"Choose Branch"}
                                        onChange={(option) => {
                                          this.setState({branchId: option.key, selectedBranch:option.label},this.getGraphData)
                                        }}>

                                      </ModalPicker>
                                    </View>
                                  </View>
                                );

                              }


                            }else{

                              if(this.state.grpah1Data.length > 0){
                                return(
                                  <View>
                                    <ChartView style={{height:320}} stock={true} config={conf}></ChartView>
                                  </View>
                                );
                              }else{
                                return(
                                  <View>
                                    <Text style={styles.label}>
                                      No Data To Display
                                    </Text>
                                  </View>
                                );

                              }

                            }
                          }else{
                            return(
                              <View style={styles.container}>
                                <ActivityIndicator
                                  animating={!this.state.attrExist}
                                  size={"large"}
                                  hidesWhenStopped={true}
                                >
                                </ActivityIndicator>

                              </View>
                              );
                            }
                          }
                        }

                        const ManagerHomeScreenNavigator = TabNavigator({
                          Graph1 : {screen: Graph1},
                          Graph2 : {screen: Graph2},
                          Graph3 : {screen: Graph3},
                          Graph4 : {screen: Graph4}
                        },
                        {
                          initialRouteName: 'Graph1'
                        });


                        const AppNavigationManager = () => (
                          <ManagerHomeScreenNavigator />
                        );

                        const styles = StyleSheet.create({
                          container: {
                            flex: 1,
                            //  backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                          modalLines:{
                            marginTop:15,
                            marginLeft:5,
                            flex:1,
                            //  justifyContent: 'center',
                            flexDirection:'row',
                            alignItems: 'center'
                          },
                          singlePicker:{
                            marginTop:20,
                            alignItems: 'center',
                            alignSelf:'center',
                            height:40
                          },
                          label:{
                            fontSize: 16,
                            marginTop:10
                          },
                          tinput: {
                            padding: 4,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            margin: 5,
                            width: 100,
                            //  alignSelf: 'center'
                          },
                          pick:{
                            width:150,
                            padding: 4,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: StyleSheet.hairlineWidth,
                            borderRadius: 5,
                          },
                          resetDate:{
                            marginLeft:50,
                            borderColor: 'black',
                            borderWidth: StyleSheet.hairlineWidth,
                            height: 30,
                            width: 100,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                          },
                          getData:{
                            borderColor: 'black',
                            borderWidth: StyleSheet.hairlineWidth,
                            height: 30,
                            width: 100,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                          },
                          icon: {
                            width: 24,
                            height: 24,
                          }
                        });
