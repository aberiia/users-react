import React, { useState } from 'react';
import store from '../../store/store';
import './Buttons.css';

const dispatcher = (actionType, actionPayload) => {
    return store.dispatch({type: actionType, payload: actionPayload})
}
const initialTheme = store.getState();
export default function ThemeButton() {
    const [theme, setTheme] = useState(initialTheme.theme);
    
    const handleThemeChange = () => {
        localStorage.setItem("theme", JSON.stringify(theme));
        
        if(theme === "light"){
            setTheme("dark");
            dispatcher("SET_DARK_THEME", theme);
        } else{
            setTheme("light");
            dispatcher("SET_LIGHT_THEME", theme);
        }
    }
    return (
        <div className="change-theme">
            <label htmlFor="input-theme-switch">Click to change theme to {theme ==="light"? <span className='dark-span'>dark</span> : <span className='light-span'>light</span>}</label>
            <input onClick={handleThemeChange} type="checkbox" id="input-theme-switch" />
        </div>
    )
}
