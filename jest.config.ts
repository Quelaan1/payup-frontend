import type {Config} from 'jest';

const config: Config = {
    setupFilesAfterEnv: ['./jest-setup.ts'],
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js"
    ]
};

export default config;