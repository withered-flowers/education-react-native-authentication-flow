import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLoginPress = () => {
		// TODO: Do some magic here !
		console.log(email.toLowerCase(), password);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Login Page</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry={true}
				keyboardType="visible-password"
				value={password}
				onChangeText={setPassword}
			/>
			<Pressable style={styles.button} onPress={onLoginPress}>
				<Text style={styles.buttonText}>Login</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 32,
		marginBottom: 12,
	},
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fffbeb",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 48,
		marginBottom: 8,
		borderWidth: 1,
		padding: 10,
		width: "75%",
		fontSize: 24,
		borderRadius: 5,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		width: "25%",
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 24,
	},
});

export default LoginPage;
