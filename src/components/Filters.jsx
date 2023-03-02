import {useState, useEffect} from 'react'

const Filters = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className="campo">
                <label htmlFor="filterOptions">Filtrar Gastos</label>
                <select
                    id="filterOptions"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="salud">Salud</option>
                    <option value="transporte">Transporte</option>
                    <option value="ocio">Ocio</option>
                    <option value="hogar">Hogar</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="otros">Otros Gastos</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filters