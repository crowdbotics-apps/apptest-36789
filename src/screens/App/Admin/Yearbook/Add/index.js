import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, KeyboardAvoidingView} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';

import Select2 from 'react-native-searchable-dropdown';
import DocumentPicker, {types} from 'react-native-document-picker';
import defaultStyles from '~/template/styles';
import ButtonCustom from '~/components/Button';
import {secondColor, textColor} from '~/config/colors';
import {Platform, SafeAreaView} from 'react-native';
import TextField from '~/components/Forms/TextField';
import {addYearbook} from '~/store/yearbook/actions';
import {getUser} from '~/store/user/actions';
import FieldArray from './FieldArray';
import {useForm} from 'react-hook-form';

const years = [
  {id: '2018/2019', name: '2018/2019'},
  {id: '2019/2020', name: '2019/2020'},
  {id: '2020/2021', name: '2020/2021'},
  {id: '2021/2022', name: '2021/2022'},
  {id: '2022/2023', name: '2022/2023'},
  {id: '2023/2024', name: '2023/2024'},
  {id: '2024/2025', name: '2024/2025'},
  {id: '2025/2026', name: '2025/2026'},
  {id: '2026/2027', name: '2026/2027'},
  {id: '2027/2028', name: '2027/2028'},
  {id: '2028/2029', name: '2028/2029'},
  {id: '2029/2030', name: '2029/2030'},
];

function Add({navigation}) {
  const dispatch = useDispatch();
  const [year, setYear] = useState();
  const [recapp, setRecapp] = useState();
  const [quotes, setQuotes] = useState();
  const [videos, setVideos] = useState();
  const user = useSelector(state => state.user.data);
  const loading = useSelector(state => state.yearbook.loading);

  const {control, register, getValues} = useForm();

  const submitDisabled = !recapp || !year || !quotes || !videos;

  async function onSubmit() {
    const formSendData = new FormData();

    if (recapp) {
      formSendData.append('recapp', recapp[0] || '');
    }

    if (quotes) {
      quotes.map(item => formSendData.append('quotes', item));
    }

    if (videos) {
      videos.map(item => formSendData.append('videos', item));
    }

    formSendData.append('high_school_id', user?.high_school.id || '');
    formSendData.append('recapp_year', year.id);

    dispatch(
      addYearbook(formSendData, getValues('table_of_contents'), () =>
        navigation.navigate('Library'),
      ),
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser());
    };
    fetchData();
  }, [dispatch]);

  const handleChangeNames = (name, index, type) => {
    const newFiles = [];
    if (quotes || videos) {
      (type === 'quotes' ? quotes : videos).map((item, i) => {
        if (i === index) {
          newFiles.push({...item, name});
        } else {
          newFiles.push(item);
        }
      });
    }
    type === 'quotes' ? setQuotes(newFiles) : setVideos(newFiles);
  };

  const renderItem = () => (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      keyboardVerticalOffset={Platform.select({ios: 64, android: 0})}>
      <Text style={styles.title}>Add New Recapp</Text>

      <Select2
        onItemSelect={field => setYear(field)}
        containerStyle={styles.select2}
        placeholderTextColor={textColor}
        itemTextStyle={styles.select2Text}
        itemStyle={styles.select2Item}
        items={years}
        listProps={{
          nestedScrollEnabled: true,
        }}
        textInputProps={{
          placeholder: year?.name || 'Recapp Year',
          underlineColorAndroid: 'transparent',
          style: styles.select2Input,
        }}
      />

      <ButtonCustom
        styleText={defaultStyles.textBtn}
        style={{
          ...defaultStyles.btnDefault(false),
          backgroundColor: secondColor,
        }}
        title="Upload Digital Recapp"
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              type: types.pdf,
            });
            setRecapp([pickerResult]);
          } catch (e) {}
        }}
      />

      <ButtonCustom
        styleText={defaultStyles.textBtn}
        style={{
          ...defaultStyles.btnDefault(false),
          backgroundColor: secondColor,
        }}
        title="Upload Senior Quotes"
        onPress={() => {
          DocumentPicker.pickMultiple({type: types.audio})
            .then(setQuotes)
            .catch();
        }}
      />

      {quotes && (
        <View style={styles.ViewNames}>
          {quotes.map((item, index) => (
            <View key={index}>
              <Text>File Name</Text>

              <TextField
                floating
                value={item.name}
                stytleInput={styles.input}
                placeholder={'Full Name'}
                placeholderColor={textColor}
                onChangeText={e => handleChangeNames(e, index, 'quotes')}
              />
            </View>
          ))}
        </View>
      )}

      <ButtonCustom
        styleText={defaultStyles.textBtn}
        style={{
          ...defaultStyles.btnDefault(false),
          backgroundColor: secondColor,
        }}
        title="Upload Videos"
        onPress={() => {
          DocumentPicker.pickMultiple({type: types.video})
            .then(setVideos)
            .catch();
        }}
      />

      {videos && (
        <View style={styles.ViewNames}>
          {videos.map((item, index) => (
            <View key={index}>
              <Text>File Name</Text>

              <TextField
                key={index}
                floating
                value={item.name}
                stytleInput={styles.input}
                placeholder={'Full Name'}
                placeholderColor={textColor}
                onChangeText={e => handleChangeNames(e, index, 'videos')}
              />
            </View>
          ))}
        </View>
      )}

      <View>
        <Text style={styles.title}>RECAPP TOPICS</Text>
        <FieldArray
          {...{
            control,
            register,
          }}
        />
      </View>

      <ButtonCustom
        styleText={defaultStyles.textBtn}
        style={defaultStyles.btnDefault(submitDisabled)}
        disabled={submitDisabled || loading}
        title="Add Recapp"
        onPress={onSubmit}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack menu={false} title="Add Yearbook" />
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

export default Add;
