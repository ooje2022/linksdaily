import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigtion() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
        <ExpoStatusBar style="dark" />
      </AuthProvider>
    </NavigationContainer>
  );
}
