function FormularioRecibo({ formRecibo, onChange, onSubmit, creando, error }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <select name="tipoTributo" value={formRecibo.tipoTributo} onChange={onChange}>
          <option value="IBI">IBI</option>
          <option value="TASA_BASURAS">Tasa de basuras</option>
          <option value="TASA_VADO">Tasa de vado</option>
          <option value="IVTM">IVTM</option>
          <option value="MULTA_TRAFICO">Multa de tráfico</option>
          <option value="PLUSVALIA">Plusvalía</option>
        </select>
        <input type="number" name="ejercicioFiscal" placeholder="Año" value={formRecibo.ejercicioFiscal} onChange={onChange} required />
        <input type="number" step="0.01" name="importe" placeholder="Importe" value={formRecibo.importe} onChange={onChange} required />
        <label>Emisión: <input type="date" name="fechaEmision" value={formRecibo.fechaEmision} onChange={onChange} required /></label>
        <label>Vencimiento: <input type="date" name="fechaVencimiento" value={formRecibo.fechaVencimiento} onChange={onChange} required /></label>
        <button type="submit" disabled={creando}>{creando ? 'Creando...' : 'Crear recibo'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default FormularioRecibo;