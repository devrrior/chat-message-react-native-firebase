import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppBarProps = {
  title: string;
  leftIcon?: string;
  onLeftPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
};

const AppBar = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: AppBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onLeftPress}>
          {leftIcon && <Ionicons name={leftIcon} size={30} color="#1E68D7" />}
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightPress}>
        {rightIcon && <Ionicons name={rightIcon} size={30} color="#1E68D7" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    width: 15,
  },
});

export default AppBar;
