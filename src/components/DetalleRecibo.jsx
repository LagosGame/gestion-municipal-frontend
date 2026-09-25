import { useState, useEffect } from 'react';
import { claseEstado } from '../utils/estado';
import FormularioPago from './FormularioPago';

const API_URL = import.meta.env.VITE_API_URL;

function DetalleRecibo({ recibo, formPago, onChangePago, onSubmitPago, pagando, errorPago }) {
  const [simulacion, setSimulacion] = useState(null);

  useEffect(() => {
    if (recibo.estado === 'PAGADO') return;

    const fecha = formPago.fechaPago || new Date().toISOString().slice(0, 10);

    fetch(`${API_URL}/recibos/${recibo.id}/simulacion-pago?fecha=${fecha}`)
      .then((r) => r.json())
      .then((datos) => {
        setSimulacion(datos);
        onChangePago({ target: { name: 'importePagado', value: datos.totalAPagar } });
      });
  }, [recibo.id, formPago.fechaPago]);

  return (
    <div className="detalle-recibo">
      <h2>Recibo #{recibo.id} — {recibo.tipoTributo}</h2>
      <p>Importe original: {recibo.importe} €</p>
      <p>Estado: <span className={claseEstado(recibo.estado)}>{recibo.estado}</span></p>
      <p>Vencimiento: {recibo.fechaVencimiento}</p>

      <h3>Recargos aplicados</h3>
      {(!recibo.recargos || recibo.recargos.length === 0) && <p>Sin recargos.</p>}
      <ul>
        {recibo.recargos?.map((rec) => (
          <li key={rec.id}>
            {rec.tipo} — {rec.porcentaje}% — {rec.importeCalculado} € de recargo
            {rec.interesesDemora > 0 && ` + ${rec.interesesDemora} € de intereses`}
          </li>
        ))}
      </ul>

      {recibo.estado !== 'PAGADO' && (
        <>
          {simulacion && (
            <div className="simulacion-pago">
              <p>Si pagas el <strong>{formPago.fechaPago || 'hoy'}</strong>, debes abonar:</p>
              {simulacion.recargo ? (
                <p>
                  {simulacion.importeOriginal} € + {simulacion.recargo.tipo} ({simulacion.recargo.porcentaje}%
                  = {simulacion.recargo.importeCalculado} €)
                  {simulacion.recargo.interesesDemora > 0 && ` + ${simulacion.recargo.interesesDemora} € de intereses`}
                  {' '}= <strong>{simulacion.totalAPagar} €</strong>
                </p>
              ) : (
                <p>Sin recargo (dentro de plazo) — <strong>{simulacion.totalAPagar} €</strong></p>
              )}
            </div>
          )}
          <FormularioPago
            formPago={formPago}
            onChange={onChangePago}
            onSubmit={onSubmitPago}
            pagando={pagando}
            error={errorPago}
          />
        </>
      )}
    </div>
  );
}

export default DetalleRecibo;