import {useState, useEffect} from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetControl = ({expenses, setExpenses, budget, setBudget, setIsValidBudget}) => {

    const [percentage, setPercentage] = useState(0);
    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0);
        const totalAvailable = budget - totalSpent;
        //Cálculos de porcentaje gastado
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);
        setAvailable(totalAvailable);
        setSpent(totalSpent);
        setTimeout(() => {
            setPercentage(newPercentage);
        }, 1000)
    }, [expenses])

    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = () => {
        const response = confirm('¿Estás seguro de que deseas eliminar todos los datos?');
        if(response) {
            setBudget(0);
            setExpenses([]);
            setIsValidBudget(false);
        }
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatAmount(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatAmount(available)}
                </p>
                <p>
                    <span>Gastado: </span> {formatAmount(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl;