import React, {useEffect} from 'react';
import {Box, View, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {Fab} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {loadYearbooks} from '~/store/yearbook/actions';
import Card from './Card';
import {primaryColor} from '~/config/colors';
import {getUser} from '~/store/user/actions';

function Home({navigation}) {
  const dispatch = useDispatch();
  const yearbooksList = useSelector(state => state.yearbook.list);
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadYearbooks());
      dispatch(getUser());
    };
    fetchData();
  }, [dispatch]);

  const handleMoveScreen = () => {
    navigation.navigate('AddYearbook');
  };

  return (
    <Box style={styles.container}>
      <Header title="Library" />
      <ScrollView>
        <View style={styles.content}>
          {yearbooksList.map(field => (
            <Card
              key={field.id}
              highschoolTitle={yearbooksList[0]?.high_school?.name}
              year={field.recapp_year}
              price={field?.final_price || '$50'}
              id={field?.id}
              purchase
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      {user?.on_committee && (
        <Box rounded="lg">
          <Fab
            style={{backgroundColor: primaryColor}}
            onPress={handleMoveScreen}
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={<Icon color="white" name="plus" size={30} />}
          />
        </Box>
      )}
    </Box>
  );
}

export default Home;
