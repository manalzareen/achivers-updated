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
  } from 'react-native';
  import { RFValue } from 'react-native-responsive-fontsize';
  import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
  export default class Home extends Component {
    render() {
      return (
        <ImageBackground
          source={require('../assets/bg4.jpg')}
          style={styles.container}>
          <SafeAreaView style={styles.androidView} />
          <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
              <Image
          source={require('../assets/logo2.png')}
          style={styles.iconImage}></Image>
          <Text style={styles.titletext}>𝙰𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜</Text>

        
          </View>


          <Text style={{alignSelf:'center' , color:'#FFFBEB',fontWeight:"normal",marginTop:20, fontSize:30}}>W𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘 𝚊𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜
</Text>
          <Image
            source={require('../assets/picture.webp')}
            style={styles.bookImage}></Image>

           <Text style={{alignSelf:'center' , color:'#FFFBEB',fontWeight:'bold',marginTop:20, marginLeft:-15, fontSize:20}}>"“Live as if you were to die tomorrow.</Text>

           <Text style={{alignSelf:'center' , color:'#FFFBEB',fontWeight:'bold',marginTop:10,fontSize:20}}>Learn as if you were to live forever.” </Text>
  
        <TouchableOpacity
        style={styles.getbox}
        onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.gettext}>Get Started </Text>
        </TouchableOpacity>
      
        </ImageBackground>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
     flex:1,
     height:ScreenHeight,
     width:ScreenWidth,
     borderRadius:"3px",
    // marginLeft:-1,
     alignContent:'center',
     alignItems:'center',
     alignSelf:'center'
     //marginTop:30

    },
    androidView: {
      marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    },
    
    getbox:{
      width: 200,
      height:40,
      backgroundColor: '#FFFBEB',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: RFValue(70)  ,
      alignSelf:'center', 
     
      marginTop:20
    },
    gettext:{
      fontSize: RFValue(30),
      color: '#FAAB78',
      alignSelf:'center',
      fontWeight:"bold"
    },
    titletext: {
      textAlign: 'center',
      color: '#FAAB78',
      fontSize: RFValue(50),
      fontWeight: 'bold',
     // marginTop: RFValue(40),
      marginLeft: 5,
    },
  
  iconImage: {
      width: 50,
      height: 50,
     
     // marginLeft: RFValue(-325),
     // marginRight:RFValue(290),
      borderRadius:30
    },
    bookImage: {
      width: 250,
      height: 260,
      marginRight: RFValue(70),
      marginTop: RFValue(30),
      marginLeft: RFValue(60),
      borderRadius:90
    }
  });
