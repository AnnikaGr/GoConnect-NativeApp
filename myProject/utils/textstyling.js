 import React, { useEffect, useState } from 'react';
 import { StyleSheet, Text, View, Image } from 'react-native';

var fontRegular;

 export default function TextStyling() {
   // use state for font status.
   const [isFontReady, setFontReady] = useState(false)


   useEffect(() => {
     async function loadFont() {
       return await Font.loadAsync({
         athiti: require('../assets/fonts/Athiti-Regular.ttf'),
       });
     }
     // after the loading set the font status to true
     loadFont().then(() => {
       setFontReady(true);
     });
   }, []);
 }

  export const textstyles = StyleSheet.create({

        h1: {
         fontSize: 34,
         fontWeight: '900'
        },

        h2: {
          fontSize: 25,
          fontWeight: 'normal'
        },

        h3: {
          fontSize: 14,
          fontWeight: 'normal'
        }
       });

