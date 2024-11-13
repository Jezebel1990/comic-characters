import { useState, useEffect } from 'react';
import { useFetchCharacters } from '../../hooks/useFetchCharacters';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { HeroToolbar } from "../../components/HeroToolbar/HeroToolbar";
import './Home.css';
import { Link } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  image: string;
  favorite: boolean;
}

export function Home() {
  const [isSortActive, setIsSortActive] = useState(false); 
  const [isFavoritesActive, setIsFavoritesActive] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const { characters, loading, error, setCharacters } = useFetchCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters);

  useEffect(() => {
    let filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Ordena os personagens conforme o estado da ordenação
    if (isSortActive) {
      filtered.sort((a, b) => a.name.localeCompare(b.name)); // A-Z
    } else {
      filtered.sort((a, b) => b.name.localeCompare(a.name)); // Z-A
    }

    setFilteredCharacters(filtered); 
  }, [searchQuery, characters, isSortActive]); 

  // Lógica para alternar a ordenação
  const handleToggleSort = () => {
    setIsSortActive(!isSortActive); // Alterna entre A-Z e Z-A
  };

  // Lógica para mostrar somente os favoritos
  const handleShowFavorites = () => {
    setIsFavoritesActive(!isFavoritesActive);
    setFilteredCharacters(
      isFavoritesActive
        ? characters 
        : characters.filter(character => character.favorite) 
    );
  };

  // Função para lidar com a busca
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Função para alternar o estado de "favorito" de um personagem
  const handleLike = (id: number) => {
    setCharacters(prevCharacters =>
      prevCharacters.map(character =>
        character.id === id
          ? { ...character, favorite: !character.favorite } 
          : character
      )
    );
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
          totalHeroes={filteredCharacters.length}
          onToggleSort={handleToggleSort}
          isSortActive={isSortActive}
          onShowFavorites={handleShowFavorites}
          isFavoritesActive={isFavoritesActive}
        />
      </div>

      <div className="container">
        <div className="character-list">
          {loading && <p>Carregando...</p>}
          {error && <p>Erro: {error}</p>}

          {filteredCharacters.map(character => (
            <div key={character.id}  className="character-card">
            <Link to={`/hero/${character.id}`} className='character-image-link'>
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
                  onClick={() => handleLike(character.id)} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

