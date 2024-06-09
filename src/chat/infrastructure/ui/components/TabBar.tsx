import {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const TabBar = () => {
  const [selectedTab, setSelectedTab] = useState('Todos');

  return (
    <View style={styles.container}>
      {['Todos', 'No leído', 'Leído'].map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => setSelectedTab(tab)}
          style={[styles.tab, selectedTab === tab && styles.selectedTab]}>
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  selectedTab: {
    backgroundColor: '#1E68D7',
  },
  tabText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TabBar;
