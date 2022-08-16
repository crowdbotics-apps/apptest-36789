import React, {PureComponent} from 'react';
import {View} from 'native-base';
import PropTypes from 'prop-types';
import {styles} from './styles';
import TextField from '../TextField';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class PasswordField extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    styleIcon: PropTypes.object,
    typeIcon: PropTypes.string,
    label: PropTypes.string,
    showIcon: PropTypes.bool,
  };
  static defaultProps = {
    styleIcon: {},
    typeIcon: 'MaterialIcons',
    label: null,
    showIcon: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      icEye: 'visibility',
      password: true,
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: 'visibility-off',
        password: false,
      };
    } else {
      newState = {
        icEye: 'visibility',
        password: true,
      };
    }

    this.setState(newState);
  };

  render() {
    const {password, icEye} = this.state;
    const {label, styleIcon, showIcon} = this.props;

    return (
      <View>
        <TextField
          {...this.props}
          label={label}
          autoCapitalize="none"
          secureTextEntry={password}
          ref={ref => (this._field = ref)}
        />

        {showIcon && (
          <Icon
            name={icEye}
            style={{...styles.icon, ...styleIcon}}
            onPress={this.changePwdType}
          />
        )}
      </View>
    );
  }
}
