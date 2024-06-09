import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../../../shared/infrastructure/ui/components/Button';
import {useState} from 'react';
import InputField from '../../../../shared/infrastructure/ui/components/InputField';
import ErrorMessage from '../../../../shared/infrastructure/ui/components/ErrorMessage';
import {authenticateUseCase} from '../../dependecies';
import {SignInScreenRouteProp} from '../types/userScreeensRouteProps';
import {useAppDispatch} from '../../../../shared/infrastructure/redux/store';
import {AuthActionTypes} from '../../../../shared/infrastructure/redux/actions/authAction';

const SignInScreen = ({navigation}: SignInScreenRouteProp) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let validationErrors = [];

    if (!values.email) {
      validationErrors.push('El correo electronico es requerido');
    }

    if (!values.password) {
      validationErrors.push('La contraseña es requerida');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const userEntity = await authenticateUseCase.execute(
      values.email,
      values.password,
    );

    if (!userEntity) {
      setErrors(['Usuario o contraseña incorrectos']);
      setIsSubmitting(false);
      return;
    }

    dispatch({type: AuthActionTypes.LOGIN, payload: userEntity});

    console.log(userEntity);

    setErrors(errors);
    setIsSubmitting(false);
  };

  const renderErrors = () => {
    return errors.map((error, index) => (
      <ErrorMessage key={index} message={error} width={'90%'} />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <InputField
        value={values.email}
        handleChange={value => setValues({...values, email: value})}
        width={'90%'}
        placeholder="Correo electronico"
      />
      <InputField
        value={values.password}
        handleChange={value => setValues({...values, password: value})}
        width={'90%'}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Text style={styles.linkText}>
        ¿No tienes cuenta?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('SignUpScreen')}>
          Registrate
        </Text>
      </Text>
      <Button
        title="Iniciar sesión"
        width={'90%'}
        handlePress={handleSubmit}
        isDisabled={isSubmitting}
      />
      {renderErrors()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1A73E8',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    marginTop: 20,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'white',
    marginBottom: 20,
  },
  link: {
    color: '#223252',
  },
});

export default SignInScreen;
