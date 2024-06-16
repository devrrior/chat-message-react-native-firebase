import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

type AlertLoadingProps = {
  message: string;
};

const AlertLoading = ({message}: AlertLoadingProps) => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="small" color="#1E68D7" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 15,
    borderRadius: 10,
  },
});

export default AlertLoading;
