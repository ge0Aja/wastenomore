import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Alert, TextInput, Image, Button, Keyboard} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import Autocomplete from 'react-native-autocomplete-input';
import ModalPicker from 'react-native-modal-picker';

export default class addWaste extends Component {

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
      wasteCompanies:[]

    }
  }

 renderSubCat(item)  {
   const { name } = item;
   return (
     <View>
       <Text style={styles.titleText}> {name}</Text>
     </View>
   );
 }

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

  getSubCats = () => {

    //var TOKEN = await AsyncStorage.getItem('token');
    //  'Authorization': 'Bearer ' + TOKEN

      fetch('http://192.168.137.43:8000/api/getBranchSubCats', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9icmFuY2giLCJpYXQiOjE1MDM0MTM5OTQsImV4cCI6MTUwMzQxNzU5NH0.B9__vHBi9F5l1nE373a75iXkZrlsEmwvdc7bqdCVkgKDVT_ybrCk25DPUHwFVVnn1vI2G2FFht0g58ALaNdDVG6zZErCV9khMSr2oHbtdHetc9nf0k-ZLj_I58k75EkV04DKA2tygBgBb469lMYjtqlENc3_RPx_xNw4_2xtlsPIL0xPKMhCrX9EMRD4N9-b7B3jPVWW6T5x6_N9QldlEkq0TIJHrU6K7j4eam_JlnCSftbUGh3ajz1S0YQ0rcPXXJzUgAUZqDN5tdjz6Z1tVDdt1_LQkMvqwSgMjQ82OztGJnKKTsRDJZf1EbzED37fRCukXgxyKdBFoarM0rv3V_2HbRoj06TZdPLnbw8_n11-0SOvtFfFpJFXguwNkMo2k4rGZDtnrz2bJz7FdOY8bugzFrGsOLCfn0V0LTsaoGwbCu-yPGfnTLZS90UTDAodC1a-Tn9e-ukFztdqwFuy8Jt2FspZPK_wa2ZL7gOe7rtgKsyeWFyXWFRUQnm9eAD-Sx9dshR0HwDtyTSIkbBZz_MagQNaY26fE5u0_l1vXdOBltnRHGhtIEt6sjLb9_Zo9u_66Udmqw0-L9ntpiatD1TjDI_H2tnUBnYoNMn80xjVnxP6Qmlv54gAyaebV4XN0LVKZ5i32o3l7QNOUwP3OBr-lr1oirbivKGKn0R_Lp0'
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

  }

  _validateSubmitPress = () => {

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
              animating={!this.state.attrExist}
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
          <View style={styles.container}>
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
            <View style={styles.descriptionContainer}>
              <TextInput
                style={styles.tinput}
                placeholder={"Quantity"}
                onChangeText={(text) => this.setState({quantity: text})}
                value = {this.state.quantity}
                keyboardType={'numeric'}
              >
              </TextInput>
            </View>
            <View style={[styles.descriptionContainer,{marginTop:-10}]}>
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

            </View>

            <View style={[styles.descriptionContainer,{marginTop:-10}]}>
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

            </View>

            <View style={[styles.descriptionContainer,{marginTop:-10}]}>
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
              
            </View>


            <View>

              <TextInput style={styles.tinput}
                onFocus={() => {Keyboard.dismiss();this._showDateTimePicker();}}
                value = {this.state.wasteDateBeauty}
              >

              </TextInput>

              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="date"
              />
            </View>
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
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 25,
    alignItems:'center'
  },
  autocompleteContainer: {
  //  flex: 1,
    left: 105,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    marginTop:25,
    width:200,
    height:50,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: 'white',
    marginTop: 50
  },
  infoText: {
    textAlign: 'center',
    marginTop:75
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
    margin:15,
    marginTop:25,
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
  }
});
