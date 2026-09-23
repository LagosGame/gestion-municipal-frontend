import { claseEstado } from '../utils/estado';

function TablaRecibos({ recibos, onVerDetalle }) {
  if (recibos.length === 0) return <p>Sin recibos todavía.</p>;

  return (
    <table>
      <thead>
        <tr><th>ID</th><th>Tipo</th><th>Importe</th><th>Vencimiento</th><th>Estado</th><th></th></tr>
      </thead>
      <tbody>
        {recibos.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td><td>{r.tipoTributo}</td><td>{r.importe} €</td>
            <td>{r.fechaVencimiento}</td>
            <td><span className={claseEstado(r.estado)}>{r.estado}</span></td>
            <td><button onClick={() => onVerDetalle(r.id)}>Ver detalle</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaRecibos;