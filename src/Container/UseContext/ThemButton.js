import React, { useContext } from 'react';
import { ThemeContext } from './Apps';

function ThemButton(props) {

    const theme = useContext(ThemeContext);

    return (
        <div>
            <input type="radio" id="javascript" style={{background:theme.background, color:theme.foreground}}>Change Theme</input>
        </div>
    );
}

export default ThemButton;