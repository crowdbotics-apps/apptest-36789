import React from 'react';
import {Image} from 'react-native';
import {Box, View, Text, ScrollView} from 'native-base';

import Students from '~/assets/images/about/students-loking-on-computer.png';
import Header from '~/components/Header';
import {styles} from '../Why/styles';

function About() {
  return (
    <Box style={styles.container}>
      <Header title="About Us" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.text}>
            When Recapp was first developed, the goal was simple: develop a
            user-friendly software that allows students to easily transform
            their high school yearbook into an interactive, digital “yearbook”
            with unique features and custom content that would be more
            accessible, affordable, and engaging for students.
          </Text>
          <Text style={styles.text}>
            Recapp is more modern, significantly more affordable, and less
            harmful to the environment since each Recapp yearbook exists in a
            digital format instead of requiring printing paper or expensive ink.
          </Text>

          <Image source={Students} style={{...styles.image, height: 250}} />
        </View>
      </ScrollView>
    </Box>
  );
}

export default About;
