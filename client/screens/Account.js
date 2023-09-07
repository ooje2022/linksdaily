import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import { fontSizes as f_sizes } from "../utils/f_sizes";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import { API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import CustomerImage from "../utils/custImage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  //https://cdn.pixabay.com/photo/2016/06/06/17/05/woman-1439909_640.jpg
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState(""); // to preview image
  // const [image, setImage] = useState({uri:"", public_id:""})

  //context state
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, password, role, image } = state.user;
      setName(name);
      setEmail(email);
      setPassword(password);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/signin`, {
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

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    // return;
    if (permissionResult.granted === false) {
      //Get image from library
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        base64: true,
        quality: 1,
      });
      //console.log("PICK RESULT => ", pickerResult);

      if (pickerResult.canceled) {
        return;
      }

      // save to state for preview
      let base64Image = pickerResult.assets[0].uri;
      setUploadImage(base64Image);

      console.log("\nBASE64IMAGE\n", base64Image);
      console.log("\n\n");

      /* let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
      setUploadImage(base64Image); */

      // send to backend for uploading to cloudinary
      /* let token = state && state.token ? state.token : ""; */
      const {
        data,
      } = async () => {
        try {
          await axios.post(
            "/upload-image",
            {
              image: base64Image,
            },
            { headers: { Authorization: `Bearer ${state.token}` } }
          );
          console.log("\n\nUPLOADED RESPONSE => ", data);
        } catch (er) {
          console.log(err);
        }
      };
      // update user info in the context and async storage

      //setUpload(pickerResult.assets[0].uri);
    } /* else {
      alert("Camera access is required.");
      return;
    } */
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View>
        <CircleLogo>
          {image && image.url ? (
            <Image
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                marginVertical: 5,
              }}
              source={{ uri: image.url }}
            />
          ) : uploadImage ? (
            <Image
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                marginVertical: 5,
              }}
              source={{ uri: uploadImage }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5 name="camera" size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>
        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5
              name="camera"
              size={25}
              color="orange"
              style={{
                marginTop: 30,
                marginBottom: 10,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text title center style={{ paddingBottom: 10 }}>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text medium center llight style={{ paddingBottom: 10 }}>
          {role}
        </Text>

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
          title="Update Password"
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({});
