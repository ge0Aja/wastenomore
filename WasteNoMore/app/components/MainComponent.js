import React,{Component} from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';


export default class MainComponent extends Component {

  static navigationOptions = ({ navigation }) => ({
     title: 'Welcome',
     header: null
   });

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.btn}><Button  title="Sign Up!" color="#841584" onPress={() => this.props.navigation.navigate('Signup')}></Button></View>
        <View style={styles.btn}><Button  title="Add Company" color="#841584" onPress={() => this.props.navigation.navigate('AddCompany')}></Button></View>
        <View style={styles.btn}><Button  title="Company Attribs" color="#841584" onPress={() => this.props.navigation.navigate('CompanyAttribs')}></Button></View>
        <View style={styles.btn}><Button  title="Add Branch" color="#841584" onPress={() => this.props.navigation.navigate('AddBranch')}></Button></View>
        <View style={styles.btn}><Button  title="License Manage" color="#841584" onPress={() => this.props.navigation.navigate('ManageLicense')}></Button></View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
     padding: 12
  }, btn:{
    //margin:20
      padding:20
  }
});
