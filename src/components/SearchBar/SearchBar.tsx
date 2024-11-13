import "./SearchBar.css";
import shape from "../../assets/shape3x.png";
import { ChangeEvent } from "react";


interface SearchBarProps {
    onSearch: (query: string) => void;
  }

  
export function SearchBar({ onSearch } : SearchBarProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value); 
    };

    return (
        <div className="search-bar">
        <img
            src={shape}
            alt="Ícone de lupa"
            className="search-icon"
        />
        <input
            type="text"
            placeholder="Procure por heróis"
            className="search-input"
            onChange={handleInputChange}
        />
    </div>
    );
}