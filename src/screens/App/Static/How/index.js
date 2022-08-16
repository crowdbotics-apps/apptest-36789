import React from 'react';
import {Image} from 'react-native';
import {Box, View, Text, ScrollView} from 'native-base';

import Girl from '~/assets/images/how/girl-smiling-with-books.png';
import Student from '~/assets/images/how/tenagers-loking-on-computer.png';
import Header from '~/components/Header';
import {styles} from '../Why/styles';

function How() {
  return (
    <Box style={styles.container}>
      <Header title="How Does It Work?" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.text}>
            Recapp is the next generation of high school yearbooks. Recapp is a
            website and mobile application that allows high school students to
            convert their typical "printing-press" style yearbook into a
            digital, interactive, and updated version of their high school
            experience.
          </Text>
          <Text style={styles.text}>
            Students currently make their own yearbooks each year within their
            school’s yearbook club. Recapp’s creation process minimizes any
            changes from their current yearbook’s production.
          </Text>
          <Text style={styles.text}>
            Students input the same information and files into Recapp’s
            software, add their favorite videos, quotes, and other digital
            features using Recapp’s easy-to-use features.
          </Text>
          <Text style={styles.text}>
            Once the final touches are added to their new digital yearbook,
            Recapp converts their files into a stylish digital yearbook that can
            be accessed at any time through Recapp’s application or website.
            Students create a profile, search for their school’s name in the
            search bar, and purchase their new digital yearbook. Students can
            then access their Recapp yearbooks and explore their high school
            experience in vivid detail.
          </Text>
          <Image source={Student} style={styles.image} />
          <Image source={Girl} style={styles.image} />
        </View>
      </ScrollView>
    </Box>
  );
}

export default How;
