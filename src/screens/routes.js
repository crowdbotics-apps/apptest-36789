import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationService from '~/tools/NavigationService';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Statics
import SignUpScreen from './Auth/SignUp';
import LoginScreen from './Auth/Login';
import RecoverPasswordScreen from './Auth/RecoverPassword';
import ResetPasswordScreen from './Auth/ResetPassword';

// Drawers
import DrawerStatic from './DrawerStatic';
import DrawerAdmin from './DrawerAdmin';

// Admin
import YearbookAddScreen from './App/Admin/Yearbook/Add';

const Stack = createStackNavigator();

const sceneContainerStyle = {
  paddingTop: isIphoneX() ? 20 : 0,
  backgroundColor: 'white',
};

function Routes({initialRouteName}) {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="DrawerStatic"
          component={DrawerStatic}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerAdmin"
          component={DrawerAdmin}
          options={{headerShown: false}}
        />

        {/* Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={sceneContainerStyle}
        />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPasswordScreen}
          options={sceneContainerStyle}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={sceneContainerStyle}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={sceneContainerStyle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
