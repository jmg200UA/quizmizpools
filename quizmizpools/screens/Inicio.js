import React, { useState } from 'react';
import Prueba from './Prueba';
import { 
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

function Inicio(props) {
    
    //const [mostrarComponente, setMostrarComponente] = useState(0);

    return (
            <ImageBackground 
                style={styles.background}
                source={require('../assets/uni1.jpg')}
            >
            <View style={styles.logoContainer}>                
                    <Image 
                        style={styles.logo} 
                        source={require('../assets/uni2.jpg')}
                    />    
                <Text>QUISMIZPOOLS</Text>
            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </ImageBackground>               
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton:{
        width:"100%",
        height:70,
        backgroundColor: "#fc5c65",
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
        width:"100%",
        height:70,
        backgroundColor: "#4ecdc4",
    }
})


export default Inicio;

/*
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