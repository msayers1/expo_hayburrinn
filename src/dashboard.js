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
        padding: 20
    }
  });

const Dashboard = () => {
  return (
    <View style={styles.container}>
    <Text>Hay Burr Inn Home Screen</Text>
    <Image
        style={styles.tinyLogo}
        source={require('../assets/logos_for_vista_green.png')}
      />
    

    <Text styles={styles.paragraph}>  Hay Burr Inn’s all-volunteer staff is dedicated to saving the lives of horses that are victims of starvation, neglect, abuse, bound for slaughter, or whose owners are unable to provide for their needs. It is our goal to rehabilitate and restore the physical and emotional health of the horses and find them a loving home, or continue to give them the special, intensive care they need to live out their days in peace.</Text>
    
  </View>
  );
}

export default Dashboard;