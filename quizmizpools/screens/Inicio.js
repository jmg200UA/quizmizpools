import React, { useState } from 'react';
import Prueba from './Prueba';
import { 
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

const Inicio = ({ navigation }) => {
    
    //CODIGO JAVI const [mostrarComponente, setMostrarComponente] = useState(0);
    const [mostrarPrueba, setMostrarPrueba] = useState(false);

    return (
            <ImageBackground 
                style={styles.background}
                source={require('../assets/uni1.jpg')}
            >
            <View style={styles.logoContainer}> 
                <TouchableOpacity onPress={() => navigation.navigate('Quiniela')}>              
                    <Image 
                        style={styles.logo} 
                        source={require('../assets/uni2.jpg')}
                    />    
                </TouchableOpacity>
                <Text>QUISMIZPOOLS</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.loginButton}>
                    Login 
                </View>
            </TouchableOpacity>
            <View style={styles.registerButton}>Registro</View>
        </ImageBackground>               
    );

    function cambioPagina(){
        console.log("Cambiamos");
        setMostrarPrueba(true);
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton:{
        color:"#fff", 
        width:"100%",
        height:70,
        backgroundColor: "#fc5c65",
        alignItems: "center",
    },
    logo:{
        width:100,
        height:100,
    },
    logoContainer:{
        position: "absolute",
        top:"10%",
        alignItems: "center",       
    },    
    registerButton:{
        color:"#fff", 
        width:"100%",
        height:70,
        backgroundColor: "#4ecdc4",
        alignItems: "center",
    }
})


export default Inicio;

/* CODIGO JAVI 
<View>
        {mostrarComponente === 0 && (
            <ImageBackground 
                style={styles.background}
                source={require('../assets/uni1.jpg')}
            >
            <View style={styles.logoContainer}>                
                <TouchableOpacity onPress={() => setMostrarComponente(1)}>
                    <Image 
                        style={styles.logo} 
                        source={require('../assets/uni2.jpg')}
                    />
                </TouchableOpacity>           
                <Text>QUISMIZPOOLS</Text>
            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </ImageBackground> 
        )}
        
        {mostrarComponente === 1 && (
            <Prueba/>
        )}  
        </View>  
        */