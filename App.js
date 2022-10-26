import { StyleSheet, SafeAreaView, Text, Image, View, Pressable, FlatList} from "react-native";
import { useSpotifyAuth } from "./utils";
import Logo from "./assets/spotify-logo.png";
import millisToMinutesAndSeconds from "./utils/millisToMinutesAndSeconds";

export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth(true);

  const Auth = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={getSpotifyAuth}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.spotifyText}>Connect With Spotify</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const showSong = ({ index }) => {
    let trackNum = tracks[index]["track_number"];
    let artistName = tracks[index]["artists"][0]["name"];
    let songName = tracks[index]["name"];
    let album = tracks[index]["album"]["name"];
    let songLen = millisToMinutesAndSeconds(tracks[index]["duration_ms"]);
    let albumImg = tracks[index]["album"]["images"][0]["url"];
    return (
      <View style={styles.containerList}>
        <View style={styles.trackNum}>
          
          <Text style={styles.whiteText}>{trackNum}</Text>
        </View>
        <View>
          <Image style={styles.albumArt} source={{ uri: albumImg }} alt="Picture"/>
        </View>
        <View style={styles.artist}>
          <Text numberOfLines={1} style={styles.whiteText}>{songName}</Text>
          <Text numberOfLines={1} style={styles.whiteText}>{artistName}</Text>
        </View>
        <View style={styles.album}>
          <Text numberOfLines={1} style={styles.whiteText}>{album}</Text>
        </View>
        <View>
          <Text style={styles.whiteText}>{songLen}</Text>
        </View>
      </View>
    );
  }

  const List = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Midnights - Taylor Swift (Tracks)</Text>
        </View><View>
          <FlatList
            data={tracks}
            renderItem={(list) => showSong(list)}
          /></View>
      </SafeAreaView>
    );}

  let screen = null;
  if(token) {
    screen = <List />
  } else {
    screen = <Auth />
  }

  return (
    <SafeAreaView style={styles.container}>
      {screen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  logo: {
    width: 30,
    height: 30,
    margin: 5,
    flex: 1,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1DB954",
    color: "white",
    borderRadius: 99999,
    width: "80%",
  },
  spotifyText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
    marginRight: 40,
  },
  
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  artist: {
    width: "40%",
    padding: 10,
  },
  album: {
    width: "30%",
  },
  containerList: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,

  },
  trackNum: {
    margin: 5,
    display: "flex",
  },
  
  albumArt: {
    width: 50,
    height: 50,
  },
  
  whiteText: {
    color: "white",
  },
});
