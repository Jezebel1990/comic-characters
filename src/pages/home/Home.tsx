import { Navbar } from "../../components/Navbar/Navbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import './Home.css';

export function Home() {
   
    return (
    <>
     <Navbar/>
     <main className="home-container">
      <h1>EXPLORE O UNIVERSO</h1>
       <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
      </main>
      <div className="search-bar-container">
      <SearchBar/>
      </div>
    </>
    );
}