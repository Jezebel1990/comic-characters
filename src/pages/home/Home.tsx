import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchCharacters } from '../../hooks/useFetchCharacters';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { HeroToolbar } from "../../components/HeroToolbar/HeroToolbar";
import { Link } from 'react-router-dom';
import { setCharacters, toggleLike } from '../../features/charactersSlice';
import './Home.css';

interface Character {
  id: number;
  name: string;
  image: string;
  favorite: boolean;
}

interface RootState {
  characters: {
    characters: Character[];
  };
}

export function Home() {
  const [isSortActive, setIsSortActive] = useState(false);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const { characters, loading, error } = useFetchCharacters();
  const filteredCharacters = useSelector((state: RootState) => state.characters.characters); // Tipando corretamente o estado

  // Atualiza o estado no Redux apenas quando houver personagens novos
  useEffect(() => {
    if (characters.length > 0) {
      dispatch(setCharacters(characters));
    }
  }, [characters, dispatch]);

  // Função para filtrar e ordenar personagens
  const getFilteredCharacters = () => {
    let filtered = filteredCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isSortActive) {
      filtered.sort((a, b) => a.name.localeCompare(b.name)); // A-Z
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name)); // Z-A
    }

    if (isFavoritesActive) {
      filtered = filtered.filter(character => character.favorite);
    }

    return filtered;
  };

  const filtered = getFilteredCharacters();

  const handleToggleSort = () => {
    setIsSortActive(!isSortActive);
  };

  const handleShowFavorites = () => {
    setIsFavoritesActive(!isFavoritesActive);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = (id: number) => {
    dispatch(toggleLike(id)); // Atualiza o estado de "favorito"
  };

  return (
    <>
      <Navbar />
      <main className="home-container">
        <h1>EXPLORE O UNIVERSO</h1>
        <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </main>
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearchChange} />
      </div>

      <div className="hero-toolbar-container">
        <HeroToolbar
          totalHeroes={filtered.length}
          onToggleSort={handleToggleSort}
          isSortActive={isSortActive}
          onShowFavorites={handleShowFavorites}
          isFavoritesActive={isFavoritesActive}
        />
      </div>

      <div className="container">
        <div className="character-list">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {filtered.map(character => (
            <div key={character.id} className="character-item">
              <Link to={`/hero/${character.id}`}>
                <img
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                  className="character-image"
                />
              </Link>
              <div className="character-name-container">
                <h5 className="character-name">{character.name}</h5>
                <LikeButton
                  isLiked={character.favorite}
                  onClick={() => handleLike(character.id)} // Alterna o estado de "favorito"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
