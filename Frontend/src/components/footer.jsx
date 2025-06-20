export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h3>ATENCIÓN AL CLIENTE</h3>
        <ul>
          <li>Preguntas frecuentes</li>
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

      {/* <div className="footer-col footer-form">
        <h3>ESCRIBÍNOS</h3>
        <form>
          <input type="text" placeholder="Nombre y Apellido" />
          <input type="text" placeholder="Telefono" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Mensaje"></textarea>
          <button type="submit">ENVIAR</button>
        </form>
      </div> */}

    </footer>
  )
}