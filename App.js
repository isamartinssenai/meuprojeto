import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./pages/splash";
import Home from "./pages/home";
import Audio from "./pages/audio";
import Camera from "./pages/camera";
import Acelerometro from "./pages/acelerometro";
import Gps from "./pages/gps";
import Scanner from "./pages/scanner";
import Notificacao from "./pages/notification";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Audio"
          component={Audio}
        />

        <Stack.Screen
          name="Camera"
          component={Camera}
        />

        <Stack.Screen
          name="Acelerometro"
          component={Acelerometro}
        />

        <Stack.Screen
          name="Gps"
          component={Gps}
        />

        <Stack.Screen
          name="Scanner"
          component={Scanner}
        />

        <Stack.Screen
          name="Notificacao"
          component={Notificacao}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}