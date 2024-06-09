import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';
import SignUpScreen from '../../../../users/infrastructure/ui/screens/SignUpScreen';
import SignInScreen from '../../../../users/infrastructure/ui/screens/SignInScreen';
import ListChatScreen from '../../../../chat/infrastructure/ui/screens/ListChatScreen';
import ChatScreen from '../../../../chat/infrastructure/ui/screens/ChatScreen';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import SplashScreen from '../screens/SplashScreen';
import NewChatScreen from '../../../../chat/infrastructure/ui/screens/NewChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="ListChatScreen" component={ListChatScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default MainNavigator;
