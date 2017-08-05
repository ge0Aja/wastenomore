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
        <Button style={styles.btn} title="Sign Up!" color="#841584" onPress={() => this.props.navigation.navigate('Signup')}></Button>
        <Button style={styles.btn} title="Add Company" color="#841584" onPress={() => this.props.navigation.navigate('AddCompany')}></Button>
        <Button style={styles.btn} title="Company Attribs" color="#841584" onPress={() => this.props.navigation.navigate('CompanyAttribs')}></Button>
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
  }, btn:{
    margin:10
  }
});
