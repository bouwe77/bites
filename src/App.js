import { lazy, Suspense, useState } from 'react'

// Change this number if you add a bite...
const howMany = 2

// Import all bites
const biteComponents = [...Array(howMany)].map((_, index) => lazy(() => import(`./bites/${index + 1}`)))

// Tags
const tags = [
  { name: 'React', bites: [1, 2] },
  { name: 'Testing Library', bites: [2] },
]

const initialFilter = {
  filterActive: false,
  tags: tags.map((tag) => {
    return {
      ...tag,
      selected: false,
    }
  }),
}

const App = () => {
  const [index, setIndex] = useState(0)
  const [filter, setFilter] = useState(initialFilter)

  const toggleSelectTag = (tagName) => {
    const updatedTags = filter.tags.map((tag) => {
      if (tag.name === tagName) tag.selected = !tag.selected
      return tag
    })
    setFilter((filter) => ({ ...filter, filterActive: updatedTags.some((t) => t.selected), tags: updatedTags }))
  }

  const filteredBites = [
    ...new Set(
      filter.tags
        .filter((tag) => tag.selected)
        .reduce((acc, tag) => {
          return acc.concat(tag.bites)
        }, []),
    ),
  ]

  const bites = filter.filterActive ? filteredBites : [...Array(howMany)]

  const ChosenBite = biteComponents[index]

  return (
    <>
      <h1>Bites 😋</h1>

      <div>
        Tags:{' '}
        {filter.tags.map((tag) => (
          <button key={tag.name} onClick={() => toggleSelectTag(tag.name)} style={{ margin: '5px' }}>
            {tag.name} {tag.selected && '✅'}
          </button>
        ))}
      </div>
      <div style={{ margin: '20px 0' }}>
        Grab a bite:
        {bites.map((_, i) => (
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
