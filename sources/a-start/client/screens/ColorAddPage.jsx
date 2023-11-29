import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

const ColorAddPage = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [pantoneValue, setPantoneValue] = useState("");

  const onLoginPress = () => {
    // TODO: Do some magic here !
    console.log(name, year, color, pantoneValue);
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
      <Pressable style={styles.button} onPress={onLoginPress}>
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
