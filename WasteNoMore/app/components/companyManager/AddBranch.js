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
      mainBranchEdit:false
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
    });
    this.setModalVisible(false);
  }


  _resetModal2(){

    this.setState({
      branchLocationEdit:'',
      branchStaffCountEdit:'',
      branchOpeningDateEdit:'',
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

  handelBranchAdd (){
      alert("Branch should be added");
  }

  handelBranchEdit(){
    alert("Branch should be edited");
  }

  handelBranchDelete(){
    alert("Branch will be deleted");
  }


  _renderRow(rowData: Object, sectionID: number, rowID: number) {
     return (
       <View style={{padding:5}}>
         <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' activeOpacity={3} onPress={this._onPressRow.bind(rowID, rowData)}>
           <View >
             <Text style={styles.listTextLarge}>{rowData.location}/{rowData.location_district}/{rowData.location_governorate}</Text>
             <Text style={styles.listTextSmall}>Staff Count: {rowData.staff_count}</Text>
             <Text style={styles.listTextSmall}>Opening Date: {Moment(rowData.opening_date.date).format('MMM-DD-YYYY')}</Text>
           </View>
         </TouchableHighlight>
       </View>
     );
  }

  _onPressRow = (rowID, rowData) => {
  //  console.log(rowID);
    this.setState({
      branchLocationEdit:rowID.location+"/"+rowID.location_district,
      branchStaffCountEdit:String(rowID.staff_count),
      mainBranchEdit: (rowID.mainBranch == "true")? true : false
    });
    this.setState({branchOpeningDateEditBeauty: Moment(rowID.opening_date.date).format('MMM-DD-YYYY')});
    this.setModal2Visible(true);
  };

  getBranches(){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getCompanyBranches', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIxMjYwOTQsImV4cCI6MTUwMjEyOTY5NH0.Kfs4yy_4j7nsVog48oJ9BCBkWLF_Cssy5cYrEFVgSDMNuY0cEqTvi29Y5M3EoHeHin9iHX4YvuYbOVLAbGCN-82GfQHZQXzgUitiJN4V6MmoGW5TPyO8zVvxCtm4GieGxh03Or2vxlvMcrY6aC6wzVKg9iXIANu7wMz03DEtXjydqm9GTEYEZ3MS5BKma9xUPM7rfi9ub0h5y_MgyIUtKHojNgbvL0TLJeyEQCA5R0_UbgMR_2-JtS2n6yH6Q17Jk7hG_ijgQN0oyC2euo8SGhbU5JO6-zqRCZk33zVSQJLRrh-NHphpc82i6ijqckg_VUMYG4OgXR5oFLwCfjt8mR7mWdRx3QKij-_TmDQwIzhP1vLqfV3GiEPdx1cK3neKtUOMHuITkU3NSjHzlNBYLZSHzcMA6k74S5c28MqmWsBTYIOJSnyE6O_LsuWnf1AEMjF2s3kgSIlpwxbqb9djkSgkBBWsZ1VV8lj2DGu7KgSngsOXutLbf2q0jYPwHWkV055FA_xkdfmqCcdXC8TTMKlm40Qs2vRV4WnaA0sIdcbRV0d7TVsNVe5NLT6-QKB4HmTqaSVUbxkX4h7UdOslFU2Yr7CsYrwlDUJ6WG51QFIW7B1y5ZPJGNJdfvMt3sLuJbmpodL7yw08MBrFiM5HOxkdUXc0VJbX1DnDSt4-b_c'
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
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIxMjYwOTQsImV4cCI6MTUwMjEyOTY5NH0.Kfs4yy_4j7nsVog48oJ9BCBkWLF_Cssy5cYrEFVgSDMNuY0cEqTvi29Y5M3EoHeHin9iHX4YvuYbOVLAbGCN-82GfQHZQXzgUitiJN4V6MmoGW5TPyO8zVvxCtm4GieGxh03Or2vxlvMcrY6aC6wzVKg9iXIANu7wMz03DEtXjydqm9GTEYEZ3MS5BKma9xUPM7rfi9ub0h5y_MgyIUtKHojNgbvL0TLJeyEQCA5R0_UbgMR_2-JtS2n6yH6Q17Jk7hG_ijgQN0oyC2euo8SGhbU5JO6-zqRCZk33zVSQJLRrh-NHphpc82i6ijqckg_VUMYG4OgXR5oFLwCfjt8mR7mWdRx3QKij-_TmDQwIzhP1vLqfV3GiEPdx1cK3neKtUOMHuITkU3NSjHzlNBYLZSHzcMA6k74S5c28MqmWsBTYIOJSnyE6O_LsuWnf1AEMjF2s3kgSIlpwxbqb9djkSgkBBWsZ1VV8lj2DGu7KgSngsOXutLbf2q0jYPwHWkV055FA_xkdfmqCcdXC8TTMKlm40Qs2vRV4WnaA0sIdcbRV0d7TVsNVe5NLT6-QKB4HmTqaSVUbxkX4h7UdOslFU2Yr7CsYrwlDUJ6WG51QFIW7B1y5ZPJGNJdfvMt3sLuJbmpodL7yw08MBrFiM5HOxkdUXc0VJbX1DnDSt4-b_c'
      }
    })
        .then((response) => response.json())
        .then((responseData) => {
        //  console.log(responseData.location);
          if("message" in responseData){
                console.log(responseData.message);
          }
          if(responseData.status == "error"){
              console.log("error");
          }else if(responseData.status == "success"){
            this.setState({ locationList:responseData.location, gotLocations:true}); //isLoading: false,

            this.state.locationList.map((s, i) => {
              console.log(s);
            });
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
                      return <Picker.Item key={i} value={s.city+"/"+s.district} label={s.city+"/"+s.district} />
                    })
                  }
                </Picker>
              </View>
              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Staff Count
                </Text>
                <TextInput style={styles.tinput}
                  ref='SecondInput'
                  onSubmitEditing={(event) => {
                    this.refs.ThirdInput.focus();
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
                  ref='ThirdInput'
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
                  {
                    this.state.locationList.map( (s, i) => {
                      return <Picker.Item key={i} value={s.city+"/"+s.district} label={s.city+"/"+s.district} />
                    })
                  }
                </Picker>
              </View>
              <View style={styles.modalLines}>
                <Text style={styles.topMargText}>
                  Staff Count
                </Text>
                <TextInput style={styles.tinput}
                  ref='SecondInput2'
                  onSubmitEditing={(event) => {
                    this.refs.ThirdInput2.focus();
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
                  ref='ThirdInput2'
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
