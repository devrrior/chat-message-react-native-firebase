import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import PlaceholderProfile from '../../../../../assets/placeholder_profile.jpg';

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
          source={value.length > 0 ? {uri: value} : PlaceholderProfile}
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
