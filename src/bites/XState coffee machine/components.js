import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPowerOff } from '@fortawesome/free-solid-svg-icons'

export const CoffeeIcon = () => <FontAwesomeIcon icon={faCoffee} />
export const PowerIcon = ({ ...rest }) => <FontAwesomeIcon icon={faPowerOff} {...rest} />

export const PowerButton = ({ isOn, toggle }) => (
  <div>
    <button
      onClick={toggle}
      style={{
        width: '80px',
        height: '80px',
        border: isOn ? '5px solid green' : '5px solid lightgray',
      }}
    >
      <PowerIcon style={{ color: isOn ? 'green' : 'lightgray', fontSize: '50px' }} />
    </button>
  </div>
)

export const Display = ({ children }) => (
  <div
    style={{
      border: '5px solid lightgray',
      padding: '3px',
      width: '300px',
      height: '100px',
      fontFamily: 'monospace',
    }}
  >
    {children}
  </div>
)

export const CoffeeMachine = ({ children }) => <div style={{ display: 'grid' }}>{children}</div>
