import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import SplashScreen from './src/screens/SplashScreen';
import LoginLanding from './src/screens/LoginLanding';
import SignIn from './src/screens/SignIn';
import Register from './src/screens/Register';
import LupaPassword from './src/screens/LupaPassword';
import Home from './src/screens/Home';
import Dar from './src/screens/Dar';
import LaporanDar from './src/screens/LaporanDar';
import Detail from './src/screens/Detail';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //memberikan inisial route mana yang pertama kali dipilih
        screenOptions={{headerShown: false}} //mematika header
      >
        {/* membuat routing*/}
        <Stack.Screen name="LoginLanding" component={LoginLanding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LupaPassword" component={LupaPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dar" component={Dar} />
        <Stack.Screen name="LaporanDar" component={LaporanDar} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
