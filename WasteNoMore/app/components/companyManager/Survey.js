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
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      if(!this.attrExist){
          console.log('called getattrs again');
          this._getQuestions();
        }
    }

    _validateSubmitPress = () => {


    }


    _getQuestions = () => {

      fetch('http://192.168.137.43:8000/api/generateQs', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMzMjg1NTAsImV4cCI6MTUwMzMzMjE1MH0.egekQWFbRucq5wBLd4Wo6A4D0QUZxtzcWD-x_W6tPz0uxL9dnGD2IfxOKhEk2MP1_0yb-n-GdiG_RCPPgwIy3IojTcsun0Rk32I-WGqGLJAe75vTsfRx3nLL-vfSW68eUIjMwqH_ItetLbVt1t03iWt-X1w7Rnk6jABL87BvWbJqO12K7ConXXk39pXOm-N9zTjSqrctClm5yKnhXOS5jXHNGanX_u7P4bjA6SAdme_prZoWVBQulYMuaRCuSmdgSc3yutj7gPn5d-CEfpBuaKED--jeHK1cX6sjTJVim0zHG6ts7YjDOWCsIPecYNR27kSvxs59jhsZ7FZ7CCmWLLeS6yHfePijFZdKrIXX8DbCx-GEaHC5FJCm4UDQ7SFpCv_U7K81anE_WTf2LJ55kdfVsdvR0U8O01Yc4CeLrDqR5rFe32eC8Ux_5hAsF5YIzUN8837hPvDGuyA0Oc_Wzlm7Y0J6b-pY7QM-vxd5786wLRkGVml2ojxV58ySmuAogLoA2DVajxmG-FjdlYUFM6pEhV9Xb35B_BxXeuEeUC7jw0lM9if3s2eQ02aRPXQu8IVTBbjpIaO_CtVmXwoBW3fe26x_McCVwYMpH_JjRdv-szGyNrEn93LRI3O3EQBMW61N1Io1Oo18iOchriHJY0gTWsy7Y98JhTApiN9wkJE'
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData);
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
              newState[`DD${a.qid}`] ='';
              newState[`DDT${a.qid}`] ='Choose Option';
            }
          })
          newState['qExist'] = true;
          newState['comps'] = this.state.comps;
          this.setState(newState);

          console.log(this.state);
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
                this.setState({[`DD${a.qid}`]: option.key,[`DDT${a.qid}`]: option.label})
              }}
            >
              <TextInput
                style={styles.pinput}
                editable={false}
                value={this.state[`DDT${a.qid}`]} />

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
    //  alignSelf: 'center'
    },
    pinput: {
      padding: 4,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      margin: 15,
      width: 200,
    //  alignSelf: 'center'
    },
});
