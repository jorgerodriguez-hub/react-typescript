import axios from "axios";
import { Client } from "./Client";

const API = "https://node-express.up.railway.app";

export const getClients = async () => {
  return await axios.get(`${API}/api/clientes`);
};

export const createClient = async (client: Client) => {
  return await axios.post(`${API}/api/crearclientes`, client);
};
