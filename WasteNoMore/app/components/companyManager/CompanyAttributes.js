import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Button,ActivityIndicator,Picker,Alert} from 'react-native';
//import Row from './Row';


export default class CompanyAttributes extends Component {

  constructor(){
    super();
        this.state = {
          comps:[],
          attrExist:false
        }

        this._validateSubmitPress = this._validateSubmitPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }


  componentDidMount() {
    if(!this.attrExist){
        console.log('called getattrs again');
        this._getAttrs();
      }
  }

  _validateSubmitPress(){

    var toUpload = {};
    var Inputerror = 0;
    var currentState = this.state;

    Object.keys(currentState).map(function(keyName, keyIndex) {
      // use keyName to get current key's name
      // and a[keyName] to get its value
      if(keyName !== "comps" && keyName !== "attrExist"){
        if(!currentState[keyName] || currentState[keyName] == "0"){
          Inputerror =1;
          return alert('Please Pick a '+ keyName);
        }
        toUpload[keyName] = currentState[keyName];
      }
    });

    if(Inputerror ==1)
      return;


  console.log(JSON.stringify(
    Object.keys(toUpload).map(function(keyName, keyIndex) {
      return keyName+":"+"\""+toUpload[keyName]+"\""
    })));

  //  return;


    fetch('http://192.168.137.43:8000/api/newCompanyAttrSubAttr',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIwMzM1OTAsImV4cCI6MTUwMjAzNzE5MH0.A96_1uQVxkpW7gOTgDDsbbdyK3r3i2W_X_tjJtc2EkzTlkqn890QXF5cY99WHJz5TiGjTDaY5ETc7ZGCLEG_LeBVIO_q0EGzJyGqrnMGaZ-K6llqtC8WaFWYi2pmQo-yIrfh4bVHpbxDwg94QEwA33JTCd7cSGV1sHxNR3QkYenAM2RIS5fYf5cVFFT2aXZqr7ZdQ79-Qfw8aSTDtKlRHdHzhHbEx2x7-ETvSTt5KRPzTq3xpSpBCKtSsNjrXS_88lp7xWYDvqskuJuB_0ytykK4W5c0PFOYrePJA2fdfMvwVHjga7RyncdD_Mppm2-7TqVI9Yljxi_i8MugPCYbjcHyrC6KDCPUZfgkqTMr6m0kDUiJmMkPxEezQ__oR2nDtNkEgBhKh_Q057b3mcllGmiy9lWLqQNrBR6t5eSw1Ll__I0FKjgVq1XAK0Q94jFOuL6zawmYbWyn7cn2uDnDtX-HeHZms0vSHxWSi_1898eeora5cXZ1grjaLH-6JBUWqaUE4vabPV1og2OPhfPAHXTf11tDvEq0We0nmMJdc3yzTUEOUqsxLuzBcX8DP14D0scpFvAABIE5kKw6XRB63e7UiytVjOXV8Okj4Nh5z_r3iVqLhUFIoTCfpdbpF_nlcNloBzNvr6UzNX-0t0ayfJMPNH3uTrTZY2KSm04xjRA'},

        body: JSON.stringify(
          Object.keys(toUpload).map(function(keyName, keyIndex) {
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
          alert("Company Info added Successfully");

        }
      })
      .done();

  }

  _getAttrs() {
          fetch('http://192.168.137.43:8000/api/getAttrSubAttrsApi', {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIwMzM1OTAsImV4cCI6MTUwMjAzNzE5MH0.A96_1uQVxkpW7gOTgDDsbbdyK3r3i2W_X_tjJtc2EkzTlkqn890QXF5cY99WHJz5TiGjTDaY5ETc7ZGCLEG_LeBVIO_q0EGzJyGqrnMGaZ-K6llqtC8WaFWYi2pmQo-yIrfh4bVHpbxDwg94QEwA33JTCd7cSGV1sHxNR3QkYenAM2RIS5fYf5cVFFT2aXZqr7ZdQ79-Qfw8aSTDtKlRHdHzhHbEx2x7-ETvSTt5KRPzTq3xpSpBCKtSsNjrXS_88lp7xWYDvqskuJuB_0ytykK4W5c0PFOYrePJA2fdfMvwVHjga7RyncdD_Mppm2-7TqVI9Yljxi_i8MugPCYbjcHyrC6KDCPUZfgkqTMr6m0kDUiJmMkPxEezQ__oR2nDtNkEgBhKh_Q057b3mcllGmiy9lWLqQNrBR6t5eSw1Ll__I0FKjgVq1XAK0Q94jFOuL6zawmYbWyn7cn2uDnDtX-HeHZms0vSHxWSi_1898eeora5cXZ1grjaLH-6JBUWqaUE4vabPV1og2OPhfPAHXTf11tDvEq0We0nmMJdc3yzTUEOUqsxLuzBcX8DP14D0scpFvAABIE5kKw6XRB63e7UiytVjOXV8Okj4Nh5z_r3iVqLhUFIoTCfpdbpF_nlcNloBzNvr6UzNX-0t0ayfJMPNH3uTrTZY2KSm04xjRA'
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
                newState[a.Name] = ''
              })

              newState['attrExist'] = true;
              newState['comps'] = this.state.comps;
              this.setState(newState);

            ///  console.log(this.state);

            }
          }).catch((error) => {
                    console.error(error);
                })
          .done();
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
                    return <Picker.Item key={j} value={s.Name} label={s.Name} />
                  })}
                </Picker>
              </View>
            });

            return(
              <View style={styles.container}>
                { renderView }

                <View style={styles.buttonContainer}>
                  <Button color="#841584" title="Submit" onPress={this._validateSubmitPress}></Button>
                </View>
              </View>
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
    },
    pick:{
        width: 100,
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
