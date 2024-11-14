import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../features/favoritesSlice";

// Carrega os favoritos do localStorage se houver
const initialFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: { favorites: initialFavorites }, // Carrega os favoritos na store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
