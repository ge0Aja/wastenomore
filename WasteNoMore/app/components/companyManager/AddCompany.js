wimport React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,Picker, KeyboardAvoidingView, Button,ActivityIndicator,Image } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import ModalPicker from 'react-native-modal-picker';

export default class AddCompany extends Component{


    static navigationOptions = {
       drawerLabel: 'Company',
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
        companyName: '',
        establishmentDate:'',
        establishmentDateBeauty:'',
        annualSales:'',
        annualSalesList: [], //'5K - 10K','10K - 20K','25K - 50K','50K - 100K','>100K'
        companyType: '',
        companyTypeList: [],
        annualSalesSt:'',
        companyTypeSt:'',
        gotCompanyInfo:false,
        gotAnnualSalesList:false,
        gotCompanyTypesList:false,
        isDateTimePickerVisible: false
      }
    }

    componentDidMount() {
    this.getCompanyInfo();
    this.fetchDataAnnualSales();
    this.fetchDataCompanyTypes();
    }

    getCompanyInfo = () => {

      fetch('http://192.168.137.43:8000/api/getCompanyInfo', {
        headers: {
          'Accept': 'application/json',
          //  'Authorization': 'Bearer ' + TOKEN
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
            }else if(responseData.status == "new"){
              this.setState({gotCompanyInfo:true});
            }else if (responseData.status == "success"){
              console.log(responseData);
              this.setState({companyName:responseData.company_name,
                establishmentDate:responseData.establishment_date.date,
                annualSales:responseData.annual_sales,
                annualSalesSt:responseData.annual_sales_st,
                companyType:responseData.company_type,
                companyTypeSt:responseData.company_type_st,
                gotCompanyInfo:true}
               );

               this.setState({
                 establishmentDateBeauty:Moment(responseData.establishment_date.date).format('MMM-DD-YYYY')
               })
            }
          })
          .done();


    }

    fetchDataCompanyTypes =() => {

        //var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getCompanyTypesApi', {
        headers: {
          'Accept': 'application/json',
          //  'Authorization': 'Bearer ' + TOKEN
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
            //  console.log(responseData.types);
              this.setState({companyTypeList:responseData.types,gotCompanyTypesList:true});
            }
          })
          .done();

    }

    fetchDataAnnualSales = () => {
    //var TOKEN = await AsyncStorage.getItem('token');

    fetch('http://192.168.137.43:8000/api/getAnnualSalesApi', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
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
          //  console.log(responseData.ranges);
            this.setState({ annualSalesList:responseData.ranges,gotAnnualSalesList:true}); //isLoading: false,
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
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDMxNjI5NDgsImV4cCI6MTUwMzE2NjU0OH0.JLuY1GDbquZRN1NIFk81mcnn3knUAOrgMZ-vF1McPfzy05n2wdwaUMd0MqrzVMZtnTOdtu6_FpWYIi27HwvxP462fSRPPXtpkdv5-mr2XPicJOWlYnCWAYBRzjkKsSSyVLZ-QXDHaWx6-2f59Rw5di4ake2xTu9-TW4kjNPP8s4VyUAcg99zahB1hPhapeqoE1vs46Q-TF86ZUrAHJqHibSUEXDV0EB4rI3ifexwBj26kHtFPBb-FvS27aDlc2hW8iwitakNH069sgdCnOuYxethV_YfFWvtuypUYrQ2gfbBJ3u2fpP8ZCz842QFNRcc3fnTD8wfmV1sApr4-nmMPydNcCfH7tqPr0uIG0z0IgiqY5S3unQnlp-ZiBUMQBmc37oZ9-_zkQ6A4gFju09V9bqlOvGYLApj0viV6T-7wO8Q6ROh7t_tsg2ChOwwFo_v9M74QpwNq78m5QUHSevrkRXXHjneMpFN62perlGhyqkr-ONoaM0nTKlF1KQUe393CpblqDdNyxhs99IBy0ofjhctIwp0fy7jPboY0siFIGEhbw8Whb3TV3r_chzyi1JJLA_RczY-N4-1YS-2xfeKGeV_YpA605qEVQ7ZlkEqCXJbgG6G-mPasdStMg6yYTz0ol2Gs02Md1wYxTfIrK-kJ6qLxyPMwpPNcGzkzdrmUzA'},

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

if(this.state.gotAnnualSalesList && this.state.gotCompanyTypesList && this.state.gotCompanyInfo){
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

            <ModalPicker
              data={this.state.companyTypeList}
              initValue={"Choose Company Type"}
              onChange={(option) => {
                this.setState({companyType: option.key,companyTypeSt:option.label})
              }}>
              <TextInput
                style={styles.input}
                editable={false}
                value={this.state.companyTypeSt} />
            </ModalPicker>

            <Text style={styles.label}>
              Annual Sales Range:
            </Text>


            <ModalPicker
              data={this.state.annualSalesList}
              initValue={"Choose Annual Sales Range"}
              onChange={(option) => {
                this.setState({annualSales: option.key,annualSalesSt:option.label})
              }}>
              <TextInput
                style={styles.input}
                editable={false}
                value={this.state.annualSalesSt} />
            </ModalPicker>

            <View style={styles.buttonContainer}>
              <Button color="#841584" title="Submit" onPress={this._validateSubmitPress}></Button>
            </View>

          </View>
        );
      }else{
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
  },
  rowContainer:{
    flex:1,
    flexDirection:"row"
  },
  icon:{
    width: 24,
    height: 24,
  }
});
