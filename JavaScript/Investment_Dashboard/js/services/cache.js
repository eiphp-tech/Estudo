export const createCache = (ttl = 120000) => {
  const cache = new Map()
  const timeouts = new Map()

  return {
    get(key) {
      const timestamp = timeouts.get(key)
      const age = Date.now() - timestamp

      if (!timestamp) {
        return null
      }
      if (age > ttl) {
        console.log(`⏰ Cache expirado: ${key}`);
        this.delete(key)
        return null
      }

      console.log(`✅ Cache hit: ${key}`);
      return cache.get(key);
    },

    set(key, value) {
      cache.set(key, value)
      timeouts.set(key, Date.now())
      console.log(`💾 Cache salvo: ${key}`);
    },

    delete(key) {
      cache.delete(key)
      timeouts.delete(key)
    },

    clear() {
      cache.clear()
      timeouts.clear()
      console.log('🗑️ Cache limpo');
    },

    size() {
      return cache.size
    }

  }
}