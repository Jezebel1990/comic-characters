import shape from "../../assets/shape3x.png";
import { ChangeEvent } from "react";
import  "./SearchHeros.css";

interface SearchHerosProps {
    onSearch: (query: string) => void;
  }


export function SearchHeros ({ onSearch } : SearchHerosProps) {
    const handleInputHeros = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value); 
    };
    return (
        <div className="search-heros">
        <img
            src={shape}
            alt="Ícone de lupa"
            className="search-hero-icon"
        />
         <input
            type="text"
            placeholder="Procure por heróis"
            className="search-heros-input"
            onChange={handleInputHeros}
        />
        </div>
    )
}