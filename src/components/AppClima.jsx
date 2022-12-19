import Formulario from './Formulario'
import Resultado from './Resultado'
import useClima from "../hooks/useClima"
import Spinner from './Spinner'

const AppClima = () => {

    const { resultado, spinner, noResultado } = useClima()

  return (
    <>
        <main className='dos-columnas'>
            <Formulario />
        
    {/* queremos que se muestre solo si hay algo como respuesta, resultado al ser objeto preguntamos 
    por una propiedad y usamos el ? */}
            {spinner ? <Spinner /> : resultado?.name ? <Resultado /> :
            noResultado ? <p>{noResultado}</p> : ''}
        </main>
    </>
  )
}

export default AppClima
