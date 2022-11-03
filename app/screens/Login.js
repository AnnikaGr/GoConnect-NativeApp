import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from "formik";
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

import { auth } from '../firebase';
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

/*
import {
    StyledContainer,
    header,
    pageTitle,
    StyledFormArea,
    StyledInput,
    StyledButton,
    StyledInputLabel,
    ButtonText,
    Colors
} from '../components/style'*/

//const {grey}= Colors;
const login = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const navigation = useNavigation()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            navigation.navigate('Overview1')
        }
    })

    const handleLogIn  = async () => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((re) => {
            console.log(re);
        })
        .catch((re) => {
            console.log(re);
        })

    };

    return(
        <View style={styles.styledContainer}>
            <StatusBar> style = {{color: '#9CA3AF'}} </StatusBar>
            <View style={styles.innerContainer}>
                <Text style={styles.pageTitle}>Welcome Back!</Text>
                <Button style={styles.myButton} title='CONTINUE WITH FACEBOOK' backgroundColor='#7583CA' color='#F6F1FB' width={300} height={63} google={true} iconName='facebook'/>
                <View style={styles.line}></View>
                <Button style={styles.myButton} title='CONTINUE WITH GOOGLE' backgroundColor='#8E97FD' color='#F6F1FB' width={300} height={63} google={true} iconName='google'/>
                <Text style={styles.subTitle}>OR LOGIN WITH EMAIL</Text>
                <Formik
                    initialValues ={{username: '', password: ''}}
                    onSubmit={(values) =>{
                        console.log(values);
                    }}>
                        {({handleChange,handleBlur, handleSubmit, values})=> (<View style={styles.styledFormArea}>
                            <View>
                                <View style={styles.leftIcon}>
                                    <Octicons name="mail" size={30} color='#6D28D9'/>
                                </View>
                                <Text style={styles.styledInputLabel}>Email</Text>
                                <TextInput style={styles.styledTextInput}
                                    placeholder = "userAndy00@gmail.com"
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText= {text => setEmail(text)}
                                    //onBlur= {handleBlur('username')}
                                    //value={values.username}
                                    />
                            </View>

                            <View>
                                <View style={styles.leftIcon}>
                                    <Octicons name="lock" size={30} color='#6D28D9'/>
                                </View>
                                <Text style={styles.styledInputLabel}>Password</Text>
                                <TextInput style={styles.styledTextInput}
                                    placeholder = "* * * * * * * * *"
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText= {text => setPassword(text)}
                                    //onBlur= {handleBlur('username')}
                                    //value={values.username}
                                    secureTextEntry = {hidePassword}
                                    />
                                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidePassword(!hidePassword)} >
                                    <Ionicons name={hidePassword ? 'md-eye-off': 'md-eye'} size={30} color='#9CA3AF'/>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.msgBox}>...</Text>
                            {/*<Button style={styles.myButton} title='LOG IN' backgroundColor='#8E97FD' color='#F6F1FB' width={300} height={63}/>*/}
                            
                            <TouchableOpacity style={styles.button} onPress = {() => {navigation.navigate("Overview1")}, handleLogIn}>
                            <Text style={styles.text}>LOG IN</Text>
                            </TouchableOpacity>



                            <Text style={styles.forgotPassword}>Forgot your password?</Text>

                            <View style={styles.extraView}>
                                <Text style={styles.extraText}>
                                    Don't have an account already?
                                </Text>
                                <TouchableOpacity style={styles.textLink}>
                                    <Text style={styles.textLinkContent} 
                                    onPress = {() => {navigation.navigate("Signup")}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            </View>)}   
                </Formik>
            </View>
        </View>
    );

};

export default login;

const styles = StyleSheet.create({
    styledContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom:70
    },

    innerContainer: {
        flex: 1,
        margin: 25,
        alignItems: 'center',

    },

    pageTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#3F414E',
        padding: 10,
        paddingRight: 25,
    },

    subTitle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#A1A4B2',
        padding: 10,
        paddingLeft: 15,
        paddingBottom: 35,
        paddingTop: 30
    },

    forgotPassword: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#A1A4B2',
        padding: 10,
        paddingLeft: 15,
    },



    styledTextInput: {
        backgroundColor: '#E5E7EB',
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 10,
        fontSize: 16,
        height: 60,
        //width: 330,
        marginVertical: 3,
        marginBottom: 10,
        color: '#1F2937',
    },

    styledInputLabel: {
        color: '#1F2937',
        fontSize: 13,
        textAlign: 'left',
    },

    leftIcon: {
        left: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },

    rightIcon: {
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },

    styledButton: {
        padding: 15,
        backgroundColor: '#8E97FD',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
        height: 60,

    },

    styledButtonGoogle: {
        padding: 15,
        backgroundColor: '#7583CA',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
        height: 60,

    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },

    buttonTextGoogle: {
        color: '#ffffff',
        fontSize: 16,
        padding: 25,
    },

    //Text
    msgBox: {
        textAlign: 'center',
        fontSize: 13,
    },

    //View
    line: {
        height: 1,
        width: 340,
        backgroundColor: '#9CA3AF',
        marginVertical: 10,
    },

    //touchable opacity
    textLink: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    //text
    textContent: {
        color: 'black',
        fontSize: 15,

    },

    extraView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',

    },

    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        color: '#A1A4B2',
        fontSize: 15,
        paddingRight: 5,
    },

    //touchable opacity
    textLink: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    //text

    textLinkContent: {
        color: '#0033CC',
        fontSize: 15,
    },

    //Styling for button component. Delete if not in use!
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 38,
        flexDirection: 'row',
        backgroundColor:'#8E97FD',
        width: 300,
        height: 63,
      },
    
      text: {
          fontFamily: "Athiti_400Regular",
          fontStyle: 'normal',
          fontSize: 18,
          letterSpacing: 0.05,
          color: '#F6F1FB',
      },
    
      icon: {
        paddingRight: 25,
      },


})