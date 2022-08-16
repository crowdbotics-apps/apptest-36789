import React, {useState} from 'react';
import {Box, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '~/components/Header';
import ButtonCustom from '~/components/Button';
import TextField from '~/components/Forms/TextField';
import PasswordField from '~/components/Forms/PasswordField';
import {ScrollView} from 'native-base';

import {styles} from './styles';
import {resetPassword, resendTokenEmail} from '~/store/user/actions';
import {textColor} from '~/config/colors';

import defaultStyles from '~/template/styles';

function ResetPassword({route, navigation}) {
  const {email} = route.params;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const disabled = !password || !confirm || !token;

  function onSubmit() {
    const params = {
      token,
      password,
      password_confirmation: confirm,
    };

    dispatch(resetPassword(params, () => navigation.replace('Login')));
  }

  function resendTotken() {
    dispatch(resendTokenEmail(email));
  }

  return (
    <Box style={styles.container}>
      <Header goBack menu={false} title="Update Password" />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          Please enter the token number that was sent to your email address
        </Text>

        <TextField
          floating
          value={token}
          onChangeText={setToken}
          stytleInput={styles.input}
          placeholder={'Token'}
          placeholderColor={textColor}
          maxLength={6}
          keyboardType="numeric"
        />
        <PasswordField
          floating
          value={password}
          onChangeText={setPassword}
          stytleInput={styles.input}
          placeholder={'New Password'}
        />
        <PasswordField
          floating
          value={confirm}
          onChangeText={setConfirm}
          stytleInput={styles.input}
          placeholder={'Confirm New Password'}
          invalid={!!password && !!confirm && password !== confirm}
        />
        <TouchableOpacity onPress={resendTotken}>
          <Text style={styles.link}>{'Resend Token'}</Text>
        </TouchableOpacity>

        <ButtonCustom
          loading={loading}
          title={'Update'}
          styleText={defaultStyles.textBtn}
          style={defaultStyles.btnDefault(disabled)}
          onPress={onSubmit}
          colorSpinner={defaultStyles.spinner.color}
          disabled={disabled}
        />
      </ScrollView>
    </Box>
  );
}
export default ResetPassword;
