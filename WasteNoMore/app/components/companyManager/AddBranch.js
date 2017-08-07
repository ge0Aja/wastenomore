import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Picker,Alert, Modal, Dimensions, ListView, TextInput,Keyboard,TouchableHighlight} from 'react-native';

import demoData from './demoBranchData.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

export default class AddBranch extends Component {


  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var {height, width} = Dimensions.get('window');
    this.state = {
      branchLocation:'',
      branchStaffCount:'',
      branchOpeningDate:'',
      branches:[],
      branchesExist:false,
      modalVisible: false,
      modalBackgroundWidth:width,
      modalBackgroundHeight:height,
      locationList:[],
      isDateTimePickerVisible: false,
      branchOpeningDateBeauty:'',
      modal2Visible: false,
      dataSource: ds.cloneWithRows(demoData),
      branchLocationEdit:'',
      branchStaffCountEdit:'',
      branchOpeningDateEdit:'',
      branchOpeningDateEditBeauty:''

    }

  //  console.log(this.state.dataSource);
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


  _renderRow(rowData: Object, sectionID: number, rowID: number) {
     return (
       <View style={{padding:5}}>
         <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' activeOpacity={3} onPress={this._onPressRow.bind(rowID, rowData)}>
           <View >
             <Text style={styles.listTextLarge}>{rowData.location}</Text>
             <Text style={styles.listTextSmall}>Staff Count: {rowData.staff_count}</Text>
             <Text style={styles.listTextSmall}>Opening Date: {rowData.opening_date}</Text>
           </View>
         </TouchableHighlight>
       </View>
     );
  }

  _onPressRow = (rowID, rowData) => {
  //  console.log(rowID);
    this.setState({
      branchLocationEdit:rowID.location,
      branchStaffCountEdit:rowID.staff_count,
    });
    this.setState({branchOpeningDateEditBeauty: Moment(rowID.opening_date).format('MMM-DD-YYYY')});
    this.setModal2Visible(true);
  };

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
                  {this.state.locationList.map( (s, i) => {
                    return <Picker.Item key={i} value={s} label={s} />
                  })}
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
                  {this.state.locationList.map( (s, i) => {
                    return <Picker.Item key={i} value={s} label={s} />
                  })}
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

              <TouchableOpacity style={styles.addBranchInner} onPress={this.handelBranchEdit}>
                <Text style={{color:'darkviolet'}}>
                  Apply
                </Text>
              </TouchableOpacity>
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
    );
  }
}



// const Row = (props) => (
//   <View style={{padding:5}}>
//     <TouchableHighlight onPress={() => {
//       this._pressRow(props)
//     }}>
//       <View >
//         <Text style={styles.listTextLarge}>{props.location}</Text>
//         <Text style={styles.listTextSmall}>Staff Count: {props.staff_count}</Text>
//         <Text style={styles.listTextSmall}>Opening Date: {props.opening_date}</Text>
//       </View>
//     </TouchableHighlight>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // touchRow:{
  //   backgroundColor: 'rgba(211,211,211,0.65)'
  // },
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
