import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, TouchableOpacity,ActivityIndicator,Picker,Alert, Modal, Dimensions, ListView, TextInput,Keyboard,TouchableHighlight, Switch} from 'react-native';


export default class ManageLicenses extends Component{

constructor(){
  super();

  this.state = {
    licenseBranch:'',
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


//TODO: add navigation options

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

_resetModal(){
  this.setState({
    licenseBranch:'',
    licensePicked:'',
    pickedLicenseString:'',
    listCurrentRowIndex:'',
    modalVisible:false
  });
}

getLicenses = () => {
    this.setState({gotLicenses:false});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/getCompanyLicenses', {
      headers: {
        'Accept': 'application/json',
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIzNzY1NzcsImV4cCI6MTUwMjM4MDE3N30.M5VAJqJQ5DrkGSyxEkoxAGGAWyNUSggtVy1xPkJCI9_Jgw62wXFFJBdbZMyrmwdqe_iCfqVNJN97IYyuKoORj_6B2Zj5p_jPgYT429TJX7N1cfz9yuPLTRO9yjrouUATaaDaTdynkdutzdMD4ddJ5zYtzuyXEcF4GRqSfne7EXw_g9Or9nri-FsHavwcgJFQzCaaQsHKF70q_EdhJ-Udxi1rgc43og1U52oqjZUv7W5rVFvjnFPftgHg8z6g03WvlSvcMZJ0uHpJk7Pb2rLF3fFIL0TPlUAZbXRYhrB5drJrnAHdXhH_LkXQJ4RFLkBGqnNSKp9FXmLFN4c9aQ4uyz3Tp-HQnwNunfoFeXxgsd4Qi2B-ZbjydSDzuf67tDBbfAm9S5wKvTyob9D89fbcBo6k9v4ApFYQjqc2AxPPwQ8K9pQTzUm_Hc2Scli9uSgXzMGcZHGxuO1j3m3Sj8ho7jcE389gvOicuH-PLAq7la2ZkCZ3WRDg3AjNRxZY9XO8uCqJg0z_YYpcD3dFGQec2Tyw4Qicu6ctre3W_YWkbiR9PxqsGblqH7OOKY5ZRZZg2naGAPBZhJYj6Wg6gJKir1dEYBSL17i38zPAZbDyMD7wdNhOJa8zjQ4HPDAnJOwMEA0ZYWGgGm1rcY1w_x_TBdjweye-lNi_O5-RUUJpq4M'
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
    })
    .done();
}

  getBranches = () => {

      this.setState({gotBranches:false});

      //var TOKEN = await AsyncStorage.getItem('token');
      fetch('http://192.168.137.43:8000/api/getCompanyBranchesDDl', {
        headers: {
          'Accept': 'application/json',
          //  'Authorization': 'Bearer ' + TOKEN
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIzNzY1NzcsImV4cCI6MTUwMjM4MDE3N30.M5VAJqJQ5DrkGSyxEkoxAGGAWyNUSggtVy1xPkJCI9_Jgw62wXFFJBdbZMyrmwdqe_iCfqVNJN97IYyuKoORj_6B2Zj5p_jPgYT429TJX7N1cfz9yuPLTRO9yjrouUATaaDaTdynkdutzdMD4ddJ5zYtzuyXEcF4GRqSfne7EXw_g9Or9nri-FsHavwcgJFQzCaaQsHKF70q_EdhJ-Udxi1rgc43og1U52oqjZUv7W5rVFvjnFPftgHg8z6g03WvlSvcMZJ0uHpJk7Pb2rLF3fFIL0TPlUAZbXRYhrB5drJrnAHdXhH_LkXQJ4RFLkBGqnNSKp9FXmLFN4c9aQ4uyz3Tp-HQnwNunfoFeXxgsd4Qi2B-ZbjydSDzuf67tDBbfAm9S5wKvTyob9D89fbcBo6k9v4ApFYQjqc2AxPPwQ8K9pQTzUm_Hc2Scli9uSgXzMGcZHGxuO1j3m3Sj8ho7jcE389gvOicuH-PLAq7la2ZkCZ3WRDg3AjNRxZY9XO8uCqJg0z_YYpcD3dFGQec2Tyw4Qicu6ctre3W_YWkbiR9PxqsGblqH7OOKY5ZRZZg2naGAPBZhJYj6Wg6gJKir1dEYBSL17i38zPAZbDyMD7wdNhOJa8zjQ4HPDAnJOwMEA0ZYWGgGm1rcY1w_x_TBdjweye-lNi_O5-RUUJpq4M'
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
      })
      .done();
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
      licenseBranch:rowData.branchId,
      listCurrentRowIndex:rowID
    });
    this.setModalVisible(true);
  };

  handelLicenseEdit = () => {
    if(this.state.licenseBranch == '' || this.state.licenseBranch == '0') return alert("Please Choose a Branch");

    //var TOKEN = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.43:8000/api/setCompanyBranchLicense',{
      method: 'POST',
      headers: {
        //  'Authorization': 'Bearer ' + TOKEN
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnZW9hamEiLCJpYXQiOjE1MDIzNzY1NzcsImV4cCI6MTUwMjM4MDE3N30.M5VAJqJQ5DrkGSyxEkoxAGGAWyNUSggtVy1xPkJCI9_Jgw62wXFFJBdbZMyrmwdqe_iCfqVNJN97IYyuKoORj_6B2Zj5p_jPgYT429TJX7N1cfz9yuPLTRO9yjrouUATaaDaTdynkdutzdMD4ddJ5zYtzuyXEcF4GRqSfne7EXw_g9Or9nri-FsHavwcgJFQzCaaQsHKF70q_EdhJ-Udxi1rgc43og1U52oqjZUv7W5rVFvjnFPftgHg8z6g03WvlSvcMZJ0uHpJk7Pb2rLF3fFIL0TPlUAZbXRYhrB5drJrnAHdXhH_LkXQJ4RFLkBGqnNSKp9FXmLFN4c9aQ4uyz3Tp-HQnwNunfoFeXxgsd4Qi2B-ZbjydSDzuf67tDBbfAm9S5wKvTyob9D89fbcBo6k9v4ApFYQjqc2AxPPwQ8K9pQTzUm_Hc2Scli9uSgXzMGcZHGxuO1j3m3Sj8ho7jcE389gvOicuH-PLAq7la2ZkCZ3WRDg3AjNRxZY9XO8uCqJg0z_YYpcD3dFGQec2Tyw4Qicu6ctre3W_YWkbiR9PxqsGblqH7OOKY5ZRZZg2naGAPBZhJYj6Wg6gJKir1dEYBSL17i38zPAZbDyMD7wdNhOJa8zjQ4HPDAnJOwMEA0ZYWGgGm1rcY1w_x_TBdjweye-lNi_O5-RUUJpq4M'},

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
      })
      .done();
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
                    <Picker
                      style={styles.pick}
                      selectedValue={this.state.licenseBranch}
                      onValueChange={(itemValue) => this.setState({licenseBranch: itemValue})}
                    >
                      <Picker.Item key={0} value={"0"} label={"Choose Branch"}  />

                      {
                        this.state.branchesList.map( (s, i) => {
                          return <Picker.Item key={i} value={s.BranchId} label={s.location+"/"+s.address} />
                        })
                      }
                    </Picker>
                  </View>
                  <TouchableOpacity style={styles.applyInner} onPress={this.handelLicenseEdit}>
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
