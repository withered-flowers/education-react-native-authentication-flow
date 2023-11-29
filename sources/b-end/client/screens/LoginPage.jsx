// ?? We will use context
import { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

// ?? We will import useLazyQuery for apollo client
import { useLazyQuery } from "@apollo/client";
// ?? Import the gql query here too
import { DO_LOGIN } from "../queries/";

// ?? Import SecureStore for storing token
import * as SecureStore from "expo-secure-store";

// ?? Import LoginContext
import { LoginContext } from "../contexts/LoginContext";

const LoginPage = () => {
  // ?? Import setIsLoggedIn from LoginContext
  const { setIsLoggedIn } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ?? We will use useLazyQuery here
  // This hooks will return a tuple of [function, {data, loading, error}]
  // The function is the query function, we will call it when we want to execute the query
  // The second element is the result of the query
  // - We can destructure the result to get the { data, loading, error }
  //    - data: the data returned from the query
  //    - loading: the loading state of the query
  //    - error: the error returned from the query
  // !! For this demo we only use the "data"
  const [dispatcher, { data }] = useLazyQuery(
    DO_LOGIN,
    // !! Solution for late update / cannot await dispatcher:
    // !! We can use callback onCompleted to get the latest data
    {
      onCompleted: async (res) => {
        let token = null;

        if (res && res.login && res.login.data && res.login.data.token) {
          token = res.login.data.token;
        }

        console.log("token", token);

        // ?? Store token via SecureStore
        await SecureStore.setItemAsync("token", token);

        // Set isLoggedIn to true
        setIsLoggedIn(true);
      },
    }
  );

  const onLoginPress = async () => {
    // TODO: Do some magic here !
    // console.log(email, password);

    // ?? We will call the query function here
    await dispatcher({
      // We can give the input via "variables" here
      variables: {
        // This is the inputLogin object that we defined in the schema
        // See the `queries/index.js` file
        // query DoLogin($inputLogin: UserLoginInput)
        // UserLoginInput is { email, password }
        inputLogin: {
          email,
          password,
        },
      },
    });

    // ?? dispatcher dynamic, await is useless for this console log
    // ?? Will always undefined / last (before newest) value
    // console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      {/* // !! data is dynamic, so we cannot use console log,  */}
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
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
