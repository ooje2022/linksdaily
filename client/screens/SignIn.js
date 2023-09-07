import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import { fontSizes as f_sizes } from "../utils/f_sizes";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import { API } from "../config";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const SignIn = ({ navigation }) => {
  const [name, setName] = useState("Johnson Ojeniyi");
  const [email, setEmail] = useState("ooje2012@gmail.com");
  const [password, setPassword] = useState("pass1234");
  const [loading, setLoading] = useState(false);

  //context state
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //save in context
        setState(data);
        //save the response in asyncstorage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("Signin successful => ", data);
        alert("Sign in successful");
        //redirect
        navigation.navigate("Home");
      }
    } catch (err) {
      alert("Signin failed. Try again", err);
      console.log(err);
      setLoading(false);
    }
  };

  const loadFromAsycSt = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("DATA Saved on AsyncStorage: ", data);
  };
  loadFromAsycSt();
  //http://10.0.2.2: local ip address for android emulators

  //console.log("SIGNIN REQUEST => ", name, email, password);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View>
        <CircleLogo />
        <Text
          style={{
            fontSize: f_sizes.xl,
            fontWeight: "bold",
            color: "#ff2222",
            alignSelf: "center",
          }}
        >
          Sign In
        </Text>
        {/* <UserInput
					name="NAME"
					value={name}
					setValue={setName}
					autoCapitalize="words"
					autoCorrect={false}
				/> */}
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
        />

        {/* <Text>{JSON.stringify({ name, email, password }, null, 6)}</Text> */}

        <SubmitButton
          title="Submit"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text
          style={{
            fontSize: f_sizes.md,
            alignSelf: "center",
          }}
        >
          Not yet registered?{" "}
          <Text
            style={{
              color: "#ff2222",
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
        <Text
          style={{
            fontSize: f_sizes.md,
            color: "orange",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
