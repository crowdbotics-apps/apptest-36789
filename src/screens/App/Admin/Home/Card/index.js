import React from 'react';
import {Box, Text} from 'native-base';

import {styles} from './styles';
import defaultStyles from '~/template/styles';
import ButtonCustom from '~/components/Button';

function Card({highschoolTitle, year, price, navigation, purchase, id}) {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>{highschoolTitle}</Text>
      <Text style={styles.year}>Yearbook</Text>
      <Text style={styles.year}>{year}</Text>

      <Box style={styles.boxBuy}>
        <Text style={styles.price}>$ {price}</Text>

        <ButtonCustom
          title={purchase ? 'Buy' : 'Show'}
          styleText={defaultStyles.textBtn}
          onPress={() =>
            //navigation.navigate(purchase ? 'BuyYearbook' : 'ViewYearbook', {
            navigation.navigate(purchase ? 'ViewYearbook' : 'ViewYearbook', {
              id,
              highschoolTitle,
              year,
              price,
            })
          }
          colorSpinner="white"
          style={{...defaultStyles.btnDefault(false), ...styles.customButtom}}
          disabled={false}
        />
      </Box>
    </Box>
  );
}

export default Card;
