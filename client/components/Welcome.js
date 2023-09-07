import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Welcome = ({ name }) => (
	<View>
		<Text>Hello {name}</Text>
	</View>
);

export default Welcome;

const styles = StyleSheet.create({});
