import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h3>ATENCIÓN AL CLIENTE</h3>
        <ul>
          <li><Link to="/faq">Preguntas frecuentes</Link></li>
          <li><Link to="/Obras-Sociales">Obras sociales</Link></li>
          <br />
        </ul>

        <div className="footer-bottom">
          <p>Copyright © {new Date().getFullYear()} Farmacia. Todos los derechos reservados.</p>
        </div>

      </div>
      <div className="footer-col">
        <h3>CONTACTO</h3>
        <div className="footer-social">

          <a href="https://www.instagram.com/p/DLNPbKWRp7p/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram icon instagram"></i>
          </a>

          <a
            href="https://wa.me/5493816958566?text=Hola%2C%20estoy%20interesado%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
          >
          <i className="fab fa-whatsapp icon whatsapp"></i>
          </a>

        </div>
      </div>
      
      

    </footer>
  );
}
