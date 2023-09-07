import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CircleLogo = ({ children }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroudColor: "#fff",
          height: 200,
          width: 200,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../../assets/orange-sun-high-2.png")}
          />
        )}
      </View>
    </View>
  );
};

export default CircleLogo;

const styles = StyleSheet.create({});
