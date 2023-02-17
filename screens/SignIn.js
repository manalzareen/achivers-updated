import React from "react"
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import db from "../config"
import firebase from "firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SelectList } from 'react-native-dropdown-select-list'
import { ScreenHeight } from "react-native-elements/dist/helpers";

const { height } = Dimensions.get("window");

const SPACING = 10;

export default class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            secureTextEntry: true,
            role: '',
            rolePart: '',

        }
    }

    changeSecureText = () => {

        this.setState({ secureTextEntry: !this.state.secureTextEntry })
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                if (this.state.email != "" && this.state.password != "" && this.state.role != "") {
                    const user = firebase.auth().currentUser.uid;
                    var roleVal = firebase.database().ref('users/' + user);
                    roleVal.on('value', (snapshot) => {
                        let Dbdata = snapshot.val().role;

                        this.setState({ rolePart: Dbdata })
                    });

                    console.log("Rolepart", this.state.rolePart)
                    if (this.state.rolePart != "") {
                        if (this.state.rolePart == this.state.role && this.state.role == "Teacher") {
                            alert('Welcome back!');
                            this.props.navigation.navigate('CrFeed');
                        }
                        else if (this.state.rolePart == this.state.role && this.state.role == "Student") {
                            alert('Welcome back!');
                            this.props.navigation.navigate('StudentId');
                        }
                        else {
                            alert("Oops seems like you have chosen the entered an incorrect role");
                        }
                    }
                    else {
                        alert("Something went wrong! Please choose the role again!")
                    }
                }
                else {
                    alert("Please fill in all the fields!")
                }

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    sendEmail = () => {
        if (this.state.email != "") {
            firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                    alert('Email sent')
                })

                .catch((error) => {

                    var errorMessage = error.message;
                    alert(errorMessage)

                });
        }
        else {
            alert("Please enter the email id")
        }

    }






    render() {
        const data = [

            { key: '1', value: 'Teacher' },
            { key: '2', value: 'Student' },

        ]
        return (
            
                <KeyboardAwareScrollView style={{flex:1}}>
    
                <ImageBackground source={require('../assets/bg4.jpg')} style={{ 
                  height: height,
                  //padding: SPACING * 2,
                 // marginTop: 50,
                  }}>
                    <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
                    <Image
                source={require('../assets/logo2.png')}
                style={styles.iconImage}></Image>
                <Text style={styles.titletext}>𝙰𝚌𝚑𝚒𝚎𝚟𝚎𝚛𝚜</Text>
    
              
                </View>
               
    
                <View style={{
  //padding: SPACING * 1,
            //paddingTop: SPACING * 2,
            height:ScreenHeight/1.4,
            width:ScreenHeight/1.9,
            alignSelf:'center',
            marginTop: SPACING +60,
            //marginLeft: - SPACING * -0.7,
            borderTopLeftRadius: SPACING * 6,
            borderTopRightRadius: SPACING * 6,
            borderBottomLeftRadius: SPACING * 6,
            borderBottomRightRadius: SPACING * 6,
            backgroundColor: 'white'}}>
    
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%', color: '#064663' }}>𝚂𝚒𝚐𝚗𝙸𝚗</Text>
                        <View style={{ flexDirection: 'row', marginTop: '5%', alignSelf: 'center', width: '85%', justifyContent: 'center', marginLeft:9,alignItems: 'center' }}>
                            <FontAwesome5 name="at" size={24} color="#064663" />
    
                            <TextInput style={{width: "90%",
                                            height: "75%",
                                        borderWidth: 3,
                                        borderRadius: 35,                                   
                                        borderColor: '#064663',
                                        backgroundColor:"#EEEEEE",
                                        marginLeft: 10,
                                        marginTop:10,
                                        padding:20
                                        }} placeholder=    'Enter Email Id' onChangeText={(val) => { this.setState({ email: val }); }} />
                                                        </View>
    
                        <View style={{ flexDirection: 'row', marginTop:'5%', alignSelf: 'center', width: '95%', justifyContent: 'center',alignItems: 'center' }}>
                            <Ionicons name="lock-open" size={24} color="#064663"  />
                
                            <TextInput style={{ width: "80%",
                                            height: "80%",
                                        borderWidth: 3,
                                        borderRadius: 35,                                   
                                        borderColor: '#064663',
                                        backgroundColor:"#EEEEEE",
                                        marginLeft: 10,
                                        marginTop:5,
                                        alignItems:"center",
                                        padding:20,
                                        justifyContent :"center"}}  secureTextEntry={this.state.secureTextEntry} placeholder='Password' onChangeText={(val) => { this.setState({ password: val })}}/>
                            <TouchableOpacity  style = {{marginLeft:-40, marginTop:10}}onPress={this.changeSecureText}>
                            {this.state.secureTextEntry? <Entypo name="eye-with-line" size={20} color="black" />: <Entypo name="eye" size={20} color="black" />}
                            </TouchableOpacity>
                        
                          
                            
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 12, alignSelf: 'center' }}>
                          <SelectList setSelected={(val)=>{this.setState({role:val})}}
                          data={data}
                          save="value"
                          maxHeight={90}
                          >
    
    
    
    
                          </SelectList>
                        </View>
    
    
    
                        <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: '#FAAB78', justifyContent: 'center', alignItems: 'center', borderRadius: 10, alignSelf: 'center', marginTop: '10%' }} onPress={() => { this.login() } }>
                            <Text style={{ fontWeight: 'bold', color: '#064663', fontSize: 20 }}>𝚂𝚒𝚐𝚗𝙸𝚗</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{alignSelf:'center',marginTop:15}}  onPress={() => { this.sendEmail() }}>
                        <Text style={{ fontWeight: 'bold', color:"#064663", fontSize: 15,borderRadius:10 }} >Forgot Password?</Text>
                        </TouchableOpacity>
                
                        </View>
    
                        </ImageBackground>
                
                </KeyboardAwareScrollView>
            )
        }
    }
    const styles = StyleSheet.create({
       
        androidView: {
            marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
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
    })