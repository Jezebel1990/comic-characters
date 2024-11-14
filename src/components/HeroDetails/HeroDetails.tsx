import "./HeroDetails.css";
import bookIcon from "../../assets/book.svg";
import videoIcon from "../../assets/video.svg";
import reviewIcon from "../../assets/review.svg";
import { LikeHeroButton } from "../LikeHeroButton/LikeHeroButton";

interface HeroDetailsProps {
    name: string;
    description: string;
    image: string;
    comicsCount: number;
    seriesCount: number;
    lastModified: string;
  }
  
  export function HeroDetails({
    name,
    description,
    image,
    comicsCount,
    seriesCount,
    lastModified,
  }: HeroDetailsProps) {
  
    const handleToggleFavorite = (heroName: string) => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isAlreadyFavorite = savedFavorites.includes(heroName);
  
      if (isAlreadyFavorite) {
        // Remove do favorito
        const updatedFavorites = savedFavorites.filter((hero: string) => hero !== heroName);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Adiciona aos favoritos
        savedFavorites.push(heroName);
        localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      }
    };
  
    // Formatação da data
    const formattedDate = new Date(lastModified).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  
    return (
      <div className="hero-container" data-text={name}>
        <div className="hero-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2>{name}</h2>
            <LikeHeroButton heroName={name} onClick={handleToggleFavorite} />
          </div>
          <p id="description">{description ? description : 'Descrição não disponível.'}</p>
  
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '88px' }}>
            <h6 className="comics">Quadrinhos</h6>
            <h6 className="series">Filmes</h6>
          </div>
  
          <div className="info-columns">
            <div>
              <img src={bookIcon} alt="Icone de livro na cor vermelha." />
              <p>{comicsCount}</p>
            </div>
  
            <div>
              <img src={videoIcon} alt="Icone de video na cor vermelha." />
              <p>{seriesCount}</p>
            </div>
          </div>
  
          <div className="rating">
            <h6>Rating:</h6>
            <img src={reviewIcon} alt="Icone de 5 estrelas na cor vermelho." />
          </div>
          <div className="last-comic">
            <h6>Último quadrinho:</h6>
            <p>{formattedDate}</p>
          </div>
        </div>
  
        <img src={image} alt={name} className="hero-image" />
      </div>
    );
  }