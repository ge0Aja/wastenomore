import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Picker,Alert, Modal, Dimensions, ListView, TextInput,Keyboard,TouchableHighlight, Switch, Image} from 'react-native';

//import demoData from './demoBranchData.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import ModalPicker from 'react-native-modal-picker';

export default class AddBranch extends Component {


  constructor(){
    super();

    var {height, width} = Dimensions.get('window');
    this.state = {
      branchLocation:'',
      branchLocationSt:'',
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
      branchLocationStEdit:'',
      branchStaffCountEdit:'',
      branchOpeningDateEdit:'',
      branchOpeningDateEditBeauty:'',
      mainBranchAdd:false,
      mainBranchEdit:false,
      branchIdEdit:'',
      listCurrentRowIndex:'',
      branchAddressEdit:'',
      branchAddress:'',
      submitDisabled:false
    }
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

  _resetModal =() => {

    this.setState({
      branchLocation:'',
      branchLocationSt:'',
      branchStaffCount:'',
      branchOpeningDate:'',
      branchAddress:'',
      mainBranchAdd:false
    });
    this.setModalVisible(false);
  }


  _resetModal2 = () => {
    this.setState({
      branchLocationEdit:'',
      branchLocationStEdit:'',
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

  handelBranchAdd = async () => {

    if(this.state.branchStaffCount == '') return alert('Please Insert Staff Count');

    if(this.state.branchOpeningDate == '') return alert('Please Choose An Opening Date');

    if(this.state.branchLocation == '' || this.state.branchLocationEdit == '0') return alert('Please Choose A Location');

    if(this.state.branchAddress == '') return alert('Please Insert Address');

    try {
      this.setState({submitDisabled:true});
      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/newCompanyBranch',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + TOKEN
        },

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
      }).catch((error) => {
        console.error(error);
      })
      .done();
    } catch (e) {

      console.error(e);

    } finally {
        this.setState({submitDisabled:false});
    }


  }

  handelBranchEdit = async () => {

    if(this.state.branchLocationEdit == '' || this.state.branchLocationEdit == '0') return alert('Please Choose A Location');

    if(this.state.branchAddressEdit == '') return alert('Please Insert Address');

    if(this.state.branchStaffCountEdit == '') return alert('Please Insert Staff Count');

    if(this.state.branchOpeningDateEdit == '') return alert('Please Choose An Opening Date');

    try {
      this.setState({submitDisabled:true});
      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/editBranchBasicInfo',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + TOKEN
        },

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
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);

    } finally {
        this.setState({submitDisabled:false});
    }

  }

  handleBranchDeleteAction = async () => {

    //console.log(this.state.branchIdEdit);

    try {
      this.setState({submitDisabled:true});
      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/deleteBranchApi',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + TOKEN
        },

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
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);

    } finally {
      this.setState({submitDisabled:false});
    }

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
              <Text style={styles.listTextLarge}>{rowData.location_governorate}-{rowData.location_district}-{rowData.location}</Text>
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
              <Text style={styles.listTextLarge}>{rowData.location_governorate}-{rowData.location_district}-{rowData.location}</Text>
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
      branchLocationEdit:rowData.locationId,
      branchLocationStEdit:rowData.location_governorate+"-"+rowData.location_district+"-"+rowData.location,
      branchAddressEdit:rowData.address,
      branchStaffCountEdit:String(rowData.staff_count),
      mainBranchEdit: rowData.mainBranch ,
      branchIdEdit:rowData.BranchId,
      branchOpeningDateEdit:rowData.opening_date.date,
      listCurrentRowIndex:rowID
    });
    this.setState({branchOpeningDateEditBeauty: Moment(rowData.opening_date.date).format('MMM-DD-YYYY')});
    this.setModal2Visible(true);
  };

  getBranches = async () => {
    this.setState({gotBranches:false});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    try {

      var TOKEN = await AsyncStorage.getItem('token');

      //  console.log("The Token is:"+ TOKEN);
      fetch('http://192.168.137.43:8000/api/getCompanyBranches', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + TOKEN
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
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.log("Token Error");
    } finally {

    }


  }

  getLocations = async () => {
    var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getLocations', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN

      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      //    console.log(responseData);
      if("message" in responseData){
        console.log(responseData.message);
      }
      if(responseData.status == "error"){
        console.log("error");
      }else if(responseData.status == "success"){
        this.setState({ locationList:responseData.location, gotLocations:true}); //isLoading: false,
      }
    }).catch((error) => {
      console.error(error);
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

                  <ModalPicker
                    data={this.state.locationList}
                    initValue={"Choose Location"}
                    onChange={(option) => {
                      this.setState({branchLocation: option.key,branchLocationSt:option.label})
                    }}>

                    <TextInput
                      style={[styles.tinput,{marginLeft:46}]}
                      editable={false}
                      value={this.state.branchLocationSt} />
                  </ModalPicker>
                </View>
                <View style={styles.modalLines}>
                  <Text style={styles.topMargText}>Address</Text>
                  <TextInput style={[styles.tinput,{marginLeft:52}]} value={this.state.branchAddress}
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
                  <TextInput style={[styles.tinput,{marginLeft:32}]}
                    keyboardType='numeric'
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
                  date ={new Date()}
                  mode="date"
                />
                <View style={[styles.modalLines,{marginTop:25}]}>
                  <Text style={{marginTop:9}}>
                    Main Branch
                  </Text>
                  <Switch style={{marginLeft:35}} value={this.state.mainBranchAdd} onValueChange={(value) => {this._setMainBranch(value);}}>

                  </Switch>
                </View>

                <View style={[styles.modalLines,{alignSelf:"center"}]}>
                  <TouchableOpacity style={styles.delBranchInner} onPress={this._resetModal}>
                    <Text style={{color:'red'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBranchInner} disabled={this.state.submitDisabled} onPress={this.handelBranchAdd}>
                    <Text style={{color:'darkviolet'}}>
                      Add Branch
                    </Text>
                  </TouchableOpacity>
                </View>


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


                  <ModalPicker
                    data={this.state.locationList}
                    initValue={"Choose Location"}
                    onChange={(option) => {
                      this.setState({branchLocationEdit: option.key,branchLocationStEdit:option.label})
                    }}>

                    <TextInput
                      style={[styles.tinput,{marginLeft:46}]}
                      editable={false}
                      value={this.state.branchLocationStEdit} />
                  </ModalPicker>
                </View>

                <View style={styles.modalLines}>
                  <Text style={styles.topMargText}>Address</Text>
                  <TextInput style={[styles.tinput,{marginLeft:52}]} value={this.state.branchAddressEdit}
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
                  <TextInput style={[styles.tinput,{marginLeft:32}]}
                    keyboardType='numeric'
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
                  date ={new Date()}
                  mode="date"
                />

                <View style={[styles.modalLines,{marginTop:25}]}>
                  <Text style={{marginTop:9}}>
                    Main Branch
                  </Text>
                  <Switch style={{marginLeft:35}} value={this.state.mainBranchEdit} onValueChange={(value) => {this._setMainBranchEdit(value);}}>

                  </Switch>
                </View>
                <View style={[styles.modalLines,{alignSelf:"center"}]}>
                  <TouchableOpacity style={styles.delBranchInner} onPress={this._resetModal2}>
                    <Text style={{color:'red'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.addBranchInner} disabled={this.state.submitDisabled} onPress={this.handelBranchEdit}>
                    <Text style={{color:'darkviolet'}}>
                      Apply
                    </Text>
                  </TouchableOpacity>

                </View>
                <View style={{marginTop:20}}>
                  <TouchableOpacity style={styles.delBranchInner} disabled={this.state.submitDisabled} onPress={this.handelBranchDelete}>
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
                          justifyContent: 'center',
                          marginLeft:15
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
                          right:30,
                          bottom:30
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
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          borderRadius: 5,
                          padding:10,
                          width:350,
                          height:400
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
                          margin: 15,
                          marginLeft:18,
                          width: 200,
                          //  alignSelf: 'center'
                        },
                        topMargText:{
                          marginTop:23,
                          marginRight:15
                        },
                        icon: {
                          width: 24,
                          height: 24,
                        }
                      });
