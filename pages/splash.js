import { useEffect, useRef } from "react";

import {
  Text,
  StyleSheet,
  View,
  Animated,
  StatusBar,
} from "react-native";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const scaleAnim = useRef(
    new Animated.Value(0.85)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(25)
  ).current;

  const glowAnim = useRef(
    new Animated.Value(0)
  ).current;

  const footerAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),

          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ])
      ),

      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace("Home");
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 0.45],
  });

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#061126"
      />

      {/* Luzes decorativas */}

      <Animated.View
        style={[
          styles.luz1,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.luz2,
          {
            opacity: glowOpacity,
          },
        ]}
      />

      {/* Pequenos pontos */}

      <View style={[styles.ponto, styles.ponto1]} />
      <View style={[styles.ponto, styles.ponto2]} />
      <View style={[styles.ponto, styles.ponto3]} />
      <View style={[styles.ponto, styles.ponto4]} />
      <View style={[styles.ponto, styles.ponto5]} />

      {/* Conteúdo */}

      <Animated.View
        style={[
          styles.conteudo,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >

        {/* Logo */}

        <View style={styles.logoOuter}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>
              ✓
            </Text>
          </View>
        </View>

        {/* Título */}

        <Text style={styles.titulo}>
          MeuProjeto
        </Text>

        <Text style={styles.subtitulo}>
          TECNOLOGIA • PRATICIDADE • INOVAÇÃO
        </Text>

        {/* Linha */}

        <View style={styles.linhaContainer}>
          <View style={styles.linha} />
          <View style={styles.linhaCentro} />
          <View style={styles.linha} />
        </View>

        <Text style={styles.descricao}>
          Explore suas funcionalidades
        </Text>

      </Animated.View>

      {/* Rodapé */}

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: footerAnim,
          },
        ]}
      >

        <Text style={styles.footerText}>
          REACT NATIVE
        </Text>

        <Text style={styles.footerSmall}>
          Seu projeto, do seu jeito.
        </Text>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#061126",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  /* Luz superior */

  luz1: {
    position: "absolute",
    width: 300,
    height: 180,
    borderRadius: 150,
    backgroundColor: "#087BC9",
    top: -80,
    right: -80,
    transform: [
      {
        rotate: "-25deg",
      },
    ],
  },

  /* Luz inferior */

  luz2: {
    position: "absolute",
    width: 280,
    height: 160,
    borderRadius: 140,
    backgroundColor: "#1646A3",
    bottom: -70,
    left: -90,
    transform: [
      {
        rotate: "20deg",
      },
    ],
  },

  /* Pontos decorativos */

  ponto: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#62B8FF",
    opacity: 0.6,
  },

  ponto1: {
    top: "18%",
    left: "15%",
  },

  ponto2: {
    top: "27%",
    right: "18%",
    width: 3,
    height: 3,
  },

  ponto3: {
    top: "72%",
    left: "20%",
    width: 3,
    height: 3,
  },

  ponto4: {
    top: "65%",
    right: "15%",
  },

  ponto5: {
    top: "12%",
    right: "40%",
    width: 2,
    height: 2,
  },

  /* Conteúdo */

  conteudo: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  /* Logo */

  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "rgba(100,190,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,100,180,0.12)",
    marginBottom: 28,
  },

  logo: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#087BC9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#169CFF",
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
  },

  logoIcon: {
    color: "#FFFFFF",
    fontSize: 54,
    fontWeight: "bold",
    marginTop: -4,
  },

  /* Título */

  titulo: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },

  subtitulo: {
    color: "#72BBFF",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 9,
    textAlign: "center",
  },

  /* Linha */

  linhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 18,
  },

  linha: {
    width: 28,
    height: 1,
    backgroundColor: "#287FC7",
  },

  linhaCentro: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#169CFF",
    marginHorizontal: 7,
  },

  descricao: {
    color: "#B5D5F5",
    fontSize: 15,
    textAlign: "center",
  },

  /* Rodapé */

  footer: {
    position: "absolute",
    bottom: 32,
    alignItems: "center",
  },

  footerText: {
    color: "#6B91C2",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  footerSmall: {
    color: "#496A99",
    fontSize: 11,
    marginTop: 6,
  },

});