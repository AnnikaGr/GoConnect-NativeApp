import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'
import { View, Text, StyleSheet, Image } from 'react-native'
import {textstyles} from '../utils/textstyling'


import Button from '../components/Button'


const { PRIMARY_COLOR,
            SECONDARY_COLOR,
            BORDER_COLOR,
            BLUE,
            WHITE,
            HOVERBLUE,
            GREYTEXT,
            LIGHTYELLOW,
             LIGHTGREY,
             MEDIUMGREY,
             GREEN,
             RED} = colors

export default function NearUserPreview({ user }) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'


    return (
    <View style={styles.container}>
    <View style={styles.innerContainer}>
     <View style={styles.imgContainer}>
        <View style={styles.circularPortrait}>
            <Image source={{ uri: user.image }} style={{ width: 100, height: 100, borderRadius: 200 / 2 }} />

        </View>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
            <Text style={textstyles.h3}> {user.distance} meter </Text>
            <Text style={textstyles.h2}> {user.name} </Text>
            <Text style={textstyles.h3}> {user.profiletext} </Text>
         </View>
          <View style={styles.btnContainer}>
            <Button backgroundColor={PRIMARY_COLOR} title="Connect" width={100} height={33} />
          </View>
      </View>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    borderColor: LIGHTGREY,
    borderWidth:1,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  textContainer:{
  paddingLeft: 15
  },
  btnContainer:{
  paddingTop:10
  }

});