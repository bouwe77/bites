const bitesFolders = [
  { id: 1, folderName: 'state updater', tags: ['React'] },
  { id: 2, folderName: 'derived state', tags: ['React'] },
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
