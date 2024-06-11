import {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
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
import {firebaseStorage} from '../../../../../config/firebase.config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

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

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // uploading image
    const filename = values.profileImageUri.substring(
      values.profileImageUri.lastIndexOf('/') + 1,
    );
    const storageRef = ref(firebaseStorage, `images/${filename}`);
    const uploadUri =
      Platform.OS === 'ios'
        ? values.profileImageUri.replace('file://', '')
        : values.profileImageUri;

    const blob = await fetch(uploadUri).then(response => response.blob());

    const snapshot = await uploadBytes(storageRef, blob);
    const imageProfileUrl = await getDownloadURL(snapshot.ref);

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
        handleChange={value => setValues({...values, confirmPassword: value})}
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
