import React, {useEffect, useState} from 'react';
import {
  Box,
  View,
  ScrollView,
  Text,
  Actionsheet,
  useDisclose,
} from 'native-base';

import Avatar from '~/assets/images/profile/avatar-default.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Select2 from 'react-native-searchable-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {styles as stylesSignUp} from '~/screens/Auth/SignUp/styles';
import {getUser, updateAvatar, updateUser} from '~/store/user/actions';
import {loadHighSchools} from '~/store/global/actions';
import {textColor} from '~/config/colors';
import TextField from '~/components/Forms/TextField';
import EmailField from '~/components/Forms/EmailField';
import PasswordField from '~/components/Forms/PasswordField';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ButtonCustom from '~/components/Button';
import defaultStyles from '~/template/styles';

function Profile({navigation}) {
  const dispatch = useDispatch();
  const highSchools = useSelector(state => state.global.highSchools);
  const user = useSelector(state => state.user.data);
  const image = user && user?.photo ? {uri: user?.photo} : Avatar;

  const {isOpen, onOpen, onClose} = useDisclose();

  const [focus, setFocus] = useState('');
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [selectedHighSchool, setSelectedHighSchool] = useState(
    user?.high_school,
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser());
      dispatch(loadHighSchools());
    };
    fetchData();
  }, [dispatch]);

  function requestUser() {
    dispatch(getUser());
  }

  function onSubmit() {
    const params = {
      name,
      email,
      username: user?.username,
      high_school_id: selectedHighSchool?.id,
    };

    dispatch(
      updateUser(
        {
          ...params,
          ...(password && {password}),
          ...(passwordConfirm && {confirmation_password: passwordConfirm}),
        },
        () => requestUser(),
      ),
    );
  }

  function updateImage(response) {
    const formSendData = new FormData();
    formSendData.append('photo', {
      uri: response.path,
      type: response.mime,
      size: response.size,
      name: 'photo-profile.png',
    });
    dispatch(updateAvatar(formSendData, () => requestUser()));
  }

  function openCamera() {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      includeBase64: false,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      cropperToolbarTitle: 'Edit Photo',
    })
      .then(updateImage)
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  }

  function openGallery() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      includeBase64: false,
      includeExif: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      cropperToolbarTitle: 'Edit Image',
    })
      .then(updateImage)
      .then(cleanupImages)
      .catch(err => {
        console.log('openPicker catch' + err.toString());
      });
  }

  function cleanupImages() {
    ImagePicker.clean()
      .then()
      .catch(e => {
        console.log('cleanupImages catch' + e.toString());
      });
  }

  const renderItem = ({item}) => (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      keyboardVerticalOffset={Platform.select({ios: 64, android: 0})}>
      <TouchableOpacity activeOpacity={0.5} style={styles.row} onPress={onOpen}>
        <Image source={image} style={styles.image} />
        <Icon name="camera" style={styles.icon} size={16} />
      </TouchableOpacity>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={openCamera}>
            <Text style={styles.item}>Abrir Câmera</Text>
          </Actionsheet.Item>

          <Actionsheet.Item onPress={openGallery}>
            <Text style={styles.item}>Abrir Galeria</Text>
          </Actionsheet.Item>

          <Actionsheet.Item onPress={onClose}>
            <Text style={styles.item}>Fechar</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <Select2
        onItemSelect={field => setSelectedHighSchool(field)}
        containerStyle={stylesSignUp.select2}
        placeholderTextColor={textColor}
        itemTextStyle={stylesSignUp.select2Text}
        itemStyle={stylesSignUp.select2Item}
        items={highSchools}
        onFocus={() => setFocus('highSchools')}
        onBlur={() => setFocus('')}
        listProps={{
          nestedScrollEnabled: true,
        }}
        textInputProps={{
          placeholder: selectedHighSchool?.name || 'High School',
          underlineColorAndroid: 'transparent',
          style: stylesSignUp.select2Input(focus === 'highSchools'),
        }}
      />

      <TextField
        floating
        value={name}
        onChangeText={setName}
        stytleInput={stylesSignUp.input}
        placeholder={'Full Name'}
        placeholderColor={textColor}
        onBlur={() => setFocus('')}
        onFocus={() => setFocus('name')}
      />

      <EmailField
        floating
        value={email}
        placeholder={'Email address'}
        onChangeText={setEmail}
        stytleInput={stylesSignUp.input}
        placeholderColor={textColor}
        onBlur={() => setFocus('')}
        onFocus={() => setFocus('email')}
      />

      <PasswordField
        value={password}
        placeholder={'Password'}
        onChangeText={setPassword}
        stytleInput={stylesSignUp.input}
        styledIcon={stylesSignUp.icon}
      />

      <PasswordField
        value={passwordConfirm}
        placeholder={'Confirm Password'}
        onChangeText={setPasswordConfirm}
        stytleInput={stylesSignUp.input}
        styledIcon={stylesSignUp.icon}
      />

      <ButtonCustom
        title={'Save Changes'}
        styleText={stylesSignUp.textBtn}
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
        <Header title="Profile" />
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

export default Profile;
