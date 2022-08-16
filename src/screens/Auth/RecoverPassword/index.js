import React, {useState} from 'react';
import {Box, View, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import Header from '~/components/Header';
import ButtonCustom from '~/components/Button';
import EmailField from '~/components/Forms/EmailField';

import {styles} from './styles';
import {recoverPassword} from '~/store/user/actions';
import {textColor} from '~/config/colors';

import defaultStyles from '~/template/styles';

function RecoverPassword({navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);

  const [email, setEmail] = useState('');
  const disabled = !email;

  function onSubmit() {
    if (disabled) {
      return;
    }

    const params = {
      email,
    };

    dispatch(
      recoverPassword(params, () =>
        navigation.navigate('ResetPassword', {email}),
      ),
    );
  }
  return (
    <Box style={styles.container}>
      <Header goBack menu={false} title="Forgot Password?" />

      <View style={styles.content}>
        <Text style={styles.title}>
          Please enter your email address below and we will send you a token to
          reset your password
        </Text>

        <EmailField
          focus
          floating
          value={email}
          placeholder={'Email'}
          onChangeText={setEmail}
          stytleInput={styles.input}
          placeholderColor={textColor}
        />
      </View>

      <View style={styles.footer}>
        <ButtonCustom
          loading={loading}
          title={'Submit'}
          styleText={defaultStyles.textBtn}
          style={defaultStyles.btnDefault(disabled)}
          onPress={onSubmit}
          colorSpinner={defaultStyles.spinner.color}
          disabled={disabled}
        />
      </View>
    </Box>
  );
}
export default RecoverPassword;
