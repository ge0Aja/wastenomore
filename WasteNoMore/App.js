import React,{Component} from 'react';
import { StyleSheet,AsyncStorage,Button, Text, View,AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { DrawerNavigator } from "react-navigation";
import { NavigationActions } from 'react-navigation';


import MainComponent from './app/components/login/login';
import Signup1 from './app/components/signup/Signup1';
import Signup2 from './app/components/signup/Signup2';
//import ManagerHome from './app/components/companyManager/MainComponentManager'; //MainComponentManager
import AddCompany from './app/components/companyManager/AddCompanyWelcome';
import CompanyAttribs from './app/components/companyManager/AddAttribsWelcome';
import Survey from './app/components/companyManager/Survey';
//import BranchHome from './app/components/branchManager/mainComponentBranchManager';

import CompanyManagerHome from './app/components/companyManager/CompanyManagerHome';
import AddBranch from './app/components/companyManager/AddBranch';
import EditCompany from './app/components/companyManager/CompanyAttributes';
import CompanyDetails from './app/components/companyManager/AddCompany';
import ManageLicense from './app/components/companyManager/ManageLicenses';


import BranchManagerHome from './app/components/branchManager/branchManagerHome';
import addWaste from './app/components/branchManager/addWaste';
import addPurchase from './app/components/branchManager/addPurchase';

import Splash from './app/components/MainComponent';



const CompanyManagerDrawer = DrawerNavigator({
  ManagerHome: {
    screen: CompanyManagerHome,
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


const BranchManagerDrawer = DrawerNavigator({
  ManagerHome: {
    screen: BranchManagerHome,
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
  return (
    <Button
      title={'  ≡  '}
      onPress={() => navigation.navigate("DrawerOpen")}
    />
  );
};

const LogOutIcon = ({navigation}) => {
  return (
    <Button
      title={'Logout'}
      onPress={async () => {
        await AsyncStorage.multiRemove(["token","refresh_token"], () =>{
          navigation.dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Login'})
              ],
              key: null
            }))
        }
        );
      }}
    />
  );
};

const WasteNoMoreNavUser = StackNavigator({
  Splash: {screen:Splash},
  Login: { screen: MainComponent },
  Signup: { screen: Signup1 },
  Signup2: { screen: Signup2 },
  //  ManagerMain: {screen: ManagerHome},
  ManagerMain:{
    screen: CompanyManagerDrawer,
    navigationOptions: props =>({
      title: "Company Manager",
      headerLeft: (<DrawerIcon {...props}/>),
      headerRight:(<LogOutIcon {...props}/>)
    })
  },
  AddCompany: {screen: AddCompany},
  CompanyAttribs: {screen: CompanyAttribs},
  Survey: {screen: Survey},
  BranchHome : {
    screen: BranchManagerDrawer,
    navigationOptions: props =>({
      title: "Branch Manager",
      headerLeft: (<DrawerIcon {...props}/>),
      headerRight:(<LogOutIcon {...props}/>)
    })
  }

},
{
  initialRouteName: 'Splash'
});

const AppNavigationUser = () => (
  <WasteNoMoreNavUser  />
);
export default class app extends Component {

  render() {
    return (
      <AppNavigationUser />
    );
  }
}
