import { useParams } from 'react-router-dom';

export function HeroPage() {
    const { id } = useParams<{ id: string }>(); 
    return (
        <div>
             <h1>Detalhes do Herói</h1>
             <p>Você está visualizando o herói com o ID: {id}</p>
        </div>
    )
}