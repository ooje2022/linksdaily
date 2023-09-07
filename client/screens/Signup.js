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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("Johnson Ojeniyi");
  const [email, setEmail] = useState("ooje2012@gmail.com");
  const [password, setPassword] = useState("pass1234");
  const [loading, setLoading] = useState(false);

  //context state
  const [state, setState] = useContext(AuthContext);

  //console.log("Navigation =>", navigation);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //save data in asyncstorage
        await AsyncStorage("@auth", JSON.stringify(data));
        //save date in context
        setState(data);
        setLoading(false);
        console.log("Signup successful => ", data);
        alert("Sign up successful");
        //redirect
        navigation.navigate("Home");
      }
    } catch (err) {
      alert("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  //console.log("SIGNUP REQUEST => ", name, email, password);
  const loadFromAsycSt = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("DATA Saved on AsyncStorage: ", data);
  };
  loadFromAsycSt();

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
          Sign up
        </Text>
        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          Already joined?{" "}
          <Text
            style={{
              color: "#ff2222",
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
