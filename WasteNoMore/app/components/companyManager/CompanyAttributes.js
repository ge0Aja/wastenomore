import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Button,ActivityIndicator,Picker,Alert,ScrollView} from 'react-native';
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

    fetch('http://192.168.137.43:8000/api/newCompanyAttrSubAttr',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMxNjI5NDgsImV4cCI6MTUwMzE2NjU0OH0.JLuY1GDbquZRN1NIFk81mcnn3knUAOrgMZ-vF1McPfzy05n2wdwaUMd0MqrzVMZtnTOdtu6_FpWYIi27HwvxP462fSRPPXtpkdv5-mr2XPicJOWlYnCWAYBRzjkKsSSyVLZ-QXDHaWx6-2f59Rw5di4ake2xTu9-TW4kjNPP8s4VyUAcg99zahB1hPhapeqoE1vs46Q-TF86ZUrAHJqHibSUEXDV0EB4rI3ifexwBj26kHtFPBb-FvS27aDlc2hW8iwitakNH069sgdCnOuYxethV_YfFWvtuypUYrQ2gfbBJ3u2fpP8ZCz842QFNRcc3fnTD8wfmV1sApr4-nmMPydNcCfH7tqPr0uIG0z0IgiqY5S3unQnlp-ZiBUMQBmc37oZ9-_zkQ6A4gFju09V9bqlOvGYLApj0viV6T-7wO8Q6ROh7t_tsg2ChOwwFo_v9M74QpwNq78m5QUHSevrkRXXHjneMpFN62perlGhyqkr-ONoaM0nTKlF1KQUe393CpblqDdNyxhs99IBy0ofjhctIwp0fy7jPboY0siFIGEhbw8Whb3TV3r_chzyi1JJLA_RczY-N4-1YS-2xfeKGeV_YpA605qEVQ7ZlkEqCXJbgG6G-mPasdStMg6yYTz0ol2Gs02Md1wYxTfIrK-kJ6qLxyPMwpPNcGzkzdrmUzA'},

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
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMxNjI5NDgsImV4cCI6MTUwMzE2NjU0OH0.JLuY1GDbquZRN1NIFk81mcnn3knUAOrgMZ-vF1McPfzy05n2wdwaUMd0MqrzVMZtnTOdtu6_FpWYIi27HwvxP462fSRPPXtpkdv5-mr2XPicJOWlYnCWAYBRzjkKsSSyVLZ-QXDHaWx6-2f59Rw5di4ake2xTu9-TW4kjNPP8s4VyUAcg99zahB1hPhapeqoE1vs46Q-TF86ZUrAHJqHibSUEXDV0EB4rI3ifexwBj26kHtFPBb-FvS27aDlc2hW8iwitakNH069sgdCnOuYxethV_YfFWvtuypUYrQ2gfbBJ3u2fpP8ZCz842QFNRcc3fnTD8wfmV1sApr4-nmMPydNcCfH7tqPr0uIG0z0IgiqY5S3unQnlp-ZiBUMQBmc37oZ9-_zkQ6A4gFju09V9bqlOvGYLApj0viV6T-7wO8Q6ROh7t_tsg2ChOwwFo_v9M74QpwNq78m5QUHSevrkRXXHjneMpFN62perlGhyqkr-ONoaM0nTKlF1KQUe393CpblqDdNyxhs99IBy0ofjhctIwp0fy7jPboY0siFIGEhbw8Whb3TV3r_chzyi1JJLA_RczY-N4-1YS-2xfeKGeV_YpA605qEVQ7ZlkEqCXJbgG6G-mPasdStMg6yYTz0ol2Gs02Md1wYxTfIrK-kJ6qLxyPMwpPNcGzkzdrmUzA'
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
    }
});
