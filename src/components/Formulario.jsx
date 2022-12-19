import { useState } from "react"
import { PAISES } from "../constants"
import useClima from "../hooks/useClima"

const Formulario = () => {

    const [alerta, setAlerta] = useState('')
    const {busqueda, datosBusqueda, consultarClima} = useClima()
    const { ciudad, pais } =  busqueda

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log("Consultando");
        if(Object.values(busqueda).includes('')){
            setAlerta("Debe completar ambos campos");
            return
        }
        consultarClima(busqueda)
        setAlerta('')
    }
  return (
    <div className="contenedor">
        {alerta && <p className="alerta">{alerta}</p> }
        <form 
            onSubmit={handleSubmit}
        >
            <div className="campo">
                <label htmlFor="ciudad">Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" placeholder="Ingrese Ciudad"
                onChange={datosBusqueda} value={ciudad}
                />
            </div>
            <div className="campo">
                <label htmlFor="pais">País:</label>
                <select  id="pais" name="pais"
                onChange={datosBusqueda} value={pais}
                >
                    <option value="">--Seleccione un País--</option>
                    {PAISES.map(pais => (
                        <option value={pais.id} key={pais.id}>
                            {pais.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Consultar Clima"/>
        </form>
    </div>
  )
}

export default Formulario
