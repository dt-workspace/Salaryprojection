

export function themeFormatter (isDarkMode:boolean){
    let theme = {
      primaryColor: isDarkMode ? "#023047" : "#D1F0D2",
      onPrimaryColor: isDarkMode ? "white" : "green",
      backgroundColor: isDarkMode
        ? "rgba(2, 48, 71, .5)"
        : "rgba(243,243,243,1)",
      onBackgroundColor: isDarkMode ? "white" : "green",
      textColor: isDarkMode ? "white" : "black",
    };
    return theme
  }