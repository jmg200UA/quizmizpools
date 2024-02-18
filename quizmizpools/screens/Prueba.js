import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Platform, 
  StatusBar, 
  Button, 
  Alert, 
  TouchableNativeFeedback, 
  TouchableOpacity,
  TouchableHighlight, 
  TouchableWithoutFeedback, 
  Image, 
  SafeAreaView, 
  View,
  Dimensions
} from 'react-native';



export default function App() {

  /*let x=1;
  console.log("El numero es: " + x);*/
  /*const textoPresionado = () => console.log("Funciona el texto");*/
  const imagenPresionado = () => console.log("Funciona la imagen");
  /*const botonPresionado = () => alert("Funciona el boton");*/
  
  console.log(Dimensions.get('screen'));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titulo, styles.centro]}>QuizmizPools</Text>

      <View style ={{
        backgroundColor: "white",
        flex: 0.5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
      }}>
          <View style ={{
            backgroundColor: "green",
            width:100,
            height:100,
          }}/>
          <View style ={{
            backgroundColor: "black",
            width:100,
            height:100,
          }}/>
          <View style ={{
            backgroundColor: "darkblue",
            width:100,
            height:100,
          }}/>
      </View>


      {/*Asi se hacen los comentario*/}

      {/*
      <Text onPress={textoPresionado}>
        Texto para presionar
      </Text>
      */} 

      {/* PRUEBA IMAGEN NUESTRA
      <Image source={require('./assets/uni1.jpg')} />
      */}

      <TouchableOpacity onPress={imagenPresionado}>
        <Image 
        fadeDuration={5000}
        source={{
          width: 400,
          height: 328,
          uri: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/800px-Real_betis_logo.svg.png"
          }}/>
      </TouchableOpacity>

      {/*
      <Button 
        color="green"
        title='Tocame' 
        onPress={botonPresionado}
      />
      */}

      <Button style={[styles.centro]} 
        color="green"
        title='Partidazo' 
        onPress={() => 
          Alert.alert("Sabado 19h", "Barcelona 3 Betis 4", [
            {text: "Siuuu" , onPress: () => console.log("Funciona miniBoton 1")},
            {text: ":(" , onPress: () => console.log("Funciona miniBoton 2")},
          ])
        }
      />

      {/* NO FUNCIONA PARA ANDRIOD WTF 
      <Button 
        color="black"
        title='Resultado' 
        onPress={() => 
          Alert.prompt("Sabado 21h", "Sevilla - Valencia",
          (text) => console.log("Resultado" + text))
        }
      />
      */}
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight-20 : 0,
  },
  titulo:{
    fontSize: 32,    
  },
  centro:{
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
