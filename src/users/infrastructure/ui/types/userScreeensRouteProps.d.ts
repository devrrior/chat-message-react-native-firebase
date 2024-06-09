import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type SignUpScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'SignUpScreen'
>;
type SignInScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'SignInScreen'
>;

export {SignUpScreenRouteProp, SignInScreenRouteProp};
