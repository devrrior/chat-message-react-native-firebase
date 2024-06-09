import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type SignUpScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>;
type SignInScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;

export {SignUpScreenRouteProp, SignInScreenRouteProp};
