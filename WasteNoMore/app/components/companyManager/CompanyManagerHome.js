import React,{Component} from 'react';
import { StyleSheet, Text, View,AppRegistry, Image } from 'react-native';
import { TabNavigator } from "react-navigation";
import ChartView from 'react-native-highcharts';

export default class CompanyManagerHome extends Component {

  // constructor(){
  //   super();
  // }

  static navigationOptions = {
     drawerLabel: 'Home',
     drawerIcon: ({ tintColor }) => (
       <Image
         source={require('WasteNoMore/resources/icons/home-icon.png')}
         style={[styles.icon, {tintColor: tintColor}]}
       />
     ),
   };
   render(){

     return(
         <AppNavigationManager />
     );
   }
}

class Graph1 extends Component{

  render(){
    var Highcharts='Highcharts';
     var conf={
             chart: {
                 type: 'spline',
                 animation: Highcharts.svg, // don't animate in old IE
                 marginRight: 10,
                 events: {
                     load: function () {

                         // set up the updating of the chart each second
                         var series = this.series[0];
                         setInterval(function () {
                             var x = (new Date()).getTime(), // current time
                                 y = Math.random();
                             series.addPoint([x, y], true, true);
                         }, 1000);
                     }
                 }
             },
             title: {
                 text: 'Live random data'
             },
             xAxis: {
                 type: 'datetime',
                 tickPixelInterval: 150
             },
             yAxis: {
                 title: {
                     text: 'Value'
                 },
                 plotLines: [{
                     value: 0,
                     width: 1,
                     color: '#808080'
                 }]
             },
             tooltip: {
                 formatter: function () {
                     return '<b>' + this.series.name + '</b><br/>' +
                         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                         Highcharts.numberFormat(this.y, 2);
                 }
             },
             legend: {
                 enabled: false
             },
             exporting: {
                 enabled: false
             },
             series: [{
                 name: 'Random data',
                 data: (function () {
                     // generate an array of random data
                     var data = [],
                         time = (new Date()).getTime(),
                         i;

                     for (i = -19; i <= 0; i += 1) {
                         data.push({
                             x: time + i * 1000,
                             y: Math.random()
                         });
                     }
                     return data;
                 }())
             }]
         };
     return (
       <ChartView style={{height:300}} config={conf}></ChartView>
     );
  }
}

class Graph2 extends Component{

  render(){
    return(
      <Text>This is Graph 2</Text>
    );
  }
}

class Graph3 extends Component{

  render(){
    return(
      <Text>This is Graph 3</Text>
    );
  }
}

class Graph4 extends Component{

  render(){
    return(
      <Text>This is Graph 4</Text>
    );
  }
}

const ManagerHomeScreenNavigator = TabNavigator({
  Graph1 : {screen: Graph1},
  Graph2 : {screen: Graph2},
  Graph3 : {screen: Graph3},
  Graph4 : {screen: Graph4}
},
{
  initialRouteName: 'Graph1'
});


const AppNavigationManager = () => (
  <ManagerHomeScreenNavigator />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});
