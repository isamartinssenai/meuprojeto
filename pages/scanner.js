import { useState } from "react";

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import Background from "../components/background";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <Background />;
  }

  if (!permission.granted) {
    return (
      <Background>
        <View style={styles.permission}>

          <Text style={styles.title}>
            SCANNER
          </Text>

          <Text style={styles.text}>
            Precisamos da permissão para usar a câmera.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>
              Permitir câmera
            </Text>
          </TouchableOpacity>

        </View>
      </Background>
    );
  }

  async function lerQRCode({ data }) {
    if (scanned) return;

    setScanned(true);

    if (
      data.startsWith("http://") ||
      data.startsWith("https://")
    ) {
      await Linking.openURL(data);
    } else {
      Alert.alert(
        "QR Code",
        `O código encontrado não é um link:\n\n${data}`,
        [
          {
            text: "OK",
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  }

  return (
    <Background>
      <View style={styles.container}>

        <Text style={styles.title}>
          SCANNER
        </Text>

        <Text style={styles.subtitle}>
          Escaneie um QR Code
        </Text>

        <View style={styles.cameraContainer}>

          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={
              scanned ? undefined : lerQRCode
            }
          />

          <View style={styles.marcacao}>

            <View
              style={styles.cornerTopLeft}
            />

            <View
              style={styles.cornerTopRight}
            />

            <View
              style={styles.cornerBottomLeft}
            />

            <View
              style={styles.cornerBottomRight}
            />

          </View>

        </View>

        <Text style={styles.instruction}>
          Aponte a câmera para um QR Code
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>
              Escanear novamente
            </Text>
          </TouchableOpacity>
        )}

       

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

  permission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
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
    marginBottom: 25,
    textAlign: "center",
  },

  cameraContainer: {
    width: "95%",
    height: 410,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  marcacao: {
    position: "absolute",
    width: 240,
    height: 240,
    top: "50%",
    left: "50%",
    marginLeft: -120,
    marginTop: -120,
  },

  cornerTopLeft: {
    position: "absolute",
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white",
    top: 0,
    left: 0,
    borderTopLeftRadius: 12,
  },

  cornerTopRight: {
    position: "absolute",
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    top: 0,
    right: 0,
    borderTopRightRadius: 12,
  },

  cornerBottomLeft: {
    position: "absolute",
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white",
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 12,
  },

  cornerBottomRight: {
    position: "absolute",
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "white",
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 12,
  },

  instruction: {
    color: "#D6E9FF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
  },

  button: {
    width: "80%",
    height: 50,
    backgroundColor: "rgba(55, 130, 220, 0.8)",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
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
    marginTop: 12,
  },

  backText: {
    color: "white",
    fontSize: 16,
  },

  text: {
    color: "#D7E9FF",
    fontSize: 17,
    textAlign: "center",
    marginVertical: 20,
  },
});