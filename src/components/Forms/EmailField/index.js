import React, {PureComponent} from 'react';
import TextField from '../TextField';

class EmailField extends PureComponent {
  static propTypes = {
    ...TextField.propTypes,
  };
  static defaultProps = {
    ...TextField.defaultProps,
  };

  render() {
    return (
      <TextField
        {...this.props}
        autoCapitalize="none"
        keyboardType="email-address"
      />
    );
  }
}

export default EmailField;
