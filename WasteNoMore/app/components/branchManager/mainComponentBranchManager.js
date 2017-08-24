import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry,Alert, Button } from 'react-native';
import { DrawerNavigator } from "react-navigation";
import { StackNavigator } from 'react-navigation';
import ManagerHome from './branchManagerHome';
import addWaste from './addWaste';
import addPurchase from './addPurchase';


export default class mainComponentBranchManager extends Component {
  //
  // static navigationOptions = ({ navigation }) => ({
  //    title: 'Branch Manager',
  //    headerRight: (
  //     <Button
  //       title={'info'}
  //       onPress={() => alert("Hello")}
  //     />
  //   ),
  //  });

  render(){
  //  console.log(this.props.navigation.state.params.user);
    return(
          <AppNavigationManagerDrawer />
    );
  }
}

// const AppNavigationManagerDrawer = () => (
//   <ManagerDrawer />
// );


const ManagerDrawer = DrawerNavigator({
  ManagerHome: {
    screen: ManagerHome,
  },
  addWaste: {
    screen: addWaste,
  },
  addPurchase: {
    screen: addPurchase,
  },
},
{
   initialRouteName: 'ManagerHome'
});



const DrawerIcon = ({ navigation }) => {
  // if (Platform.OS === "ios") {
  //   return null;
  // }
  return (
    <Button
      title={'  ≡  '}
      style={{marginLeft:5,marginRight:10,paddingLeft:15}}
      onPress={() => navigation.navigate("DrawerOpen")}
    />
  );
};

const AppNavigationManagerDrawer = StackNavigator({
  Home: {
    screen: ManagerDrawer,
    navigationOptions: props => ({
      title: "Branch Manager",
      headerLeft: (<DrawerIcon {...props}/>)
    })
  }
});
