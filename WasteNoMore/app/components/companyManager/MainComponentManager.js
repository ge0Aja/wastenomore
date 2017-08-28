import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry,Alert, Button,Platform } from 'react-native';
import { DrawerNavigator } from "react-navigation";
import { StackNavigator } from 'react-navigation';
import ManagerHome from './CompanyManagerHome';
import AddBranch from './AddBranch';
import EditCompany from './CompanyAttributes';
import CompanyDetails from './AddCompany';
import ManageLicense from './ManageLicenses';


export default class MainComponentManager extends Component {

  // static navigationOptions = ({ navigation }) => ({
  //    title: 'Company Manager',
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
  CompanyDetails : {
    screen:CompanyDetails,
  },
  EditCompany: {
    screen: EditCompany,
  },
  AddBranch: {
    screen: AddBranch,
  },
  ManageLicense : {
    screen: ManageLicense
  }
});


const DrawerIcon = ({ navigation }) => {
  // if (Platform.OS === "ios") {
  //   return null;
  // }
  return (
    <Button
      title={'  ≡  '}
      style={{marginLeft:5,marginRight:50,paddingLeft:15,paddingRight:15}}


      onPress={() => navigation.navigate("DrawerOpen")}
    />
  );
};

const AppNavigationManagerDrawer = StackNavigator({
  Home: {
    screen: ManagerDrawer,
    navigationOptions: props => ({
      title: "Company Manager",

      headerLeft: (<DrawerIcon {...props}/>)
    })
  }
});
