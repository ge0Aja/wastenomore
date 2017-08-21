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
    TouchableOpacity, KeyboardAvoidingView
} from 'react-native';

// import SignupView from "./Signup";
// import MainComponentManager from "./MainComponentManager";

import { NavigationActions } from 'react-navigation';


const { width, height } = Dimensions.get("window");

const background = require("../../../resources/icons/login1_bg.png");
const mark = require("../../../resources/icons/login1_mark.png");
const lockIcon = require("../../../resources/icons/login1_lock.png");
const personIcon = require("../../../resources/icons/login1_person.png");

export default class LoginScreen extends Component {

    constructor(){
        super();
        this.state = {
            username:'',
            password:''
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
        // navigate('SignUp')
        this.props.navigation.navigate('Signup');
    };
/*    handleSignInPress = () => {
        console.log('SignInPressed');

        //TODO: change reset routeName
        this.props.navigation.dispatch(NavigationActions.reset(
            {
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'ManagerMain'})
                ],
                key: null
            }));
        console.log('Dispatched Reset');

    };*/

    handleSignInPress = () => {
        console.log('user: '+this.state.username);
        console.log('pass: '+this.state.password);
        //remove logs after testing

        // if(! this.state.license) return;
        fetch('http://192.168.1.111:9111/api/token_authentication', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,//this.state.license,
                "password": this.state.password,//,
                "timestamp": Date.now()
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData[0].role);
                console.log('random'+responseData.random);
                if(responseData[0].status == "GRANTED"){
                    //this.saveItem('license', responseData.license),
                    //this.saveItem('expiry', responseData.expiry),
                    this.saveItem('role', responseData[0].role),
                        // this.saveItem('challange', responseData.random),
                        this.props.navigation.dispatch(NavigationActions.reset(
                            {
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'ManagerMain'})
                                ],
                                key: null
                            }));
                    console.log('Dispatched Reset');
                }else if (responseData.status == "DENIED"){
                    Alert.alert('Access Denied');
                }else {
                    Alert.alert('Errorz');
                }
            })
            .done();
    };



    render() {
        // const { navigate } = this.props;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                onChangeText={(text) => this.setState({username: text})}
                                value = {this.state.license}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={(text) => this.setState({password: text})}
                                value = {this.state.license}
                                onSubmitEditing = { ()  =>this.handleSignInPress()  }

                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignInPress}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>Don&#39;t have an account?</Text>
                        </View>
                        <TouchableOpacity activeOpacity={.5} style={styles.centeredButton} onPress={this.handleSignUpPress}>
                            <View>
                                <Text style={styles.signupLinkText}>
                                    Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
            </KeyboardAvoidingView>
        );
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
    }
});