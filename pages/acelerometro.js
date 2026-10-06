import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import Background from "../components/background";

export default function Acelerometro() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener((data) => {
      setX(data.x);
      setY(data.y);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const posX = Math.max(-95, Math.min(95, x * 100));
  const posY = Math.max(-95, Math.min(95, y * 100));

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>
        <View style={styles.topo}>
          <Text style={styles.pequenoTitulo}>
            SENSOR DO CELULAR
          </Text>

          <Text style={styles.titulo}>
            Acelerômetro
          </Text>

          <Text style={styles.subtitulo}>
            Incline o celular e movimente a bolinha
          </Text>
        </View>

        <View style={styles.areaExterna}>
          <View style={styles.area}>
            <View style={styles.linhaHorizontal} />
            <View style={styles.linhaVertical} />

            <View
              style={[
                styles.bolinha,
                {
                  transform: [
                    { translateX: posX },
                    { translateY: posY },
                  ],
                },
              ]}
            >
              <View style={styles.brilho} />
            </View>
          </View>
        </View>

        <View style={styles.informacoes}>
          <View style={styles.card}>
            <Text style={styles.label}>EIXO X</Text>

            <Text style={styles.valor}>
              {x.toFixed(2)}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>EIXO Y</Text>

            <Text style={styles.valor}>
              {y.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.status}>
          ● SENSOR ATIVO
        </Text>
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

  topo: {
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },

  pequenoTitulo: {
    color: "#B8D9FF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },

  titulo: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#D7E9FF",
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },

  areaExterna: {
    width: 285,
    height: 285,
    borderRadius: 145,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  area: {
    width: 245,
    height: 245,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  linhaHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  linhaVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  bolinha: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#3782DC",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3782DC",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 12,
  },

  brilho: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "white",
    opacity: 0.8,
    marginTop: -8,
    marginLeft: -8,
  },

  informacoes: {
    flexDirection: "row",
    gap: 12,
    marginTop: 25,
  },

  card: {
    width: 105,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  label: {
    color: "#B8D9FF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  valor: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },

  status: {
    color: "#B8D9FF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 20,
  },
});