import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Box, View} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './styles';
import Logo from '~/assets/images/logo.png';
import {StackActions} from '@react-navigation/native';

import Text from '~/components/Text';
import ButtonCustom from '~/components/Button';
import PasswordField from '~/components/Forms/PasswordField';
import {login} from '~/store/user/actions';
import Header from '~/components/Header';
import defaultStyles from '~/template/styles';
import TextField from '~/components/Forms/TextField';

function Login({navigation}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.user.loading);

  function onLogin() {
    const params = {
      username,
      password,
    };
    dispatch(
      login(params, () =>
        navigation.replace('DrawerAdmin', {
          screen: 'Library',
        }),
      ),
    );
  }

  return (
    <Box style={styles.container}>
      <Header goBack menu={false} title="Get Started" />
      <View style={styles.content}>
        <Image source={Logo} style={styles.image} />

        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          keyboardVerticalOffset={Platform.select({ios: 64, android: 0})}>
          <View style={styles.form}>
            <TextField
              value={username}
              placeholder={'Username'}
              onChangeText={setUsername}
              stytleInput={styles.input}
              icon={'user-circle-o'}
              styledIcon={styles.icon}
            />
            <PasswordField
              value={password}
              placeholder={'Password'}
              onChangeText={setPassword}
              stytleInput={styles.input}
              icon={'lock'}
              styledIcon={styles.icon}
            />

            <View style={styles.buttons}>
              <ButtonCustom
                loading={loading}
                title={'Log In'}
                styleText={defaultStyles.textBtn}
                style={defaultStyles.btnDefault(!username || !password)}
                onPress={onLogin}
                colorSpinner="white"
                disabled={!username || !password}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('RecoverPassword')}>
              <Text style={styles.link}>{'Forgot Password?'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Box>
  );
}

export default Login;
