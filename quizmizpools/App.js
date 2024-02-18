import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/quizmizflais.jpeg")}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.centeredText}>QuizmizPools</Text>
      </ImageBackground>
      
      <StatusBar style="auto" />
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  imageStyle: {
    opacity: 0.5,
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
