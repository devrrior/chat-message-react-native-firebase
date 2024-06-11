import {StyleSheet, View, Text, Image} from 'react-native';

type MessageImageProps = {
  message: string;
  time: string;
  isRead?: boolean;
  isSender?: boolean;
};

const MessageImageItem = ({message, time, isSender}: MessageImageProps) => {
  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={styles.messageBox}>
        <Image source={{uri: message}} style={styles.imageMessage} />
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
  imageMessage: {
    width: 200,
    height: 200,
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

export default MessageImageItem;
