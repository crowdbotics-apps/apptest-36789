import React, {PureComponent} from 'react';
import TextField from '../TextField';

class NumberField extends PureComponent {
  static propTypes = {
    ...TextField.propTypes,
  };
  static defaultProps = {
    ...TextField.defaultProps,
  };

  render() {
    return <TextField {...this.props} keyboardType="numeric" />;
  }
}

export default NumberField;
