function TablaContribuyentes({ contribuyentes, onVerRecibos }) {
  return (
    <>
      <h2>Contribuyentes</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>NIF</th><th>Nombre</th><th>Apellidos</th><th>Email</th><th></th></tr>
        </thead>
        <tbody>
          {contribuyentes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.nif}</td><td>{c.nombre}</td><td>{c.apellidos}</td><td>{c.email}</td>
              <td><button onClick={() => onVerRecibos(c.id)}>Ver recibos</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TablaContribuyentes;