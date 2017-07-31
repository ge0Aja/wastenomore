import React,{Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView,AsyncStorage } from 'react-native';

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
     title: 'Sign Up',
   });

  _validateButtonPress = () => {

  if(! this.state.license) return;



  fetch('http://192.168.137.43:8000/api/license_authentication', {
     method: 'POST',
     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
     body: JSON.stringify({
       "license": 'b8ce1afd883f59422ad672bd42cdabb8',//this.state.license,
       "timestamp": Date.now(),
     })
   })
   .then((response) => response.json())
   .then((responseData) => {
     console.log(responseData);
     if(responseData.status == "granted"){
     //this.saveItem('license', responseData.license),
     //this.saveItem('expiry', responseData.expiry),
     this.saveItem('role', responseData.role),
     this.saveItem('challange', responseData.random),
     this.props.navigation.navigate('Signup2');
   }else if (responseData.status == "denied"){
     Alert.alert('Access Denied');
   }else {
     Alert.alert('Error');
   }
   })
   .done();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>License Key:</Text>
        <TextInput style={styles.input} placeholder="License Key"
          // onSubmitEditing={(event) => {
          //   this.refs.SecondInput.focus();
          // }}
          onChangeText={(text) => this.setState({license: text})}

          value = {this.state.license}>
        </TextInput>



        <View style={styles.buttonContainer}>
          <Button color="#841584" title="Validate" onPress={this._validateButtonPress}></Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'center'
  },

  label: {
    fontSize: 18
  },

  buttonContainer:{
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
