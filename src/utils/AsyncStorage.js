import { AsyncStorage } from "react-native";

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
