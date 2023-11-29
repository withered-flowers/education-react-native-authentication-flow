// ?? We will import these inside stacks/StackHolder.js
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ColorAddPage from "./screens/ColorAddPage";
// import HomePage from "./screens/HomePage";
// import LoginPage from "./screens/LoginPage";
import { LoginProvider } from "./contexts/LoginContext";
import StackHolder from "./stacks/StackHolder";

import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // ?? Instead of using both in here, we will separate via Component
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={LoginPage} />
    //     <Stack.Screen name="Home" component={HomePage} />
    //     <Stack.Screen name="ColorAdd" component={ColorAddPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // ?? We will inject the ApolloProvider
    <ApolloProvider client={client}>
      {/* // ?? We will inject the Provider for do login here */}
      <LoginProvider>
        <StackHolder />
      </LoginProvider>
    </ApolloProvider>
  );
}
