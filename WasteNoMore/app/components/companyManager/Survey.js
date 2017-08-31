import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, Button,ActivityIndicator,Alert,ScrollView,TextInput} from 'react-native';

import ModalPicker from 'react-native-modal-picker';
import { NavigationActions } from 'react-navigation';

export default class Survey extends Component {

  constructor(){
    super();
    this.state = {
      comps:[],
      surveyVersion:'',
      qExist:false
    }

  }

  componentDidMount() {
    if(!this.state.attrExist){
      console.log('called getattrs again');
      this._getQuestions();
    }
  }

  _validateSubmitPress = async () => {


    var toUpload = {};
    var Inputerror = 0;
    var currentState = this.state;

    toUpload["timestamp"] = Date.now();

    Object.keys(currentState).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      if(keyName !== "comps" && keyName !== "qExist"){
        if( currentState[keyName] == "0"){
          Inputerror =1;
          return alert('Please Choose Required Options');
        }
        if(currentState[keyName] == ''){
          Inputerror =1;
          return alert('Please Fill Required Fields');
        }
        toUpload[keyName] = currentState[keyName];
      }
    });

    if(Inputerror ==1)
    return;

    try {


      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/answerSurvey',{
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
        }else if(responseData.status == "success"){
          this.props.navigation.dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'ManagerMain'})
              ],
              key: null
            }));


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


    _getQuestions = async () => {
      try {

        var TOKEN = await AsyncStorage.getItem('token');

        fetch('http://192.168.137.43:8000/api/generateQs', {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + TOKEN
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
          //  console.log(responseData);
          if("message" in responseData){
            console.log(responseData.message);
          }
          if(responseData.status == "error"){
            console.log("error");
          }else if(responseData.status == "success"){
            this.setState({comps:responseData.questions,surveyVersion:responseData.version,qExist:true});
            var newState = {};

            this.state.comps.map((a,i) => {
              if(a.detail)
              newState[`D${a.qid}`] = ''

              if(a.ddl){
                newState[`P${a.qid}`] ='0';
                newState[`T${a.qid}`] ='Choose Option';
              }
            })
            newState['qExist'] = true;
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
      if(!this.state.qExist){
        return(
          <View style={styles.container}>
            <ActivityIndicator
              animating={!this.state.qExist}
              size={"large"}
              hidesWhenStopped={true}
            >
            </ActivityIndicator>

          </View>
          );
        }else{

          let renderView = this.state.comps.map((a, i) => {
            var renderDDL ;
            var renderD;
            if(a.ddl){
              renderDDL =
              <ModalPicker
                data={a.ddl_items}
                initValue={"Choose Option"}
                onChange={(option) => {
                  this.setState({[`P${a.qid}`]: option.key,[`T${a.qid}`]: option.label})
                }}
              >
                <TextInput
                  style={styles.pinput}
                  editable={false}
                  value={this.state[`T${a.qid}`]} />

              </ModalPicker>
                }

                if(a.detail){
                  renderD =
                  <TextInput
                    style={styles.tinput}
                    onChangeText={(text) => this.setState({[`D${a.qid}`]: text})}
                    value={this.state[`D${a.qid}`]}
                    placeholder={a.hint}
                  >
                  </TextInput>
                  }

                  return <View key={i} style={{flex:1,  alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.label}>
                      {a.q}:
                    </Text>
                    <View style={styles.rows}>
                      {renderDDL}
                      {renderD}
                    </View>
                  </View>
            });
            return(
              <ScrollView style={{flex:1}}>
                { renderView }
                <View style={styles.buttonContainer}>
                  <Button color="#841584" title="Submit" onPress={this._validateSubmitPress}></Button>
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
          flex:1,
          flexDirection: 'row',
        },
        label: {
          fontSize: 16,
          marginTop:23
        },
        buttonContainer:{
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf:'center'
        },
        tinput: {
          padding: 4,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          margin: 15,
          width: 150,
        },
        pinput: {
          padding: 4,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          margin: 15,
          width: 200,
        },
      });
