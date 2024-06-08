import React from 'react';
import {StyleSheet, Text} from 'react-native';
import InputField from '../../../../shared/infrastructure/ui/components/InputField';
import Button from '../../../../shared/infrastructure/ui/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(true);

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrar Usuario</Text>
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
