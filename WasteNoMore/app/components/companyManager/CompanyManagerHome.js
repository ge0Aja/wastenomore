import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Image } from 'react-native';
import { TabNavigator } from "react-navigation";

export default class CompanyManagerHome extends Component {

  // constructor(){
  //   super();
  // }

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

  render(){
    return(
      <Text>This is Graph 1</Text>
    );
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});
