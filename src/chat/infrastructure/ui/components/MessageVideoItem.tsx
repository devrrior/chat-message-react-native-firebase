import {StyleSheet, View, Text} from 'react-native';
import Video from 'react-native-video';

type MessageVideoProps = {
  message: string;
  time: string;
  isRead?: boolean;
  isSender?: boolean;
};

const MessageVideoItem = ({message, time, isSender}: MessageVideoProps) => {
  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={styles.messageBox}>
        <Video
          source={{uri: message}}
          style={styles.imageMessage}
          controls={true}
          paused={true}
        />
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

export default MessageVideoItem;
