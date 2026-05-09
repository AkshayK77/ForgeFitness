const DB_NAME = 'forge-offline-v1'
const SETS_STORE = 'pending-sets'
const SESSION_STORE = 'pending-sessions'

async function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(SETS_STORE)) {
        db.createObjectStore(SETS_STORE, { keyPath: 'key' })
      }
      if (!db.objectStoreNames.contains(SESSION_STORE)) {
        db.createObjectStore(SESSION_STORE, { keyPath: 'session_id' })
      }
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror = e => reject(e.target.error)
  })
}

function idbPut(store, data) {
  return openDb().then(db => new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).put(data)
    tx.oncomplete = res
    tx.onerror = () => rej(tx.error)
  }))
}

function idbGetAll(store) {
  return openDb().then(db => new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = e => res(e.target.result)
    req.onerror = () => rej(req.error)
  }))
}

function idbDelete(store, key) {
  return openDb().then(db => new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).delete(key)
    tx.oncomplete = res
    tx.onerror = () => rej(tx.error)
  }))
}

export function saveOfflineSet(set) {
  return idbPut(SETS_STORE, { ...set, key: `${set.session_id}_${set.set_number}_${set.exercise_id}` })
}

export function saveOfflineSession(data) {
  return idbPut(SESSION_STORE, data)
}

export function getOfflineSets() {
  return idbGetAll(SETS_STORE)
}

export function getOfflineSessions() {
  return idbGetAll(SESSION_STORE)
}

export function clearOfflineSet(key) {
  return idbDelete(SETS_STORE, key)
}

export function clearOfflineSession(sessionId) {
  return idbDelete(SESSION_STORE, sessionId)
}
