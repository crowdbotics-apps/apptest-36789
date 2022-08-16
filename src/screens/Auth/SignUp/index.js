import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Select2 from 'react-native-searchable-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

import {styles} from './styles';
import Header from '~/components/Header';
import ButtonCustom from '~/components/Button';
import TextField from '~/components/Forms/TextField';
import EmailField from '~/components/Forms/EmailField';

import {textColor} from '~/config/colors';
import {singUp} from '~/store/user/actions';
import {loadHighSchools} from '~/store/global/actions';
import PasswordField from '~/components/Forms/PasswordField';
import moment from 'moment';
import CheckBox from '~/components/CheckBox';
import defaultStyles from '~/template/styles';

function SingUpPersons({route, navigation}) {
  const dispatch = useDispatch();

  const highSchools = useSelector(state => state.global.highSchools);

  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [selectedHighSchool, setSelectedHighSchool] = useState({});
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const [checked, setChecked] = useState(false);

  const showTimePicker = () => {
    setDate(new Date());
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadHighSchools());
    };
    fetchData();
  }, [dispatch]);

  function onSubmit() {
    const params = {
      name,
      username,
      email,
      password,
      confirmation_password: passwordConfirm,
      dob: moment(date).format(moment.HTML5_FMT.DATE),
      in_committee: checked,
      highSchool_id: selectedHighSchool?.id,
      high_school: selectedHighSchool?.id,
      role: 1,
    };
    dispatch(singUp(params, () => navigation.replace('Login')));
  }

  const onChangeDate = (_event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  function handleCheck() {
    setChecked(!checked);
  }

  const renderItem = ({item}) => (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      keyboardVerticalOffset={Platform.select({ios: 64, android: 0})}>
      <Select2
        onItemSelect={field => setSelectedHighSchool(field)}
        containerStyle={styles.select2}
        placeholderTextColor={textColor}
        itemTextStyle={styles.select2Text}
        itemStyle={styles.select2Item}
        items={highSchools}
        onFocus={() => setFocus('highSchools')}
        onBlur={() => setFocus('')}
        listProps={{
          nestedScrollEnabled: true,
        }}
        textInputProps={{
          placeholder: selectedHighSchool?.name || 'High School',
          underlineColorAndroid: 'transparent',
          style: styles.select2Input(focus === 'highSchools'),
        }}
      />

      <TextField
        floating
        value={name}
        onChangeText={setName}
        stytleInput={styles.input}
        placeholder={'Full Name'}
        placeholderColor={textColor}
        onBlur={() => setFocus('')}
        onFocus={() => setFocus('name')}
      />

      <TextField
        floating
        value={username}
        onChangeText={setUsername}
        stytleInput={styles.input}
        placeholder={'Username'}
        placeholderColor={textColor}
        onBlur={() => setFocus('')}
        onFocus={() => setFocus('username')}
      />

      <EmailField
        floating
        value={email}
        placeholder={'Email address'}
        onChangeText={setEmail}
        stytleInput={styles.input}
        placeholderColor={textColor}
        onBlur={() => setFocus('')}
        onFocus={() => setFocus('email')}
      />

      <PasswordField
        value={password}
        placeholder={'Password'}
        onChangeText={setPassword}
        stytleInput={styles.input}
        styledIcon={styles.icon}
      />

      <PasswordField
        value={passwordConfirm}
        placeholder={'Confirm Password'}
        onChangeText={setPasswordConfirm}
        stytleInput={styles.input}
        styledIcon={styles.icon}
      />

      <TouchableOpacity onPress={showTimePicker}>
        <TextField
          floating
          disabled
          value={date ? moment(date)?.format('MM/DD/YYYY') : 'Date of birth'}
          onChangeText={() => null}
          stytleInput={styles.input}
          stytleLabel={styles.label}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          onChange={onChangeDate}
          mode="date"
          display="default"
        />
      )}

      <CheckBox
        checked={checked}
        action={handleCheck}
        label="Select to be added to your school's yearbook club"
      />

      <ButtonCustom
        title={'Create Account'}
        styleText={styles.textBtn}
        onPress={onSubmit}
        colorSpinner="white"
        style={defaultStyles.btnDefault(false)}
        disabled={false}
      />
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header goBack menu={false} title="Create Account" />
      </View>
      <FlatList
        data={[{id: 1}]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollview}
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

export default SingUpPersons;
