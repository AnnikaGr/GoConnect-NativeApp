import React, { useState } from "react";
import  Context from './Contexts'

export default function ContextWrapper(props) {
    const [rooms, setRooms] = useState([]);
    return (
        <Context.Provider value={{rooms, setRooms}} >{props.children}</Context.Provider>
    )
}