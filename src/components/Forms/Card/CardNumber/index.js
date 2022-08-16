import React, {PureComponent} from 'react';
import {MaskService} from 'react-native-masked-text';
import NumberField from '../../NumberField';
import {replaceInput} from '~/tools/functions';

class CardNumber extends PureComponent {
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

    onChangeText(MaskService.toMask('credit-card', replaceInput(value)));
  }
}

export default CardNumber;
