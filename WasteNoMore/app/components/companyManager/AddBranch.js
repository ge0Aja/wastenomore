import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Picker,Alert, Modal, Dimensions, ListView, TextInput,Keyboard,TouchableHighlight, Switch} from 'react-native';

import demoData from './demoBranchData.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

export default class AddBranch extends Component {


  constructor(){
    super();

    var {height, width} = Dimensions.get('window');
    this.state = {
      branchLocation:'',
      branchStaffCount:'',
      branchOpeningDate:'',
      branches:[],
      gotBranches:false,
      branchesExist:false,
      modalVisible: false,
      modalBackgroundWidth:width,
      modalBackgroundHeight:height,
      locationList:[],
      gotLocations:false,
      isDateTimePickerVisible: false,
      branchOpeningDateBeauty:'',
      modal2Visible: false,
      branchData:[],
      dataSource:[],
      branchLocationEdit:'',
      branchStaffCountEdit:'',
      branchOpeningDateEdit:'',
      branchOpeningDateEditBeauty:'',
      mainBranchAdd:false,
      mainBranchEdit:false,
      branchIdEdit:'',
      listCurrentRowIndex:'',
      branchAddressEdit:'',
      branchAddress:''
    }
      this.getBranches = this.getBranches.bind(this);
      this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {
    this.getBranches();
    this.getLocations();
  }

  _setMainBranch(value){
    this.setState({mainBranchAdd:value})
  }

  _setMainBranchEdit(value){
    this.setState({mainBranchEdit:value})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModal2Visible(visible) {
    this.setState({modal2Visible: visible});
  }

  _resetModal(){

    this.setState({
      branchLocation:'',
      branchStaffCount:'',
      branchOpeningDate:'',
      branchAddress:'',
      mainBranchAdd:false
    });
    this.setModalVisible(false);
  }


  _resetModal2(){

    this.setState({
      branchLocationEdit:'',
      branchStaffCountEdit:'',
      branchOpeningDateEdit:'',
      mainBranchEdit:false,
      branchAddressEdit:'',
      listCurrentRowIndex:''
    });
    this.setModal2Visible(false);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ branchOpeningDate: date });
    this.setState({branchOpeningDateBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker();
  };

  _handleDatePicked2 = (date) => {
    console.log('A date has been picked: ', date);
    console.log('The formatted date is: ', Moment(date).format('MMM-DD-YYYY'));
    this.setState({ branchOpeningDateEdit: date });
    this.setState({branchOpeningDateEditBeauty: Moment(date).format('MMM-DD-YYYY')});
    this._hideDateTimePicker();
  };

  handelBranchAdd = () => {

    if(this.state.branchStaffCount == '') return alert('Please Insert Staff Count');

    if(this.state.branchOpeningDate == '') return alert('Please Choose An Opening Date');

    if(this.state.branchLocation == '' || this.state.branchLocationEdit == '0') return alert('Please Choose A Location');

    if(this.state.branchAddress == '') return alert('Please Insert Address');

        //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/newCompanyBranch',{
      method: 'POST',
      headers: {
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIyMDIxMDMsImV4cCI6MTUwMjIwNTcwM30.D_8ngPFTtm07qwxoekPDR9pq8lGsNbSafLox3a6ecAH2qGFsMPbOUY1jVos-TFSsvOOJXOHy5_l9JMHk1I9rXObR6NA_G3lSq5VgWxNQ1mMfD8W-zCW-7Pn2qgFnZqv4FPJ65ezirfwmdbCpbCVZnfBQjQWA0bcCgtvzUSfZGkVh8tKvVZcACUc7scJB-zcBwc_ugb6LSBzdv6lI-CtkXobkg-AHkz67tyENv9w2iZE0XbxIuc0_QEkZTOrsAz1I9A5NKrK0WTnM7DLBHtVLofPf44xy0RRAfSQvE3KcUxJXL3uuZF5yxxrZvEciObIC9LZ0atuxnlR2UpyagiR-hfbFHw77MacOLoBqL2ByP53uODq5h0BAMLdtNKm2-N8vwLicaeBly-vxbqPmBNeex8GNB_Z3T3LQP5qfzuBH0U3EvTV5UUm3NM7uwJmXhz6-BZM0ZZbFElSImpUn_L35DatPWHiy0Eqb0hEBM4RH0gbwKluN4XruakgXko73xprjnizjMRETJSTXteP_3oVbUJZqmd6x-zIkPM5COnhpR8zry-iPDqO2TF8OaUgMCQzT17e4V-nzy89KNBp62pN294UrlOj2gAS9Qtiz5gJaAqr_uNjY4yE9KMzj40aqcYlE_b819lFS6s3FjPbHRskHqQdlx5O9vA8Poxy7kIf0pj4'},

        body: JSON.stringify({
          "staff_count": this.state.branchStaffCount,
          "opening_date": this.state.branchOpeningDate,
          "location": this.state.branchLocation,
          "address": this.state.branchAddress,
          "main_branch": this.state.mainBranchAdd,
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
        //  alert("Branch is added Successfully");


          this._resetModal();
          this.getBranches();
        }
      })
      .done();
  }

  handelBranchEdit = () => {

    if(this.state.branchStaffCountEdit == '') return alert('Please Insert Staff Count');

    if(this.state.branchOpeningDateEdit == '') return alert('Please Choose An Opening Date');

    if(this.state.branchLocationEdit == '' || this.state.branchLocationEdit == '0') return alert('Please Choose A Location');

    if(this.state.branchAddressEdit == '') return alert('Please Insert Address');
    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/editBranchBasicInfo',{
      method: 'POST',
      headers: {
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIyMDIxMDMsImV4cCI6MTUwMjIwNTcwM30.D_8ngPFTtm07qwxoekPDR9pq8lGsNbSafLox3a6ecAH2qGFsMPbOUY1jVos-TFSsvOOJXOHy5_l9JMHk1I9rXObR6NA_G3lSq5VgWxNQ1mMfD8W-zCW-7Pn2qgFnZqv4FPJ65ezirfwmdbCpbCVZnfBQjQWA0bcCgtvzUSfZGkVh8tKvVZcACUc7scJB-zcBwc_ugb6LSBzdv6lI-CtkXobkg-AHkz67tyENv9w2iZE0XbxIuc0_QEkZTOrsAz1I9A5NKrK0WTnM7DLBHtVLofPf44xy0RRAfSQvE3KcUxJXL3uuZF5yxxrZvEciObIC9LZ0atuxnlR2UpyagiR-hfbFHw77MacOLoBqL2ByP53uODq5h0BAMLdtNKm2-N8vwLicaeBly-vxbqPmBNeex8GNB_Z3T3LQP5qfzuBH0U3EvTV5UUm3NM7uwJmXhz6-BZM0ZZbFElSImpUn_L35DatPWHiy0Eqb0hEBM4RH0gbwKluN4XruakgXko73xprjnizjMRETJSTXteP_3oVbUJZqmd6x-zIkPM5COnhpR8zry-iPDqO2TF8OaUgMCQzT17e4V-nzy89KNBp62pN294UrlOj2gAS9Qtiz5gJaAqr_uNjY4yE9KMzj40aqcYlE_b819lFS6s3FjPbHRskHqQdlx5O9vA8Poxy7kIf0pj4'},

        body: JSON.stringify({
          "staff_count": this.state.branchStaffCountEdit,
          "opening_date": this.state.branchOpeningDateEdit,
          "location": this.state.branchLocationEdit,
          "address": this.state.branchAddressEdit,
          "main_branch": this.state.mainBranchEdit,
          "branch":this.state.branchIdEdit
          })
      })
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData);
        if("message" in responseData){
              console.log(responseData.message);
        }
        if(responseData.status == "error"){
            console.log("error, reason:", responseData.reason);
        }else if(responseData.status == "success"){
        //  alert("Branch is Edited  Successfully");

          this._resetModal2();
          this.getBranches();
          //  update the list of branches to indicate the main branch
        }
      })
      .done();
  }

  handleBranchDeleteAction =() => {

    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/deleteBranchApi',{
      method: 'POST',
      headers: {
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIyMDIxMDMsImV4cCI6MTUwMjIwNTcwM30.D_8ngPFTtm07qwxoekPDR9pq8lGsNbSafLox3a6ecAH2qGFsMPbOUY1jVos-TFSsvOOJXOHy5_l9JMHk1I9rXObR6NA_G3lSq5VgWxNQ1mMfD8W-zCW-7Pn2qgFnZqv4FPJ65ezirfwmdbCpbCVZnfBQjQWA0bcCgtvzUSfZGkVh8tKvVZcACUc7scJB-zcBwc_ugb6LSBzdv6lI-CtkXobkg-AHkz67tyENv9w2iZE0XbxIuc0_QEkZTOrsAz1I9A5NKrK0WTnM7DLBHtVLofPf44xy0RRAfSQvE3KcUxJXL3uuZF5yxxrZvEciObIC9LZ0atuxnlR2UpyagiR-hfbFHw77MacOLoBqL2ByP53uODq5h0BAMLdtNKm2-N8vwLicaeBly-vxbqPmBNeex8GNB_Z3T3LQP5qfzuBH0U3EvTV5UUm3NM7uwJmXhz6-BZM0ZZbFElSImpUn_L35DatPWHiy0Eqb0hEBM4RH0gbwKluN4XruakgXko73xprjnizjMRETJSTXteP_3oVbUJZqmd6x-zIkPM5COnhpR8zry-iPDqO2TF8OaUgMCQzT17e4V-nzy89KNBp62pN294UrlOj2gAS9Qtiz5gJaAqr_uNjY4yE9KMzj40aqcYlE_b819lFS6s3FjPbHRskHqQdlx5O9vA8Poxy7kIf0pj4'},

        body: JSON.stringify({
          "branch":this.state.branchIdEdit
          })
      })
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData);
        if("message" in responseData){
              console.log(responseData.message);
        }
        if(responseData.status == "error"){
            console.log("error, reason:", responseData.reason);
        }else if(responseData.status == "success"){
          //alert("Branch is Deleted  Successfully");

          this._resetModal2();
          this.getBranches();
        }
      })
      .done();



  }

  handelBranchDelete = () => {
    Alert.alert(
    'Delete Branch',
    'Are You Sure?',
    [
    //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Delete', onPress: () => this.handleBranchDeleteAction()},
    ],
    { cancelable: false }
  )
  }

  _renderRow(rowData, sectionID, rowID) { //rowData: Object, sectionID: number, rowID: number
    if(rowData.mainBranch == true){
      return (
        <View style={{padding:5}}>
          <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' onPress={ () => {this._onPressRow(rowData,rowID)}}>
            <View >
              <Text style={styles.listTextLarge}>{rowData.location}/{rowData.location_district}/{rowData.location_governorate}</Text>
              <Text style={styles.listTextSmall}>(Main Branch)</Text>
              <Text style={styles.listTextSmall}>Address: {rowData.address}</Text>
              <Text style={styles.listTextSmall}>Staff Count: {rowData.staff_count}</Text>
              <Text style={styles.listTextSmall}>Opening Date: {Moment(rowData.opening_date.date).format('MMM-DD-YYYY')}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }else{
     return (
       <View style={{padding:5}}>
         <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' onPress={ () => {this._onPressRow(rowData,rowID)}}>
           <View >
             <Text style={styles.listTextLarge}>{rowData.location}/{rowData.location_district}/{rowData.location_governorate}</Text>
             <Text style={styles.listTextSmall}>Address: {rowData.address}</Text>
             <Text style={styles.listTextSmall}>Staff Count: {rowData.staff_count}</Text>
             <Text style={styles.listTextSmall}>Opening Date: {Moment(rowData.opening_date.date).format('MMM-DD-YYYY')}</Text>
           </View>
         </TouchableHighlight>
       </View>
     );
   }
  }

  _onPressRow = (rowData,rowID) => {
    this.setState({
      branchLocationEdit:rowData.location+"/"+rowData.location_district+"/"+rowData.location_governorate,
      branchAddressEdit:rowData.address,
      branchStaffCountEdit:String(rowData.staff_count),
      mainBranchEdit: rowData.mainBranch ,
      branchIdEdit:rowData.BranchId,
      listCurrentRowIndex:rowID
    });
    this.setState({branchOpeningDateEditBeauty: Moment(rowData.opening_date.date).format('MMM-DD-YYYY')});
    this.setModal2Visible(true);
  };

  getBranches(){
      this.setState({gotBranches:false});
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getCompanyBranches', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIyMDIxMDMsImV4cCI6MTUwMjIwNTcwM30.D_8ngPFTtm07qwxoekPDR9pq8lGsNbSafLox3a6ecAH2qGFsMPbOUY1jVos-TFSsvOOJXOHy5_l9JMHk1I9rXObR6NA_G3lSq5VgWxNQ1mMfD8W-zCW-7Pn2qgFnZqv4FPJ65ezirfwmdbCpbCVZnfBQjQWA0bcCgtvzUSfZGkVh8tKvVZcACUc7scJB-zcBwc_ugb6LSBzdv6lI-CtkXobkg-AHkz67tyENv9w2iZE0XbxIuc0_QEkZTOrsAz1I9A5NKrK0WTnM7DLBHtVLofPf44xy0RRAfSQvE3KcUxJXL3uuZF5yxxrZvEciObIC9LZ0atuxnlR2UpyagiR-hfbFHw77MacOLoBqL2ByP53uODq5h0BAMLdtNKm2-N8vwLicaeBly-vxbqPmBNeex8GNB_Z3T3LQP5qfzuBH0U3EvTV5UUm3NM7uwJmXhz6-BZM0ZZbFElSImpUn_L35DatPWHiy0Eqb0hEBM4RH0gbwKluN4XruakgXko73xprjnizjMRETJSTXteP_3oVbUJZqmd6x-zIkPM5COnhpR8zry-iPDqO2TF8OaUgMCQzT17e4V-nzy89KNBp62pN294UrlOj2gAS9Qtiz5gJaAqr_uNjY4yE9KMzj40aqcYlE_b819lFS6s3FjPbHRskHqQdlx5O9vA8Poxy7kIf0pj4'
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
            this.setState({ branchData:responseData.branches,dataSource: ds.cloneWithRows(responseData.branches), gotBranches:true}); //isLoading: false,
          }
        })
        .done();
  }

  getLocations(){
    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getLocations', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIyMDIxMDMsImV4cCI6MTUwMjIwNTcwM30.D_8ngPFTtm07qwxoekPDR9pq8lGsNbSafLox3a6ecAH2qGFsMPbOUY1jVos-TFSsvOOJXOHy5_l9JMHk1I9rXObR6NA_G3lSq5VgWxNQ1mMfD8W-zCW-7Pn2qgFnZqv4FPJ65ezirfwmdbCpbCVZnfBQjQWA0bcCgtvzUSfZGkVh8tKvVZcACUc7scJB-zcBwc_ugb6LSBzdv6lI-CtkXobkg-AHkz67tyENv9w2iZE0XbxIuc0_QEkZTOrsAz1I9A5NKrK0WTnM7DLBHtVLofPf44xy0RRAfSQvE3KcUxJXL3uuZF5yxxrZvEciObIC9LZ0atuxnlR2UpyagiR-hfbFHw77MacOLoBqL2ByP53uODq5h0BAMLdtNKm2-N8vwLicaeBly-vxbqPmBNeex8GNB_Z3T3LQP5qfzuBH0U3EvTV5UUm3NM7uwJmXhz6-BZM0ZZbFElSImpUn_L35DatPWHiy0Eqb0hEBM4RH0gbwKluN4XruakgXko73xprjnizjMRETJSTXteP_3oVbUJZqmd6x-zIkPM5COnhpR8zry-iPDqO2TF8OaUgMCQzT17e4V-nzy89KNBp62pN294UrlOj2gAS9Qtiz5gJaAqr_uNjY4yE9KMzj40aqcYlE_b819lFS6s3FjPbHRskHqQdlx5O9vA8Poxy7kIf0pj4'
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
            this.setState({ locationList:responseData.location, gotLocations:true}); //isLoading: false,
          }
        })
        .done();
  }

  static navigationOptions = {
     drawerLabel: 'Add Branch',
     drawerIcon: ({ tintColor }) => (
       <Image
         source={require('WasteNoMore/resources/icons/add-icon.png')}
         style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
   };

  render(){
    if(this.state.gotBranches && this.state.gotLocations){
    return(
      <View style={styles.container}>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._resetModal()}}
        >
          <View style={[styles.darkBackgroundModal, {width:this.state.modalBackgroundWidth, height:this.state.modalBackgroundHeight}]}>

            <View style={styles.lightBackgroundModal}>
              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>Location:</Text>
                <Picker style={styles.pick}
                  selectedValue={this.state.branchLocation}
                  onValueChange={(itemValue) => this.setState({branchLocation: itemValue})}
                >
                  <Picker.Item key={0} value={"0"} label={"Choose Location"}  />
                  {
                    this.state.locationList.map( (s, i) => {
                      return <Picker.Item key={i} value={s.city+"/"+s.district+"/"+s.governorate} label={s.city+"/"+s.district+"/"+s.governorate} />
                    })
                  }
                </Picker>
              </View>
              <View style={styles.modalLines}>
                <Text>Address</Text>
                <TextInput style={styles.tinput} value={this.state.branchAddress}
                  ref='SecondInput'
                  onSubmitEditing={(event) => {
                    this.refs.ThirdInput.focus();
                  }}
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({branchAddress: text})}
                ></TextInput>
              </View>
              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Staff Count
                </Text>
                <TextInput style={styles.tinput}
                  ref='ThirdInput'
                  onSubmitEditing={(event) => {
                    this.refs.ForthInput.focus();
                  }}
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({branchStaffCount: text})}
                  value = {this.state.branchStaffCount}
                >
                </TextInput>
              </View>

              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Opening Date
                </Text>
                <TextInput style={styles.tinput}
                  ref='ForthInput'
                  onFocus={() => {Keyboard.dismiss();this._showDateTimePicker();}}
                  value = {this.state.branchOpeningDateBeauty}
                >

                </TextInput>
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="date"
              />
              <View style={styles.modalLines}>
                <Text>
                  Main Branch
                </Text>
                <Switch value={this.state.mainBranchAdd} onValueChange={(value) => {this._setMainBranch(value);}}>

                </Switch>
              </View>
              <TouchableOpacity style={styles.addBranchInner} onPress={this.handelBranchAdd}>
                <Text style={{color:'darkviolet'}}>
                  Add Branch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modal2Visible}
          onRequestClose={() => {this._resetModal2()}}
        >

          <View style={[styles.darkBackgroundModal, {width:this.state.modalBackgroundWidth, height:this.state.modalBackgroundHeight}]}>

            <View style={styles.lightBackgroundModal}>
              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>Location:</Text>
                <Picker style={styles.pick}
                  selectedValue={this.state.branchLocationEdit}
                  onValueChange={(itemValue) => this.setState({branchLocationEdit: itemValue})}
                >
                  <Picker.Item key={0} value={"0"} label={"Choose Location"}  />
                  {
                    this.state.locationList.map( (s, i) => {
                      return <Picker.Item key={i} value={s.city+"/"+s.district+"/"+s.governorate} label={s.city+"/"+s.district+"/"+s.governorate} />
                    })
                  }
                </Picker>
              </View>

              <View style={styles.modalLines}>
                <Text>Address</Text>
                <TextInput style={styles.tinput} value={this.state.branchAddressEdit}
                  ref='SecondInput2'
                  onSubmitEditing={(event) => {
                    this.refs.ThirdInput2.focus();
                  }}
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({branchAddressEdit: text})}
                ></TextInput>
              </View>

              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Staff Count
                </Text>
                <TextInput style={styles.tinput}
                  ref='ThirdInput2'
                  onSubmitEditing={(event) => {
                    this.refs.ForthInput2.focus();
                  }}
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({branchStaffCountEdit: text})}
                  value = {this.state.branchStaffCountEdit}
                >

                </TextInput>
              </View>

              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Opening Date
                </Text>
                <TextInput style={styles.tinput}
                  ref='ForthInput2'
                  onFocus={() => {Keyboard.dismiss();this._showDateTimePicker();}}
                  value = {this.state.branchOpeningDateEditBeauty}
                >
                </TextInput>
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked2}
                onCancel={this._hideDateTimePicker}
                mode="date"
              />

              <View style={styles.modalLines}>
                <Text >
                  Main Branch
                </Text>
                <Switch value={this.state.mainBranchEdit} onValueChange={(value) => {this._setMainBranchEdit(value);}}>

                </Switch>
              </View>

              <TouchableOpacity style={styles.addBranchInner} onPress={this.handelBranchEdit}>
                <Text style={{color:'darkviolet'}}>
                  Apply
                </Text>
              </TouchableOpacity>
              <View style={{marginTop:20}}>
                <TouchableOpacity style={styles.delBranchInner} onPress={this.handelBranchDelete}>
                  <Text style={{color:'red'}}>
                    Delete Branch
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ListView
          style={styles.containerList}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator = {(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        />
        <View style={styles.addButtonPos}>
          <TouchableOpacity style={styles.addButtonImage} onPress={() => {
            this.setModalVisible(true)
          }}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );}
    else{
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
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
  containerList:{
    flex:1,
    backgroundColor: '#fff',
    padding:15
  },
  listTextLarge:{
     fontSize: 18
  },
  listTextSmall:{
     fontSize: 14,
     marginLeft: 12
  },
  addBranchInner:{
    borderColor: 'darkviolet',
    borderWidth: StyleSheet.hairlineWidth,
    height: 30,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  delBranchInner:{
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth,
    height: 30,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonImage:{
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    height: 50,
    width: 50,
    borderRadius: 20,
    backgroundColor: 'darkviolet',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonPos:{
    position:'absolute',
    left:275,
    top:450
  },
  addText:{
       fontSize: 30,
       color:'white'
  },
  darkBackgroundModal:{
    alignItems: 'center',
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  lightBackgroundModal:{
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding:10,
    width:300,
    height:300
  },
  modalLines:{
    flex:1,
  //  justifyContent: 'center',
    flexDirection:'row'
  },
  pick:{
    width:100,
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  tinput: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 100,
  //  alignSelf: 'center'
  },
  topMargText:{
    marginTop:10
  },
  icon: {
    width: 24,
    height: 24,
  }
});
