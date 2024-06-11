import {StyleSheet, View, Text, Image} from 'react-native';

type ContactItemTypeProps = {
  profileImageUrl: string;
  name: string;
};

const ContactItem = ({name, profileImageUrl}: ContactItemTypeProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: profileImageUrl}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
  },
});

export default ContactItem;
