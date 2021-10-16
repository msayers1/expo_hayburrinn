import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    tinyLogo: {
      width: 100,
      height: 100,
      paddingTop: 20
    },
    logo: {
      width: 66,
      height: 58,
    },
    paragraph: {
        width: '70%',
        padding: 20
    }
  });

const Dashboard = () => {
  return (
    <View style={styles.container}>
    <Text>Profile</Text>
    <Text styles={styles.paragraph}>Profile Info</Text>
    
  </View>
  );
}

export default Dashboard;