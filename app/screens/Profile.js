import { StatusBar} from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import Constants from 'expo-constants'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import {pickImage, askForPermission, upLoadImage} from '../utils'
import { auth, db } from '../firebase'
import { updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {

    const [displayName, setDisplayName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })()
    }, [])

    async function handlePress() {
        const user = auth.currentUser
        let photoURL
        if (selectedImage) {
            const {url} = await upLoadImage(selectedImage, `images/${user.uid}`, 'profilePicture');
            photoURL = url;
        }

        const userData = {
            displayName,
            email: user.email
        }

        if (photoURL) {
            userData.photoURL = photoURL
        }

        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid),  {...userData, uid: user.uid})
        ])
        navigation.navigate('Overview1')
    }

    async function handleProfilePicture() {
        const result = await pickImage()
        if (!result.cancelled) {
            setSelectedImage(result.uri)
        }
    }

    if (!permissionStatus) {
        return <Text>Loading...</Text>
    }

    if (permissionStatus != 'granted') {
        return <Text>You need to give permission</Text>
    }

    return (
        <React.Fragment>
            <StatusBar style="auto"/>
            <View style={{paddingTop: 30, alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20, }}>
                <Text style= {styles.profileTitle}>Profile</Text>
                <Text style= {styles.subHeading}>Set up your profile picture and a short bio</Text>  
                <TouchableOpacity 
                    onPress={handleProfilePicture}
                    style={{
                        marginTop: 30, 
                        borderRadius: 120, 
                        width: 120, 
                        height: 120, 
                        backgroundColor: '#8E97FD', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>

                    {!selectedImage ? (
                            <MaterialCommunityIcons name="camera-plus" color='white' size={45}/>
                        ) : (
                            <Image source={{uri: selectedImage}} style={{width: '100%', height: '100%', borderRadius: 120}}/>
                        )}
                </TouchableOpacity> 

                <TextInput 
                    placeholder='Name'
                    value={displayName}
                    onChangeText={setDisplayName}
                    style={{borderBottomColor: '#8E97FD', marginTop: 40, borderBottomWidth: 2, width: '100%'}}
                />
                <View style={{marginTop: 60, width: 80, }}> 
                    <Button
                        title="Next"
                        color='#8E97FD'
                        onPress={handlePress}
                        disabled={!displayName}
                        
                    />
                </View>
                
            </View>
            
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
   
    profileTitle: {
        fontSize: 22,
        color: 'black',
        padding: 10,
    },

    subHeading: {
        fontSize: 14,
        color: '#3F414E',
        padding: 10,
    },

})