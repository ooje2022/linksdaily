import { useContext, useState } from "react";
import SignIn from "../../screens/SignIn";
import Signup from "../../screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "./HeaderTabs";
import Text from "@kaloraat/react-native-text";
import Home from "../../screens/Home";
import Account from "../../screens/Account";
import Post from "../../screens/Post";
import Links from "../../screens/Links";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;

  //console.log("Authenticated status: ", authenticated);

  return (
    <Stack.Navigator
      initialRouteName="Account"
      //screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{ headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{ headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{ headerBackTitle: "Back" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
