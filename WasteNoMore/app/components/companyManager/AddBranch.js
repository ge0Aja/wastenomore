import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry,Image } from 'react-native';



export default class AddBranch extends Component {

  static navigationOptions = {
     drawerLabel: 'Add Branch',
     drawerIcon: ({ tintColor }) => (
       <Image
         source={require('WasteNoMore/resources/icons/add-icon.png')}
         style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
   };

  render(){

    return(
      <Text>Add Branch</Text>
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
  icon: {
    width: 24,
    height: 24,
  }
});
