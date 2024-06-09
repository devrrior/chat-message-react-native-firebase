import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import {NewChatScreenRouteProp} from '../types/chatScreensRouteProps';
import {ScrollView, StyleSheet} from 'react-native';
import ContactItem from '../components/ContactItem';

const contacts = [
  {
    name: 'Rodrigo',
    avatar: 'https://via.placeholder.com/42',
  },
  {
    name: 'Eduardo',
    avatar: 'https://via.placeholder.com/42',
  },
  {
    name: 'Fernanda',
    avatar: 'https://via.placeholder.com/42',
  },
  {
    name: 'Javier',
    avatar: 'https://via.placeholder.com/42',
  },
  {
    name: 'Zenteno',
    avatar: 'https://via.placeholder.com/42',
  },
];

const NewChatScreen = ({navigation}: NewChatScreenRouteProp) => {
  const renderContacts = () => {
    return contacts.map(contact => (
      <ContactItem name={contact.name} key={contact.name} />
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
      <ScrollView style={styles.contacts}>{renderContacts()}</ScrollView>
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
});

export default NewChatScreen;
