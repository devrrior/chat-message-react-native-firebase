import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';
import SignUpScreen from '../../../../users/infrastructure/ui/screens/SignUpScreen';
import SignInScreen from '../../../../users/infrastructure/ui/screens/SignInScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'SignIn'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
