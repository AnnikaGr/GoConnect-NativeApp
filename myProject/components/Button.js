import React from 'react';
import { StyleSheet, Text, View,  Alert, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Fontisto} from '@expo/vector-icons'



import { 
    useFonts,
    Athiti_200ExtraLight,
    Athiti_300Light,
    Athiti_400Regular,
    Athiti_500Medium,
    Athiti_600SemiBold,
    Athiti_700Bold 
  } from '@expo-google-fonts/athiti';



export default function Button({title, backgroundColor, width, height, color, google, navigateTo, iconName}) {
    let [fontsLoaded, error] = useFonts({
        Athiti_400Regular
    })

    const navigation = useNavigation()

    return (
            <TouchableOpacity style={[styles.button, { width, height, backgroundColor}]}  onPress = {() => {
                if(navigateTo){
                    navigation.navigate(navigateTo)
                }
                else{}}}
            >
            <Text style={styles.text, {color}}>{title} </Text>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38,
    flexDirection: 'row',
  },

  text: {
      fontFamily: "Athiti_400Regular",
      fontStyle: 'normal',
      fontSize: 14,
      letterSpacing: 0.05,
      color: '#F6F1FB',
  },

  icon: {
    paddingRight: 25,
  },
 
});