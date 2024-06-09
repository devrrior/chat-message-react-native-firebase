import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ChatAppBarProps = {
  avatar: string;
  name: string;
  onBackPress: () => void;
};

const ChatAppBar = ({avatar, name, onBackPress}: ChatAppBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="chevron-back" size={30} color="#1E68D7" />
      </TouchableOpacity>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FEFEFE',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
  name: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ChatAppBar;
