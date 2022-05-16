import { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  const isEven = count % 2 === 0

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button style={{ fontSize: '50px', width: '60px' }} onClick={() => setCount(count - 1)}>
          -
        </button>
        <h1 style={{ margin: '20px', fontSize: '50px' }}>{count}</h1>
        <button style={{ fontSize: '50px', width: '60px' }} onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
      <div>
        <h1>{isEven ? 'EVEN' : 'ODD'}</h1>
      </div>
    </>
  )
}

export default App
