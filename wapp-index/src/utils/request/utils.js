import Qs from 'qs';

export const requestMap = new Map();

export const generateReqKey = (config) => {
  const { method, url, params, data } = config;
  let key = [method.toLowerCase(), url, Qs.stringify(params), Qs.stringify(data)].join(':');
  return key;
};

export const addRequest = (config, { curTime }) => {
  const requestKey = generateReqKey(config);
  if (!requestMap.has(requestKey)) {
    requestMap.set(requestKey, {
      oldReqTime: curTime
    });
  }
};

export const removeRequest = (config) => {
  const requestKey = generateReqKey(config);
  if (requestMap.has(requestKey)) {
    requestMap.delete(requestKey);
  }
};


const MemoryCache = {
  data: {},
  set(key, value, maxAge) {
    this.data[key] = {
      maxAge: maxAge || 0,
      value,
      now: Date.now()
    };
  },
  get(key) {
    const cachedItem = this.data[key];
    if (!cachedItem) return null;
    const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
    isExpired && this.delete(key);
    return isExpired ? null : cachedItem.value;
  },
  delete(key) {
    return delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

function isCacheLike(cache) {
  return !!(
    cache.set &&
    cache.get &&
    cache.delete &&
    cache.clear &&
    typeof cache.get === 'function' &&
    typeof cache.set === 'function' &&
    typeof cache.delete === 'function' &&
    typeof cache.clear === 'function'
  );
}

export function cacheAdapterEnhancer(adapter, options) {
  const {
    maxAge,
    enabledByDefault = true,
    cacheFlag = 'cache',
    defaultCache = MemoryCache
  } = options;
  return (config) => {
    const { url, method, params, forceUpdate } = config;
    let useCache = config[cacheFlag] !== undefined && config[cacheFlag] !== null ? config[cacheFlag] : enabledByDefault;
    if (method === 'get' && useCache) {
      const cache = isCacheLike(useCache) ? useCache : defaultCache;
      let requestKey = generateReqKey(config);
      let responsePromise = cache.get(requestKey);
      if (!responsePromise || forceUpdate) {
        responsePromise = (async () => {
          try {
            return await adapter(config);
          } catch (reason) {
            cache.delete(requestKey);
            throw reason;
          }
        })();
        cache.set(requestKey, responsePromise, maxAge);
        return responsePromise;
      }
      return responsePromise;
    }

    return adapter(config);
  };
}
