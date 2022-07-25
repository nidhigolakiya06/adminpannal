import React, { createContext } from 'react';
import ToolBar from './ToolBar';

function Apps(props) {

    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222"
        }
    };

 const ThemeContext = createContext(themes.light);
    return (
        <div>
            <ThemeContext.Provider value={themes.dark}>
                <ToolBar />
            </ThemeContext.Provider>
        </div>
    );
}

export { ThemeContext };
export default Apps;
