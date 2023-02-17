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
  Dimensions,
  
 } from 'react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
 import firebase from "firebase"
 import { RFValue } from 'react-native-responsive-fontsize';
 import { MaterialIcons } from '@expo/vector-icons';
 const screenheight = Dimensions.get("window").height;
 import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
export default class StudentId extends Component {
  constructor(){
    super()
    this.state={
     sdetails:""
    }
  }
  handleSearch = async (name,classGrade) =>{
      let searchkey=name.toUpperCase()+classGrade;
      console.log(searchkey)

      let studentname;
      await firebase
            .database()
            .ref( "reports/"+searchkey)
            .on("value",(snapshot)=>{
              studentname=snapshot.val()
              this.setState({sdetails:studentname})
            })

  }
  logOut=()=>{
    firebase.auth().signOut().then(() => {
      alert('Logged out');
      this.props.navigation.navigate('Home')
    }).catch((error) => {
      alert(error.message)
    });
  }

  



  render() {
    return (

    <KeyboardAwareScrollView style={{flex:1}}>
      <ImageBackground
style={styles.container}
        source={require('../assets/bg4.jpg')}
        >
        <SafeAreaView style={styles.androidView} />

           <View style={{marginRight: 15,alignSelf:'flex-end'}}>
                 <AntDesign name="logout" size={24} color="white" onPress={()=>firebase.auth().signOut().then(() => {
       alert('Logged Out!!');
       this.props.navigation.navigate("Home")
      }).catch((error) => {
       
       alert("Oops something went wrong! Try again later.")
      })} /></View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/logo2.png')}
            style={styles.iconImage}></Image>
          <Text style={styles.titletext}>𝙰𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜</Text>


        </View>
       <View style={{alignItems:'center' ,alignContent:'center',justifyContent:'center',marginTop:10}}>
       <TextInput
            style={styles.input1}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'Student Name'}
            placeholderTextColor={'#E6BA95'}
            placeholderColor={'#FAAB78'}
          />
          <TextInput
            style={styles.input1}
            onChangeText={(classGrade) => this.setState({ classGrade})}
            placeholder={'Student Class'}
            placeholderTextColor={'#E6BA95'}
            placeholderColor={'#FAAB78'}
          />

<TouchableOpacity
          style={styles.routeButton} 
          onPress={()=>this.props.navigation.navigate("Search",{name:this.state.name,
          classGrade:this.state.classGrade
          
          })}>
          <Text style={styles.routeText}>𝓢𝓾𝓫𝓶𝓲𝓽</Text>
        </TouchableOpacity>
       </View>
        
       
      </ImageBackground>
      </KeyboardAwareScrollView>

    )
    }
  }

const styles = StyleSheet.create({
  container: {
   //flex:1,
    height:ScreenHeight,

   },
   androidView: {
     marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
   },
   titletext: {
    textAlign: 'center',
    color: '#FAAB78',
    fontSize: RFValue(50),
    fontWeight: 'bold',
    marginLeft: 5,
    //marginTop: RFValue(45),
    //marginRight: RFValue(-60),
  },
  iconImage: {
    width: 50,
    height: 50,
    //marginRight: RFValue(3),
    //marginTop:   RFValue(-60),
    // marginLeft: RFValue(3),
    borderRadius: 40
  },
  input1: {
    width:  "50%",
  alignSelf:'center',
  height:'18%',
    backgroundcolor: '#ECF9FF',
    color: 'white',
    borderWidth: RFValue(3),
    borderRadius: RFValue(25),
    borderColor: '#E6BA95',
    textAlign:"center",
    marginTop: RFValue(25),
     marginLeft:RFValue(1)
  },

  routeButton: {
    width: "60%",
    height: "10%",
    backgroundColor:"white",
    alignSelf:"center",
    marginTop: RFValue(50),
    borderRadius: RFValue(24),
    alignitems:"center",
    alignContent:"center"
  },
  routeText: {
    //marginTop: RFValue(17),
    alignSelf:'center',
    //marginLeft: RFValue(30),
    fontSize:RFValue(27),
    color: '#064663',
  },
});
