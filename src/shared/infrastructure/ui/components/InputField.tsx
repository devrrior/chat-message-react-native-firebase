import {DimensionValue, StyleSheet, TextInput} from 'react-native';

type InputFieldProps = {
  width: DimensionValue;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  handleChange: (text: string) => void;
};

const InputField = ({
  value,
  width,
  placeholder,
  secureTextEntry,
  handleChange,
}: InputFieldProps) => {
  return (
    <TextInput
      style={[styles.input, {width}]}
      placeholder={placeholder}
      placeholderTextColor="#CCCCCC"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={handleChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#3362A9',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
});

export default InputField;
