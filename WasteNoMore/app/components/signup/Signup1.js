import React,{Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView  } from 'react-native';

export default class Signup1 extends Component{

  constructor(){
    super();
    this.state = {
      license: '',
      email: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
     title: 'Sign Up',
   });

  _validateButtonPress = () => {
    console.log(this.state.license);
    console.log(this.state.email);

    this.props.navigation.navigate('Signup2');
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>License Key:</Text>
        <TextInput style={styles.input} placeholder="License Key"
          onSubmitEditing={(event) => {
            this.refs.SecondInput.focus();
          }}
          onChangeText={(text) => this.setState({license: text})}
          returnKeyType = {"next"}
          value = {this.state.license}>
        </TextInput>

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} placeholder="Email"
          ref = 'SecondInput'
          onChangeText={(text) => this.setState({email: text})}
          value = {this.state.email}>
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
