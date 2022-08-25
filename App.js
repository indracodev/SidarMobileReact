import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import SplashScreen from './src/screens/SplashScreen';
import LoginLanding from './src/screens/LoginLanding';
import Login from './src/screens/Login';
import Maps from './src/screens/Maps';
import SignIn from './src/screens/SignIn';
import Register from './src/screens/Register';
import LupaPassword from './src/screens/LupaPassword';
import Home from './src/screens/Home';
import AbsenceKeluar from './src/screens/AbsenceKeluar';
import AbsenceMasuk from './src/screens/AbsenceMasuk';

import Cuti from './src/screens/Cuti';
import Dar from './src/screens/Dar';
import LaporanDar from './src/screens/LaporanDar';
import DetailLaporanDar from './src/screens/DetailLaporanDar';
import Detail from './src/screens/Detail';

import Tentang from './src/screens/Tentang';
import Bantuan from './src/screens/Bantuan';
import KritikSaran from './src/screens/KritikSaran';

const Drawer = createDrawerNavigator();
function Feed({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

function HomeScreen() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Cuti" component={Cuti} />
      <Drawer.Screen name="Dar" component={Dar} />
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="AbsenceMasuk" component={AbsenceMasuk} />
      <Drawer.Screen name="AbsenceKeluar" component={AbsenceKeluar} />
    </Drawer.Navigator>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Login" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //memberikan inisial route mana yang pertama kali dipilih
        screenOptions={{headerShown: false}} //mematika header
      >
        <Stack.Screen name="LoginLanding" component={LoginLanding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LupaPassword" component={LupaPassword} />
        <Stack.Screen name="Cuti" component={Cuti} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AbsenceMasuk" component={AbsenceMasuk} />
        <Stack.Screen name="AbsenceKeluar" component={AbsenceKeluar} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Dar" component={Dar} />
        <Stack.Screen name="LaporanDar" component={LaporanDar} />
        <Stack.Screen name="DetailLaporanDar" component={DetailLaporanDar} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Tentang" component={Tentang} />
        <Stack.Screen name="Bantuan" component={Bantuan} />
        <Stack.Screen name="KritikSaran" component={KritikSaran} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default App;
