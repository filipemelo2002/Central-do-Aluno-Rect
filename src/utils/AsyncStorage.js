import { AsyncStorage } from "react-native";

class HandleStorage {
  async setNotas(boletimId, notas) {
    const id = `notas-${boletimId}`;
    return await this.storeData(id, JSON.stringify(notas));
  }
  async getNotas(boletimId) {
    const id = `notas-${boletimId}`;
    const notas = await this.getData(id);
    return notas ? notas : {};
  }
  async setBoletins(boletins) {
    return await this.storeData("boletins", JSON.stringify(boletins));
  }
  async getBoletins() {
    return await this.getData("boletins");
  }
  async setUser(user) {
    return await this.storeData("user", JSON.stringify(user));
  }
  async getUser() {
    return await this.getData("user");
  }
  async removeUser() {
    try {
      await AsyncStorage.removeItem("user");
      return true;
    } catch (err) {
      return false;
    }
  }
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
export default HandleStorage;
