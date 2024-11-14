import Dislike from '../../assets/like.png';
import Like from '../../assets/heartClick3x.png';

interface LikeHeroButtonProps {
    isLiked: boolean;
    onClick: () => void;
  }
  


export function LikeHeroButton({ isLiked, onClick }: LikeHeroButtonProps) {


    return (
        <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
       <img
        src={isLiked ? Like : Dislike} 
        alt={isLiked ? 'Liked' : 'Not Liked'} 
        width={14} 
        height={14} 
        />
        </button>
    );
}