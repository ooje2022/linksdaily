import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { fontSizes as f_sizes } from "../../utils/f_sizes";
const UserInput = ({
	name,
	value,
	setValue,
	autoCapitalize = "none",
	keyboardType = "default",
	secureTextEntry = false,
	autoCorrect = false,
}) => {
	return (
		<View style={{ marginHorizontal: 24 }}>
			<Text style={{ fontSize: f_sizes.md }}>{name}</Text>
			<TextInput
				autoCorrect={false}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				value={value}
				onChangeText={setValue}
				style={{
					height: 40,
					borderBottomWidth: 0.5,
					borderBottomColor: "#8e93a1",
					marginBottom: 30,
				}}
			/>
		</View>
	);
};

export default UserInput;

const styles = StyleSheet.create({});
