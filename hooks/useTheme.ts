import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { resetTheme, setCustomAccent, setCustomBackground, setCustomText, setThemeMode } from '../store/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  const switchToLight = () => dispatch(setThemeMode('light'));
  const switchToDark = () => dispatch(setThemeMode('dark'));
  const switchToCustom = () => dispatch(setThemeMode('custom'));
  
  const updateCustomAccent = (color: string) => dispatch(setCustomAccent(color));
  const updateCustomBackground = (color: string) => dispatch(setCustomBackground(color));
  const updateCustomText = (color: string) => dispatch(setCustomText(color));
  
  const reset = () => dispatch(resetTheme());

  return {
    theme,
    switchToLight,
    switchToDark,
    switchToCustom,
    updateCustomAccent,
    updateCustomBackground,
    updateCustomText,
    reset,
  };
};
