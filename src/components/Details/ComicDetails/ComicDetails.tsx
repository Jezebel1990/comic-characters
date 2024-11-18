import './ComicDetails.css'

interface ComicDetailsProps {
  comics: {
    id: number
    image: string
    title: string
    onSaleDate: string
  }[]
}

export function ComicDetails({ comics }: ComicDetailsProps) {
  return (
    <div className="comic-container">
      <h3 className="comic-news">Últimos lançamentos</h3>
      <div className="comic-grid">
        {comics
          .sort(
            (a, b) =>
              new Date(b.onSaleDate).getTime() -
              new Date(a.onSaleDate).getTime()
          )
          .slice(0, 10)
          .map((comic) => (
            <div key={comic.id} className="comic-item">
              <img
                src={comic.image}
                alt={comic.title}
                className="comic-images"
                loading="lazy"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    'https://ambrosia.com.br/wp-content/uploads/2023/03/marvel-universo-super-herois-revista-cultural-ambrosia.webp'
                }}
              />
              <p>{comic.title}</p>
              <p id="comic-date">
                {/* Formatação da data */}
                {new Date(comic.onSaleDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}
