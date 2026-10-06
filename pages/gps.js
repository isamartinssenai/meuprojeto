import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";

import * as Location from "expo-location";

import Background from "../components/background";

export default function Gps({ navigation }) {
  async function pegarLocalizacao() {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Precisamos da permissão de localização para continuar."
        );
        return;
      }

      const localizacao =
        await Location.getCurrentPositionAsync({});

      const latitude =
        localizacao.coords.latitude;

      const longitude =
        localizacao.coords.longitude;

      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      await Linking.openURL(url);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível obter sua localização."
      );
    }
  }

  return (
    <Background>
      <View style={styles.container}>

        <Text style={styles.title}>
          GPS
        </Text>

        <Text style={styles.subtitle}>
          Encontre sua localização
        </Text>

        <View style={styles.card}>

          <Text style={styles.icon}>
            📍
          </Text>

          <Text style={styles.cardTitle}>
            Sua localização
          </Text>

          <Text style={styles.cardText}>
            Permita o acesso à localização para
            visualizar sua posição no mapa.
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={pegarLocalizacao}
        >
          <Text style={styles.buttonText}>
            Ver minha localização
          </Text>
        </TouchableOpacity>

        

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#B8D9FF",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(30, 80, 140, 0.7)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  icon: {
    fontSize: 55,
    marginBottom: 15,
  },

  cardTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardText: {
    color: "#C8E1FF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },

  button: {
    width: "85%",
    height: 52,
    backgroundColor: "rgba(55, 130, 220, 0.8)",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  back: {
    width: "70%",
    height: 45,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  backText: {
    color: "white",
    fontSize: 16,
  },
});