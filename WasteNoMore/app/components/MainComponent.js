import React,{Component} from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, AsyncStorage } from 'react-native';

import { NavigationActions } from 'react-navigation';

export default class MainComponent extends Component {

  _checkToken = async (navigation) => {
    try {
      const TOKEN = await AsyncStorage.getItem('token');
      const REFRESH_TOKEN = await AsyncStorage.getItem('refresh_token');

      console.log("hereeeeeeeeeeeeeeeeeeeeee");
      console.log("refresh token"+ REFRESH_TOKEN);

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
                      }).catch((error) => {
                        console.error(error);
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
                  }).catch((error) => {
                    console.error(error);
                  })
                  .done();

                } catch (e) {
                  console.error(e);
                  console.log("the tokens caused an error");
                } finally {
                  console.log("set the current view state to the login page");

                  this.props.navigation.dispatch(NavigationActions.reset(
                    {
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Login'})
                      ],
                      key: null
                    }));
                  }
                }

                componentWillMount(){
                  //console.log(this.props);
                  this._checkToken();
                }

                static navigationOptions = ({ navigation }) => ({
                  title: 'Welcome',
                  header: null
                });

                render() {
                  return(<View></View>);

                }
              }
