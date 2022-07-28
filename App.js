import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import SplashScreen from './src/screens/SplashScreen';
import LoginLanding from './src/screens/LoginLanding';
import Login from './src/screens/Login';
import Maps from './src/screens/Maps';
import SignIn from './src/screens/SignIn';
import Register from './src/screens/Register';
import LupaPassword from './src/screens/LupaPassword';
import Home from './src/screens/Home';
import Dar from './src/screens/Dar';
import LaporanDar from './src/screens/LaporanDar';
import DetailLaporanDar from './src/screens/DetailLaporanDar';
import Detail from './src/screens/Detail';

import Tentang from './src/screens/Tentang';
import Bantuan from './src/screens/Bantuan';
import KritikSaran from './src/screens/KritikSaran';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //memberikan inisial route mana yang pertama kali dipilih
        screenOptions={{headerShown: false}} //mematika header
      >
        {/* membuat routing*/}
        <Stack.Screen name="LoginLanding" component={LoginLanding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LupaPassword" component={LupaPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Dar" component={Dar} />
        <Stack.Screen name="LaporanDar" component={LaporanDar} />
        <Stack.Screen name="DetailLaporanDar" component={DetailLaporanDar} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Tentang" component={Tentang} />
        <Stack.Screen name="Bantuan" component={Bantuan} />
        <Stack.Screen name="KritikSaran" component={KritikSaran} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
