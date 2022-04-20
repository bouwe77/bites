import { lazy, Suspense, useState } from 'react'

// Change this number if you add a bite...
const howMany = 2

// Import all bites
const bites = [...Array(howMany)].map((_, index) => lazy(() => import(`./bites/${index + 1}`)))

const App = () => {
  const [index, setIndex] = useState(0)

  const ChosenBite = bites[index]

  return (
    <>
      <h1>Bites 😋</h1>

      <div style={{ margin: '20px 0' }}>
        Grab a bite:
        {[...Array(howMany)].map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{ margin: '5px' }}>
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid lightgray', padding: '3px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ChosenBite />
        </Suspense>
      </div>
    </>
  )
}

export default App
