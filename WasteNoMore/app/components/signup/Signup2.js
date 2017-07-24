import React,{Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView  } from 'react-native';

export default class Signup2 extends Component{
  static navigationOptions = ({ navigation }) => ({
     title: 'Sign Up',
   });
   render(){
     return(
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <Text style={styles.label}>Username:</Text>
         <TextInput style={styles.input} placeholder="Username">
         </TextInput>

         <Text style={styles.label}>Password:</Text>
         <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}>
         </TextInput>

         <Text style={styles.label}>Repeat Password:</Text>
         <TextInput style={styles.input} placeholder="Repeat Password" secureTextEntry={true}>
         </TextInput>

         <View style={styles.buttonContainer}>
           <Button color="#841584" title="Submit" onPress={this._validateButtonPress}></Button>
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
