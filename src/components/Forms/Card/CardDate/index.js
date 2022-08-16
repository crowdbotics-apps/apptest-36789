import React, {PureComponent} from 'react';
import {MaskService} from 'react-native-masked-text';
import NumberField from '../../NumberField';
import {replaceInput} from '~/tools/functions';

class CardDate extends PureComponent {
  static propTypes = {
    ...NumberField.propTypes,
  };
  static defaultProps = {
    ...NumberField.defaultProps,
  };

  render() {
    return (
      <NumberField
        {...this.props}
        keyboardType="numeric"
        onChangeText={this.onChangeText.bind(this)}
      />
    );
  }

  onChangeText(value) {
    const {onChangeText} = this.props;

    onChangeText(
      MaskService.toMask('custom', replaceInput(value), {
        mask: '99/99',
      }),
    );
  }
}

export default CardDate;
