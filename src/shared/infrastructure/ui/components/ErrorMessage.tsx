import {DimensionValue, StyleSheet, Text, View} from 'react-native';

type ErrorMessageProps = {
  message: string;
  width?: DimensionValue;
};

const ErrorMessage = ({message, width}: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, {width}]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 10,
    backgroundColor: '#FFCDD2',
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: '#D32F2F',
    textAlign: 'center',
  },
});

export default ErrorMessage;
