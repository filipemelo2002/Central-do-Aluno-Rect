import axios from "axios";

import HandleStorage from "../utils/AsyncStorage";

class ApiHandler {
  constructor(userToken) {
    this.api = axios.create({
      baseURL: "https://centraldoaluno.herokuapp.com"
    });
    this.userToken = userToken;
    this.Storage = new HandleStorage();
  }

  async authUser(email, senha) {
    try {
      const response = await this.api.post("/sessions", {
        email,
        senha
      });
      return await this.Storage.setUser(response.data);
    } catch (err) {
      return false;
    }
  }
  async getHorario() {
    try {
    } catch (err) {
      return await this.Storage.getHorario();
    }
  }
  async getBoletins() {
    try {
      const response = await this.api.get("/boletins", {
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
      const response = await this.api.get(
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
      const response = await this.api.get(
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
