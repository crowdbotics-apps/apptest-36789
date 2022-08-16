import React, {PureComponent} from 'react';
import {TextInput, InteractionManager, Platform, Keyboard} from 'react-native';
import {View} from 'native-base';
import PropTypes from 'prop-types';
import Text from '~/components/Text';
import {styles} from './styles';
import {textColor} from '~/config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

class TextField extends PureComponent {
  static propTypes = {
    focus: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    floating: PropTypes.bool,
    multiline: PropTypes.bool,
    stytleInput: PropTypes.object,
    stytleLabel: PropTypes.object,
    stytleContent: PropTypes.object,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onEndEditing: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    icon: PropTypes.string,
    customIcon: PropTypes.node,
    styledIcon: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };
  static defaultProps = {
    value: '',
    label: '',
    icon: '',
    styledIcon: {},
    customIcon: null,
    focus: false,
    invalid: false,
    disabled: false,
    floating: false,
    multiline: false,
    placeholder: '',
    placeholderColor: textColor,
    stytleInput: {},
    stytleLabel: {},
    stytleContent: {},
    onBlur: () => null,
    onFocus: () => null,
    onEndEditing: () => null,
    onSubmitEditing: () => null,
  };

  componentDidMount() {
    this.setFocus();
  }

  setFocus() {
    const {focus} = this.props;
    if (focus) {
      InteractionManager.runAfterInteractions(() => {
        this._field.focus();
      });
    }
  }

  render() {
    const {
      icon,
      value,
      label,
      invalid,
      onFocus,
      onBlur,
      disabled,
      floating,
      multiline,
      styledIcon,
      customIcon,
      stytleInput,
      stytleLabel,
      stytleContent,
      placeholder,
      placeholderColor,
      onChangeText,
      onEndEditing,
      onSubmitEditing,
    } = this.props;

    return (
      <View style={styles.container}>
        <View
          style={{...styles.content(floating, multiline), ...stytleContent}}>
          {!!label && (
            <Text style={{...styles.label(disabled), ...stytleLabel}}>
              {label}
            </Text>
          )}
          {!icon && !!customIcon && customIcon}
          {!!(icon && !customIcon) && <Icon name={icon} style={styledIcon} />}

          <TextInput
            {...this.props}
            value={value}
            scrollEnabled={true}
            editable={!disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref => (this._field = ref)}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor={placeholderColor}
            style={{...styles.input(disabled), ...stytleInput}}
            onKeyPress={e => {
              if (e.nativeEvent.key === 'Backspace' && !value) {
                if (Platform.OS === 'ios') {
                  Keyboard.dismiss();
                }
              }
            }}
          />
        </View>
        {!!invalid && <Text style={styles.invalid}>{label} inválido</Text>}
      </View>
    );
  }
}

export default TextField;
