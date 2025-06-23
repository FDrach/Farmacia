import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h3>ATENCIÓN AL CLIENTE</h3>
        <ul>
          <li><Link to="/faq">Preguntas frecuentes</Link></li>
          <li>Empresa</li>
          <li>Obras sociales</li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>CONTACTO</h3>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f icon facebook"></i></a>
          <a href="#"><i className="fab fa-instagram icon instagram"></i></a>
          <a href="#"><i className="fab fa-whatsapp icon whatsapp"></i></a>
        </div>
      </div>
    </footer>
  );
}
