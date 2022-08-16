import React from 'react';
import {Box, View, Text, Accordion, ScrollView} from 'native-base';

import Header from '~/components/Header';
import {styles} from '../Why/styles';
import {FAQs} from './data';

function FAQ() {
  return (
    <Box style={styles.container}>
      <Header title="Frequently Asked Questions" />
      <ScrollView>
        <View style={styles.content}>
          <Accordion index={[0]}>
            {FAQs.map((x, i) => (
              <Accordion.Item key={i}>
                <Accordion.Summary style={styles.item}>
                  <Text style={styles.title}>{x.question}</Text>
                  <Accordion.Icon color="white" />
                </Accordion.Summary>
                <Accordion.Details>
                  <Text style={styles.text}>{x.answer}</Text>
                </Accordion.Details>
              </Accordion.Item>
            ))}
          </Accordion>
        </View>
      </ScrollView>
    </Box>
  );
}

export default FAQ;
