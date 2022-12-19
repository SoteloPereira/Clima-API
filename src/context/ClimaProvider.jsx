import {useState, createContext} from 'react'
import axios from 'axios'

const ClimaContext = createContext()

function ClimaProvider({children}) {

    import.meta.env.VITE_API_KEY

    //como lo usaremos en varios componentes
    const [busqueda, setBusqueda] = useState(
        {
            ciudad: '',
            pais: ''
        }
    )
    const [resultado, setResultado] = useState ({})
    const [spinner, setSpinner] = useState(false)
    const [noResultado, setNoresultado] = useState('')

    const datosBusqueda = e =>{
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value,
        })
    }

    const consultarClima = async datos =>{
        setSpinner(true)
        setNoresultado(false)
        try {
            const { ciudad, pais} = datos

            const appId = import.meta.env.VITE_API_KEY
            //adaptamos la url de consulta con nuestros parametros para obtener data de ubicacion
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            //consumimos la url con axios y nos traemos la data, await ya que necesitamos lat y lon para la proxima request
            const { data } = await axios(url)
            //obtenemos la latitud y longitud
            const { lat, lon} = data[0]

            //url para obtener el clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: clima } = await axios(urlClima)   
            console.log(clima);
            setResultado(clima)
          
        } catch (error) {
            setNoresultado("No hay resultados");
        }finally{
            setSpinner(false)
        }
        
    }

  return (
    <ClimaContext.Provider
        value={{
            busqueda,
            datosBusqueda,
            consultarClima,
            resultado, //de lo que nos traigan las consultas a la API
            spinner,
            noResultado
        }}
        >
        {children}
    </ClimaContext.Provider>
  )
}

export { ClimaProvider }

export default ClimaContext
