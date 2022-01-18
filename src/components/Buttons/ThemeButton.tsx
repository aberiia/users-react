import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyTheme } from "../../redux/actions/applyTheme";
import { RootState } from "../../redux/store/store";
import "./Buttons.css";

export default function ThemeButton() {
  const initTheme: string = useSelector((state: RootState) => state.theme);
  const [theme, setTheme] = useState(initTheme);
 
  const dispatch = useDispatch();
  const changeTheme = (theme:string) => dispatch(applyTheme(theme));
  const handleThemeChange = () => theme === "light" ? setTheme("dark") : setTheme("light")

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    changeTheme(theme);
    console.log('init theme', initTheme)
  }, [theme]);

  return (
    <div className="change-theme">
      <label htmlFor="input-theme-switch">
        Click to change theme to{" "}
        {theme === "light" ? (
          <span className="dark-span">dark</span>
        ) : (
          <span className="light-span">light</span>
        )}
      </label>
      <input
        onClick={handleThemeChange}
        type="checkbox"
        id="input-theme-switch"
      />
    </div>
  );
}
