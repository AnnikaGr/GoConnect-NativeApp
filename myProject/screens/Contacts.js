import React from "react";
import { View, Text } from "react-native";
import useContacts from "../Hooks/useHooks";


export default function Contacts() {
    const contacts = useContacts()
    return (
        <View>
            <Text>{JSON.stringify(contacts)}</Text>
        </View>
    )
}