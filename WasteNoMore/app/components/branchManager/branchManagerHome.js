import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, Image, ActivityIndicator, Picker, TextInput, Keyboard,Alert,TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import ChartView from 'react-native-highcharts';



export default class branchManagerHome extends Component {

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
      grpahData11:[],
      graphCategory11:[],
      graphgotData11:false,
    }
  }

  componentDidMount() {
    this.getGraphData();
  }

  getGraphData = async () => {

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getWasteGraph1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + TOKEN

        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error");
        }else if(responseData.status == "success"){
          this.setState({ graphCategory11:responseData.categories,grpahData11: responseData.data, graphgotData11:true});
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.log("Token Error");

    } finally {

    }


  }

  render(){
    if(this.state.graphgotData11){
      var Highcharts='Highcharts';

      var conf={
        chart: {
          type: 'bar',

        },
        title: {
          text: 'Waste Percentage by Category'
        },
        xAxis: {
          categories:this.state.graphCategory11
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
          data: this.state.grpahData11
        }],
        lang: {
          noData: "No Data to Display"
        },
      };
      if(this.state.grpahData11.length > 0){
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

    }else{
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={!this.state.graphgotData11}
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
      grpahData2:[],
      graphCategory2:[],
      graphgotData2:false,
    }
  }

  componentDidMount() {
    this.getGraphData();
  }

  getGraphData = async () => {
    //  this.setState({graph1gotData:false});

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getWasteGraph2', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + TOKEN

        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error");
        }else if(responseData.status == "success"){
          this.setState({ graphCategory2:responseData.categories,grpahData2: responseData.data, graphgotData2:true});
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.log("Token Error");

    } finally {

    }


  }

  render(){
    if(this.state.graphgotData2){
      var Highcharts='Highcharts';

      var conf={
        chart: {
          type: 'bar',

        },
        title: {
          text: 'Waste/Purchase By Category'
        },
        xAxis: {
          categories:this.state.graphCategory2
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
        series: [{
          data: this.state.grpahData2
        }],
        lang: {
          noData: "No Data to Display"
        },
      };
      if(this.state.grpahData2.length > 0){
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

    }else{
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={!this.state.graphgotData2}
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
        grpahData3:[],
        graphgotData3:false,
      }
    }

    getGraphData = async () => {
      try {

        var TOKEN = await AsyncStorage.getItem('token');
        fetch('http://192.168.137.43:8000/api/getPurchaseTimeSeries', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + TOKEN

          },
        })
        .then((response) => response.json())
        .then((responseData) => {

          if("message" in responseData){
            console.log(responseData.message);
          }
          if(responseData.status == "error"){
            console.log("error");
          }else if(responseData.status == "success"){
            this.setState({ grpahData3: responseData.data, graphgotData3:true}); //isLoading: false,
          }
        }).catch((error) => {
          console.error(error);
        })
        .done();

      } catch (e) {
        console.log("Token Error");

      } finally {

      }

    }

    componentDidMount() {
      this.getGraphData();
    }
    render(){
      if(this.state.graphgotData3){
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
          series:this.state.grpahData3
        };

        if(this.state.grpahData3.length > 0){
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


      }else{
        return(
          <View style={styles.container}>
            <ActivityIndicator
              animating={!this.state.graphgotData3}
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
          grpahData4:[],
          graphgotData4:false,
        }
      }

      getGraphData = async () => {
        try {

          var TOKEN = await AsyncStorage.getItem('token');
          fetch('http://192.168.137.43:8000/api/getWasteTimeSeries', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + TOKEN

            },
          })
          .then((response) => response.json())
          .then((responseData) => {

            if("message" in responseData){
              console.log(responseData.message);
            }
            if(responseData.status == "error"){
              console.log("error");
            }else if(responseData.status == "success"){
              this.setState({ grpahData4: responseData.data, graphgotData4:true}); //isLoading: false,
            }
          }).catch((error) => {
            console.error(error);
          })
          .done();

        } catch (e) {
          console.log("Token Error");

        } finally {

        }

      }

      componentDidMount() {
        this.getGraphData();
      }

      render(){
        if(this.state.graphgotData4){
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
            series:this.state.grpahData4
          };


          if(this.state.grpahData4.length > 0){
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


        }else{
          return(
            <View style={styles.container}>
              <ActivityIndicator
                animating={!this.state.graphgotData4}
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
