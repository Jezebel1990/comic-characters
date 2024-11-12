import "./Footer.css";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
         <p>Marvel ⓒ {year}. Todos os direitos reservados.</p>
        </footer>
    );
}