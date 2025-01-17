  import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Alert,
    Button,
    ActivityIndicator,
    TouchableOpacity, KeyboardAvoidingView
  } from 'react-native';

  import { NavigationActions } from 'react-navigation';


  const { width, height } = Dimensions.get("window");

  const background = require("../../../resources/icons/signup_bgc.png");
  const mark = require("../../../resources/icons/main.png");
  //const lockIcon = require("../../../resources/icons/login1_lock.png");
  //const personIcon = require("../../../resources/icons/login1_person.png");

  export default class LoginScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
      title: 'Login',
      header: null
    });

    constructor(){
      super();
      this.state = {
        username:'',
        password:'',
        trySignIn:false
      }
    }


    async saveItem(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
      } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
      }
    }
    handleSignUpPress = () => {
      console.log('SignUp Pressed');
      this.props.navigation.navigate('Signup');
    };

    _handleSignInPress =  () => {
      try {
        this.setState({trySignIn:true});
        console.log("The state is ", this.state.trySignIn);
        if(! this.state.username || !this.state.password)
          return Alert.alert("Error","Invalid Credentials");

        fetch('https://murmuring-citadel-23511.herokuapp.com/api/token_authentication', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password,
            "timestamp": Date.now()
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          //  console.log('random'+responseData.random);
          if(responseData.status == "GRANTED"){
            this.saveItem('role', responseData.role);
            this.saveItem('token',responseData.token);
            this.saveItem('refresh_token',responseData.refresh_token);
            if(responseData.role == "COMPANY_MANAGER"){
              // check company manager status

              fetch('https://murmuring-citadel-23511.herokuapp.com/api/checkCompanyManager',{
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + responseData.token
                },
              })
              .then((response) => response.json())
              .then((responseData) => {
                console.log("Second Response Data");
                console.log(responseData);
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
                      }else if (responseData[0].status == "DENIED"){
                        Alert.alert("Error",'Access Denied');

                      }else {
                        Alert.alert('Error');
                      }
                    }).catch((error) => {
                      console.error(error);
                    })
                    .done();

                  } catch (e) {

                    console.error(e);

                  } finally {
                          this.setState({trySignIn: false})
                  }
                };

      render() {
          return (
            <View style={styles.wrapper}>
              <Image source={background} style={styles.background} resizeMode="cover">

                <View style={styles.markWrap}>
                  <Image source={mark} style={styles.mark} resizeMode="contain" />
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.inputWrap}>
                    {/* <View style={styles.iconWrap}>
                      <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                    </View> */}
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor="#CCC"
                      style={styles.input}
                      autoCorrect={false}
                      onChangeText={(text) => this.setState({username: text})}
                      value = {this.state.username}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      ref='FirstInput'
                      returnKeyType = {"next"}
                      onSubmitEditing={(event) => {
                        this.refs.SecondInput.focus();
                      }}

                    />
                  </View>
                  <View style={styles.inputWrap}>

                    <TextInput
                      placeholderTextColor="#CCC"
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={(text) => this.setState({password: text})}
                      value = {this.state.password}
                      onSubmitEditing = { ()  =>this.handleSignInPress  }
                      ref='SecondInput'
                    />
                  </View>

                  <TouchableOpacity activeOpacity={.5} onPress = {this._handleSignInPress}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{marginTop:5}}>
                    <ActivityIndicator
                      animating={this.state.trySignIn}
                      size={"small"}
                      hidesWhenStopped={true}
                    >
                    </ActivityIndicator>
                  </View>
                </View>
                <View style={styles.container}>
                  <TouchableOpacity activeOpacity={.5} style={styles.centeredButton} onPress={this.handleSignUpPress}>
                    <View>
                      <Text style={styles.signupLinkText}>
                        Sign Up
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>


              </Image>





            </View>

      );
    }
  }
          const styles = StyleSheet.create({
            containerdad: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10
            },
            container: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            },
            markWrap: {
              flex: 1,
              paddingVertical: 30
            },
            mark: {
              width: null,
              height: null,
              flex: 1
            },
            background: {
              width,
              height
            },
            wrapper: {
              paddingVertical: 10
            },
            inputWrap: {
              flexDirection: "row",
              marginVertical: 10,
              height: 70,
              borderBottomWidth: 1,
              borderBottomColor: "#CCC"
            },
            iconWrap: {
              paddingHorizontal: 7,
              alignItems: "center",
              justifyContent: "center"
            },
            icon: {
              height: 20,
              width: 20
            },
            input: {
              flex: 1,
              paddingHorizontal: 10
            },
            button: {
              backgroundColor: "#7eb641",
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30
            },
            centeredButton:{
              alignItems: "center",
              justifyContent: "center"
            },
            buttonText: {
              color: "#FFF",
              fontSize: 18
            },
            forgotPasswordText: {
              color: "#D8D8D8",
              backgroundColor: "transparent",
              textAlign: "right",
              paddingRight: 15
            },
            signupWrap: {
              backgroundColor: "transparent",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            },
            accountText: {
              color: "black"
            },
            signupLinkText: {
                backgroundColor: "transparent",
                color: "#CCCC",
                fontSize: 16,
                fontWeight: 'bold'
            //  marginLeft: 5
            }
          });
