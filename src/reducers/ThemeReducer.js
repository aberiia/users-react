const initialTheme = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme"))
  : "light";

export const themeReducer = (state = initialTheme, action) => {
  switch (action.type) {
    case "APPLY_APP_THEME":
      return (state = action.payload);
    default:
      return state;
  }
};
