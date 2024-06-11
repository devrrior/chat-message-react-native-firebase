import {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MessageInputProps = {
  onSendText: (message: string) => Promise<void>;
  onSendImage: (image: string) => Promise<void>;
};

const MessageInput = ({onSendText, onSendImage}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendText = async () => {
    setIsSendingMessage(true);
    setMessage('');
    await onSendText(message);
    setIsSendingMessage(false);
  };

  const handleSendImage = async () => {
    setIsSendingMessage(true);
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel) {
      const photoUri = result.assets?.[0].uri as string;
      await onSendImage(photoUri);
    }
    setIsSendingMessage(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendImage} disabled={isSendingMessage}>
          <Icon
            name="image"
            size={30}
            color={isSendingMessage || message ? '#BDBDBD' : '#1E68D7'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSendText}
          disabled={message || isSendingMessage ? false : true}>
          <Icon name="send" size={30} color={message ? '#1E68D7' : '#BDBDBD'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    gap: 10,
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
