import React from 'react';
import { SafeAreaView, Image, View, StyleSheet, TextInput,Button } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


// import { Container } from './styles';
import Illustration from './assets/illustration.png'
export default function Login() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
          <Image source={Illustration} style={styles.image}/>
        
          <View style={{flex:1, marginTop: 25}}> 
            <TextInput 
              placeholder="Usuário"
              style={styles.input}
            />
            <TextInput
              placeholder="Senha"
              style={styles.input}
              secureTextEntry={true}
            />
            <View style={styles.btnFrame}>
              <Button title="Login" style={styles.btn}/>
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
}


const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ececec'
  },
  content:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop: hp('20%')
  },
  image:{
    width:wp('70%'),
    height: hp('25%')
  },
  input:{
    width:wp('80%'),
    padding: 15,
    marginTop:3,
    borderRadius:15,
    backgroundColor:'#fff',
    fontSize: hp('2.2%'),
  },
  btnFrame:{
    marginTop: 15,
    fontWeight: '300',
    fontSize: hp('2.3%')
  },
})
