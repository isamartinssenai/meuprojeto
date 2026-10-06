import { useEffect, useState } from "react";

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";

import Slider from "@react-native-community/slider";

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import Background from "../components/background";

const musicas = [
  {
    nome: "earfquake",
    artista: "Tyler, The Creator",
    album: "IGOR",
    arquivo: require("../assets/musica1.mp3"),
    capa: require("../assets/igor.jpg"),
    duracao: 190,
  },
  {
    nome: "ring ring ring",
    artista: "Tyler, The Creator",
    album: "DON'T TAP THE GLASS",
    arquivo: require("../assets/musica2.mp3"),
    capa: require("../assets/dont-tap-the-glass.jpg"),
    duracao: 202,
  },
  {
    nome: "darling, I",
    artista: "Tyler, The Creator",
    album: "CHROMAKOPIA",
    arquivo: require("../assets/musica3.mp3"),
    capa: require("../assets/chromakopia.jpg"),
    duracao: 253,
  },
  {
    nome: "she",
    artista: "Tyler, The Creator",
    album: "Goblin",
    arquivo: require("../assets/musica4.mp3"),
    capa: require("../assets/goblin.jpg"),
    duracao: 253,
  },
  {
    nome: "where this flower blooms",
    artista: "Tyler, The Creator",
    album: "Flower Boy",
    arquivo: require("../assets/musica5.mp3"),
    capa: require("../assets/flower-boy.jpg"),
    duracao: 194,
  },
];

function formatarTempo(segundos) {
  if (!segundos || isNaN(segundos)) {
    return "0:00";
  }

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60);

  return `${minutos}:${segundosRestantes
    .toString()
    .padStart(2, "0")}`;
}

