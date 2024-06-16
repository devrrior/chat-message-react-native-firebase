import {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputField from '../../../../shared/infrastructure/ui/components/InputField';
import Button from '../../../../shared/infrastructure/ui/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import ErrorMessage from '../../../../shared/infrastructure/ui/components/ErrorMessage';
import {registerUseCase} from '../../dependecies';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validations';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import {SignUpScreenRouteProp} from '../types/userScreeensRouteProps';
import ProfileImageInput from '../../../../shared/infrastructure/ui/components/ProfileImageInput';
import {uploadImageUseCase} from '../../../../chat/infrastructure/dependecies';

const SignUpScreen = ({navigation}: SignUpScreenRouteProp) => {
  const [errors, setErrors] = useState([] as string[]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {}, [errors]);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImageUri: '',
  });

  const handleSubmit = async () => {
    let validationErrors = [];
    setIsSubmitting(true);

    if (!validateName(values.firstName)) {
      validationErrors.push('El nombre solo puede contener letras');
    }
    if (!validateName(values.lastName)) {
      validationErrors.push('El apellido solo puede contener letras');
    }
    if (!validateEmail(values.email)) {
      validationErrors.push('El correo electronico no es valido');
    }
    if (!validatePassword(values.password)) {
      validationErrors.push(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial',
      );
    }
    if (values.password !== values.confirmPassword) {
      validationErrors.push('Las contraseñas no coinciden');
    }
    if (values.profileImageUri === '') {
      validationErrors.push('Debes seleccionar una imagen de perfil');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const imageProfileUrl = await uploadImageUseCase.execute(
      values.profileImageUri,
    );

    registerUseCase.execute(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      imageProfileUrl,
    );

    navigation.navigate('SignInScreen');

    setErrors(validationErrors);
    setIsSubmitting(false);
  };

  const renderErrors = () => {
    return errors.map((error, index) => (
      <ErrorMessage key={index} message={error} width={'90%'} />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Chat UP"
        titleColor="#ffffff"
        leftIcon="chevron-back"
        leftIconColor="#ffffff"
        onLeftPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Registrar Usuario</Text>
      <ProfileImageInput
        value={values.profileImageUri}
        setValue={uri => setValues({...values, profileImageUri: uri})}
      />
      <KeyboardAvoidingView
        style={{width: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <InputField
              value={values.firstName}
              handleChange={value => setValues({...values, firstName: value})}
              width={'90%'}
              placeholder="Nombre"
            />
            <InputField
              value={values.lastName}
              handleChange={value => setValues({...values, lastName: value})}
              width={'90%'}
              placeholder="Apellido"
            />
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
            <InputField
              value={values.confirmPassword}
              handleChange={value =>
                setValues({...values, confirmPassword: value})
              }
              width={'90%'}
              placeholder="Confirmar contraseña"
              secureTextEntry={true}
            />
            <Button
              title="Registrarse"
              width={'90%'}
              handlePress={handleSubmit}
              isDisabled={isSubmitting}
            />
            {renderErrors()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
});

export default SignUpScreen;
