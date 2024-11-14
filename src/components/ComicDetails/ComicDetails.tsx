import "./ComicDetails.css";

interface ComicDetailsProps {
  comics: {
    id: number;
    image: string;
    title: string;
    onSaleDate: string;
  }[];
}

export function ComicDetails({ comics }: ComicDetailsProps) {
  return (
    <div className="comic-container">
      <h5>Últimos lançamentos</h5>
      <div className="comic-grid">
        {comics
          .sort((a, b) => new Date(b.onSaleDate).getTime() - new Date(a.onSaleDate).getTime())
          .slice(0, 10)
          .map((comic) => (
            <div key={comic.id} className="comic-item">
              <img
                src={comic.image}
                alt={comic.title}
                className="comic-images"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                }}
              />
              <p>{comic.title}</p>
              <p id="comic-date">
                {/* Formatação da data */}
                {new Date(comic.onSaleDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
