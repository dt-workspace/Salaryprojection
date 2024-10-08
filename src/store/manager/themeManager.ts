import { createSlice } from "@reduxjs/toolkit";

const DarkTheme: themeProps = {
  primaryColor: "#023047",
  onPrimaryColor: "white",
  backgroundColor: "rgba(2, 48, 71, .5)",
  onBackgroundColor: "white",
  textColor: "white",
};

const LightTheme = {
  primaryColor: "#D6EFD8",
  onPrimaryColor: "#1A5319",
  backgroundColor: "rgba(243,243,243,1)",
  onBackgroundColor: "green",
  textColor: "black",
};

const themeManager = createSlice({
  name: "app/themeManager",
  initialState: {
    theme: LightTheme,
    isDarkMode: true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.theme = state.isDarkMode ? LightTheme : DarkTheme;
      state.isDarkMode = !state.isDarkMode;
    },
    toggleLightMode: (state) => {
      state.theme = LightTheme;
      state.isDarkMode = false;
    },
  },
});

export const { toggleDarkMode, toggleLightMode } = themeManager.actions;
export default themeManager.reducer;
