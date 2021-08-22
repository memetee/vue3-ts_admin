class LocalCache {
  setLocalCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalCache(key: string) {
    const localCache = window.localStorage.getItem(key);
    if (localCache) {
      return JSON.parse(localCache);
    }
  }
  deleteLocalCache(key: string) {
    window.localStorage.removeItem(key);
  }
  clearLocalCache() {
    window.localStorage.clear();
  }
}
export default new LocalCache();
