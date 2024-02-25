import React, { useState } from 'react';
import { 
    Image,
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={{flex: 1,
            justifyContent:'center',
            alignItems:'center'}}>
            <View style={{paddingHorizontal:25}}>
                <View style={{alignItems:'center'}}>
                    <Image
                        style={{height:300, width:300}}
                        source={require('../assets/KismizHappy.jpeg')}
                    />  
                </View>
                <Text 
                    style={{
                    fontSize:28,
                    fontWeight:'500',
                    color:'#333',
                    marginBottom:30
                    }}>Login Screen
                </Text>

                <View style={{flexDirection:'row', borderBottomColor:"#ccc", borderBottomWidth:1, paddingBottom:8, marginBottom:25}}>
                    <Icon name="envelope" size={20} color="#333" style={{ marginRight: 10 }} />
                    <TextInput placeholder='Email' style={{flex:1, paddingVertical:0}} keyboardType="email-address"/>
                </View>
                <View style={{flexDirection:'row', borderBottomColor:"#ccc", borderBottomWidth:1, paddingBottom:8, marginBottom:25}}>
                    <Icon name="lock" size={20} color="#333" style={{ marginRight: 10 }} />
                    <TextInput placeholder='Password' style={{flex:1, paddingVertical:0}} secureTextEntry={true}/>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color:'#AD40AF', fontWeight:'700'}}>Forgot?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {}} style={{backgroundColor:'#AD40AF', padding:20, borderRadius:10, marginBottom: 30}}>
                    <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Login</Text>
                </TouchableOpacity>

                <Text style={{textAlign:'center', color:'#666', marginBottom:30}}>Or, login with ...</Text>
                
                <TouchableOpacity onPress={() => {}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10, paddingHorizontal:30, paddingVertical:10}}>
                    <Icon name="google" size={20} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10, paddingHorizontal:30, paddingVertical:10}}>
                    <Icon name="facebook" size={20} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10, paddingHorizontal:30, paddingVertical:10}}>
                    <Icon name="twitter" size={20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Login;