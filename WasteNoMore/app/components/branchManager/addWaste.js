import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Alert, TextInput, Image, Button, Keyboard,ScrollView} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import Autocomplete from 'react-native-autocomplete-input';
import ModalPicker from 'react-native-modal-picker';

export default class addWaste extends Component {

  static navigationOptions = {
    drawerLabel: 'Add Waste',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('WasteNoMore/resources/icons/add-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(){
    super();

    this.state = {
      items: [],
      gotItems:false,
      query:'',
      selectedItem:'',
      itemUnits:[],
      selectedUnit:'',
      quantity:'',
      selectedUnitSt:'Choose Unit',
      wasteReasons:[],
      selectedReason:'',
      selectedReasonSt:'Choose Reason',
      isDateTimePickerVisible: false,
      wasteDate:'',
      wasteDateBeauty:'Choose Date',
      selectedCompany:'',
      selectedCompanySt:'Choose Collection Company',
      wasteCompanies:[],
      submitDisabled:false,

      itemError:'',
      unitError:'',
      reasonError:'',
      quantityError:'',
      dateError:'',
      companyError:'',

    }
  }

  resetErrorMessages = () => {
    this.setState({itemError:'',
    unitError:'',
    reasonError:'',
    quantityError:'',
    dateError:'',
    companyError:'',});
  }

  resetInputs = () => {

    this.setState({

      query:'',
      selectedItem:'',
      selectedUnit:'',
      quantity:'',
      selectedUnitSt:'Choose Unit',
      selectedReason:'',
      selectedReasonSt:'Choose Reason',
      isDateTimePickerVisible: false,
      wasteDate:'',
      wasteDateBeauty:'Choose Date',
      selectedCompany:'',
      selectedCompanySt:'Choose Collection Company',
    });
  }

  // renderSubCat(item)  {
  //   const { name } = item;
  //   return (
  //     <View>
  //       <Text style={styles.titleText}> {name}</Text>
  //     </View>
  //   );
  // }

  componentDidMount(){
    this.getSubCats();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ wasteDate: date });
    this.setState({wasteDateBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker();
  };

  getSubCats = async () => {

    try {
      var TOKEN = await AsyncStorage.getItem('token');
      //  'Authorization': 'Bearer ' + TOKEN

      fetch('https://murmuring-citadel-23511.herokuapp.com/api/getBranchWasteSubCats', {
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
          this.setState({gotItems:true,items:responseData.items,wasteReasons:responseData.reasons,wasteCompanies:responseData.companies});
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.log("Token Error");
    } finally {

    }
  }

  _validateSubmitPress = async () => {

    this.resetErrorMessages();

    var inputError = false ;

    if(this.state.selectedItem == '' || this.state.selectedItem == '0'){
      return Alert.alert('Choose Waste Type');
    }

    if(this.state.quantity == '' || this.state.quantity == '0'){
      this.setState({quantityError: 'Set Waste Quantity'})
      inputError = true;
    }


    if(this.state.selectedUnit == '' || this.state.selectedUnit == '0'){
      this.setState({unitError: 'Choose Unit'})
      inputError = true;
    }

    if(this.state.selectedReason == '' || this.state.selectedReason == '0'){
      this.setState({reasonError: 'Choose Waste Reason'})
      inputError = true;
    }

    if(this.state.selectedCompany == '' || this.state.selectedCompany == '0'){
      this.setState({companyError: 'Choose Waste Collection Company'})
      inputError = true;
    }

    if(this.state.wasteDate == ''){
      this.setState({dateError: 'Choose Waste Date'})
      inputError = true;
    }

    if(inputError)
    return;


    try {
      this.setState({  submitDisabled:true});

      var TOKEN = await AsyncStorage.getItem('token');

      fetch('https://murmuring-citadel-23511.herokuapp.com/api/addBranchWaste',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + TOKEN
        },

        body: JSON.stringify({
          "item": this.state.selectedItem,
          "unit": this.state.selectedUnit,
          "quantity": this.state.quantity,
          "reason": this.state.selectedReason,
          "company": this.state.selectedCompany,
          "date":this.state.wasteDate
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
      //  console.log(responseData);
      //  this.setState({  submitDisabled:false});
        if("message" in responseData){
          console.log(responseData.message);
        }
        if(responseData.status == "error"){
          console.log("error, reason:", responseData.reason);
          Alert.alert(
            'Error',
            responseData.reason,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }else if(responseData.status == "success"){
          alert("waste record added !");
          this.resetInputs();
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.log("Token Error");
    } finally {
      this.setState({submitDisabled:false});

    }
  }

  findSubCat(query){

    console.log(query);
    if(!query){
      return [];
    }
    const items = this.state.items;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return items.filter(item => item.name.search(regex) >= 0);
  }

  render(){
    if(!this.state.gotItems){
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={!this.state.gotItems}
            size={"large"}
            hidesWhenStopped={true}
          >
          </ActivityIndicator>

        </View>
        );
      }else{

        const query  = this.state.query;
        const items = this.findSubCat(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return(
          <ScrollView style={{flex:1,backgroundColor:'white'}}>

            <Autocomplete
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.autocompleteContainer}
              data={items.length === 1 && comp(query, items[0].name) ? [] : items}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text, selectedItem:0, itemUnits:[] ,  selectedUnitSt:'Choose Unit', selectedUnit:0})}
              placeholder="Enter Waste Type"
              renderItem={({ id, name, units }) => (
                <TouchableOpacity onPress={() => this.setState({ query: name, selectedItem:id, itemUnits: units }) }>
                  <Text style={styles.itemText}>
                    {name}
                  </Text>
                </TouchableOpacity>
              )}
            />


            <View style={[styles.descriptionContainer,{marginTop:85}]}>
              <TextInput
                style={styles.tinput}
                placeholder={"Quantity"}
                onChangeText={(text) => this.setState({quantity: text})}
                value = {this.state.quantity}
                keyboardType="numeric"

              >
              </TextInput>

              <Text style={styles.errorMessage}>
                {this.state.quantityError}
              </Text>

            </View>
            <View style={styles.descriptionContainer}>
              <ModalPicker
                data={this.state.itemUnits}
                initValue={"Choose Unit"}
                onChange={(option) => {
                  this.setState({selectedUnit: option.key,selectedUnitSt:option.label})
                }}>

                <TextInput
                  style={styles.tinput}
                  editable={false}
                  value={this.state.selectedUnitSt} />
              </ModalPicker>

              <Text style={styles.errorMessage}>
                {this.state.unitError}
              </Text>

            </View>

            <View style={styles.descriptionContainer}>
              <ModalPicker
                data={this.state.wasteReasons}
                initValue={"Choose Reason"}
                onChange={(option) => {
                  this.setState({selectedReason: option.key,selectedReasonSt:option.label})
                }}>

                <TextInput
                  style={styles.tinput}
                  editable={false}
                  value={this.state.selectedReasonSt} />
              </ModalPicker>

              <Text style={styles.errorMessage}>
                {this.state.reasonError}
              </Text>

            </View>

            <View style={styles.descriptionContainer}>
              <ModalPicker
                data={this.state.wasteCompanies}
                initValue={"Choose Collection Company"}
                onChange={(option) => {
                  this.setState({selectedCompany: option.key,selectedCompanySt:option.label})
                }}>

                <TextInput
                  style={styles.tinput}
                  editable={false}
                  value={this.state.selectedCompanySt} />
              </ModalPicker>

              <Text style={styles.errorMessage}>
                {this.state.companyError}
              </Text>

            </View>

            <View style={styles.descriptionContainer}>

              <TextInput style={styles.tinput}
                onFocus={() => {Keyboard.dismiss();this._showDateTimePicker();}}
                placeholder={"Waste Date"}
                value = {this.state.wasteDateBeauty}
              >
              </TextInput>

              <Text style={styles.errorMessage}>
                {this.state.dateError}
              </Text>

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                date ={new Date()}
                mode="date"
              />
            </View>
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
                backgroundColor: 'white',
                flex: 1,
                paddingTop: 25,
                alignItems:'center'
              },
              autocompleteContainer: {
                flex: 1,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
                marginTop:25,

                //alignItems:'center'
              },
              itemText: {
                fontSize: 20,
                fontWeight: '500',
                margin: 2,
                marginBottom: 5,
                marginTop: 5,
              },
              descriptionContainer: {
                // `backgroundColor` needs to be set otherwise the
                // autocomplete input will disappear on text input.
                backgroundColor: 'white',
                alignItems: 'center',
                alignSelf:'center'
                //  marginTop: 20
              },
              titleText: {
                fontSize: 18,
                fontWeight: '500',
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
              },
              directorText: {
                color: 'grey',
                fontSize: 12,
                marginBottom: 10,
                textAlign: 'center'
              },
              openingText: {
                textAlign: 'center'
              },
              tinput: {
                padding: 4,
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                margin:10,
                width: 200,
              },
              pick:{
                width: 150,
              },
              buttonContainer:{
                margin: 20,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                alignSelf:'center'
              },
              errorMessage:{
                alignSelf:'center',
                fontSize: 10,
                color: 'red',
              },
              icon: {
                width: 24,
                height: 24,
              }
            });
