import React,{Component} from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';


export default class MainComponent extends Component {
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button title="Sign Up!" color="#841584" onPress={() => this.props.navigation.navigate('Signup')}></Button>
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
  },
});
