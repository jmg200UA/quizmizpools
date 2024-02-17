import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity,TouchableHighlight, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';

export default function App() {

  /*let x=1;
  console.log("El numero es: " + x);*/
  const consolaPresionado = () => console.log("Funciona el press");

  return (
    <SafeAreaView style={styles.container}>
      <Text>QuizmizPools</Text>
      {/*Asi se hacen los comentario*/}

      {/*<Text onPress={consolaPresionado}>
        Texto para presionar
      </Text>*/} 
      {/* PRUEBA IMAGEN NUESTRA
      <Image source={require('./assets/uni1.jpg')} />*/}
      <TouchableOpacity onPress={consolaPresionado}>
        <Image 
        fadeDuration={5000}
        source={{
          width: 400,
          height: 328,
          uri: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/800px-Real_betis_logo.svg.png"
          }}/>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
