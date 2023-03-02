import {useState} from "react";
import Message from "./Message";

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const [message, setMessage] = useState('');
    const handleBudget = (e) => {
        e.preventDefault();
        if(!budget || budget < 0) {
            setMessage('Presupuesto no válido');
            return;
        }
        setMessage('');
        setIsValidBudget(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handleBudget} className="formulario">
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añadir"/>
                {message && <Message type="error">{message}</Message>}
            </form>
        </div>
    )
}

export default NewBudget