const bitesFolders = [
  { id: 1, folderName: 'Testing useEffect', tags: ['React', 'Testing', 'Testing Library'] },
  { id: 2, folderName: 'useRef', tags: ['React'] },
  { id: 3, folderName: 'TDD', tags: ['Testing'] },
]

export const getAllFolders = () => {
  return bitesFolders
}

export const getAllTags = () => {
  const allTags = bitesFolders.reduce((acc, bitesFolder) => {
    return acc.concat(bitesFolder.tags)
  }, [])
  return [...new Set(allTags)]
}

export const getByTags = (tags) => {
  return bitesFolders.filter((bite) => {
    return tags.every((tag) => bite.tags.includes(tag))
  })
}
