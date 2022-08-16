import React, {useState} from 'react';
import {Box, View, ScrollView, Text} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {buyYearbook} from '~/store/yearbook/actions';
import {secondColor, textColor} from '~/config/colors';
import TextField from '~/components/Forms/TextField';
import NumberField from '~/components/Forms/NumberField';
import CardNumber from '~/components/Forms/Card/CardNumber';
import CardDate from '~/components/Forms/Card/CardDate';
import ButtonCustom from '~/components/Button';
import defaultStyles from '~/template/styles';

function BuyYearbook(props) {
  const {id, highschoolTitle, year, price} = props.route.params;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.yearbook.loading);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [CVC, setCVC] = useState('');

  const submitDisabled =
    !firstName || !lastName || !holderName || !cardNumber || !expDate || !CVC;

  async function onSubmit() {
    const params = {
      first_name: firstName,
      last_name: lastName,
      cardholder_name: holderName,
      card_number: cardNumber,
      expiry: expDate,
      cvc: CVC,
      recapp_id: id,
    };

    dispatch(
      buyYearbook(params, () =>
        props.navigation.navigate('ViewYearbook', {id}),
      ),
    );
  }

  return (
    <Box style={styles.container}>
      <Header title="Library" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>
            {highschoolTitle} {year}
          </Text>

          <View style={styles.content}>
            <TextField
              floating
              value={firstName}
              onChangeText={setFirstName}
              stytleInput={styles.input}
              placeholder={'First Name'}
              placeholderColor={textColor}
            />
            <TextField
              floating
              value={lastName}
              onChangeText={setLastName}
              stytleInput={styles.input}
              placeholder={'Last Name'}
              placeholderColor={textColor}
            />
          </View>

          <Text style={{...styles.title, marginTop: 30}}>Add Card</Text>
          <View style={styles.content}>
            <TextField
              floating
              value={holderName}
              onChangeText={setHolderName}
              stytleInput={styles.input}
              placeholder={'Holder Name'}
              placeholderColor={textColor}
            />
            <CardNumber
              floating
              value={cardNumber}
              onChangeText={setCardNumber}
              stytleInput={styles.input}
              placeholder={'Card Number'}
              placeholderColor={textColor}
            />
            <CardDate
              floating
              value={expDate}
              onChangeText={setExpDate}
              stytleInput={styles.input}
              placeholder={'Exp. Date'}
              placeholderColor={textColor}
            />
            <NumberField
              floating
              value={CVC}
              onChangeText={setCVC}
              stytleInput={styles.input}
              placeholder={'CVC'}
              placeholderColor={textColor}
              maxLength={4}
            />
          </View>

          <View style={styles.rowPrice}>
            <Text style={{...styles.title, color: secondColor}}>
              Final Price: ${price}
            </Text>
          </View>

          <ButtonCustom
            styleText={defaultStyles.textBtn}
            style={defaultStyles.btnDefault(submitDisabled)}
            disabled={submitDisabled || loading}
            title="Purchase"
            onPress={onSubmit}
            loading={loading}
          />
        </View>
      </ScrollView>
    </Box>
  );
}

export default BuyYearbook;
