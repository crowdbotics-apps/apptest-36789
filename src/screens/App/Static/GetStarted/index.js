import React from 'react';
import {Box, View, Text, ScrollView} from 'native-base';

import Header from '~/components/Header';
import {styles} from '../Why/styles';
import ButtonCustom from '~/components/Button';
import defaultStyles from '~/template/styles';

function GetStart({navigation}) {
  return (
    <Box style={styles.container}>
      <Header title="Get Started" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.text}>
            Each step of creating a school’s Recapp is made simple by modifying
            your current yearbook development process as little as possible.
            Recapp allows students to upload the same content files that are
            sent to their printing companies into its software.
          </Text>
          <Text style={styles.text}>
            Once the yearbook has been uploaded, students can add content like
            video clips, audio files, and hand-written signatures to bring their
            creativity and high-school experience to life! Once completed, the
            school’s Recapp will be accessible through Recapp’s mobile
            application or website. Students and their families can create an
            account and purchase their electronic yearbook.
          </Text>

          <ButtonCustom
            title={'Sign Up'}
            styleText={defaultStyles.textInverse}
            style={defaultStyles.btnInverse}
            onPress={() => navigation.navigate('SignUp')}
          />

          <ButtonCustom
            title={'Log In'}
            styleText={defaultStyles.textBtn}
            style={defaultStyles.btnDefault(false)}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </Box>
  );
}

export default GetStart;
