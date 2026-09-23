function FormularioPago({ formPago, onChange, onSubmit, pagando, error }) {
  return (
    <>
      <h3>Registrar pago</h3>
      <form onSubmit={onSubmit}>
        <input type="date" name="fechaPago" value={formPago.fechaPago} onChange={onChange} required />
        <input type="number" step="0.01" name="importePagado" placeholder="Importe pagado" value={formPago.importePagado} onChange={onChange} required />
        <select name="metodoPago" value={formPago.metodoPago} onChange={onChange}>
          <option value="TRANSFERENCIA">Transferencia</option>
          <option value="TARJETA">Tarjeta</option>
          <option value="DOMICILIACION">Domiciliación</option>
          <option value="EFECTIVO">Efectivo</option>
        </select>
        <button type="submit" disabled={pagando}>{pagando ? 'Registrando...' : 'Pagar'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default FormularioPago;