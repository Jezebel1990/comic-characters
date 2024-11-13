import { useState } from 'react';

import LikeIcon from '../../assets/heart3x.png';
import LikeActiveIcon from '../../assets/heartClick3x.png';

export function LikeButton() {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked); 
      };

    return (
        <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
       <img
        src={liked ? LikeActiveIcon : LikeIcon} 
        alt={liked ? 'Liked' : 'Not Liked'} 
        width={14} 
        height={14} 
        />
        </button>
    );
}