import React from 'react';


export default function Faq() {
  return (
    <div className="faq-section">
      <h2 className="faq-title">Preguntas Frecuentes</h2>
      <div className="faq-item">
        <p className="faq-question">¿Cómo hago un pedido?</p>
        <p className="faq-answer">Podés hacerlo desde nuestra web o por WhatsApp.</p>
      </div>
      <div className="faq-item">
        <p className="faq-question">¿Qué obras sociales aceptan?</p>
        <p className="faq-answer">Aceptamos una amplia variedad, consultá en la sección correspondiente.</p>
      </div>
      <div className="faq-item">
        <p className="faq-question">¿Hacen envíos?</p>
        <p className="faq-answer">Sí, realizamos envíos a domicilio en toda la ciudad.</p>
      </div>
    </div>
  );
}
