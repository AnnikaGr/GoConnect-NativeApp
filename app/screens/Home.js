import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image
            style={styles.image}
            source={require('../assets/stockimage1.png')}
      />
        <Text style={styles.heading}>Lorem Ipsum</Text>
        <Text style={styles.smallHeading}>Meet People next to you.</Text>
        
      <Button title='Sign Up' backgroundColor='#8E97FD' color='#F6F1FB' width={300} height={63} navigateTo='Signup'/>
      {/*<Button title='Already have an account? Log In' backgroundColor='#8E97FD'/>*/}
      <View style={styles.extraView}>
          <Text style={styles.extraText}>
              Already have an account?
          </Text>
          <TouchableOpacity style={styles.textLink}>
              <Text style={styles.textLinkContent} onPress = {() => {navigation.navigate("Login")}}>Log in</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbfd',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 'auto',
    paddingTop: 55,
    paddingBottom:70

  }, 


  /*
  homePage: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
  },*/

  heading: {
      fontSize: 30,
      color: '#3F414E',
      /*borderWidth: 1,
      borderColor: "thistle",*/
  },

  smallHeading: {
    fontSize: 20,
    color: '#7B7F9E',
    /*borderWidth: 1,
      borderColor: "thistle",*/
  
  },

  logIn: {
    fontSize: 15,
    letterSpacing: 0.05,
    color: '#A1A4B2',
  },

  image: {
    borderTopLeftRadius: 80,
    borderTopRightRadius: 110,
    borderBottomLeftRadius: 199,
    borderBottomRightRadius: 108,
    height: 260,
    width: 200,
    paddingBottom: 190,
  },

  extraView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
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
  }
});


