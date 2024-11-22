import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Divider = ({ borderbottomColor, borderBottomWidth, width, top, bottom}) => {
  return (
    <View style={{ borderBottomColor: borderbottomColor, borderBottomWidth: borderBottomWidth, width: width, top: top, bottom:bottom }} />
  );
};


export default Divider;