import LikeIcon from '../../assets/heart3x.png'
import LikeActiveIcon from '../../assets/heartClick3x.png'

interface LikeButtonProps {
  isLiked: boolean
  onClick: () => void
}

export function LikeButton({ isLiked, onClick }: LikeButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <img
        src={isLiked ? LikeActiveIcon : LikeIcon}
        alt={isLiked ? 'Liked' : 'Not Liked'}
        width={14}
        height={14}
      />
    </button>
  )
}
