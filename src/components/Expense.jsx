import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers";
import saveIcon from '../img/icono_ahorro.svg';
import feedingIcon from '../img/icono_comida.svg';
import healthIcon from '../img/icono_salud.svg';
import transportIcon from '../img/icono_transporte.png';
import leisureIcon from '../img/icono_ocio.svg';
import homeIcon from '../img/icono_casa.svg';
import subscriptionsIcon from '../img/icono_suscripciones.svg';
import othersIcon from '../img/icono_gastos.svg';

const indexIcons = {
  ahorro: saveIcon,
  comida: feedingIcon,
  salud: healthIcon,
  transporte: transportIcon,
  ocio: leisureIcon,
  hogar: homeIcon,
  suscripciones: subscriptionsIcon,
  otros: othersIcon
}

const Expense = ({expense, setEditExpense, deleteExpense}) => {
  const {name, amount, category, id, date} = expense;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteExpense(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
            <div className="contenido-gasto">
              <img
                src={indexIcons[category]}
              />
              <div className="descripcion-gasto">
                <p className="categoria">{category}</p>
                <p className="nombre-gasto">{name}</p>
                <p className="fecha-gasto">Agregado el:{' '}
                  <span>{formatDate(date)}</span>
                </p>
              </div>
            </div>
            <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense