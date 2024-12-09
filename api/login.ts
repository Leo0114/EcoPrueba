import axios from "axios";

const BASE_URL = "https://ecoapi.gocsa.com.mx/EcoTienda";

interface LoginPayload {
  correo: string;
  pwd: string;
}

interface LoginResponse {
  cveRespuesta: number;
  token: string;
  cveCliente: number;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/LoginECO`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
  }
};
