import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {View, Text} from 'native-base';

import {logout} from '~/store/user/actions';
import {styles} from './styles';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(() => props?.navigation.replace('Login')));
    props?.navigation?.toggleDrawer();
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      {...props}>
      <DrawerItemList {...props} />

      <View style={styles.content}>
        {!props.auth && (
          <DrawerItem
            label="Log Out"
            labelStyle={styles.label}
            onPress={handleLogout}
          />
        )}
        <Text style={styles.version}>Version 0.0.1</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
