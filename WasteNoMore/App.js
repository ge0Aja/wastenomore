import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

//import MainComponent from './app/components/login/login';
import MainComponent from './app/components/MainComponent'
import Signup1 from './app/components/signup/Signup1';
import Signup2 from './app/components/signup/Signup2';
import ManagerHome from './app/components/companyManager/MainComponentManager';
import AddCompany from './app/components/companyManager/AddCompany';
import CompanyAttribs from './app/components/companyManager/CompanyAttributes';
import AddBranch from './app/components/companyManager/AddBranch';
import ManageLicenses from './app/components/companyManager/ManageLicenses';
import Survey from './app/components/companyManager/Survey';
import AddWaste from './app/components/branchManager/addWaste'

const WasteNoMoreNavUser = StackNavigator({
  Login: { screen: MainComponent },
  Signup: { screen: Signup1 },
  Signup2: { screen: Signup2 },
  ManagerMain: {screen: ManagerHome},
  AddCompany: {screen: AddCompany},
  CompanyAttribs: {screen: CompanyAttribs},
  AddBranch: {screen: AddBranch},
  ManageLicense: {screen: ManageLicenses},
  Survey: {screen: Survey},
  AddWaste : {screen: AddWaste}
},
{
   initialRouteName: 'Login'
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