export default function Audio() {
  const [indice, setIndice] = useState(0);
  const [mexendoNoTempo, setMexendoNoTempo] = useState(false);
  const [tempoSelecionado, setTempoSelecionado] = useState(0);
  const [tocandoAutomaticamente, setTocandoAutomaticamente] =
    useState(false);

  const musica = musicas[indice];

  const player = useAudioPlayer(musica.arquivo, {
    updateInterval: 100,
  });

  const status = useAudioPlayerStatus(player);

  const duracaoReal =
    status.duration > 0
      ? status.duration
      : musica.duracao;

  const tempoAtual = mexendoNoTempo
    ? tempoSelecionado
    : status.currentTime;

  useEffect(() => {
    if (status.didJustFinish) {
      setTocandoAutomaticamente(true);

      setIndice((atual) => {
        if (atual === musicas.length - 1) {
          return 0;
        }

        return atual + 1;
      });
    }
  }, [status.didJustFinish]);

  useEffect(() => {
    if (tocandoAutomaticamente) {
      const timer = setTimeout(() => {
        player.play();
        setTocandoAutomaticamente(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [indice]);

  function tocarPausar() {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  function anterior() {
    setTocandoAutomaticamente(false);

    setIndice((atual) => {
      if (atual === 0) {
        return musicas.length - 1;
      }

      return atual - 1;
    });
  }

  function proxima() {
    setTocandoAutomaticamente(false);

    setIndice((atual) => {
      if (atual === musicas.length - 1) {
        return 0;
      }

      return atual + 1;
    });
  }

  function mudarTempo(valor) {
    setMexendoNoTempo(true);
    setTempoSelecionado(valor);
  }

  function soltarTempo(valor) {
    setMexendoNoTempo(false);
    player.seekTo(valor);
  }

  function selecionarMusica(index) {
    setTocandoAutomaticamente(false);
    setIndice(index);
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#07152F"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.header}>
          <Text style={styles.pequenoTitulo}>
            TOCANDO AGORA
          </Text>

          <Text style={styles.titulo}>
            Música
          </Text>
        </View>

        <View style={styles.player}>
          <View style={styles.capaContainer}>
            <Image
              source={musica.capa}
              style={styles.capa}
            />
          </View>

          <View style={styles.informacoes}>
            <View style={styles.nomeArea}>
              <View style={styles.textos}>
                <Text
                  style={styles.nome}
                  numberOfLines={1}
                >
                  {musica.nome}
                </Text>

                <Text
                  style={styles.artista}
                  numberOfLines={1}
                >
                  {musica.artista}
                </Text>

                <Text
                  style={styles.album}
                  numberOfLines={1}
                >
                  {musica.album}
                </Text>
              </View>
            </View>

            <View style={styles.progressoArea}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duracaoReal}
                value={tempoAtual}
                minimumTrackTintColor="#169CFF"
                maximumTrackTintColor="#526483"
                thumbTintColor="#FFFFFF"
                onValueChange={mudarTempo}
                onSlidingComplete={soltarTempo}
              />

              <View style={styles.tempos}>
                <Text style={styles.tempo}>
                  {formatarTempo(tempoAtual)}
                </Text>

                <Text style={styles.tempo}>
                  {formatarTempo(duracaoReal)}
                </Text>
              </View>
            </View>

            <View style={styles.controles}>
              <TouchableOpacity
                style={styles.controlePequeno}
                onPress={anterior}
                activeOpacity={0.7}
              >
                <Text style={styles.iconeControle}>
                  ⏮
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.play}
                onPress={tocarPausar}
                activeOpacity={0.8}
              >
                <View style={styles.playInterno}>
                  {status.playing ? (
                    <>
                      <View style={styles.barraPausa} />
                      <View style={styles.barraPausa} />
                    </>
                  ) : (
                    <View style={styles.trianguloPlay} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlePequeno}
                onPress={proxima}
                activeOpacity={0.7}
              >
                <Text style={styles.iconeControle}>
                  ⏭
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.listaContainer}>
          <View style={styles.listaCabecalho}>
            <Text style={styles.listaTitulo}>
              Suas músicas
            </Text>

            <Text style={styles.quantidade}>
              {musicas.length} músicas
            </Text>
          </View>

          {musicas.map((item, index) => {
            const selecionada = index === indice;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => selecionarMusica(index)}
                style={[
                  styles.item,
                  selecionada && styles.itemSelecionado,
                ]}
              >
                <Image
                  source={item.capa}
                  style={styles.capaPequena}
                />

                <View style={styles.infoItem}>
                  <Text
                    style={[
                      styles.nomeItem,
                      selecionada &&
                        styles.nomeSelecionado,
                    ]}
                    numberOfLines={1}
                  >
                    {item.nome}
                  </Text>

                  <Text
                    style={styles.artistaItem}
                    numberOfLines={1}
                  >
                    {item.artista}
                  </Text>
                </View>

                <Text style={styles.duracao}>
                  {formatarTempo(item.duracao)}
                </Text>

                {selecionada && (
                  <Text style={styles.indicador}>
                    •
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },

  header: {
    marginBottom: 22,
  },

  pequenoTitulo: {
    color: "#6E91C4",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 5,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "bold",
  },

  player: {
    backgroundColor: "#102850",
    borderRadius: 26,
    padding: 18,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 9,
  },

  capaContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 19,
    overflow: "hidden",
    backgroundColor: "#173566",
  },

  capa: {
    width: "100%",
    height: "100%",
  },

  informacoes: {
    paddingTop: 18,
  },

  nomeArea: {
    flexDirection: "row",
    alignItems: "center",
  },

  textos: {
    flex: 1,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  artista: {
    color: "#A7BAD6",
    fontSize: 14,
    marginTop: 5,
  },

  album: {
    color: "#6F8DB8",
    fontSize: 12,
    marginTop: 3,
  },

  progressoArea: {
    marginTop: 15,
  },

  slider: {
    width: "100%",
    height: 35,
  },

  tempos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -3,
  },

  tempo: {
    color: "#7F98BA",
    fontSize: 11,
  },

  controles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 35,
    marginTop: 9,
  },

  controlePequeno: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeControle: {
    color: "#FFFFFF",
    fontSize: 27,
  },

  play: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#169CFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#169CFF",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },

  playInterno: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  trianguloPlay: {
    width: 0,
    height: 0,
    borderTopWidth: 11,
    borderBottomWidth: 11,
    borderLeftWidth: 17,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#FFFFFF",
    marginLeft: 4,
  },

  barraPausa: {
    width: 6,
    height: 23,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 3,
  },

  listaContainer: {
    marginTop: 30,
  },

  listaCabecalho: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  listaTitulo: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  quantidade: {
    color: "#607DA8",
    fontSize: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 5,
    borderRadius: 15,
  },

  itemSelecionado: {
    backgroundColor: "#102F5C",
  },

  capaPequena: {
    width: 56,
    height: 56,
    borderRadius: 9,
  },

  infoItem: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  nomeItem: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  nomeSelecionado: {
    color: "#169CFF",
  },

  artistaItem: {
    color: "#718BB0",
    fontSize: 12,
    marginTop: 4,
  },

  duracao: {
    color: "#718BB0",
    fontSize: 12,
    marginRight: 5,
  },

  indicador: {
    color: "#169CFF",
    fontSize: 22,
    marginLeft: 2,
  },
});