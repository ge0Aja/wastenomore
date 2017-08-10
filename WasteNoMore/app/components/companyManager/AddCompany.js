import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,Picker, KeyboardAvoidingView, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

export default class AddCompany extends Component{


    constructor(){
      super();
      this.state = {
        companyName: '',
        establishmentDate:'',
        establishmentDateBeauty:'',
        annualSales:'',
        annualSalesList: [], //'5K - 10K','10K - 20K','25K - 50K','50K - 100K','>100K'
        companyType: '',
        companyTypeList: [],
      //  isLoading: false,
        isDateTimePickerVisible: false
      }
    }

    componentDidMount() {
    this.fetchDataAnnualSales();
    this.fetchDataCompanyTypes();
    }

    fetchDataCompanyTypes(){

        //var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getCompanyTypesApi', {
        headers: {
          'Accept': 'application/json',
          //  'Authorization': 'Bearer ' + TOKEN
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhc2Rhc2Rhc2R3YXNkdzExMTEiLCJpYXQiOjE1MDE3NzU0OTcsImV4cCI6MTUwMTc3OTA5N30.rbtrmXoTNclkIQRB6ZnJoJIB1n_o5sjnUAK4KylCS707fgsFPtI_pDbxKC-DkkEGIJJY0CWKw9oCTc2VIQQbb-8ifW4e4O1Sc57Dcuf-N4-F-1fR6xSscGC6nyN0fOH2XyoCvVaaycr2oOgT5Y-KE-5ItHLXcq4pCN1veueW9Amjj_R8u3XQQip6bQ26p101dkWkr59EVAyB5SqQmEu39KsbU2ddXd9CRZa3HXA9TJwW5wQfPkAI2BU4jnFPjPLM9CswBMSmNqxwLv7sWKjJ79PqomTIHqPR789rhkzgmY8yNYiaLRGVOHCgH1a5ioC2R7OzbcxK2ABmFTfy86ByYSHEx77Fx9BCqKuDuICCGf9W4YmgCzMPTySYsfzoS5MrwSe5hu5L0TrQvivmCk-jkss_n003O_yu18-SYUuhbeaLmFgUot8muC4nfJmobhkNe2kZAeNY3O-JDqxJrBkb5uJvdbvlWgYdOYmkbwLnAaxO86-5hxEzKFpMyXy-30dLunqpIiBCEZbWv11Q2gDEPOhgyF5rlqzQBoDLB_FsyaH_X7sDqKon07d-kZgFeZ-t6DWp28iDID2SJq8mkfh01nYfFrT9YVE3SqbSt_mQckcaVx-nfSxTL2nm6iRzYXH4xs3ky8owIX67SVOqQkQoPYW7AxpSVYpCGgCbJ_rU1Sg'
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
              console.log(responseData.types);
              this.setState({companyTypeList:responseData.types});
            }
          })
          .done();

    }

    fetchDataAnnualSales() {

    //var TOKEN = await AsyncStorage.getItem('token');

    fetch('http://192.168.137.43:8000/api/getAnnualSalesApi', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhc2Rhc2Rhc2R3YXNkdzExMTEiLCJpYXQiOjE1MDE3NzU0OTcsImV4cCI6MTUwMTc3OTA5N30.rbtrmXoTNclkIQRB6ZnJoJIB1n_o5sjnUAK4KylCS707fgsFPtI_pDbxKC-DkkEGIJJY0CWKw9oCTc2VIQQbb-8ifW4e4O1Sc57Dcuf-N4-F-1fR6xSscGC6nyN0fOH2XyoCvVaaycr2oOgT5Y-KE-5ItHLXcq4pCN1veueW9Amjj_R8u3XQQip6bQ26p101dkWkr59EVAyB5SqQmEu39KsbU2ddXd9CRZa3HXA9TJwW5wQfPkAI2BU4jnFPjPLM9CswBMSmNqxwLv7sWKjJ79PqomTIHqPR789rhkzgmY8yNYiaLRGVOHCgH1a5ioC2R7OzbcxK2ABmFTfy86ByYSHEx77Fx9BCqKuDuICCGf9W4YmgCzMPTySYsfzoS5MrwSe5hu5L0TrQvivmCk-jkss_n003O_yu18-SYUuhbeaLmFgUot8muC4nfJmobhkNe2kZAeNY3O-JDqxJrBkb5uJvdbvlWgYdOYmkbwLnAaxO86-5hxEzKFpMyXy-30dLunqpIiBCEZbWv11Q2gDEPOhgyF5rlqzQBoDLB_FsyaH_X7sDqKon07d-kZgFeZ-t6DWp28iDID2SJq8mkfh01nYfFrT9YVE3SqbSt_mQckcaVx-nfSxTL2nm6iRzYXH4xs3ky8owIX67SVOqQkQoPYW7AxpSVYpCGgCbJ_rU1Sg'
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
            console.log(responseData.ranges);
            this.setState({ annualSalesList:responseData.ranges}); //isLoading: false,
          }
        })
        .done();
  }

  _validateSubmitPress = () => {

    if(this.state.companyName == '') return alert('Please Insert Company Name');

    if(this.state.establishmentDate == '') return alert('Please Choose Establishment Date');

    if(this.state.companyType == '' || this.state.companyType == '0') return alert('Please Choose Company Type');

    if(this.state.annualSales == '' || this.state.annualSales == '0') return alert('Please Choose Annual Sales Range');


      //var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/newCompanyRecord',{
        method: 'POST',
        headers: {
          //  'Authorization': 'Bearer ' + TOKEN
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhc2Rhc2Rhc2R3YXNkdzExMTEiLCJpYXQiOjE1MDE3NzU0OTcsImV4cCI6MTUwMTc3OTA5N30.rbtrmXoTNclkIQRB6ZnJoJIB1n_o5sjnUAK4KylCS707fgsFPtI_pDbxKC-DkkEGIJJY0CWKw9oCTc2VIQQbb-8ifW4e4O1Sc57Dcuf-N4-F-1fR6xSscGC6nyN0fOH2XyoCvVaaycr2oOgT5Y-KE-5ItHLXcq4pCN1veueW9Amjj_R8u3XQQip6bQ26p101dkWkr59EVAyB5SqQmEu39KsbU2ddXd9CRZa3HXA9TJwW5wQfPkAI2BU4jnFPjPLM9CswBMSmNqxwLv7sWKjJ79PqomTIHqPR789rhkzgmY8yNYiaLRGVOHCgH1a5ioC2R7OzbcxK2ABmFTfy86ByYSHEx77Fx9BCqKuDuICCGf9W4YmgCzMPTySYsfzoS5MrwSe5hu5L0TrQvivmCk-jkss_n003O_yu18-SYUuhbeaLmFgUot8muC4nfJmobhkNe2kZAeNY3O-JDqxJrBkb5uJvdbvlWgYdOYmkbwLnAaxO86-5hxEzKFpMyXy-30dLunqpIiBCEZbWv11Q2gDEPOhgyF5rlqzQBoDLB_FsyaH_X7sDqKon07d-kZgFeZ-t6DWp28iDID2SJq8mkfh01nYfFrT9YVE3SqbSt_mQckcaVx-nfSxTL2nm6iRzYXH4xs3ky8owIX67SVOqQkQoPYW7AxpSVYpCGgCbJ_rU1Sg'},

          body: JSON.stringify({
            "company_name": this.state.companyName,
            "est_date": this.state.establishmentDate,
            "company_type": this.state.companyType,
            "annual_sales": this.state.annualSales,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {

          if("message" in responseData){
                console.log(responseData.message);
          }
          if(responseData.status == "error"){
              console.log("error, reason:", responseData.reason);
          }else if(responseData.status == "success"){
            alert("Company is added Successfully");

          }
        })
        .done();
  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ establishmentDate: date });
    this.setState({establishmentDateBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker();
  };


  render(){

      return(

          <View behavior="padding" style={styles.container}>
            <Text style={styles.label}>
              Company Name:
            </Text>
            <TextInput style={styles.input} placeholder="Company Name"
              onSubmitEditing={(event) => {
                this.refs.SecondInput.focus();
              }}
              returnKeyType = {"next"}
              onChangeText={(text) => this.setState({companyName: text})}
              value = {this.state.companyName}>

            </TextInput>

            <Text style={styles.label}>
              Establishment Date:
            </Text>
            <TextInput style={styles.input}
              ref='SecondInput'
              onFocus={this._showDateTimePicker}
              value = {this.state.establishmentDateBeauty}
            ></TextInput>


            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode="date"
            />

            <Text style={styles.label}>
              Company Type:
            </Text>
            <Picker
              selectedValue={this.state.companyType}
              style={styles.pick}
              onValueChange={(itemValue) => this.setState({companyType: itemValue})}>
              <Picker.Item key={0} value={"0"} label={"Choose Company Type"} />
              {this.state.companyTypeList.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
              })}
            </Picker>

            <Text style={styles.label}>
              Annual Sales Range:
            </Text>
            <Picker
              selectedValue={this.state.annualSales}
              style={styles.pick}
              onValueChange={(itemValue) => this.setState({annualSales: itemValue})}>
              <Picker.Item key={"0"} value={"0"} label={"Choose Annual Sales"} />
              {this.state.annualSalesList.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
              })}
            </Picker>

            <View style={styles.buttonContainer}>
              <Button color="#841584" title="Submit" onPress={this._validateSubmitPress}></Button>
            </View>

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

  pick:{
      width: 150,
        },

  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'center'
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
