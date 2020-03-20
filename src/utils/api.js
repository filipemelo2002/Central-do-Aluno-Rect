import axios from "axios";

import HandleStorage from "../utils/AsyncStorage";
const api = axios.create({
  baseURL: "https://centraldoaluno.herokuapp.com"
});
class ApiHandler {
  constructor(userToken) {
    this.api = axios.create({
      baseURL: "https://centraldoaluno.herokuapp.com"
    });
    this.userToken = userToken;
    this.Storage = new HandleStorage();
  }

  async getBoletins() {
    try {
      const response = await api.get("/boletins", {
        headers: {
          userToken: this.userToken
        }
      });
      await this.Storage.setBoletins(response.data);
      return response.data;
    } catch (err) {
      return await this.Storage.getBoletins();
    }
  }

  async getNotas(boletimId, ano) {
    try {
      const response = await api.get(
        `/boletins/view?boletimId=${boletimId}&ano=${ano}`,
        {
          headers: {
            userToken: this.userToken
          }
        }
      );
      await this.Storage.setNotas(boletimId, response.data);
      return response.data;
    } catch (err) {
      return await this.Storage.getNotas(boletimId);
    }
  }

  async getFrequencia(boletimId, ano) {
    try {
      const response = await api.get(
        `/faltas?boletimId=${boletimId}&ano=${ano}`,
        {
          headers: {
            userToken: this.userToken
          }
        }
      );
      await this.Storage.setFrequencia(boletimId, response.data);
      return response.data;
    } catch (err) {
      return await this.Storage.getFrequencia(boletimId);
    }
  }
}
export default ApiHandler;
