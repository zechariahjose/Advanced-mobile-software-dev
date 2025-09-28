import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
// Removed animations

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

// Simple Button Component (no animations)
interface ButtonProps {
  onPress: () => void;
  style: any;
  text: string;
  disabled?: boolean;
}

const Button = ({ onPress, style, text, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.actionText, disabled && styles.disabledText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default function Playlists() {
  const [songName, setSongName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(playlistReducer, {
    past: [],
    present: [],
    future: [],
  });

  // Load saved state on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("playlistState");
        if (saved) {
          dispatch({ type: "LOAD", state: JSON.parse(saved) });
        }
      } catch (error) {
        console.error("Error loading playlist:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Save state on change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem("playlistState", JSON.stringify(state));
    }
  }, [state, isLoading]);

  // Add Song with fake album cover
  const addSong = () => {
    if (!songName.trim()) {
      Alert.alert("Error", "Please enter a song name");
      return;
    }
    const newSong: Song = {
      id: Date.now().toString(),
      title: songName.trim(),
      cover: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 1000
      )}`,
    };
    dispatch({ type: "ADD_SONG", song: newSong });
    setSongName("");
  };

  const clearPlaylist = () => {
    Alert.alert(
      "Clear Playlist",
      "Are you sure you want to clear all songs?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => dispatch({ type: "CLEAR" }) }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Loading your playlist...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>🎶 Your Playlist</Text>
        <Text style={styles.subtitle}>
          {state.present.length} song{state.present.length !== 1 ? 's' : ''} in playlist
        </Text>
      </View>

      {/* Song Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter song name..."
          placeholderTextColor="#888"
          value={songName}
          onChangeText={setSongName}
          onSubmitEditing={addSong}
          returnKeyType="done"
        />
        <Button
          onPress={addSong}
          style={styles.addButton}
          text="＋"
        />
      </View>

      {/* Playlist Actions */}
      <View style={styles.actions}>
        <Button
          onPress={() => dispatch({ type: "UNDO" })}
          style={styles.actionButton}
          text="⏪ Undo"
          disabled={state.past.length === 0}
        />
        <Button
          onPress={() => dispatch({ type: "REDO" })}
          style={styles.actionButton}
          text="⏩ Redo"
          disabled={state.future.length === 0}
        />
        <Button
          onPress={clearPlaylist}
          style={[styles.actionButton, styles.clearButton]}
          text="🗑️ Clear"
          disabled={state.present.length === 0}
        />
      </View>

      {/* Playlist Stats */}
      {state.present.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            History: {state.past.length} actions | Future: {state.future.length} actions
          </Text>
        </View>
      )}

      {/* Playlist */}
      <FlatList
        data={state.present}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.songCard}>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songNumber}>#{index + 1}</Text>
            </View>
            <Button
              onPress={() => dispatch({ type: "REMOVE_SONG", id: item.id })}
              style={styles.removeButton}
              text="✖"
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🎵 No songs in your playlist yet</Text>
            <Text style={styles.emptySubtext}>Add some songs to get started!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#121212", 
    padding: 20 
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  header: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    color: "#b3b3b3",
    fontSize: 14,
    marginBottom: 25,
    textAlign: "center",
  },
  inputRow: { 
    flexDirection: "row", 
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#282828",
    color: "#fff",
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#404040",
  },
  addButton: {
    marginLeft: 15,
    backgroundColor: "#1DB954",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    minWidth: 50,
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#282828",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#404040",
    minWidth: 80,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#ff4444",
    borderColor: "#ff6666",
  },
  disabledButton: {
    backgroundColor: "#1a1a1a",
    borderColor: "#333333",
    opacity: 0.5,
  },
  actionText: { 
    color: "#1DB954", 
    fontWeight: "600", 
    fontSize: 12,
  },
  disabledText: {
    color: "#666666",
  },
  statsContainer: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  statsText: {
    color: "#b3b3b3",
    fontSize: 12,
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 20,
  },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cover: { 
    width: 60, 
    height: 60, 
    borderRadius: 8, 
    marginRight: 15 
  },
  songInfo: {
    flex: 1,
  },
  songTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600",
    marginBottom: 2,
  },
  songNumber: {
    color: "#b3b3b3",
    fontSize: 12,
    fontWeight: "500",
  },
  removeButton: {
    backgroundColor: "#ff4444",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 35,
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  emptySubtext: {
    color: "#b3b3b3",
    fontSize: 14,
  },
});
