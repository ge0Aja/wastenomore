import React,{Component} from 'react';
import { StyleSheet,AsyncStorage, Text, View,AppRegistry, Button,ActivityIndicator,Picker,Alert,ScrollView, Image} from 'react-native';
//import Row from './Row';


export default class CompanyAttributes extends Component {

  static navigationOptions = {
    drawerLabel: 'Company Info',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('WasteNoMore/resources/icons/company-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };



  constructor(){
    super();
    this.state = {
      comps:[],
      attrExist:false,
      submitDisabled:false
    }
  }


  componentDidMount() {
    if(!this.state.attrExist){
      console.log('called getattrs again');
      this._getAttrs();
    }
  }

  _validateSubmitPress = async () => {

    var toUpload = {};
    var Inputerror = 0;
    var currentState = this.state;

    Object.keys(currentState).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      if(keyName !== "comps" && keyName !== "attrExist" && keyName !== "submitDisabled"){
        if(!currentState[keyName] || currentState[keyName] == "0"){
          Inputerror =1;
          return Alert.alert('Please Pick a '+ keyName);
        }
        toUpload[keyName] = currentState[keyName];
      }
    });

    if(Inputerror ==1)
    return;

    try {
      this.setState({  submitDisabled:true});
      var TOKEN = await AsyncStorage.getItem('token');

      fetch('https://murmuring-citadel-23511.herokuapp.com/api/newCompanyAttrSubAttr',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + TOKEN
        },

        body: JSON.stringify(
          Object.keys(toUpload).map(function(keyName, keyIndex) {
            console.log(keyName+":"+toUpload[keyName]);
            return keyName+":"+toUpload[keyName]
          })

        )
      })
      .then((response) =>  response.json())
      .then((responseData) => {
        console.log(responseData);
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error, reason:", responseData.reason);
          Alert.alert("Error",responseData.reason);
        }else if(responseData.status == "success"){
          Alert.alert("Success","Company Info added");
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);

    } finally {
      this.setState({  submitDisabled:false});
    }

  }

  _getAttrs = async () =>  {

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      //  'Authorization': 'Bearer ' + TOKEN

      fetch('https://murmuring-citadel-23511.herokuapp.com/api/getAttrSubAttrsApi', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + TOKEN
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error");
        }else if(responseData.status == "success"){
          this.setState({attrExist:true,comps:responseData.attrs});
          var newState = {};

          this.state.comps.map((a,i) => {
            newState[a.Name] = a.selected_sub_attr
          })

          newState['attrExist'] = true;
          newState['comps'] = this.state.comps;
          this.setState(newState);

        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);

    } finally {

    }

  }


  render(){
    if(!this.state.attrExist){
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={!this.state.attrExist}
            size={"large"}
            hidesWhenStopped={true}
          >
          </ActivityIndicator>

        </View>
        );
      }else{
        let renderView = this.state.comps.map((a, i) => {
          return <View key={i} style={styles.rows}>
            <Text style={styles.label}>
              {a.Name}:
            </Text>
            <Picker style={styles.pick}
              selectedValue={this.state[`${a.Name}`]}
              onValueChange={(itemValue) => this.setState({[`${a.Name}`]: itemValue})}
            >
              <Picker.Item key="0" value="0" label="Choose Value"/>
              {a.sub_attrs.map( (s, j) => {
                return <Picker.Item key={j} value={s.Id} label={s.Name} />
              })}
            </Picker>
          </View>
          });
          return(
            <ScrollView style={{flex:1}}>
              { renderView }
              <View style={styles.buttonContainer}>
                <Button color="#841584" title="Submit" disabled={this.state.submitDisabled} onPress={this._validateSubmitPress}></Button>
              </View>
            </ScrollView>
          );
        }
      }

    }


    const styles = StyleSheet.create({

      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rows:{
        //  flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center'
      },
      pick:{
        width: 150,
      },
      label: {
        fontSize: 18
      },
      buttonContainer:{
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:'center'
      },
      icon: {
        width: 24,
        height: 24,
      }
    });
