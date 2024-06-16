import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {firebaseAuth, firebaseDB} from '../../../../../config/firebase.config';
import {SplashScreenRouteProps} from '../types/sharedScreensRouteProps';
import {useEffect} from 'react';
import {useAppDispatch} from '../../redux/store';
import {AuthActionTypes} from '../../redux/actions/authAction';
import {doc, getDoc} from 'firebase/firestore';
import UserEntity from '../../../../users/domain/entities/UserEntity';

const SplashScreen = ({navigation}: SplashScreenRouteProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    checkedLoggedUser();
  });

  const checkedLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const userDoc = await getDoc(doc(firebaseDB, 'users', user.uid));

        if (userDoc.exists()) {
          const userEntity = UserEntity.fromFirebase(userDoc.data());

          dispatch({type: AuthActionTypes.LOGIN, payload: userEntity});
          navigation.navigate('ListChatScreen');
        }
      } else {
        navigation.navigate('SignInScreen');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Entypo name="chat" size={100} color="#1E68D7" />
      <View style={styles.separator} />
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});

export default SplashScreen;
