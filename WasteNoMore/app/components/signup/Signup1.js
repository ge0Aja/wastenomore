import React,{Component} from 'react';
import {Alert,TouchableOpacity, Image,StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView,AsyncStorage,Dimensions } from 'react-native';

const background = require("../../../resources/icons/login1_bg.png");
const licenseIcon = require("../../../resources/icons/license_bg.png");
const { width, height } = Dimensions.get("window");

export default class Signup1 extends Component{

    constructor(){
        super();
        this.state = {
            license: '',
            status:'',
            role:'',
            expiry:'',
        }
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Back'
    });

    _validateButtonPress = () => {

        fetch('http://192.168.1.111:9111/api/license_authentication', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "license": '0920416b7ab50c5f23d7ce8d535c7ebb',//this.state.license,
                "timestamp": Date.now()
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if(responseData.status == "GRANTED"){
                    this.saveItem('license', responseData.license),
                    this.saveItem('expiry', responseData.expiry),
                    this.saveItem('role', responseData.role),
                        this.saveItem('challange', responseData.random),
                        this.props.navigation.navigate('Signup2');
                }else if (responseData.status == "DENIED"){
                    Alert.alert('Access Denied');
                }else {
                    Alert.alert('Errorz');
                }
            })
            .done();


        // console.log('validatePressed');
        // if(!this.state.license) return;
        // console.log(JSON.stringify({
        //         "license": '0920416b7ab50c5f23d7ce8d535c7ebb',//this.state.license,
        //         "timestamp": Date.now()
        //     }));
    };

    render(){
        return(
            <Image source={background} style={styles.background} resizeMode="cover">
                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={licenseIcon} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                            placeholder="License Key"
                            placeholderTextColor="#FFF"
                            style={styles.input}
                            onChangeText={(text) => this.setState({license: text})}
                            value = {this.state.license}
                        />
                    </View>
                </View>

                <TouchableOpacity activeOpacity={.5} onPress={this._validateButtonPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Validate</Text>
                    </View>
                </TouchableOpacity>
            </Image>
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
    }
});
