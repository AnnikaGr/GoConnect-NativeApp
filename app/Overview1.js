import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

import Overview from './screens/Overview';
import ReloadIcon from './components/ReloadIcon';

import { colors } from './utils/index';
import {textstyles} from './utils/textstyling'

import {getCurrentUser } from './utils'
import { updateUserLocation, getNearUsersFromDb } from './utils/location_utils'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function Overview1() {
const [errorMessage, setErrorMessage] = useState(null)
const [NearUserList, setNearUserList] = useState()
const MINUTE_MS = 60000;
useEffect(() => {
  const interval = setInterval(() => {
    load()
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])

 async function load() {
     userUid= "BHYBQx6F4IaAGvmZFZUoh9C0oGg2"
     //userUid = getCurrentUser()

     console.log("Load called")

     try {
                     let { status } = await Location.requestPermissionsAsync()

                     if (status !== 'granted') {
                         console.warn('Access to location is needed to run the app')
                         return
                     }
                     const location = await Location.getCurrentPositionAsync()

                     const { latitude, longitude } = location.coords

                     //updateUserLocation(longitude, latitude, userUid)

                     userProfiles = await getNearUsersFromDb(userUid)

                     setNearUserList(userProfiles)

                     //TODO handle in frontend

                 } catch (error) {
                     console.warn(error)
      }
 }


 if (NearUserList) {
        return (
              <Overview NearUserList={NearUserList}/>

        )
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={textstyles.h3} style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
                   <View style={styles.container}>
                       <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                       <StatusBar style="auto" />
                   </View>
               )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
