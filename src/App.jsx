import {useState, useEffect} from 'react'
import Header from './components/Header'
import Filters from './components/Filters';
import ExpensesList from './components/ExpensesList';
import Modal from './components/Modal';
import {idGenerator} from './helpers';
import NewExpenseIcon from './img/nuevo-gasto.svg'
import { object } from 'prop-types';

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true);
      setTimeout(() => {
        setModalAnimation(true);
      }, 500);
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if(filter) {
      //Filtrar gastos por categoría
      const filteredExpenses = expenses.filter(expense => expense.category === filter);
      setFilteredExpenses(filteredExpenses);
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;
    if(budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, [])

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});
    setTimeout(() => {
      setModalAnimation(true);
    }, 500);
  }

  const saveExpense = expense => {
    if(expense.id) {
      //Actualizar
      const updatedExpenses = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState);
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      //Nuevo Gasto
      expense.id = idGenerator();
      expense.date = Date.now();
      setExpenses([...expenses, expense])
    }
    setModalAnimation(false);
    setTimeout(() => {
      setModal(false)
    }, 500)
  }
  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={NewExpenseIcon}
              alt="Icono Nuevo Gasto"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}
      {modal && <Modal
                  setModal={setModal}
                  modalAnimation={modalAnimation}
                  setModalAnimation={setModalAnimation}
                  saveExpense={saveExpense}
                  editExpense={editExpense}
                  setEditExpense={setEditExpense}
                  />}
    </div>
  )
}

export default App
