import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import ReportScreen from "./ReportScreen";
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      sdetails: '',
      avg: "",
      avg2: "",
    };
  }
  averagemarks = () => {
     var avg = (+(this.state.sdetails.engmarks) +
      +(this.state.sdetails.mathmarks) +
      +(this.state.sdetails.sciencemarks) +
      +(this.state.sdetails.socialmarks) +
      +(this.state.sdetails.hindimarks) +
      +(this.state.sdetails.telugumarks)) / 7;
    //console.log("Average", avg)
     var avg2 = +(+(this.state.sdetails.engmarks2)+
    +(this.state.sdetails.mathmarks2) +
    +(this.state.sdetails.sciencemarks2) +
    +(this.state.sdetails.socialmarks2) +
    +(this.state.sdetails.hindimarks2) + 
    +( this.state.sdetails.telugumarks2))/7 
    this.setState({ avg: avg.toFixed(2) });
    this.setState({ avg2:avg2.toFixed(2)});
  }
  componentDidMount() {
   
    //this.averagemarks()
    this.handleSearch(
      this.props.route.params.name,
      this.props.route.params.classGrade,
    );
  }
  handleSearch = async (name, classGrade) => {
    let searchkey = name.toUpperCase() + classGrade;
    console.log(searchkey);

    let studentname;
    await firebase
      .database()
      .ref('/reports/' + searchkey)
      .on('value', (snapshot) => {
        studentname = snapshot.val();
        this.setState({ sdetails: studentname });
      });
  };


  render() {
    return (
      <ImageBackground
        source={require('../assets/bg1.jpg')}
        style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginTop: 10 }}>
          <Image
            source={require('../assets/logo2.png')}
            style={styles.iconImage}></Image>
          <Text style={styles.titletext}>𝙰𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜</Text>


        </View>

        {!this.state.sdetails ? (
          <Text style={styles.noStudentText}>
            No Student Data Available. Please check the student name and class
            number
          </Text>
        ) : (
          <ScrollView>
            <View style={styles.cardContainer}>
              <View style={{
                flexDirection: 'row', width: RFValue(300), justifyContent: 'space-around', alignSelf: 'center', alignContent: 'center',
                height: 40,
                marginTop: 10,
                borderColor: '#73A9AD',
                backgroundColor: '#C4DFAA',
                borderRadius: RFValue(20), borderEndWidth: RFValue(3),
              }}>
                <Text style={styles.reportInfo}>
                  Name : {this.state.sdetails.name}
                </Text>
              
                <Text style={styles.classText}>
                  𝙲𝚕𝚊𝚜𝚜 : {this.state.sdetails.classGrade}
                </Text>
              </View>


              <View style={{ flexDirection: 'row', alignContent: 'space-around', marginTop: 5, justifyContent: 'space-around' }}>
                <Text
                  style={{
                    marginTop: RFValue(10),
                    color: '#73A9AD',
                    fontSize: RFValue(25),
                    fontWeight: 'bold',

                  }}>
                  𝙵𝚊1
                </Text>
                <Text
                  style={{
                    marginTop: RFValue(10),
                    color: '#73A9AD',
                    fontSize: RFValue(25),
                    fontWeight: 'bold',
                    marginLeft: RFValue(50),

                  }}>
                  𝙵𝚊2
                </Text>
              </View>


              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝙴𝚗𝚐𝚕𝚒𝚜𝚑 : {this.state.sdetails.engmarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝙴𝚗𝚐𝚕𝚒𝚜𝚑 : {this.state.sdetails.engmarks2}
                </Text>
              </View>


              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝙼𝚊𝚝𝚑 : {this.state.sdetails.mathmarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝙼𝚊𝚝𝚑 : {this.state.sdetails.mathmarks2}
                </Text>
              </View>


              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝚂𝚌𝚒𝚎𝚗𝚌𝚎 : {this.state.sdetails.sciencemarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝚂𝚌𝚒𝚎𝚗𝚌𝚎 : {this.state.sdetails.sciencemarks2}
                </Text>
              </View>

              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝚂𝚘𝚌𝚒𝚊𝚕 : {this.state.sdetails.socialmarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝚂𝚘𝚌𝚒𝚊𝚕 : {this.state.sdetails.socialmarks2}
                </Text>
              </View>

              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝙷𝚒𝚗𝚍𝚒: {this.state.sdetails.hindimarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝙷𝚒𝚗𝚍𝚒: {this.state.sdetails.hindimarks2}
                </Text>
              </View>

              <View style={styles.subz}>
                <Text style={styles.reportInfo}>
                  𝚃𝚎𝚕𝚞𝚐𝚞: {this.state.sdetails.telugumarks}
                </Text>
                <Text style={styles.reportInfo}>
                  𝚃𝚎𝚕𝚞𝚐𝚞: {this.state.sdetails.telugumarks2}
                </Text>
              </View>


              <View style={styles.others}>
                <Text style={styles.attendenceText}>
                  𝙰𝚝𝚝𝚎𝚗𝚍𝚊𝚗𝚌𝚎 : {this.state.sdetails.attendence}
                </Text>
              </View>
              {/* <View style={{
                      width:320,
                      height:50,
                      borderWidth: RFValue(3),
                      borderRadius: RFValue(20),
                      backgroundColor: '#73A9AD',
                      borderColor: '#C4DFAA',
                      marginTop:20,
                      alignContent:'space-around',
                      justifyContent:'space-around',
                      flexDirection:'row',
                      marginLeft:20,
                                         
              }}>
                <Text style={styles.reportInfo}>
                  𝙶𝙿𝙰1 : {this.state.avg}
              </Text>
              <Text style={styles.reportInfo}>
                  𝙶𝙿𝙰2 : {this.state.avg2}
              </Text>                      
              </View>      */}
              <View style={{ marginLeft:20}} >

                <TouchableOpacity onPress={this.averagemarks} >
                <Text style={styles.absentText}>
                   Click to know your FA1 and FA2 averages
                  </Text> 
                  </TouchableOpacity>
              </View>
<View style={styles.subz}>
                 
                    <Text style={{alignSelf:'center',fontSize:15,fontWeight:'bold',color: '#233E8B',}}>  𝙵𝚊1 :
                    {this.state.avg}</Text>
                    <Text style={{alignSelf:'center',fontSize:15,fontWeight:'bold',color: '#233E8B',}}>
                      𝙵𝚊2 :
                    {this.state.avg2}
                    </Text>

                    </View>

               
            </View>
          </ScrollView>
        )}


        {/* </View> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: '#F5F0BB',
    borderRadius: RFValue(20),
    marginTop: RFValue(10),

  },

  titletext: {
    textAlign: 'center',
    color: '#FAAB78',
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  classText: {
    marginTop: 10,
    color: '#233E8B',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: -1,
    marginTop: 7,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 40
  },
  name: {
    width: 160,
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: '#C4DFAA',
    borderColor: '#73A9AD',
    marginLeft: 2,
    marginTop: 10,
  },
  reportInfo: {
    marginTop: 10,
    color: '#233E8B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  classGrade: {
    width: 110,
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: '#C4DFAA',
    borderColor: '#73A9AD',
    marginLeft: 200,
    marginTop: -48,
  },
  subz: {
    width: ScreenWidth-60,
    height: RFValue(60),
    borderWidth: RFValue(3),
    borderRadius: RFValue(20),
    backgroundColor: '#C4DFAA',
    borderColor: '#73A9AD',
    marginLeft: RFValue(15),
    marginTop: RFValue(10),
    alignContent: "center",
    justifyContent: 'space-around',
    flexDirection: 'row', 
   
  },


  others: {
    width: 150,
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4DFAA',
    borderColor: '#73A9AD',
    marginLeft: 20,
    marginTop: 20,
  },
 
  attendenceText: {
    alignSelf: 'center',
    //marginTop: 10,
    color: '#233E8B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  absentText: {
    marginTop: 10,
    color: '#233E8B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  noStudentText: {
    marginTop: 30,
    marginLeft: 40,
    color: 'red',
    fontSize: 22,
   
  },

});
