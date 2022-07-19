import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import SplashScreen from './src/screens/SplashScreen';
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //memberikan inisial route mana yang pertama kali dipilih
        screenOptions={{headerShown: false}} //mematika header
      >
        {/* membuat routing home */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
