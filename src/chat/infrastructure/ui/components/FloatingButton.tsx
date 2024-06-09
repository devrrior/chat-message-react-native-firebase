import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FloatingButtonProps = {
  onPress: () => void;
};

const FloatingButton = ({onPress}: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="add" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#1E68D7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingButton;
