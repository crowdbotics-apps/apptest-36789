import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './App/Admin/Home';
import AddYearbookScreen from './App/Admin/Yearbook/Add';
import PurchasedYearbookScreen from './App/Admin/Yearbook/Purchased';
import BuyYearbookScreen from './App/Admin/Yearbook/Buy';
import ViewYearbookScreen from './App/Admin/Yearbook/View';

import ProfileScreen from './App/Admin/Profile';
import SettingsScreen from './App/Admin/Settings';
import TermsScreen from './App/Admin/Terms';
import PrivacyScreen from './App/Admin/Privacy';

import {primaryColor} from '~/config/colors';
import CustomDrawerContent from '~/components/Drawer';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Drawer = createDrawerNavigator();

const hiddenDrawer = () => ({
  title: undefined,
  drawerLabel: () => null,
  drawerIcon: () => null,
  drawerItemStyle: {display: 'none'},
});

function DrawerAdmin() {
  const sceneContainerStyle = {
    paddingTop: isIphoneX() ? 20 : 0,
    backgroundColor: 'white',
  };

  return (
    <Drawer.Navigator
      initialRouteName="Library"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          padding: 20,
          backgroundColor: primaryColor,
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 14,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} auth={false} />}>
      <Drawer.Screen
        name="Library"
        component={HomeScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="AddYearbook"
        component={AddYearbookScreen}
        options={hiddenDrawer}
      />
      <Drawer.Screen
        name="Locker"
        component={PurchasedYearbookScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="BuyYearbook"
        component={BuyYearbookScreen}
        options={hiddenDrawer}
      />
      <Drawer.Screen
        name="ViewYearbook"
        component={ViewYearbookScreen}
        options={hiddenDrawer}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyScreen}
        options={{sceneContainerStyle}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerAdmin;
