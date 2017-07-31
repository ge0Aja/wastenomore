import React,{Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, AppRegistry, Button, KeyboardAvoidingView,AsyncStorage  } from 'react-native';
import { NavigationActions } from 'react-navigation';
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
          console.log(responseData);
          //console.log("the status");
        //  console.log(responseData.status);
          if(responseData.status == "success"){
          //this.saveItem('license', responseData.license),
          //this.saveItem('expiry', responseData.expiry),
          this.saveItem('token', responseData.token),
          this.saveItem('username',this.state.username),

            AsyncStorage.getItem('role').then((role) => {
              if(role === "COMPANY_MANAGER"){
                this.props.navigation.dispatch(NavigationActions.reset(
                               {
                                  index: 0,
                                  actions: [
                                    NavigationActions.navigate({ routeName: 'ManagerMain'})
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
         <Text style={styles.errorLabel}>{this.state.errorMessageUsername}</Text>

         <Text style={styles.label}>Email:</Text>
         <TextInput style={styles.input} placeholder="Email"
           ref='SecondInput'
           returnKeyType = {"next"}
           onChangeText={(text) => this.setState({email: text})}
           value = {this.state.email}
           onSubmitEditing={(event) => {
             this.refs.ThirdInput.focus();
           }}>

         </TextInput>
         <Text style={styles.errorLabel}>{this.state.errorMessageEmail}</Text>

         <Text style={styles.label}>Password:</Text>
         <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
           ref='ThirdInput'
           returnKeyType = {"next"}
           onSubmitEditing={(event) => {
             this.refs.ForthInput.focus();
           }}
           value = {this.state.password}
           onChangeText={(text) => this.setState({password: text})}>
         </TextInput>

         <Text style={styles.label}>Repeat Password:</Text>
         <TextInput style={styles.input} placeholder="Repeat Password" secureTextEntry={true}
           ref='ForthInput'
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
