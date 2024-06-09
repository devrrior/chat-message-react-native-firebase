import {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MessageInputProps = {
  onSend: (message: string) => void;
};

const MessageInput = ({onSend}: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={handleSend}>
        <Icon name="send" size={30} color="#1E68D7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
});

export default MessageInput;
