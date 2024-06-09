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

export {ListChatScreenRouteProp, ChatScreenRouteProp};
