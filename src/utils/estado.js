export const claseEstado = (estado) => {
  if (estado === 'PAGADO') return 'badge badge-pagado';
  if (estado === 'EN_EJECUTIVA') return 'badge badge-ejecutiva';
  return 'badge badge-pendiente';
};