import React, {useEffect} from 'react';
import {Box, View, ScrollView, Text} from 'native-base';

import {useDispatch, useSelector} from 'react-redux';
import Header from '~/components/Header';
import {styles} from './styles';
import {loadYearbook} from '~/store/yearbook/actions';

function ViewYearbook({route}) {
  const {id} = route.params;
  const yearbook = useSelector(state => state.yearbook.view);
  const [images, setImages] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [pageRendering, setPageRendering] = React.useState('');

  console.log('yearbook', yearbook);
  console.log('images', images);
  console.log('totalPages', totalPages);
  console.log('pageRendering', pageRendering);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadYearbook(id));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const loadRecapp = async () => {
      setPageRendering(true);

      console.log(
        'aqui',
        yearbook.recapp?.substring(0, yearbook.recapp.indexOf('?')),
      );

      setPageRendering(false);
    };

    yearbook && loadRecapp();
  }, [yearbook]);

  return (
    <Box style={styles.container}>
      <Header title="Library" />
      <ScrollView>
        <View style={styles.content}>
          <Text>View</Text>
        </View>
      </ScrollView>
    </Box>
  );
}

export default ViewYearbook;
