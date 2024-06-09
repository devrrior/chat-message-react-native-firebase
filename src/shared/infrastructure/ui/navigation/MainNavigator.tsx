import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';
import SignUpScreen from '../../../../users/infrastructure/ui/screens/SignUpScreen';
import SignInScreen from '../../../../users/infrastructure/ui/screens/SignInScreen';
import ListChatScreen from '../../../../chat/infrastructure/ui/screens/ListChatScreen';
import ChatScreen from '../../../../chat/infrastructure/ui/screens/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'ListChatScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ListChatScreen" component={ListChatScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
