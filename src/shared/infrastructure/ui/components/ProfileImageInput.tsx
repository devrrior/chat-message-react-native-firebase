import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

type ProfileImageInputProps = {
  value: string;
  setValue: (profileImageUri: string) => void;
};

const ProfileImageInput = ({
  value: value,
  setValue: setValue,
}: ProfileImageInputProps) => {
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setValue(response.assets?.[0].uri as string);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            value
              ? {uri: value}
              : {
                  uri: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
                }
          }
          style={styles.image}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={selectImage}>
          <Icon name="photo-camera" size={25} color="#1E68D7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
});

export default ProfileImageInput;
