import { height } from '@mui/system';
import { logDOM } from '@testing-library/react';
import React, { useCallback, useState } from 'react';
import ListItem from './ListItem';

function UseCallBack(props) {
    const [dark, setDark] = useState(false);
    const [number, setNumber] = useState(0);

    const theme = {
        backgroundColor : dark ? 'black' : 'white' ,
        color : dark ? 'white' : 'black',
        height : "100vh"
    }

    const getItem = useCallback(
        (i) => {
            return [i+number, i+number+1, i+number+2]
        },
    [number] )
    console.log(getItem);


    return (
        <div style={theme}>
            <button onClick={(e) => {setDark(!dark)}}>Change Theme</button>
            <input type="number" placeholder="Please Enter Number" onChange={(e) => {setNumber(parseInt(e.target.value))}} />

        <ListItem getItem={getItem} />
        </div>
    );
}

export default UseCallBack;