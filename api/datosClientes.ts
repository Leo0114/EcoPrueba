import axios from "axios";

const BASE_URL = "https://ecoapi.gocsa.com.mx/EcoTienda";

interface DatosClientesPayload {
  cveCliente: number;
  token: string;
}

interface ClienteDatosResponse {
  nombre: string;
  rutasVisita: Array<{ dia: string; ruta: string }>;
}

export const getDatosClientes = async (
  payload: DatosClientesPayload
): Promise<ClienteDatosResponse> => {
  try {
    const response = await axios.post<ClienteDatosResponse>(
      `${BASE_URL}/ClienteDatos`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos del cliente.");
  }
};
