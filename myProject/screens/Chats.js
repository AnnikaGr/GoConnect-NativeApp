import { collection, onSnapshot, onSnapshotsInSync, query, QuerySnapshot, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import GlobalContext from '../Context/Contexts'
import { auth, db } from "../firebase";

export default function Chats() {
    const {currentUser} = auth;
    const {rooms, setRooms} = useContext(GlobalContext);

    const chatsQuery = query(
        collection(db, 'rooms'),
        where('participentsArray', 'array-contains', currentUser.email )
    );

    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (QuerySnapshot) => {
            const parsedChats = QuerySnapshot.docs.filter(doc => doc.data().lastMessage).map((doc) => ({
                ...doc.data(),
                id: doc.id,
                userB: doc.data().participents.find(p=> p.email != currentUser.email),
            }));
            setRooms(parsedChats)
        });
        return () =>  unsubscribe();
    }, [])

    return (
        <View style={{flex: 1, padding: 5, paddingRight: 10}}>
            <Text>Chat</Text>
        </View>
    )
}