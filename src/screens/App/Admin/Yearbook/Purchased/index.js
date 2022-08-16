import React, {useEffect} from 'react';
import {Box, View, ScrollView} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {loadPurchasedYearbooks} from '~/store/yearbook/actions';
import Card from '../../Home/Card';

function Purchased({navigation}) {
  const dispatch = useDispatch();
  const yearbooksPurchased = useSelector(state => state.yearbook.purchased);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadPurchasedYearbooks());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box style={styles.container}>
      <Header title="Locker" />
      <ScrollView>
        <View style={styles.content}>
          {yearbooksPurchased.map(field => (
            <Card
              key={field.id}
              highschoolTitle={yearbooksPurchased[0]?.high_school?.name}
              year={field.recapp_year}
              price={field?.final_price || '$50'}
              id={field?.id}
              purchase={false}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </Box>
  );
}

export default Purchased;
