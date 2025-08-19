const localRetrieve = (name) => window.localStorage.getItem(name)

const localStore = (name, value) => window.localStorage.setItem(name, value)

const localDelete = (name) => window.localStorage.removeItem(name)

export { localRetrieve, localStore, localDelete }
