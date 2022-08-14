import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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


function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={Home} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}