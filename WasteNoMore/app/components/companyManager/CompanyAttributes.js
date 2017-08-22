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
        //this._validateSubmitPress = this._validateSubmitPress.bind(this);
      //  this.componentDidMount = this.componentDidMount.bind(this);
    }


  componentDidMount() {
    if(!this.state.attrExist){
        console.log('called getattrs again');
        this._getAttrs();
      }
  }

  _validateSubmitPress = () => {

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
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMzMjg1NTAsImV4cCI6MTUwMzMzMjE1MH0.egekQWFbRucq5wBLd4Wo6A4D0QUZxtzcWD-x_W6tPz0uxL9dnGD2IfxOKhEk2MP1_0yb-n-GdiG_RCPPgwIy3IojTcsun0Rk32I-WGqGLJAe75vTsfRx3nLL-vfSW68eUIjMwqH_ItetLbVt1t03iWt-X1w7Rnk6jABL87BvWbJqO12K7ConXXk39pXOm-N9zTjSqrctClm5yKnhXOS5jXHNGanX_u7P4bjA6SAdme_prZoWVBQulYMuaRCuSmdgSc3yutj7gPn5d-CEfpBuaKED--jeHK1cX6sjTJVim0zHG6ts7YjDOWCsIPecYNR27kSvxs59jhsZ7FZ7CCmWLLeS6yHfePijFZdKrIXX8DbCx-GEaHC5FJCm4UDQ7SFpCv_U7K81anE_WTf2LJ55kdfVsdvR0U8O01Yc4CeLrDqR5rFe32eC8Ux_5hAsF5YIzUN8837hPvDGuyA0Oc_Wzlm7Y0J6b-pY7QM-vxd5786wLRkGVml2ojxV58ySmuAogLoA2DVajxmG-FjdlYUFM6pEhV9Xb35B_BxXeuEeUC7jw0lM9if3s2eQ02aRPXQu8IVTBbjpIaO_CtVmXwoBW3fe26x_McCVwYMpH_JjRdv-szGyNrEn93LRI3O3EQBMW61N1Io1Oo18iOchriHJY0gTWsy7Y98JhTApiN9wkJE'},

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
          alert("Company Info added Successfully");

        }
      })
      .done();

  }

  _getAttrs = () =>  {
        //var TOKEN = await AsyncStorage.getItem('token');
        //  'Authorization': 'Bearer ' + TOKEN

          fetch('http://192.168.137.43:8000/api/getAttrSubAttrsApi', {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMzMjg1NTAsImV4cCI6MTUwMzMzMjE1MH0.egekQWFbRucq5wBLd4Wo6A4D0QUZxtzcWD-x_W6tPz0uxL9dnGD2IfxOKhEk2MP1_0yb-n-GdiG_RCPPgwIy3IojTcsun0Rk32I-WGqGLJAe75vTsfRx3nLL-vfSW68eUIjMwqH_ItetLbVt1t03iWt-X1w7Rnk6jABL87BvWbJqO12K7ConXXk39pXOm-N9zTjSqrctClm5yKnhXOS5jXHNGanX_u7P4bjA6SAdme_prZoWVBQulYMuaRCuSmdgSc3yutj7gPn5d-CEfpBuaKED--jeHK1cX6sjTJVim0zHG6ts7YjDOWCsIPecYNR27kSvxs59jhsZ7FZ7CCmWLLeS6yHfePijFZdKrIXX8DbCx-GEaHC5FJCm4UDQ7SFpCv_U7K81anE_WTf2LJ55kdfVsdvR0U8O01Yc4CeLrDqR5rFe32eC8Ux_5hAsF5YIzUN8837hPvDGuyA0Oc_Wzlm7Y0J6b-pY7QM-vxd5786wLRkGVml2ojxV58ySmuAogLoA2DVajxmG-FjdlYUFM6pEhV9Xb35B_BxXeuEeUC7jw0lM9if3s2eQ02aRPXQu8IVTBbjpIaO_CtVmXwoBW3fe26x_McCVwYMpH_JjRdv-szGyNrEn93LRI3O3EQBMW61N1Io1Oo18iOchriHJY0gTWsy7Y98JhTApiN9wkJE'
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
