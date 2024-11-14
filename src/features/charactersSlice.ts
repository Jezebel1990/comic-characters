import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: number;
  name: string;
  image: string;
  favorite: boolean;
}

interface CharactersState {
  characters: Character[];
}

const initialState: CharactersState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const characterId = action.payload;
      const character = state.characters.find(char => char.id === characterId);

      if (character) {
        const currentFavorites = state.characters.filter(char => char.favorite);

        // Se o personagem não é favorito, permita favoritar se o limite de 5 não for atingido
        if (!character.favorite && currentFavorites.length < 5) {
          character.favorite = !character.favorite;
        } else if (character.favorite) {
          // Se o personagem é favorito, permita desfavoritar
          character.favorite = !character.favorite;
        } else {
          alert('Você só pode ter no máximo 5 personagens favoritos.');
        }
      }
    },
  },
});

export const { setCharacters, toggleLike } = charactersSlice.actions;

export default charactersSlice.reducer;
