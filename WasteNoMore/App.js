import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainComponent from './app/components/login/login';
import Signup1 from './app/components/signup/Signup1';
import Signup2 from './app/components/signup/Signup2';
import ManagerHome from './app/components/companyManager/MainComponentManager'; //MainComponentManager
import AddCompany from './app/components/companyManager/AddCompanyWelcome';
import CompanyAttribs from './app/components/companyManager/AddAttribsWelcome';
import Survey from './app/components/companyManager/Survey';
import BranchHome from './app/components/branchManager/mainComponentBranchManager'



const WasteNoMoreNavUser = StackNavigator({
  Login: { screen: MainComponent },
  Signup: { screen: Signup1 },
  Signup2: { screen: Signup2 },
  ManagerMain: {screen: ManagerHome},
  AddCompany: {screen: AddCompany},
  CompanyAttribs: {screen: CompanyAttribs},
  Survey: {screen: Survey},
  BranchHome : {screen: BranchHome}
},
{
  initialRouteName: 'Login'
});

const AppNavigationUser = () => (
  <WasteNoMoreNavUser  />
);

export default class app extends Component {

  // const Login = 'LOGIN';
  // const ManagerMain = 'MANAGER_MAIN';
  // const BranchMain = 'BRANCH_MAIN';
  // const Survey = 'SURVEY';
  // const CompanyInfo = 'CINFO1';
  // const CompanyAttribs = 'CINFO2';


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
            //TODO:CHECK COMPANY MANAGER STATUS

            fetch('http://192.168.137.43:8000/api/checkCompanyManager',{
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + responseData.token
              },

              //  body: JSON.stringify({
              //    "staff_count": this.state.branchStaffCount,
              //    "opening_date": this.state.branchOpeningDate,
              //    "location": this.state.branchLocation,
              //    "address": this.state.branchAddress,
              //    "main_branch": this.state.mainBranchAdd,
              //    })
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
