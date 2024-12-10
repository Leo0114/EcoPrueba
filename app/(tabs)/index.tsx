import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ClienteInfo from "@/components/ClientesInfo";
import { getClienteDatos } from "@/api/cveCliente";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface ClienteResponse {
  nombre: string;
  correo: string;
}

const Clientes: React.FC = () => {
  const [clientesData, setClientesData] = useState<ClienteResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImVwZW5hQGdvY3NhLmNvbS5teCIsIlVzZXJEYXRhIjoiIiwiVXNlckMiOiJtRzVUNzM2andjdDB5dUJLOG1OQ1N3PT0iLCJVc2VyTiI6IjZTOGhyWlVWa2VkT002clM3Sm56YkE9PSIsIlVzZXJSIjoidDV2VTRURVhNak1HSHlMRWMvTTRWUT09IiwiVXNlclR5cGUiOiJBdXRvcml6YWRvIiwicm9sZSI6IkVjb1VzZXIiLCJuYmYiOjE3MzM4MTQyMDUsImV4cCI6MTczMzgyMTQwNSwiaWF0IjoxNzMzODE0MjA1LCJpc3MiOiJzaXN0ZW1hcy5nb3NjYS5jb20ubXgiLCJhdWQiOiJQdWJsaWMifQ.x3XhkZdVu_3HpYT_4vJA-dy60Z8ka8ffCMFTPfle2kY";

  useEffect(() => {
    const fetchClientesData = async () => {
      try {
        const payload = { cveCliente: 20, token };
        const response = await getClienteDatos(payload, token);

        const replicatedData = Array.from({ length: 4 }, (_, index) => ({
          ...response,
          nombre: `${response.nombre} ${index + 1}`,
        }));

        setClientesData(replicatedData);
      } catch (error) {
        console.error("Error al obtener datos de los clientes:", error);
        setClientesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientesData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <ThemedText>Cargando datos de los clientes...</ThemedText>
      ) : clientesData.length > 0 ? (
        <FlatList
          style={styles.list}
          data={clientesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ClienteInfo data={item} />}
        />
      ) : (
        <ThemedText>No hay datos de clientes disponibles.</ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: 8,
  },

  list: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});

export default Clientes;
