import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Image, ActivityIndicator, Picker, TextInput, Keyboard,Alert,TouchableOpacity } from 'react-native';
import { TabNavigator } from "react-navigation";
import ChartView from 'react-native-highcharts';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from 'react-native-modal-picker';
import Moment from 'moment';


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

class Graph1 extends Component {
  render(){
    return(
      <Text>This is Graph 1 for Branch</Text>
    );
  }
}

class Graph2 extends Component {
  render(){
    return(
      <Text>This is Graph 2 for Branch</Text>
    );
  }
}


class Graph3 extends Component {
  render(){
    return(
      <Text>This is Graph 3 for Branch</Text>
    );
  }
}


class Graph4 extends Component {
  render(){
    return(
      <Text>This is Graph 4 for Branch</Text>
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
    marginTop:15,
    marginLeft:5,
    flex:1,
  //  justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center'
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
