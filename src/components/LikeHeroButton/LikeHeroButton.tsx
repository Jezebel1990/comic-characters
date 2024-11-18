// @ts-ignore
import Dislike from '../../assets/like.png'
// @ts-ignore
import Like from '../../assets/heartClick3x.png'
import React from 'react'
interface LikeHeroButtonProps {
  isLiked: boolean
  onClick: () => void
}

export function LikeHeroButton({ isLiked, onClick }: LikeHeroButtonProps) {
  const handleClick = () => {
    onClick()
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
