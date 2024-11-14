import { Link } from "react-router-dom";
import logoHero from "../../assets/logo2x.png"
import "./TopBar.css"
import { SearchHeros } from "../SearchHeros/SearchHeros";

export function TopBar () {
    return (
        <header className="topbar-container">
            <Link
            to="/"
            aria-label="Voltar para a página inicial"
            data-text="Voltar para a página inicial"
            title="Voltar para a página inicial">
            <img
            src={logoHero}
            alt="Texto escrito 'Marvel Search heroes', marvel está em vermelho e o restante em cinza escuro."
            className="logo-hero" 
            />
            </Link>
        <SearchHeros onSearch={(query) => console.log(query)}/>
        </header>
    )
}