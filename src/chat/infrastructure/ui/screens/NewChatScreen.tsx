import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import {NewChatScreenRouteProp} from '../types/chatScreensRouteProps';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactItem from '../components/ContactItem';
import {useEffect, useState} from 'react';
import {firebaseAuth} from '../../../../../config/firebase.config';
import UserEntity from '../../../../users/domain/entities/UserEntity';
import {
  findUserByIdUseCase,
  listUsersUseCase,
} from '../../../../users/infrastructure/dependecies';
import {createChatUseCase} from '../../dependecies';
import ParticipantEntity from '../../../domain/entities/ParticipantEntity';

const NewChatScreen = ({navigation}: NewChatScreenRouteProp) => {
  const [contacts, setContacts] = useState([] as UserEntity[]);
  const [isLoading, setIsLoading] = useState(true);

  const userCredentials = firebaseAuth.currentUser;

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await listUsersUseCase.execute();

      const filteredData = data.filter(
        user => user._id !== userCredentials?.uid,
      );

      setContacts(filteredData);
      setIsLoading(false);
    };

    fetchContacts();
  }, [userCredentials]);

  const onContactPress = async (contact: UserEntity) => {
    const senderUser = await findUserByIdUseCase.execute(
      userCredentials?.uid as string,
    );
    const receiverUser = await findUserByIdUseCase.execute(contact._id);
    const collaborators = [
      new ParticipantEntity(
        senderUser?._id as string,
        senderUser?.firstName as string,
        senderUser?.lastName as string,
      ),
      new ParticipantEntity(
        receiverUser?._id as string,
        receiverUser?.firstName as string,
        receiverUser?.lastName as string,
      ),
    ];
    await createChatUseCase.execute(collaborators);

    navigation.navigate('ListChatScreen');
  };

  const renderContacts = () => {
    return contacts.map(contact => (
      <TouchableOpacity
        key={contact._id}
        onPress={() => onContactPress(contact)}>
        <ContactItem
          name={`${contact.firstName} ${contact.lastName}`}
          key={contact._id}
        />
      </TouchableOpacity>
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Nuevo chat"
        leftIcon="chevron-back"
        leftIconColor="#1E68D7"
        onLeftPress={() => navigation.goBack()}
      />
      {!isLoading && (
        <ScrollView style={styles.contacts}>{renderContacts()}</ScrollView>
      )}
      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#1E68D7" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contacts: {
    display: 'flex',
    paddingHorizontal: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewChatScreen;
