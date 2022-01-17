const initialTheme = localStorage.getItem("theme")? JSON.parse(localStorage.getItem("theme")): null;

export const themeReducer = (state = initialTheme , action) => {
    switch (action.type) {
        case "SET_LIGHT_THEME":
            return state = "light";
            case "SET_DARK_THEME":
            return state = "dark";
        default:
            return state;
    }
};
