import shape from "../../assets/shape3x.png";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import "./SearchHeros.css";

interface SearchHerosProps {
  onSearch: (query: string) => void;
  value: string;
}

export function SearchHeros({ onSearch, value }: SearchHerosProps) {
  const navigate = useNavigate(); 
  const handleInputHeros = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query); 
  };

  const handleIconClick = () => {
    navigate("/", { state: { searchQuery: value } }); 
  };

  return (
    <div className="search-heros">
      <img
        src={shape}
        alt="Ícone de lupa"
        className="search-hero-icon"
        onClick={handleIconClick} 
      />
      <input
        type="text"
        placeholder="Procure por heróis"
        className="search-heros-input"
        onChange={handleInputHeros} 
        value={value} 
      />
    </div>
  );
}
