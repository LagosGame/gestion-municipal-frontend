function FormularioContribuyente({ formulario, onChange, onSubmit, enviando, error }) {
  return (
    <>
      <h2>Nuevo contribuyente</h2>
      <form onSubmit={onSubmit}>
        <input name="nif" placeholder="NIF" value={formulario.nif} onChange={onChange} required />
        <input name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={onChange} required />
        <input name="apellidos" placeholder="Apellidos" value={formulario.apellidos} onChange={onChange} required />
        <input name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={onChange} />
        <input name="email" type="email" placeholder="Email" value={formulario.email} onChange={onChange} />
        <input name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={onChange} />
        <button type="submit" disabled={enviando}>{enviando ? 'Creando...' : 'Crear contribuyente'}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default FormularioContribuyente;