import React, {useState} from 'react';
import {Image, View, StyleSheet, TextInput,TouchableOpacity, KeyboardAvoidingView, Text, SafeAreaView, Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

import Icon from 'react-native-vector-icons/FontAwesome'


import api from '../utils/api'
// import { Container } from './styles';
import Illustration from './assets/illustration.png'
export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [border, setBorderColor] = useState('#fff')

  const [hiddenPass, setPassHidden] = useState(true)
  const [changeIcon, setIcon] = useState('lock')
  function onPressPad(){
    if(hiddenPass){
      setPassHidden(false)
      setIcon('unlock')
    }else{
      setPassHidden(true)
      setIcon('lock')
    }
  }

  async function handleLogin(){
    
    if(email && senha ){
      try{
        const response = await api.post('/sessions', {
              email, senha
          })
          console.log(response.data)
        }catch(error){
          setBorderColor("#c20a0a")

        }
    }else{
      setBorderColor("#c20a0a")
      
    }
  }
  return (
      <SafeAreaView style={styles.root}>
          <KeyboardAvoidingView style={styles.content} behavior="padding">
              <Text style={styles.title}>Login</Text>
              <Image source={Illustration} style={styles.image} resizeMode="contain"/>
              <View style={styles.form}>
                <View style={{...styles.entryGroup, borderColor: border}}>
                  <Icon name="user" size={25} color='#787878'/>
                  <TextInput 
                    placeholder="Usuário" 
                    style={styles.input} 
                    onKeyPress={()=>setBorderColor('#fff')}
                    onChangeText={(value)=>setEmail(value)} value={email}/>
                </View>
                <View style={{...styles.entryGroup, borderColor: border}}>
                  <Icon name={changeIcon} size={25} color='#787878' onPress={()=>onPressPad()}/>
                  <TextInput 
                    placeholder="Senha" 
                    style={styles.input} 
                    secureTextEntry={hiddenPass} 
                    onChangeText={(value)=>setSenha(value)} value={senha}/>
                </View>
                  <TouchableOpacity onPress={()=>handleLogin()}>
                      <View style={styles.btnFrame}>
                          <Text style={styles.btnText}>
                              Entrar
                          </Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPressOut={()=>Linking.openURL('http://www.siepe.educacao.pe.gov.br/GerenciadorAcessoWeb/cadastroUsuarioAction.do?actionType=iniciar&origem=Portal')}>
                      <View style={{...styles.btnFrame, backgroundColor:'transparent', borderColor:'#149dff', borderStyle:'solid', borderWidth:2,}}>
                          <Text style={{...styles.btnText, color:'#149dff'}}>
                              Cadastre-se
                          </Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </KeyboardAvoidingView>
      </SafeAreaView>   
  );
}


const styles= StyleSheet.create({
  root:{
    flex:1, 
    backgroundColor: '#ececec',
    alignItems:"center",
    justifyContent:"center"
  }
  ,content:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  title:{
    bottom:10,
    marginBottom: 20,
    fontSize: hp('5%'),
    fontWeight:'700',
    color:'#01497d',
  },  
  image:{
    width:wp('70%'),
    height: hp('20%')
  },
  form:{
    marginTop: 25,
  },
  entryGroup:{
    flexDirection:"row", 
    alignItems:"center",
    borderRadius:7,
    backgroundColor:'#fff',
    padding: 15,
    marginTop:3,
    shadowOffset:{
      width: 4,
      height: 2
    },
    shadowColor: '#000',
    shadowOpacity: 0.6,
    elevation: 2,
    borderStyle:'solid', 
    borderWidth:2,
  },  
  input:{
    width:wp('70%'),
    fontSize: hp('2.2%'),
    marginLeft: 7
  },
  btnFrame:{
    marginTop: 15,
    backgroundColor:'#149dff',
    padding:15,
    borderRadius:7,
    alignItems:"center",
    
  },
  btnText:{
    color:'#fff',
    fontWeight: '700',
    textTransform:"uppercase",
    fontSize: hp('2,3%')
  },
})
