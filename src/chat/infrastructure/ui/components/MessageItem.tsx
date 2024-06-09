import {StyleSheet, View, Text} from 'react-native';

type ChatMessageProps = {
  message: string;
  time: string;
  isRead?: boolean;
  isSender?: boolean;
};

const MessageItem = ({message, time, isRead, isSender}: ChatMessageProps) => {
  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
        {/* {isSender && (
          <Text style={styles.readStatus}>{isRead ? 'Leído' : 'No leído'}</Text>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-start',
    gap: 10,
  },
  senderContainer: {
    alignItems: 'flex-end',
  },
  messageBox: {
    maxWidth: '70%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ECEAEA',
  },
  message: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  timeContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  readStatus: {
    fontSize: 12,
    color: 'blue',
  },
});

export default MessageItem;
