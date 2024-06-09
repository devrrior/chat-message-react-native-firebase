import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppBarProps = {
  title: string;
  titleColor?: string;
  leftIcon?: string;
  leftIconColor?: string;
  onLeftPress?: () => void;
  rightIcon?: string;
  rightIconColor?: string;
  onRightPress?: () => void;
};

const AppBar = ({
  title,
  titleColor,
  leftIcon,
  leftIconColor,
  rightIcon,
  rightIconColor,
  onLeftPress,
  onRightPress,
}: AppBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onLeftPress}>
          {leftIcon && (
            <Ionicons name={leftIcon} size={30} color={leftIconColor} />
          )}
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightPress}>
        {rightIcon && (
          <Ionicons name={rightIcon} size={30} color={rightIconColor} />
        )}
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
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    width: 15,
  },
});

export default AppBar;
