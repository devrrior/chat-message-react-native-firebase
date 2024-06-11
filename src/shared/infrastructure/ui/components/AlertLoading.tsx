import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

const AlertLoading = () => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default AlertLoading;
