import React,{Component} from 'react';
import {Alert, StyleSheet,TouchableOpacity, Text, Image,View, TextInput, AppRegistry,Dimensions, Button, KeyboardAvoidingView,AsyncStorage  } from 'react-native';
import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get("window");
const background = require("../../../resources/icons/login1_bg.png");
const lockIcon = require("../../../resources/icons/login1_lock.png");
const personIcon = require("../../../resources/icons/login1_person.png");
const emailIcon = require("../../../resources/icons/signup_email.png");


export default class Signup2 extends Component{

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            hasChallange: '',
            passwordConfirmation: '',
            errorMessage: '',
            errorMessageUsername:'',
            errorMessageEmail:''
        }
    }



    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    clear_error_messages = () =>{
        this.setState({errorMessage: '',
            errorMessageEmail: '',
            errorMessageUsername: ''})
    }

    _validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    _validateSubmitPress = () => {

        if(this.state.password !== this.state.passwordConfirmation){
            this.clear_error_messages();
            return this.setState({errorMessage: 'Passwords do not match'})
        }

        if (!this._validateEmail(this.state.email)){
            this.clear_error_messages();
            return this.setState({errorMessageEmail: "Please enter a valid email"})
        }


        AsyncStorage.getItem('challange').then((challange) => {
            this.setState({ hasChallange: challange !== null });
            if(this.state.hasChallange){

                fetch('http://192.168.137.43:8000/api/signup', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "challange": challange,
                        "timestamp": Date.now(),
                        "username": this.state.username,
                        "password": this.state.password,
                        "email": this.state.email
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData.status);
                        //console.log("the status");
                        //  console.log(responseData.status);
                        if(responseData.status == "success"){
                            //this.saveItem('license', responseData.license),
                            //this.saveItem('expiry', responseData.expiry),
                            this.saveItem('token', responseData.token),
                            this.saveItem('refresh_token',responseData.refresh_token),
                              //  this.saveItem('username',this.state.username),

                                AsyncStorage.getItem('role').then((role) => {
                                    if(role === "COMPANY_MANAGER"){
                                        this.props.navigation.dispatch(NavigationActions.reset(
                                            {
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'AddCompany'})
                                                ]
                                            }));
                                    }else{
                                        //ELSE go somewhere else
                                        alert("User is Branch manager !");
                                    }
                                })

                        }else if(responseData.status == "inputerror"){
                            this.state.errorMessageUsername = responseData.message.username;
                            this.state.errorMessageEmail = responseData.message.email;
                        }else {
                            Alert.alert('Error');
                        }
                    })
                    .done();
            }
        })


    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Back'
    });

    render(){
        return(
            <View behavior="padding" style={styles.container}>
              <Image source={background} style={styles.background} resizeMode="cover">
                <View style={styles.wrapper}>

                  <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                      <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput style={styles.input} placeholder="Username"
                      ref='FirstInput'
                      returnKeyType = {"next"}
                      onSubmitEditing={(event) => {
                        this.refs.SecondInput.focus();
                      }}
                      value = {this.state.username}
                      onChangeText={(text) => this.setState({username: text})}>
                    </TextInput>
                    <Text style={styles.errorLabel}>{this.state.errorMessageUsername}</Text>
                  </View>
                  <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                      <Image source={emailIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput style={styles.input} placeholder="Email"
                      ref='SecondInput'
                      keyboardType="email-address"
                      returnKeyType = {"next"}
                      onChangeText={(text) => this.setState({email: text})}
                      value = {this.state.email}
                      onSubmitEditing={(event) => {
                        this.refs.ThirdInput.focus();
                      }}>
                    </TextInput>
                    <Text style={styles.errorLabel}>{this.state.errorMessageEmail}</Text>
                  </View>
                  <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                      <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
                      ref='ThirdInput'
                      returnKeyType = {"next"}
                      onSubmitEditing={(event) => {
                        this.refs.ForthInput.focus();
                      }}
                      value = {this.state.password}
                      onChangeText={(text) => this.setState({password: text})}>
                    </TextInput>
                  </View>
                  <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                      <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput style={styles.input} placeholder="Repeat Password" secureTextEntry={true}
                      ref='ForthInput'
                      value = {this.state.passwordConfirmation}
                      onChangeText={(text) => this.setState({passwordConfirmation: text})}>
                    </TextInput>
                    <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>
                  </View>
                  <TouchableOpacity activeOpacity={.5} onPress={this._validateSubmitPress}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Sign Up!</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: "#FF3366",
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
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5
    },

    errorLabel:{
        fontSize: 12,
        color: 'red'
    }
});
