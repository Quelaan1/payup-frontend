declare module "*.png" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-test-renderer";

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_MOCK_AXIOS?: string;
    EXPO_PUBLIC_BASE_URL?: string;
  }
}
