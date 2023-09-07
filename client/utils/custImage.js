import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CustomerImage = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          width: 300,
          height: 300,
          borderRadius: 150,
        }}
        source={require("../assets/Ini_passport.jpg")}
      />
    </View>
  );
};

export default CustomerImage;

const styles = StyleSheet.create({});
