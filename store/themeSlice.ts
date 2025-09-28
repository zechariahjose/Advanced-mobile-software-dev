import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark' | 'custom';
  customAccent: string;
  customBackground: string;
  customText: string;
}

const initialState: ThemeState = {
  mode: 'dark',
  customAccent: '#1DB954',
  customBackground: '#121212',
  customText: '#ffffff',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'custom'>) => {
      state.mode = action.payload;
      
      // Set default colors based on mode
      if (action.payload === 'light') {
        state.customBackground = '#ffffff';
        state.customText = '#000000';
      } else if (action.payload === 'dark') {
        state.customBackground = '#121212';
        state.customText = '#ffffff';
      }
    },
    setCustomAccent: (state, action: PayloadAction<string>) => {
      state.customAccent = action.payload;
    },
    setCustomBackground: (state, action: PayloadAction<string>) => {
      state.customBackground = action.payload;
    },
    setCustomText: (state, action: PayloadAction<string>) => {
      state.customText = action.payload;
    },
    resetTheme: (state) => {
      state.mode = 'dark';
      state.customAccent = '#1DB954';
      state.customBackground = '#121212';
      state.customText = '#ffffff';
    },
  },
});

export const {
  setThemeMode,
  setCustomAccent,
  setCustomBackground,
  setCustomText,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
