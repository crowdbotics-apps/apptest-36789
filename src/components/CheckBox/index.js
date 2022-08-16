import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '~/components/Text';
import {styles} from './styles';

function CheckBox({
  label = null,
  checked = false,
  radio = false,
  action = () => null,
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.row} onPress={action}>
      {checked ? (
        <Icon
          name={radio ? 'dot-circle-o' : 'check-square'}
          style={styles.icon}
        />
      ) : (
        <Icon name={radio ? 'circle-thin' : 'square-o'} style={styles.icon} />
      )}

      {!!label && <Text>{label}</Text>}
    </TouchableOpacity>
  );
}

export default CheckBox;
