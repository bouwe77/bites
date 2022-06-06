import { useMachine } from '@xstate/react'
import coffeeMachine from './coffeeMachine'
import { CoffeeMachine, Display, PowerButton } from './components'

const App = () => {
  const [state, send] = useMachine(coffeeMachine)

  return (
    <>
      <h1>My Coffee Machine</h1>

      <CoffeeMachine>
        <div>
          <PowerButton
            isOn={['starting', 'on', 'stopping'].some(state.matches)}
            toggle={() => send('TOGGLE_POWER')}
          />

          <Display>
            {['starting', 'stopping'].some(state.matches) ? 'Please wait...' : null}
            {state.matches('on') ? 'What can I get you?' : null}
          </Display>
        </div>
      </CoffeeMachine>

      <div style={{ border: '3px dashed pink', padding: '3px', margin: '10px' }}>
        <div>STATE: {JSON.stringify(state.value)}</div>
        <div>CONTEXT: {JSON.stringify(state.context)}</div>
      </div>
    </>
  )
}

export default App
