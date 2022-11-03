import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useAssets} from 'expo-asset'
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../firebase';
import {Ionicons} from '@expo/vector-icons'


import Overview1 from '../Overview1'
import Home from '../screens/Home'
import Login from "../screens/Login";
import Signup from "../screens/Signup"
import Profile from "../screens/Profile"
import Chats from "../screens/Chats"
import Photo from "../screens/Photo"
import Contacts from '../screens/Contacts'


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const RootStack = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            if (currentUser){
            setUser(currentUser);
            }

        });
        return () => unsuscribe();
    }, []);


    if (loading) {
        return <Text>Loading...</Text>
    }


    /*
    return(
        <NavigationContainer>
            {!user ? (
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>

            ):(

                <Stack.Navigator
                    screenOptions={({ route, navigation }) => ({
                        headerShown: false,
                    })}
                        initialRouteName="Home"
                >
                {!user.displayName && (
                     <Stack.Screen name="Profile" component={Profile} />
                )}

                <Stack.Screen name="Overview1" component={Overview1} />
               
                <Stack.Screen name="userlistAndChat" component={userlistAndChat} />
                <Stack.Screen name="Contacts" component={Contacts} />

                </Stack.Navigator>

            )}
        </NavigationContainer>
    )*/

    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
            })}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Overview1" component={Overview1} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="userlistAndChat" component={userlistAndChat} />
                <Stack.Screen name="Contacts" component={Contacts} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

function userlistAndChat(){
    return (
    <Tab.Navigator 
        style = {{marginTop: 30, marginColor: 'blue'}}
        screenOptions = {({route}) => {
            return {
                tabBarLabel: () => {
                    if (route.name == 'photo') {
                        return <Ionicons name='camera' size ={20} color = 'white'/>
                    } else {
                        return (
                            <Text style={{color: 'white'}}>
                                {route.name.toLocaleUpperCase()}
                            </Text>
                        );
                    }
                },
                tabBarShowIcon: true,
                tabBarLabelStyle: {
                    color: 'white'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'white'
                },
                tabBarStyle: {
                    backgroundColor: '#8E97FD'
                }
            };
        }}

        initialRouteName = 'chats'

    >
        <Tab.Screen name="photo" component={Photo}/>
        <Tab.Screen name="chats" component={Chats}/>
    </Tab.Navigator>
    );
}

function Main() {
    const [assets] = useAssets(
      //require("./assets/fonts"),
      require("../assets/adaptive-icon.png"),
      require("../assets/favicon.png"),
      require("../assets/icon.png"),
      require("../assets/splash.png"),
      require("../assets/stockimage1.png")
    )
    if (!assets){
      return <Text>Loading...</Text>
    }
    return <RootStack/>
  }

export default Main;

