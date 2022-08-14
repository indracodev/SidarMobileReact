import React from 'react';
import {TouchableOpacity} from 'react-native';
// react-navigation
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
// importing screens
import Home from './src/Dhome';
import Setting from './src/Dsetting';
import About from './src/Dabout';
import Splash from './src/Splash';
// Adding Home and About in the same stack allows us to navigate to // About from Home and from Home to About screen
const HomeNavigator = createStackNavigator(
{
'Home': {screen: Home,
navigationOptions: ({navigation}) => ({
headerLeft: () => (
<TouchableOpacity
style={{marginLeft: 20}}
onPress={() => navigation.toggleDrawer()}>
<Icon name="indent" size={25} /></TouchableOpacity>
)})
},
'About': {screen: About}
});
// Our second screen in the drawer will be Setting
const SettingNavigator = createStackNavigator(
{
'Setting': {screen: Setting}
},{
defaultNavigationOptions: ({navigation}) => ({
headerLeft: () => (
<TouchableOpacity
style={{marginLeft: 20}}
onPress={() => navigation.toggleDrawer()}>
<Icon name="indent" size={25} />
</TouchableOpacity>
),
}),
});
// This navigator makes the drawer
const DrawerNavigator = createDrawerNavigator({
Home: {
navigationOptions: {
drawerLabel: 'Home', // Name shown in the drawer of the screen
},
screen: HomeNavigator,
},
Setting: {
navigationOptions: {
drawerLabel: 'Setting', 
},
screen: SettingNavigator,
}});
// We used createSwitchNavigator because we don't want our user to // navigate back to Splash screen by pressing back button. Hence 
// Splash screen just get seen once by the user.
const AppSwitchNavigator = createSwitchNavigator({
'Splash' : {screen : Splash},
'Drawer' : {screen : DrawerNavigator}
},
{
initialRouteName : 'Splash' // Telling the navigator that the first       // route is Splash screen
})
const App = createAppContainer(AppSwitchNavigator);
export default App;