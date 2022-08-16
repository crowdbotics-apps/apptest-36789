import React from 'react';
import {View, Input} from 'native-base';
import {useFieldArray, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

const FieldArray = ({control, register}) => {
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'table_of_contents',
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <View style={styles.viewFields} key={field.id}>
            <Controller
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder={'Title'}
                  borderWidth={0}
                  width="50%"
                />
              )}
              name={`table_of_contents.${index}.title`}
              control={control}
            />
            <Controller
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  borderWidth={0}
                  placeholder={'Page Number'}
                  width="38%"
                  keyboardType="numeric"
                />
              )}
              name={`table_of_contents.${index}.page_number`}
              control={control}
            />

            <Icon
              style={styles.icon}
              name="trash"
              onPress={() => remove(index)}
              size={22}
            />
          </View>
        );
      })}

      <Icon
        style={{...styles.icon, marginBottom: 50}}
        name="plus"
        onPress={() =>
          append({
            title: '',
            page_number: 0,
          })
        }
        size={22}
        color="green"
      />
    </>
  );
};

export default FieldArray;
