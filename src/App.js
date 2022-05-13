import { lazy, Suspense, useState } from 'react'

const bites = [
  { id: 1, folderName: 'Testing useEffect' },
  { id: 2, folderName: 'useRef' },
  { id: 3, folderName: 'TDD' },
]

// Import all bites
const biteComponents = bites.map((bite) => lazy(() => import(`./bites/${bite.folderName}`)))

// Tags
const tags = [
  { name: 'React', bites: [1, 2] },
  { name: 'Testing Library', bites: [1] },
  { name: 'Testing', bites: [1, 3] },
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

  const filteredBiteIds = [
    ...new Set(
      filter.tags
        .filter((tag) => tag.selected)
        .reduce((acc, tag) => {
          return acc.concat(tag.bites)
        }, []),
    ),
  ]

  const filteredBites = filter.filterActive ? bites.filter(({ id }) => filteredBiteIds.includes(id)) : bites

  const ChosenBite = biteComponents[index]

  return (
    <>
      TO DO Reset index indien huidige index niet in huidige filter voorkomt...
      <br />
      TO DO Vervang vinkje achter folder door een andere actieve useState
      <br />
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
        {filteredBites.map((x, i) => (
          <button key={i} onClick={() => setIndex(i)} style={{ margin: '5px' }}>
            {x.folderName} {index === bites.findIndex((bite) => bite.id === x.id) && '✅'}
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
