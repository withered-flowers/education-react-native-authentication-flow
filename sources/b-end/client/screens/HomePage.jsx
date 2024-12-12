import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// ?? We will implement the Logout using securestore and context
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

// ?? Since the query will be queried when the components is ready, we can use useQuery hook
import { useQuery } from "@apollo/client";
// ?? Don't forget to import the query (GET_COLORS)
import { GET_COLORS } from "../queries";

// ?? We won't use static data anymore
// const STATIC_DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// ?? We will modify the ItemComponent to accept color props
const ItemComponent = ({ title, color }) => (
	// ?? We will also modify the style to use the color props
	<View style={{ ...styles.item, backgroundColor: color }}>
		<Text style={styles.itemTitle}>{title}</Text>
	</View>
);

const HomePage = () => {
	const navigation = useNavigation();

	// ?? Use the useQuery hook to query the data
	const { loading, error, data } = useQuery(GET_COLORS);

	// ?? Use the setIsloggedIn from the LoginContext
	const { setIsLoggedIn } = useContext(LoginContext);

	const addColorOnPressHandler = () => {
		console.log("Add Color Pressed");
		navigation.navigate("ColorAdd");
	};

	const logoutOnPressHandler = async () => {
		console.log("Logout Pressed");

		// ?? We will remove the token from the securestore
		await SecureStore.deleteItemAsync("token");

		// ?? We will set the isLoggedIn to false
		setIsLoggedIn(false);

		// !! No need to navigate to LoginPage, since we already use the LoginContext to determine which Stack to use
	};

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!loading && error) {
		return <Text>Error: {error.message}</Text>;
	}

	// ?? We will use the data from the query
	if (!loading && data) {
		// ?? We will console log the data to see what we get
		console.log(JSON.stringify(data, null, 2));

		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center", marginTop: 8 }}>
					{data.colors.message}
				</Text>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.button} onPress={addColorOnPressHandler}>
						<Text style={styles.buttonText}>Add Colors</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={logoutOnPressHandler}>
						<Text style={styles.buttonText}>Logout</Text>
					</Pressable>
				</View>
				<FlatList
					data={data.colors.data}
					renderItem={({ item }) => (
						<ItemComponent title={item.name} color={item.color} />
					)}
					keyExtractor={(item) => item._id}
				/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	buttonContainer: {
		justifyContent: "center",
		flexDirection: "row",
		gap: 8,
	},
	button: {
		padding: 8,
		backgroundColor: "#fef08a",
		borderRadius: 5,
		marginTop: 8,
	},
	buttonText: {
		fontSize: 20,
	},
	item: {
		backgroundColor: "#fef08a",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 5,
	},
	itemTitle: {
		fontSize: 32,
		color: "#334155",
		opacity: 0.9,
	},
});

export default HomePage;
