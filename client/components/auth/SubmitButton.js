import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fontSizes as f_sizes } from "../../utils/f_sizes";

const SubmitButton = ({ title, loading, handleSubmit }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={handleSubmit}
				style={{
					backgroundColor: "#ff9900",
					height: 50,
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 20,
					marginHorizontal: 20,
					borderRadius: 25,
				}}
			>
				<Text style={{ fontSize: f_sizes.lg, fontWeight: "bold" }}>
					{loading ? "Please wait...." : title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SubmitButton;

const styles = StyleSheet.create({});
