import React from 'react';
import {Box, View, ScrollView} from 'native-base';
import {Root, Popup} from 'react-native-popup-confirm-toast';

import {useDispatch} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {styles as stylesSignUp} from '~/screens/Auth/SignUp/styles';
import ButtonCustom from '~/components/Button';
import defaultStyles from '~/template/styles';
import {logout} from '~/store/user/actions';

function Settings({navigation}) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(() => navigation.replace('Login')));
  }

  return (
    <>
      <Box style={styles.container}>
        <Header title="Settings" />
        <Root />
        <ScrollView>
          <View style={styles.content}>
            <ButtonCustom
              title={'Delete Account'}
              styleText={stylesSignUp.textBtn}
              onPress={() =>
                Popup.show({
                  type: 'confirm',
                  title: 'Delete Account!',
                  textBody: 'Are you sure that you want delete your account?',
                  buttonText: 'Confirm',
                  confirmText: 'Cancel',
                  callback: () => {
                    console.log('Delete');
                    Popup.hide();
                  },
                  cancelCallback: () => Popup.hide(),
                  okButtonStyle: {backgroundColor: '#f94449'},
                })
              }
              colorSpinner="white"
              style={{
                ...defaultStyles.btnDefault(false),
                backgroundColor: '#f94449',
              }}
              disabled={false}
            />
            <ButtonCustom
              title={'Log Out'}
              styleText={stylesSignUp.textBtn}
              onPress={handleLogout}
              colorSpinner="white"
              style={defaultStyles.btnDefault(false)}
              disabled={false}
            />
          </View>
        </ScrollView>
      </Box>
    </>
  );
}

export default Settings;
