import { useMachine } from '@xstate/react'
import coffeeMachine from './coffeeMachine'
import { CoffeeButton, CoffeeButtons, CoffeeMachine, Display, PowerButton } from './components'

const App = () => {
  const [state, send] = useMachine(coffeeMachine)

  const isOn = ['starting', 'on', 'stopping'].some(state.matches)

  return (
    <>
      <h1>My Coffee Machine</h1>

      <CoffeeMachine>
        <PowerButton isOn={isOn} toggle={() => send('TOGGLE_POWER')} />

        <Display isOn={isOn}>
          {['starting', 'stopping'].some(state.matches) ? 'Please wait...' : null}
          {state.matches('on') ? 'What can I get you?' : null}
        </Display>

        <CoffeeButtons>
          <CoffeeButton disabled={!state.matches('on')}>Ristretto</CoffeeButton>
          <CoffeeButton disabled={!state.matches('on')}>Espresso</CoffeeButton>
          <CoffeeButton disabled={!state.matches('on')}>Lungo</CoffeeButton>
        </CoffeeButtons>
      </CoffeeMachine>

      <div style={{ border: '3px dashed pink', padding: '3px', margin: '10px' }}>
        <div>STATE: {JSON.stringify(state.value)}</div>
        <div>CONTEXT: {JSON.stringify(state.context)}</div>
      </div>
    </>
  )
}

export default App
