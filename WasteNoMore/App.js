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
  // BranchHome:{
  //   screen: BranchHome
  // }
},
{
  initialRouteName: 'Login'
});

const AppNavigationUser = () => (
  <WasteNoMoreNavUser  />
);

export default class app extends Component {

  _checkToken = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('token');
      const REFRESH_TOKEN = await AsyncStorage.getItem('refresh_token');

      fetch('http://192.168.137.43:8000/api/token_refresh',{
        method: 'POST',
        headers: {
          //  'Authorization': 'Bearer ' + TOKEN
        },
        body: JSON.stringify({
          "refresh_token": REFRESH_TOKEN,
          "timestamp": Date.now(),
        })
      })
      .then((response) => response.json())
      .then(async (responseData) => {
        if(responseData.status == "ERROR"){
          alert("Error");
          console.log("error, reason:", responseData.reason);
        }else if(responseData.status == "DENIED"){
          alert("Access Denied");
          console.log("denied, reason:", responseData.reason);
        }else if(responseData.status == "GRANTED"){
          await AsyncStorage.setItem('token', responseData.token);
          await AsyncStorage.setItem('refresh_token', responseData.refresh_token);

          if(responseData.role == "COMPANY_MANAGER"){

            fetch('http://192.168.137.43:8000/api/checkCompanyManager',{
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + responseData.token
              },
            })
            .then((response) => response.json())
            .then((responseData) => {
              if(responseData.status == "error"){
                console.log("error, reason:", responseData.reason);
              }else {
                switch (responseData.status) {
                  case "new_company":
                  this.props.navigation.dispatch(NavigationActions.reset(
                    {
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'AddCompany'})
                      ],
                      key: null
                    }));
                    break;
                    case "new_attribs":
                    this.props.navigation.dispatch(NavigationActions.reset(
                      {
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'CompanyAttribs'})
                        ],
                        key: null
                      }));
                      break;

                      case "survey":

                      this.props.navigation.dispatch(NavigationActions.reset(
                        {
                          index: 0,
                          actions: [
                            NavigationActions.navigate({ routeName: 'Survey'})
                          ],
                          key: null
                        }));

                        break;

                        case "home":

                        this.props.navigation.dispatch(NavigationActions.reset(
                          {
                            index: 0,
                            actions: [
                              NavigationActions.navigate({ routeName: 'ManagerMain'})
                            ],
                            key: null
                          }));

                          break;
                          default:
                          this.props.navigation.dispatch(NavigationActions.reset(
                            {
                              index: 0,
                              actions: [
                                NavigationActions.navigate({ routeName: 'ManagerMain'})
                              ],
                              key: null
                            }));

                          }
                        }
                      })
                      .done();
                    }else{
                      this.props.navigation.dispatch(NavigationActions.reset(
                        {
                          index: 0,
                          actions: [
                            NavigationActions.navigate({ routeName: 'BranchHome'})
                          ],
                          key: null
                        }));
                      }
                    }
                  })
                  .done();

                } catch (e) {
                  console.log("the tokens caused an error");
                } finally {
                  console.log("set the current view state to the login page");
                }
              }

              componentDidMount(){
                this._checkToken();
              }

              render() {
                return (
                  <AppNavigationUser />
                );
              }
            }
