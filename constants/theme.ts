const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",

  DarkGray: "#64748b",
  DarkGray50: "rgba(100,116,139,0.5)",
  MediumGray: "#83829A",
  LightGray: "#D9D9D9",

  white: "#FFFFFF",
  lightWhite: "#FAFAFC",

  skinBackground: "#F9EFE5",

  Red: "rgba(244,67,54,0.97)",
  LightRed: "rgba(225,150,145,0.09)",
  Green: "#4CAF50",
  Blue: "#2196F3",
  Yellow: "#FFEB3B",
  Purple: "#9C27B0",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
