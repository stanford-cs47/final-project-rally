import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import map from './assets/map.png';

export default function App() {
  return (
    <View style={styles.container}>
        <ImageBackground source={map} style={{width: '100%', height: '100%'}}>
          
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
