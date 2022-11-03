import React from 'react'
import { Text, View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'
import { ToggleButton } from 'react-native-paper';

import {textstyles} from '../utils/textstyling';

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


export default function FilterBar() {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'

    const [status1, setStatus1] = React.useState('checked');
    const onButtonToggle1 = value => {
        setStatus1(status1 === 'checked' ? 'unchecked' : 'checked');
      };
      const [status2, setStatus2] = React.useState('checked');
          const onButtonToggle2 = value => {
              setStatus2(status2 === 'checked' ? 'unchecked' : 'checked');
            };
            const [status3, setStatus3] = React.useState('checked');
                const onButtonToggle3 = value => {
                    setStatus3(status3 === 'checked' ? 'unchecked' : 'checked');
                  };
                  const [status4, setStatus4] = React.useState('checked');
                      const onButtonToggle4 = value => {
                          setStatus4(status4 === 'checked' ? 'unchecked' : 'checked');
                        };

    return (
        <View style={styles.container}>
        <Text style={textstyles.h3}> I´m interested to talk about </Text>
        <View style={styles.innercontainer}>

            <ToggleButton style={styles.toggleButton}
                  icon={()=><View><Text style={{color:PRIMARY_COLOR}}><Ionicons name='bicycle-outline' size={24} color={colors.PRIMARY_COLOR} /> {"\n"} Sports</Text></View>}
                  value="sports"
                  status={status1}
                  onPress={onButtonToggle1}
                />
                <ToggleButton style={styles.toggleButton}
                                  icon={()=><View style={styles.buttonInner}><Text style={{color:PRIMARY_COLOR}}><Ionicons name='earth-outline' size={24} color={colors.PRIMARY_COLOR} /> {"\n"} Politics</Text></View>}
                                  value="politics"
                                  status={status2}
                                  onPress={onButtonToggle2}
                                />
                <ToggleButton style={styles.toggleButton}
                                                  icon={()=><View><Text style={{color:PRIMARY_COLOR}}><Ionicons name='color-palette-outline' size={24} color={colors.PRIMARY_COLOR} /> {"\n"} Art</Text></View>}
                                                  value="art"
                                                  status={status3}
                                                  onPress={onButtonToggle3}
                                                />
               <ToggleButton style={styles.toggleButton}
                                                                 icon={()=><View><Text style={{color:PRIMARY_COLOR}}><Ionicons name='train-outline' size={24} color={colors.PRIMARY_COLOR} /> {"\n"} Travels</Text></View>}
                                                                 value="travels"
                                                                 status={status4}
                                                                 onPress={onButtonToggle4}
                                                               />

        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    paddingTop:10
    },
    innercontainer:{
    padding:10,
    flexDirection: 'row'
    },
    toggleButton: {
    marginRight: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    },
    buttonInner:{
    alignSelf: 'center'
    },

    

})