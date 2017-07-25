import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry,Alert, Button } from 'react-native';
import { DrawerNavigator } from "react-navigation";

import ManagerHome from './CompanyManagerHome';
import AddBranch from './AddBranch';
import EditCompany from './EditCompanyInfo';


export default class MainComponentManager extends Component {

  static navigationOptions = ({ navigation }) => ({
     title: 'Company Manager',
     headerRight: (
      <Button
        title={'info'}
        onPress={() => alert("Hello")}
      />
    ),
   });

  render(){
  //  console.log(this.props.navigation.state.params.user);
    return(
          <AppNavigationManagerDrawer />
    );
  }
}

const AppNavigationManagerDrawer = () => (
  <ManagerDrawer />
);


const ManagerDrawer = DrawerNavigator({
  ManagerHome: {
    screen: ManagerHome,
  },
  EditCompany: {
    screen: EditCompany,
  },
  AddBranch: {
    screen: AddBranch,
  },
},
{
   initialRouteName: 'ManagerHome'
});
