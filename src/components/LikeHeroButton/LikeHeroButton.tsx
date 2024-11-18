import Dislike from '../../assets/like.png'
import Like from '../../assets/heartClick3x.png'

interface LikeHeroButtonProps {
  isLiked: boolean
  onClick: () => void
}

export function LikeHeroButton({ isLiked, onClick }: LikeHeroButtonProps) {
  // Quando o botão é clicado, mostra no console o estado de 'isLiked' antes e depois da mudança
  const handleClick = () => {
    console.log('Before click:', isLiked) // Antes de alterar
    onClick() // Chama a função que altera o estado
    console.log('After click:', !isLiked) // Depois de alterar, 'isLiked' deve ser o oposto
  }

  return (
    <button
      onClick={handleClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={isLiked ? Like : Dislike}
        alt={isLiked ? 'Liked' : 'Not Liked'}
        width={14}
        height={14}
      />
    </button>
  )
}
