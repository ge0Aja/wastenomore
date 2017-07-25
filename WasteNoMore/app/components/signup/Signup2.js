import React,{Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView  } from 'react-native';
import { NavigationActions } from 'react-navigation';
export default class Signup2 extends Component{

  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    }
  }


_validateSubmitPress = () => {

  if(this.state.password !== this.state.passwordConfirmation){
    return this.setState({errorMessage: 'Passwords do not match'})
  }

  this.props.navigation.dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'ManagerMain'},{user: 'Georgi'})
                    ]
                  }));
}

  static navigationOptions = ({ navigation }) => ({
     title: 'Sign Up',
   });

   render(){
     return(
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <Text style={styles.label}>Username:</Text>
         <TextInput style={styles.input} placeholder="Username"
           ref='FirstInput'
           returnKeyType = {"next"}
           onSubmitEditing={(event) => {
             this.refs.SecondInput.focus();
           }}
           value = {this.state.username}
           onChangeText={(text) => this.setState({username: text})}>
         </TextInput>

         <Text style={styles.label}>Password:</Text>
         <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
           ref='SecondInput'
           returnKeyType = {"next"}
           onSubmitEditing={(event) => {
             this.refs.ThirdInput.focus();
           }}
           value = {this.state.password}
           onChangeText={(text) => this.setState({password: text})}>
         </TextInput>

         <Text style={styles.label}>Repeat Password:</Text>
         <TextInput style={styles.input} placeholder="Repeat Password" secureTextEntry={true}
           ref='ThirdInput'
           value = {this.state.passwordConfirmation}
           onChangeText={(text) => this.setState({passwordConfirmation: text})}>
         </TextInput>


         <Text style={styles.errorLabel}>{this.state.errorMessage}</Text>


         <View style={styles.buttonContainer}>
           <Button color="#841584" title="Submit" onPress={this._validateSubmitPress}></Button>
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
   },

   errorLabel:{
     fontSize: 12,
     color: 'red'
   }
   });
