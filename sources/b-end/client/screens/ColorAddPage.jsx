import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

// ?? Since the mutation will be queried when the components is ready, we can use useQuery hook
import { useMutation } from "@apollo/client";
// ?? Don't forget to import the Mutation (ADD_COLOR) & Query for "auto refresh" (GET_COLORS)
import { ADD_COLOR, GET_COLORS } from "../queries";

const ColorAddPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [pantoneValue, setPantoneValue] = useState("");

  // ?? We will use the useMutation hook to mutate the data
  // This hooks will return a tuple of [function, {data, loading, error}]
  // The function is the mutation function, we will call it when we want to execute the mutation
  // The second element is the result of the mutation
  // - We can destructure the result to get the { data, loading, error }
  //    - data: the data returned from the mutation
  //    - loading: the loading state of the mutation
  //    - error: the error returned from the mutation
  // !! For this demo we won't use the "result" (second element)
  const [dispatcher] = useMutation(ADD_COLOR, {
    // We will use onCompleted to get the returned data
    onCompleted: (res) => {
      console.log("res", res);

      // We will just navigate back to the previous page
      navigation.goBack();
    },
    // We will use refetchQueries to refetch the data from GET_COLORS
    // This will make the data in cache updated and refetched AUTOMATICALLY
    refetchQueries: [
      {
        query: GET_COLORS,
      },
    ],
  });

  const onAddPress = () => {
    // TODO: Do some magic here !
    console.log(name, year, color, pantoneValue);

    // ?? We will call the mutation function here
    dispatcher({
      variables: {
        color: {
          name,
          year: parseInt(year),
          color,
          pantone_value: pantoneValue,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Color</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="name-phone-pad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        style={styles.input}
        placeholder="Color (Hex)"
        keyboardType="default"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Pantone Value"
        keyboardType="numeric"
        value={pantoneValue}
        onChangeText={setPantoneValue}
      />
      <Pressable style={styles.button} onPress={onAddPress}>
        <Text style={styles.buttonText}>Add !</Text>
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

export default ColorAddPage;
