import React from 'react';
import {Image} from 'react-native';
import {Box, View, Text, ScrollView} from 'native-base';

import Girl from '~/assets/images/why/girl-on-computer.png';
import Student from '~/assets/images/why/students-talking.png';
import Header from '~/components/Header';
import {styles} from './styles';

function Why() {
  return (
    <Box style={styles.container}>
      <Header title="Why Recapp?" />
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
            Students can add video clips from their homecoming sporting events,
            band/choir performances, and much more! The students will be able to
            record senior quotes as audio files and apply their signatures via
            stylus or touch screen into the back of each other’s new
            "yearbooks."
          </Text>
          <Text style={styles.text}>
            Recapp also stores yearbooks from previous school years within its
            data base to ensure each student can access their new digital
            yearbooks whenever and wherever they want. Students can store their
            freshman, sophomore, junior, and senior yearbooks all within their
            Recapp profile page and access them individually with the tap of
            their finger.
          </Text>
          <Text style={styles.text}>
            Students will be able to show their future generations their high
            school experiences in vivid detail with videos, pictures, audio
            files, and unique signatures!
          </Text>
          <Image source={Student} style={styles.image} />
          <Image source={Girl} style={styles.image} />
        </View>
      </ScrollView>
    </Box>
  );
}

export default Why;
