import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {useAssets} from 'expo-asset'
import RootStack from './navigators/RootStack';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase';



export default function App() {
  
  return (
    <RootStack/>
    
    /*
      <View style={styles.container}>
           <StatusBar />

      </View>*/
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 55,
      paddingBottom:70
    },
  });
