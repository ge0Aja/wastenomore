import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import  MainComponent from './app/components/MainComponent';
import Signup1 from './app/components/signup/Signup1';
import Signup2 from './app/components/signup/Signup2';

const WasteNoMoreNav = StackNavigator({
  Home: { screen: MainComponent },
  Signup: { screen: Signup1 },
  Signup2: { screen: Signup2 },
});

const AppNavigation = () => (
  <WasteNoMoreNav  />
);

export default class app extends Component {
  render() {
    return (
        <AppNavigation />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
