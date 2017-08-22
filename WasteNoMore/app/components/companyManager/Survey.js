import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Button,ActivityIndicator,Alert,ScrollView,TextInput} from 'react-native';

import ModalPicker from 'react-native-modal-picker';

export default class Survey extends Component {

  constructor(){
    super();
        this.state = {
          comps:[],
          qExist:false
        }
        //this._validateSubmitPress = this._validateSubmitPress.bind(this);
      //  this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      if(!this.state.attrExist){
          console.log('called getattrs again');
          this._getQuestions();
        }
    }

    _validateSubmitPress = () => {


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

      console.log(toUpload);

      if(Inputerror ==1)
        return;



        fetch('http://192.168.173.43:8000/api/answerSurvey',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //  'Authorization': 'Bearer ' + TOKEN
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMzOTMwNjAsImV4cCI6MTUwMzM5NjY2MH0.UQntZMXI6heX5kN2HddrWbIOqs16TP_Ad-vRTD51P8PAnQv_ObWTZK306hHpXOa2URqlZxEsZJo3hQKM-GjECm5w6-SMF0sN9HsNFgYZhHIPIK2ZasrEk0FbXcfUb0aXcmnmYBmBLT9Lj1pXgTmUvtoLUNhMbyzhHx6dybe6IKoCnQ7rLRLIThBrO_zM58fzC4qIEnY7_dAkOQr9tHII8QEAs8ei3QCQLAthtNuB1QFbH08jFpD5FPUH9YZQOKNQJzFxFhGc_w3umS8LPkbtUssDTXQ5SL9kEu3LjtiCZEfTQR17f6ul_YBoL0092SeqcLdx5yDY8yHHI1HvkfImyaXK9BqXhJ0RadKPJbBPbznh6KJ7LWWDb5alL8-G-msN-NyR201TP7ukkrV1X0fXt0hGzwnZtRfRPQadKtH70l-7E87s7ct1tVandgYcPkIfY3kLQ3i5gzB6-UReDYrcY9zr1aPvSU7nGl8gKIq4TByldF7iYJ6wNajZydKlfAc5oyWjUmfa8IPD6zptAUWKCWI9t7LusEcJeEdjT4UsmiiBaG1eT1qeKgkWaCtJY9HZiDWZbPL0PG2sxgJqYy-EwMcyB9RTV9qpxnVTTyBANOfCPfV8BGUerycIeAWwujAkX25o3dRmZHvMZ1BxjYd5lK-wgHQLrr21uZG6x4EAc3w'},

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
              alert("Thank you !");

            }
          })
          .done();


    }


    _getQuestions = () => {

      fetch('http://192.168.173.43:8000/api/generateQs', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMzOTMwNjAsImV4cCI6MTUwMzM5NjY2MH0.UQntZMXI6heX5kN2HddrWbIOqs16TP_Ad-vRTD51P8PAnQv_ObWTZK306hHpXOa2URqlZxEsZJo3hQKM-GjECm5w6-SMF0sN9HsNFgYZhHIPIK2ZasrEk0FbXcfUb0aXcmnmYBmBLT9Lj1pXgTmUvtoLUNhMbyzhHx6dybe6IKoCnQ7rLRLIThBrO_zM58fzC4qIEnY7_dAkOQr9tHII8QEAs8ei3QCQLAthtNuB1QFbH08jFpD5FPUH9YZQOKNQJzFxFhGc_w3umS8LPkbtUssDTXQ5SL9kEu3LjtiCZEfTQR17f6ul_YBoL0092SeqcLdx5yDY8yHHI1HvkfImyaXK9BqXhJ0RadKPJbBPbznh6KJ7LWWDb5alL8-G-msN-NyR201TP7ukkrV1X0fXt0hGzwnZtRfRPQadKtH70l-7E87s7ct1tVandgYcPkIfY3kLQ3i5gzB6-UReDYrcY9zr1aPvSU7nGl8gKIq4TByldF7iYJ6wNajZydKlfAc5oyWjUmfa8IPD6zptAUWKCWI9t7LusEcJeEdjT4UsmiiBaG1eT1qeKgkWaCtJY9HZiDWZbPL0PG2sxgJqYy-EwMcyB9RTV9qpxnVTTyBANOfCPfV8BGUerycIeAWwujAkX25o3dRmZHvMZ1BxjYd5lK-wgHQLrr21uZG6x4EAc3w'
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
          this.setState({comps:responseData.questions,qExist:true});
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

          //console.log(this.state);
        }
      }).catch((error) => {
                console.error(error);
            })
      .done();
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
    marginLeft:15
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
