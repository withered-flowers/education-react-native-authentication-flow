import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ColorAddPage from "./screens/ColorAddPage";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ColorAdd" component={ColorAddPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
