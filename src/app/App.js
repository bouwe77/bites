import { lazy, Suspense, useState } from 'react'
import { getAllFolders, getAllTags, getByTags } from './data'

// Import all bites sub folders
const bitesFolders = getAllFolders()
const biteComponents = bitesFolders.map((biteFolder) => lazy(() => import(`../bites/${biteFolder.folderName}`)))

const tags = getAllTags()

const App = () => {
  const [index, setIndex] = useState(0)
  const [filter, setFilter] = useState({ filterActive: false, selectedTags: [] })

  const toggleSelectTag = (tagName) => {
    const selectedTags = filter.selectedTags.includes(tagName)
      ? filter.selectedTags.filter((tag) => tag !== tagName)
      : [...filter.selectedTags, tagName]

    setFilter((filter) => ({ ...filter, filterActive: selectedTags.length > 0, selectedTags }))
  }

  const filteredBites = filter.filterActive ? getByTags(filter.selectedTags) : bitesFolders

  const SelectedBiteComponent = biteComponents[index]

  return (
    <>
      TO DO Reset index indien huidige index niet in huidige filter voorkomt...
      <br />
      <h1>Bites 😋</h1>
      <div>
        Tags:{' '}
        {tags.map((tag) => (
          <button key={tag} onClick={() => toggleSelectTag(tag)} style={{ margin: '5px' }}>
            {tag} {filter.selectedTags.includes(tag) ? '✅' : null}
          </button>
        ))}
      </div>
      <div style={{ margin: '20px 0' }}>
        Grab a bite:
        {filteredBites.map((x, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              margin: '5px',
              border:
                index === bitesFolders.findIndex((bite) => bite.id === x.id) ? '2px solid orange' : '1px solid gray',
            }}
          >
            {x.folderName}
          </button>
        ))}
      </div>
      <div style={{ border: '1px solid lightgray', padding: '3px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <SelectedBiteComponent />
        </Suspense>
      </div>
    </>
  )
}

export default App
