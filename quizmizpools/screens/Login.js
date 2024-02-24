import React, { useState } from 'react';
import { 
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

const Login = ({ navigation }) => {
    return (
        <ImageBackground 
            style={styles.background}
            source={require('../assets/quizmizflais.jpeg')}
        >
            <View>
                <View>
                    <View>
                        <Text>
                            Login
                        </Text>
                    </View>

                    <View>
                        <View>
                            <TextInput placeholder='Email'/>
                        </View>
                        <View>
                            <TextInput placeholder='Password'/>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginph: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#fff"
    }
})

export default Login;