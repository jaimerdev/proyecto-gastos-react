import {useState, useEffect} from 'react';
import Message from './Message';
import CloseBtn from '../img/cerrar.svg';

const Modal = ({setModal, modalAnimation, setModalAnimation, saveExpense, editExpense, setEditExpense}) => {

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState();
    const [date, setDate] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if(Object.keys(editExpense).length > 0) {
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setDate(editExpense.date);
            setId(editExpense.id);
          }
    }, [])

    const hideModal = () => {
        setModalAnimation(false);
        setEditExpense({});

        setTimeout(() => {
            setModal(false);
          }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if([name, amount, category].includes('')) {
            setMessage('Todos los campos son obligatorios');
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return;
        }
        saveExpense({name, amount, category, date, id});
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CloseBtn}
                    alt="Cerrar Ventana"
                    onClick={hideModal}
                />
            </div>
            <form
                className={`formulario ${modalAnimation ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{editExpense.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {message && <Message type="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="name">Nombre Gasto</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="amount">Cantidad</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="Añade la cantidad del gasto: ej. 150"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Cantidad</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
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
                <input
                    type="submit"
                    value={editExpense.name ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal;