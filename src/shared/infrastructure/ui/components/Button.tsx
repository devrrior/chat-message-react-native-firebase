import {
  StyleSheet,
  TouchableOpacity,
  Text,
  DimensionValue,
  GestureResponderEvent,
} from 'react-native';

type ButtonProps = {
  width?: DimensionValue;
  title: string;
  isDisabled?: boolean;
  handlePress: (event: GestureResponderEvent) => void;
};

const Button = ({width, title, isDisabled, handlePress}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        {width},
        isDisabled && styles.disabledButton, // Agrega el estilo de deshabilitado si isDisabled es true
      ]}
      disabled={isDisabled} // Deshabilita el botón si isDisabled es true
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#1A73E8',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5, // Cambia la opacidad del botón cuando está deshabilitado
  },
});

export default Button;
