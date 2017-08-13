import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Image, ActivityIndicator, Picker, TextInput, Keyboard,Alert,TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import ChartView from 'react-native-highcharts';

import DateTimePicker from 'react-native-modal-datetime-picker';
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

    getGraphData = () => {
      this.setState({graph1gotData:false});

  //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getWasteGraph1', {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDI2NTQ0NDEsImV4cCI6MTUwMjY1ODA0MX0.dlifAvytkxstlH0HY4ebwl8Vr8mcXvTPiAbZuQ0LlJ1RwMLxs6WBBzQ0R1-uN1jAVJvst9tcQZfRQQskVAHBaKdf0W54yXUKNel29rDSYR3YCdDFO9zsogKuTS3MpuxFIDJbGFya72u17kWMlat9JFurn4aollS5DdMHsaCkhz9fpnpN6aDeiw0YT7u1k25j59WrQPa0OYCcV_kQa1R90tpXwyPqulxFJTv2spc2IMzAkx6elJvGBtIz_Z5LUlGklgmDBnDwHEO-i1qmBkGJkFnFgLEuNJSGTSF8SdvspWHYMa_fKqGvuaHKmTMd7zv-iB50gt9FCV0AgHNCogNqtJiXaY5ZmxdugosfjtbKACDCoTn82jtlzDtftGVVuPlv3giyreZhYtKhymv44dxljPct7sZMl7b8hkeBUfaF5opatDlkucGFEArNZ4z5Xvegq3yy1wd1mKwgHj3t7FDT96GJeQNh2yriU4j1cVWnsV5fF9cST2yx9M66W2f6KUU5T3L2s9xpnJ6s8NW_4v5U03OTHGZrR4t7o3wB5PYIxjHaInIjCWOTaXep7d-aE8OIsT1_iS_yG3_TkABdJdfxsIBfakwWaCcWIT4jvGdUV6_3yzuJzk9oC4meD3FVfD_fKduklnf-5lffC9S0V5zVHQS5O9lyI94iL9J9RKYpwxk'
      },

      body: JSON.stringify({
            "branch":this.state.branchId,
            "fromDate":this.state.fromDate,
            "toDate":this.state.toDate
      })
    })
        .then((response) => response.json())
        .then((responseData) => {
        //  console.log(responseData);
          if("message" in responseData){
                console.log(responseData.message);
          }
          if(responseData.status == "error"){
              console.log("error");
          }else if(responseData.status == "success"){
            this.setState({ graph1Category:responseData.categories,grpah1Data: responseData.data, graph1gotData:true,branches:responseData.branches , isPremium:responseData.premium}); //isLoading: false,
          }
        })
        .done();
    }

  render(){
    if(this.state.graph1gotData){
        var Highcharts='Highcharts';
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
                     data:this.state.grpah1Data
                 }],
                 lang: {
                    noData: "No Data to Display"
                  },


             };
             if(this.state.isPremium){

         if(this.state.grpah1Data.length > 0){
                   return (
                     <View >
                       <ChartView style={{height:300}} config={conf}></ChartView>

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
                           <Text style={styles.label}>
                             Branch:
                           </Text>
                           <Picker style={styles.pick}
                             selectedValue={this.state.branchId}
                             onValueChange= {(itemValue) => {
                               if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                               return alert("Please set Both Dates");

                               if(this.state.fromDate > this.state.toDate)
                               return alert("Start Date should be less than End Date");

                               this.setState({branchId: itemValue})
                             }}
                           >

                             <Picker.Item key={0} value={"0"} label={"Choose Branch"}  />
                             {
                               this.state.branches.map( (s, i) => {
                                 return <Picker.Item key={i} value={s.id} label={s.city+"/"+s.address} />
                               })
                             }

                           </Picker>

                           <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                             <Text style={{color:'black'}}>
                               Reset Dates
                             </Text>
                           </TouchableOpacity>
                         </View>

                         <View style={styles.modalLines}>
                           <TouchableOpacity style={styles.getData} onPress={this.getGraphData}>
                             <Text style={{color:'black'}}>
                               Get Data
                             </Text>
                           </TouchableOpacity>
                         </View>

                         <DateTimePicker
                           isVisible={this.state.isDateTimePickerVisible1}
                           onConfirm={this._handleDatePicked1}
                           onCancel={this._hideDateTimePicker1}
                           mode="date"
                         />

                         <DateTimePicker
                           isVisible={this.state.isDateTimePickerVisible2}
                           onConfirm={this._handleDatePicked2}
                           onCancel={this._hideDateTimePicker2}
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
                                 <Text style={styles.label}>
                                   Branch:
                                 </Text>
                                 <Picker style={styles.pick}
                                   selectedValue={this.state.branchId}
                                   onValueChange= {(itemValue) => {
                                     if((this.state.toDate == '' && this.state.fromDate != '') || (this.state.toDate != '' && this.state.fromDate == ''))
                                     return alert("Please set Both Dates");

                                     if(this.state.fromDate > this.state.toDate)
                                     return alert("Start Date should be less than End Date");

                                     this.setState({branchId: itemValue})
                                   }}
                                 >

                                   <Picker.Item key={0} value={"0"} label={"Choose Branch"}  />
                                   {
                                     this.state.branches.map( (s, i) => {
                                       return <Picker.Item key={i} value={s.id} label={s.city+"/"+s.address} />
                                     })
                                   }

                                 </Picker>

                                 <TouchableOpacity style={styles.resetDate} onPress={this.rstDate}>
                                   <Text style={{color:'black'}}>
                                     Reset Dates
                                   </Text>
                                 </TouchableOpacity>
                               </View>

                               <View style={styles.modalLines}>
                                 <TouchableOpacity style={styles.getData} onPress={this.getGraphData}>
                                   <Text style={{color:'black'}}>
                                     Get Data
                                   </Text>
                                 </TouchableOpacity>
                               </View>

                               <DateTimePicker
                                 isVisible={this.state.isDateTimePickerVisible1}
                                 onConfirm={this._handleDatePicked1}
                                 onCancel={this._hideDateTimePicker1}
                                 mode="date"
                               />

                               <DateTimePicker
                                 isVisible={this.state.isDateTimePickerVisible2}
                                 onConfirm={this._handleDatePicked2}
                                 onCancel={this._hideDateTimePicker2}
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
                                   <ChartView style={{height:300}} config={conf}></ChartView>
                                 </View>
                               );
                             }else{
                               <View>
                                 <Text style={styles.label}>
                                   No Data To Display
                                 </Text>
                               </View>
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

  render(){
    return(
      <Text>This is Graph 2</Text>
    );
  }
}

class Graph3 extends Component{

  render(){
    return(
      <Text>This is Graph 3</Text>
    );
  }
}

class Graph4 extends Component{

  render(){
    return(
      <Text>This is Graph 4</Text>
    );
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
    flex:1,
  //  justifyContent: 'center',
    flexDirection:'row'
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
