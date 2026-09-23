import { claseEstado } from '../utils/estado';
import FormularioPago from './FormularioPago';

function DetalleRecibo({ recibo, formPago, onChangePago, onSubmitPago, pagando, errorPago }) {
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
        <FormularioPago
          formPago={formPago}
          onChange={onChangePago}
          onSubmit={onSubmitPago}
          pagando={pagando}
          error={errorPago}
        />
      )}
    </div>
  );
}

export default DetalleRecibo;