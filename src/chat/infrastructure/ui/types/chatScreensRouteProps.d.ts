import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type ListChatScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'ListChatScreen'
>;
type ChatScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'ChatScreen'
>;
type NewChatScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'NewChatScreen'
>;

export {ListChatScreenRouteProp, ChatScreenRouteProp, NewChatScreenRouteProp};
