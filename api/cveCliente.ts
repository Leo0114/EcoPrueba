import axios from "axios";

const BASE_URL = "https://ecoapi.gocsa.com.mx/EcoTienda";

interface ClientePayload {
  cveCliente: number;
  token: string;
}

interface ClienteResponse {
  nombre: string;
  correo: string;
}

export const getClienteDatos = async (
  payload: ClientePayload,
  bearerToken: string
): Promise<ClienteResponse> => {
  try {
    const response = await axios.post<ClienteResponse>(
      `${BASE_URL}/ClienteDatos`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener datos del cliente."
    );
  }
};
