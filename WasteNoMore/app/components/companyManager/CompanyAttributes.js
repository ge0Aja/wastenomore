import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Button, Picker,Modal,TouchableHighlight,Dimensions,ListView } from 'react-native';
//import Row from './Row';


export default class CompanyAttributes extends Component {

  constructor(){
    super();
    var {height, width} = Dimensions.get('screen');
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      attribute: '',
      subAttribute: '',
      subAttributeValue: '',
       modalVisible: false,
      subAttributeHasValues:false,
        modalwidth: width,
        modalheight: height,
      attributeList:[],
      subAttributeList:[],
      subAttributesValuesList:[],
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }

  setModalVisible(visible) {
    this.setState({attributeList:[],
    subAttributeList:[],
    subAttributesValuesList:[]});
     this.setState({modalVisible: visible});
   }

  _showPossibleValues = () => this.setState({ subAttributeHasValues: true });

  _hidePossibleValues = () => this.setState({ subAttributeHasValues: false, subAttributesValuesList:[]});

  render(){

    return(
      <View style={styles.container}>

        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          presentationStyle={"overFullScreen"}
          onRequestClose={() => {  this.setModalVisible(false)}}
        >
          <View style={[styles.modalPopUp,{width: this.state.modalwidth, height:this.state.modalheight}]}>
            <Text style={styles.label}>
              Attribute:
            </Text>

            <Picker
              selectedValue={this.state.attribute}
              style={styles.pick}
              onValueChange={(itemValue) => this.setState({attribute: itemValue})}>

              {this.state.attributeList.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
              })}
            </Picker>


            <Text style={styles.label}>
              Sub-Attribute:
            </Text>

            <Picker
              selectedValue={this.state.subAttribute}
              style={styles.pick}
              onValueChange={(itemValue) => this.setState({subAttribute: itemValue})}>

              {this.state.subAttributeList.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
              })}
            </Picker>


            <Text style={styles.label}

            >
              Value:
            </Text>

            <Picker

              selectedValue={this.state.subAttributeValue}
              style={styles.pick}
              onValueChange={(itemValue) => this.setState({subAttributeValue: itemValue})}>

              {this.state.subAttributesValuesList.map( (s, i) => {
                return <Picker.Item key={i} value={s} label={s} />
              })}
            </Picker>
          </View>
        </Modal>

        <ListView
          style={styles.containerList}
          dataSource={this.state.dataSource}
          renderRow={(data) =><View><Text>{data}</Text></View>} // <Row {...data}/>
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}  />}
        />

        <TouchableHighlight
          style={styles.addAttr}
          onPress={() => {
            this.setModalVisible(true)
          }}>
          <Text>Add Attribute</Text>
        </TouchableHighlight>

      </View>
            );
          }

          }


        const Row = (props) => (
          // <View > style={styles.container}
            <View style={styles.containerList}>
              <Text style={styles.textLargeList}>{`${props.attribute}`}</Text>
              <Text style={styles.textSmallList}>
                {`${props.subAttribute} ${props.subAttributeVal}`}
              </Text>
            </View>
            );

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList:{
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    //alignItems: 'center',
  },
textLargeList:{
  fontSize: 16
},
textSmallList:{
  marginLeft: 12,
    fontSize: 12
},
  pick:{
      width: 150,
        },

  label: {
    fontSize: 18
  },
  addAttr:{
  //  position: 'absolute',
  //  left:150,
  //  top:700
  marginBottom:20,
  marginLeft:170

  },

  buttonContainer:{
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalPopUp:{
    alignItems: 'center',
    justifyContent: 'center',
  //  margin: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  }
});
