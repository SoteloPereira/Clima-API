//queremos que se muestre solo si hay algo como respuesta
import useClima from "../hooks/useClima"

const Resultado = () => {

    const { resultado } = useClima()
    const { name, main } = resultado

    //convertir ° ya que los devuelve en Kelvin
    const kelvin = 273.15

  return (

    <div className="contenedor clima">
        <h2>El Clima en {name} es: </h2>
        <p>Actual: {parseInt(main.temp - kelvin)}<span>&#x2103;</span></p>
        <div className="temp_min_max">
            <p>Mínima: {parseInt(main.temp_min - kelvin)}<span className="m">&#x2103;</span></p>
            <p>Máxima: {parseInt(main.temp_max - kelvin)}<span className="m">&#x2103;</span></p>
        </div>
    </div>
  )
}

export default Resultado
