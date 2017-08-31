import React,{Component} from 'react';
import { StyleSheet, AsyncStorage, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Picker,Alert, Modal, Dimensions, ListView, TextInput,Keyboard,TouchableHighlight, Switch, Image} from 'react-native';
import ModalPicker from 'react-native-modal-picker';

export default class ManageLicenses extends Component{

  static navigationOptions = {
    drawerLabel: 'Manage Licences',
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
      licenseBranch:'',
      licenseBranchLoc:'',
      licensePicked:'',
      listCurrentRowIndex:'',
      modalVisible:false,
      gotLicenses:false,
      gotBranches:false,
      licenseList:[],
      pickedLicenseString:'',
      dataSource:[],
      branchesList:[]
    }
  }

  componentDidMount() {
    this.getLicenses();
    this.getBranches();
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _resetModal = () => {
    this.setState({
      licenseBranch:'',
      licenseBranchLoc:'',
      licensePicked:'',
      pickedLicenseString:'',
      listCurrentRowIndex:'',
      modalVisible:false
    });
  }

  getLicenses = async () => {
    this.setState({gotLicenses:false});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    try {
      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getCompanyLicenses', {
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
          this.setState({ licenseList:responseData.licenses,dataSource: ds.cloneWithRows(responseData.licenses), gotLicenses:true}); //isLoading: false,
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();
    } catch (e) {
      console.error(e);
    } finally {

    }
  }

  getBranches = async () => {

    this.setState({gotBranches:false});

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getCompanyBranchesDDl', {
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
          this.setState({ branchesList:responseData.branches, gotBranches:true}); //isLoading: false,
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);
    } finally {

    }

  }


  _renderRow(rowData, sectionID, rowID) { //rowData: Object, sectionID: number, rowID: number
    if(rowData.used == 1){
      return (
        <View style={{padding:5}}>
          <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' >
            <View >
              <Text style={styles.listTextLarge}>{rowData.sublicString} (In Use)</Text>
              <Text style={styles.listTextSmall}>User: {rowData.userEmail}</Text>
              <Text style={styles.listTextSmall}>Branch: {rowData.branchLocation}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }else{
      return (
        <View style={{padding:5}}>
          <TouchableHighlight underlayColor='rgba(211,211,211,0.9)' onPress={ () => {this._onPressRow(rowData,rowID)}}>
            <View >
              <Text style={styles.listTextLarge}>{rowData.sublicString}</Text>
              <Text style={styles.listTextSmall}>User: {rowData.userEmail}</Text>
              <Text style={styles.listTextSmall}>Branch: {rowData.branchLocation}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  _onPressRow = (rowData,rowID) => {
    this.setState({
      licensePicked: rowData.subLicId,
      pickedLicenseString:rowData.sublicString,
      licenseBranchLoc:rowData.branchLocation,
      licenseBranch:rowData.branchId,
      listCurrentRowIndex:rowID
    });
    this.setModalVisible(true);
  };

  handelLicenseEdit = async () => {
    if(this.state.licenseBranch == '' || this.state.licenseBranch == '0') return alert("Please Choose a Branch");

    try {

      var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/setCompanyBranchLicense',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + TOKEN
        },

        body: JSON.stringify({
          "sub_license":this.state.licensePicked,
          "branch":this.state.licenseBranch
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

          this._resetModal();
          this.getLicenses();
        }
      }).catch((error) => {
        console.error(error);
      })
      .done();

    } catch (e) {
      console.error(e);
    } finally {

    }

  }


  render(){
    if(this.state.gotLicenses && this.state.gotBranches){
      return(

        <View style={styles.container}>

          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._resetModal()}}
          >
            <View style={styles.darkBackgroundModal}>
              <View style={styles.lightBackgroundModal}>
                <View style={styles.modalLines}>
                  <Text style={styles.listTextLarge}>{this.state.pickedLicenseString}</Text>
                </View>
                <View style={styles.modalLines}>
                  <Text>
                    Choose Branch For License
                  </Text>
                </View>
                <View style={styles.modalLines}>
                  <Text style={styles.topMargText}>Branch:</Text>

                  <ModalPicker
                    data={this.state.branchesList}
                    initValue={"Choose Branch"}
                    onChange={(option) => {
                      this.setState({licenseBranch: option.key,licenseBranchLoc:option.label})
                    }}>

                    <TextInput
                      style={{borderWidth:1, borderColor:'#ccc', padding:2, height:30,width:150}}
                      editable={false}

                      value={this.state.licenseBranchLoc} />

                  </ModalPicker>
                </View>
                <View style={{flex:1,flexDirection:"row"}}>
                  <TouchableOpacity style={styles.cancelInner} onPress={this._resetModal}>
                    <Text style={{color:'red'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.applyInner} onPress={this.handelLicenseEdit}>
                    <Text style={{color:'darkviolet'}}>
                      Apply
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
        applyInner:{
          borderColor: 'darkviolet',
          borderWidth: StyleSheet.hairlineWidth,
          height: 30,
          width: 100,
          margin:10,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center'
        },
        cancelInner:{
          borderColor: 'red',
          borderWidth: StyleSheet.hairlineWidth,
          height: 30,
          width: 100,
          margin:10,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center'
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
          flexDirection:'row'
        },
        pick:{
          width:150,
          padding: 4,
          height: 40,
          borderColor: 'gray',
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 5,
        },
        topMargText:{
          marginTop:10
        },
        icon: {
          width: 24,
          height: 24,
        }
      });
