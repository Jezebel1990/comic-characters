import "./SearchBar.css";
import shape from "../../assets/shape3x.png";

export function SearchBar() {
   
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
        />
    </div>
    );
}