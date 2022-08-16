import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import WhyScreen from './App/Static/Why';
import HowScreen from './App/Static/How';
import FAQScreen from './App/Static/FAQ';
import AboutScreen from './App/Static/About';
import GetStartedScreen from './App/Static/GetStarted';

import {primaryColor} from '~/config/colors';
import CustomDrawerContent from '~/components/Drawer';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Drawer = createDrawerNavigator();

function DrawerStatic() {
  const sceneContainerStyle = {
    paddingTop: isIphoneX() ? 20 : 0,
    backgroundColor: 'white',
  };

  return (
    <Drawer.Navigator
      initialRouteName="Get Started"
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
      drawerContent={props => <CustomDrawerContent {...props} auth={true} />}>
      <Drawer.Screen
        name="Get Started"
        component={GetStartedScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="Why Recapp?"
        component={WhyScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="How Does It Work?"
        component={HowScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutScreen}
        options={{sceneContainerStyle}}
      />
    </Drawer.Navigator>
  );
}

export default DrawerStatic;
