import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

// Playlist State Types
type Song = { id: string; title: string; cover: string };
type State = { past: Song[][]; present: Song[]; future: Song[][] };
type Action =
  | { type: "ADD_SONG"; song: Song }
  | { type: "REMOVE_SONG"; id: string }
  | { type: "CLEAR" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "LOAD"; state: State };

// Reducer with Undo/Redo
function playlistReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_SONG":
      return {
        past: [...state.past, state.present],
        present: [...state.present, action.song],
        future: [],
      };
    case "REMOVE_SONG":
      return {
        past: [...state.past, state.present],
        present: state.present.filter((song) => song.id !== action.id),
        future: [],
      };
    case "CLEAR":
      return { past: [...state.past, state.present], present: [], future: [] };
    case "UNDO":
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    case "REDO":
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    case "LOAD":
      return action.state;
    default:
      return state;
  }
}

export default function Playlists() {
  const [songName, setSongName] = useState("");
  const [state, dispatch] = useReducer(playlistReducer, {
    past: [],
    present: [],
    future: [],
  });

  // Load saved state on mount
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("playlistState");
      if (saved) {
        dispatch({ type: "LOAD", state: JSON.parse(saved) });
      }
    })();
  }, []);

  // Save state on change
  useEffect(() => {
    AsyncStorage.setItem("playlistState", JSON.stringify(state));
  }, [state]);

  // Add Song with fake album cover
  const addSong = () => {
    if (!songName.trim()) return;
    const newSong: Song = {
      id: Date.now().toString(),
      title: songName,
      cover: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    };
    dispatch({ type: "ADD_SONG", song: newSong });
    setSongName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎶 Your Playlist</Text>

      {/* Song Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter song name..."
          placeholderTextColor="#888"
          value={songName}
          onChangeText={setSongName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addSong}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => dispatch({ type: "UNDO" })}>
          <Text style={styles.actionText}>⏪ Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: "REDO" })}>
          <Text style={styles.actionText}>⏩ Redo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: "CLEAR" })}>
          <Text style={styles.actionText}>🗑️ Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist */}
      <FlatList
        data={state.present}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeInDown}
            exiting={FadeOutUp}
            style={styles.songCard}
          >
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <Text style={styles.songTitle}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => dispatch({ type: "REMOVE_SONG", id: item.id })}
            >
              <Text style={styles.removeText}>✖</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    backgroundColor: "#282828",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#1DB954",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  addButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  actionText: { color: "#1DB954", fontWeight: "600", fontSize: 14 },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cover: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  songTitle: { flex: 1, color: "#fff", fontSize: 16 },
  removeText: { color: "#ff4444", fontSize: 18, fontWeight: "bold" },
});
