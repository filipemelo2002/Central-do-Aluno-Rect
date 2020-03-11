import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  SafeAreaView,
  Linking,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import Icon from "react-native-vector-icons/FontAwesome";

import api from "../utils/api";
import HandleStorage from "../utils/AsyncStorage";

import Illustration from "./assets/illustration.png";

import CustomToast, { timer, fadeTrigger, fadeOut } from "../utils/CustomToast";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [border, setBorderColor] = useState("#fff");

  const [activityIndicator, setActivityIndicator] = useState("none");
  const [activityText, setActivityText] = useState("flex");
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fade = fadeTrigger(animatedValue);
  const out = fadeOut(animatedValue);

  const [message, setMessage] = useState("");
  const [hiddenPass, setPassHidden] = useState(true);
  const [changeIcon, setIcon] = useState("lock");

  const Storage = new HandleStorage();
  function onPressPad() {
    if (hiddenPass) {
      setPassHidden(false);
      setIcon("unlock");
    } else {
      setPassHidden(true);
      setIcon("lock");
    }
  }

  async function handleLogin() {
    setActivityIndicator("flex");
    setActivityText("none");
    if (email && senha) {
      try {
        const response = await api.post("/sessions", {
          email,
          senha
        });
        const saved = await Storage.setUser(response.data);
        if (saved) {
          navigation.navigate("Main");
        }
      } catch (error) {
        setBorderColor("#c20a0a");

        setMessage("Usuário não encontrado. Verifique os dados inserídos");
        timer(fade, out);
      }
    } else {
      setBorderColor("#c20a0a");
      setMessage("Por favor, preencha todos os campos");
      timer(fade, out);
    }
    setActivityIndicator("none");
    setActivityText("flex");
  }

  useEffect(() => {
    async function verifyUser() {
      const user = await Storage.getUser();
      if (user) {
        navigation.navigate("Main");
      }
    }
    verifyUser();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Text style={styles.title}>Login</Text>
        <Image
          source={Illustration}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <View style={{ ...styles.entryGroup, borderColor: border }}>
            <Icon name="user" size={25} color="#787878" />
            <TextInput
              placeholder="Usuário"
              style={styles.input}
              onKeyPress={() => setBorderColor("#fff")}
              onChangeText={value => setEmail(value)}
              value={email}
            />
          </View>
          <View style={{ ...styles.entryGroup, borderColor: border }}>
            <Icon
              name={changeIcon}
              size={25}
              color="#787878"
              onPress={() => onPressPad()}
            />
            <TextInput
              placeholder="Senha"
              style={styles.input}
              secureTextEntry={hiddenPass}
              onChangeText={value => setSenha(value)}
              value={senha}
            />
          </View>
          <TouchableOpacity onPress={() => handleLogin()}>
            <View style={styles.btnFrame}>
              <ActivityIndicator
                size={23}
                color="#fff"
                style={{ display: activityIndicator }}
              />
              <Text style={{ ...styles.btnText, display: activityText }}>
                Entrar
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() =>
              Linking.openURL(
                "http://www.siepe.educacao.pe.gov.br/GerenciadorAcessoWeb/cadastroUsuarioAction.do?actionType=iniciar&origem=Portal"
              )
            }
          >
            <View
              style={{
                ...styles.btnFrame,
                backgroundColor: "transparent",
                borderColor: "#149dff",
                borderStyle: "solid",
                borderWidth: 2
              }}
            >
              <Text style={{ ...styles.btnText, color: "#149dff" }}>
                Cadastre-se
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <CustomToast message={message} animation={animatedValue} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    bottom: 10,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "700",
    color: "#01497d"
  },
  image: {
    width: wp("70%"),
    height: hp("20%")
  },
  form: {
    marginTop: 25
  },
  entryGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderStyle: "solid",
    borderWidth: 2
  },
  input: {
    width: wp("70%"),
    fontSize: 16,
    left: 10
  },
  btnFrame: {
    marginTop: 15,
    backgroundColor: "#149dff",
    padding: 15,
    borderRadius: 7,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 17
  }
});
