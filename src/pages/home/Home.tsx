import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import './Home.css';
import { LikeButton } from "../../components/LikeButton/LikeButton";
import { HeroToolbar } from "../../components/HeroToolbar/HeroToolbar";
import { useState, useEffect } from 'react';

export function Home() {
  const [isSortActive, setIsSortActive] = useState(false); 
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const { characters, loading, error } = useFetchCharacters();
  
  const [originalCharacters, setOriginalCharacters] = useState(characters);

  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  useEffect(() => {
    setOriginalCharacters(characters);  
  }, [characters]);

  useEffect(() => {
    const filtered = originalCharacters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isSortActive) {
      setFilteredCharacters(filtered.sort((a, b) => a.name.localeCompare(b.name))); // A-Z
    } else {
      setFilteredCharacters(filtered.sort((a, b) => b.name.localeCompare(a.name))); // Z-A
    }
  }, [searchQuery, originalCharacters, isSortActive]);

  const handleToggleSort = () => {
    setIsSortActive(!isSortActive);
  };

  const handleShowFavorites = () => {
    setIsFavoritesActive(!isFavoritesActive);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const totalHeroes = filteredCharacters.length; 

  return (
    <>
      <Navbar />
      <main className="home-container">
        <h1>EXPLORE O UNIVERSO</h1>
        <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </main>
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="hero-toolbar-container">
        <HeroToolbar
          totalHeroes={totalHeroes}
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
            <div key={character.id} className="character-card">
              <img
                src={`${character.image}`}
                alt={character.name}
                loading="lazy"
                className="character-image"
              />
              <div className="character-name-container">
                <h5 className="character-name">{character.name}</h5>
                <LikeButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
