import React, { useEffect, useState } from "react";
import { FlatList, Alert, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getDatosClientes } from "@/api/datosClientes";

const HomeScreen: React.FC<{ token: string; cveCliente: number }> = ({
  token,
  cveCliente,
}) => {
  const [datos, setDatos] = useState<any>(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await getDatosClientes({ cveCliente, token });
        setDatos(response);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };

    fetchDatos();
  }, [token, cveCliente]);

  if (!datos) {
    return <ThemedText style={styles.container}>Cargando datos...</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Nombre: {datos.nombre}</ThemedText>
      <ThemedText>Rutas de Visita:</ThemedText>
      <FlatList
        data={datos.rutasVisita}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedText>{`${item.dia}: ${item.ruta}`}</ThemedText>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default HomeScreen;
