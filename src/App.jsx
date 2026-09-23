import './App.css';
import { useState, useEffect } from 'react';
import FormularioContribuyente from './components/FormularioContribuyente';
import TablaContribuyentes from './components/TablaContribuyentes';
import FormularioRecibo from './components/FormularioRecibo';
import TablaRecibos from './components/TablaRecibos';
import DetalleRecibo from './components/DetalleRecibo';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [formulario, setFormulario] = useState({
    nif: '', nombre: '', apellidos: '', direccion: '', email: '', telefono: '',
  });
  const [enviando, setEnviando] = useState(false);
  const [errorFormulario, setErrorFormulario] = useState(null);

  const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState(null);
  const [recibos, setRecibos] = useState([]);
  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);

  const [formRecibo, setFormRecibo] = useState({
    tipoTributo: 'IBI', ejercicioFiscal: '', importe: '', fechaEmision: '', fechaVencimiento: '',
  });
  const [creandoRecibo, setCreandoRecibo] = useState(false);
  const [errorRecibo, setErrorRecibo] = useState(null);

  const [formPago, setFormPago] = useState({
    fechaPago: '', importePagado: '', metodoPago: 'TRANSFERENCIA',
  });
  const [pagando, setPagando] = useState(false);
  const [errorPago, setErrorPago] = useState(null);

  const cargarContribuyentes = () => {
    setCargando(true);
    fetch(`${API_URL}/contribuyentes`)
      .then((r) => { if (!r.ok) throw new Error('Error al cargar contribuyentes'); return r.json(); })
      .then((datos) => { setContribuyentes(datos); setCargando(false); })
      .catch((err) => { setError(err.message); setCargando(false); });
  };

  useEffect(() => { cargarContribuyentes(); }, []);

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    setEnviando(true);
    setErrorFormulario(null);
    fetch(`${API_URL}/contribuyentes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    })
      .then((r) => { if (!r.ok) throw new Error('No se pudo crear el contribuyente'); return r.json(); })
      .then(() => {
        setFormulario({ nif: '', nombre: '', apellidos: '', direccion: '', email: '', telefono: '' });
        setEnviando(false);
        cargarContribuyentes();
      })
      .catch((err) => { setErrorFormulario(err.message); setEnviando(false); });
  };

  const verRecibos = (contribuyenteId) => {
    setContribuyenteSeleccionado(contribuyenteId);
    setReciboSeleccionado(null);
    fetch(`${API_URL}/contribuyentes/${contribuyenteId}/recibos`)
      .then((r) => r.json())
      .then((datos) => setRecibos(datos));
  };

  const verDetalleRecibo = (reciboId) => {
    fetch(`${API_URL}/recibos/${reciboId}`)
      .then((r) => r.json())
      .then((datos) => setReciboSeleccionado(datos));
  };

  const handleChangeRecibo = (evento) => {
    const { name, value } = evento.target;
    setFormRecibo((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmitRecibo = (evento) => {
    evento.preventDefault();
    setCreandoRecibo(true);
    setErrorRecibo(null);
    fetch(`${API_URL}/contribuyentes/${contribuyenteSeleccionado}/recibos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formRecibo,
        ejercicioFiscal: Number(formRecibo.ejercicioFiscal),
        importe: Number(formRecibo.importe),
      }),
    })
      .then((r) => { if (!r.ok) throw new Error('No se pudo crear el recibo (revisa los datos)'); return r.json(); })
      .then(() => {
        setFormRecibo({ tipoTributo: 'IBI', ejercicioFiscal: '', importe: '', fechaEmision: '', fechaVencimiento: '' });
        setCreandoRecibo(false);
        verRecibos(contribuyenteSeleccionado);
      })
      .catch((err) => { setErrorRecibo(err.message); setCreandoRecibo(false); });
  };

  const handleChangePago = (evento) => {
    const { name, value } = evento.target;
    setFormPago((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmitPago = (evento) => {
    evento.preventDefault();
    setPagando(true);
    setErrorPago(null);
    fetch(`${API_URL}/recibos/${reciboSeleccionado.id}/pagos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPago),
    })
      .then((r) => { if (!r.ok) throw new Error('No se pudo registrar el pago (revisa el importe)'); return r.json(); })
      .then(() => {
        setFormPago({ fechaPago: '', importePagado: '', metodoPago: 'TRANSFERENCIA' });
        setPagando(false);
        verDetalleRecibo(reciboSeleccionado.id);
        verRecibos(contribuyenteSeleccionado);
      })
      .catch((err) => { setErrorPago(err.message); setPagando(false); });
  };

  if (cargando) return <p>Cargando contribuyentes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <h1>Gestión de Tributos Municipales</h1>

      <FormularioContribuyente
        formulario={formulario}
        onChange={handleChange}
        onSubmit={handleSubmit}
        enviando={enviando}
        error={errorFormulario}
      />

      <TablaContribuyentes contribuyentes={contribuyentes} onVerRecibos={verRecibos} />

      {contribuyenteSeleccionado && (
        <div>
          <h2>Recibos del contribuyente {contribuyenteSeleccionado}</h2>
          <FormularioRecibo
            formRecibo={formRecibo}
            onChange={handleChangeRecibo}
            onSubmit={handleSubmitRecibo}
            creando={creandoRecibo}
            error={errorRecibo}
          />
          <TablaRecibos recibos={recibos} onVerDetalle={verDetalleRecibo} />
        </div>
      )}

      {reciboSeleccionado && (
        <DetalleRecibo
          recibo={reciboSeleccionado}
          formPago={formPago}
          onChangePago={handleChangePago}
          onSubmitPago={handleSubmitPago}
          pagando={pagando}
          errorPago={errorPago}
        />
      )}
    </div>
  );
}

export default App;