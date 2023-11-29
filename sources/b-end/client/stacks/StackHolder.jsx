import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ColorAddPage from "../screens/ColorAddPage";
import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";

import { LoginContext } from "../contexts/LoginContext";

const Stack = createNativeStackNavigator();

// ?? We need to use the LoginContext to determine which Stack to use
// ?? So we need to make the Component
const StackHolder = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      {/* // ?? If isLoggedIn false, we will use UnauthenticatedStack */}
      {/* // ?? If isLoggedIn true, we will use AuthenticatedStack */}
      <Stack.Navigator>
        {/* // ?? We will separate the Stack for Unauthenticated and Authenticated */}
        {isLoggedIn ? (
          // List of Authenticated Stack.Screen --
          <>
            {/* // List of Authenticated Stack.Screen -- */}
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="ColorAdd" component={ColorAddPage} />
          </>
        ) : (
          // List of Unauthenticated Stack.Screen --
          <Stack.Screen name="Login" component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackHolder;
