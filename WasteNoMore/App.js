import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import  MainComponent from './app/components/MainComponent';
import Signup1 from './app/components/signup/Signup1';
import Signup2 from './app/components/signup/Signup2';
import ManagerHome from './app/components/companyManager/MainComponentManager';

const WasteNoMoreNavUser = StackNavigator({
  Home: { screen: MainComponent }, //this should be the sign in page
  Signup: { screen: Signup1 },
  Signup2: { screen: Signup2 },
  ManagerMain: {screen: ManagerHome}
},
{
   initialRouteName: 'Home'
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