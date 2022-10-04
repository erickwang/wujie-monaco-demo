import axios from 'axios';
import localForage from 'localforage';

import {
  generateReqKey,
  addRequest,
  requestMap,
  cacheAdapterEnhancer
} from './utils';

export const ACCOUNT_KEY = '__account__';

const axiosRepeatAbandon = (axios, { time = 800, openSwitch = true }) => {
  if (!axios) {
    // console.warn('axios is request');
    return;
  }

  let reqtmp = axios.Axios.prototype.request;
  axios.request = axios.Axios.prototype.request = function (config) {
    if (config.cancelRepeat !== undefined) {
      openSwitch = config.cancelRepeat;
    }

    if (openSwitch) {
      const requestKey = generateReqKey(config);
      if (requestMap.has(requestKey)) {
        const { oldReqTime } = requestMap.get(requestKey);
        let curTime = new Date().getTime();
        if (curTime - oldReqTime < time) {
          requestMap.set(requestKey, {
            oldReqTime: curTime,
            isCancel: true
          });
        } else {
          requestMap.set(requestKey, {
            oldReqTime: curTime
          });
        }
      } else {
        addRequest(config, {
          curTime: new Date().getTime(),
          limitTime: time
        });
      }
    }
    return reqtmp.call(this, config);
  };


  axios.interceptors.request.use((config) => {
    if (config.cancelRepeat !== undefined) {
      openSwitch = config.cancelRepeat;
    }
    if (openSwitch) {
      const requestKey = generateReqKey(config);
      const { isCancel } = requestMap.get(requestKey) || { isCancel: false };
      if (isCancel) {
        config.cancelToken = new axios.CancelToken((cancel) => {
          cancel(`重复请求: ${config.url}`);
        });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });


  axios.interceptors.response.use((response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log(`已取消的重复请求：${error.message}`);
    } else {
      // 添加异常处理
    }
    return Promise.reject(error);
  });
};


const tokenHolder = {
  tokenKey: 'Authorization', // eslint-disable-line
  tokenValue: '',
  // tokenValue: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJXWF9TQ0FOLG9DejdjNWdZTFRoaHN1bTRRUW0wR1FCMmt1UmMsMzE1MzYwMDAiLCJhdWQiOiIxMDgwLDE0NTgiLCJpc3MiOiJ5b29jaG9pY2UuY29tIiwiZXhwIjoxNjczMDgwMzI5LCJpYXQiOjE2NDE1NDQzMjkzNTB9.VNK6a4j9yU8ZjSgYYLmw3I1_0a5984oXp2b6H6_D4lVB0THIEMxCPfqi6tLhmZDnK6niFgFo-3UMGYOjCgkkvA',
  updatedAt: 0
};

export function setToken(value, key) {
  if (key) {
    tokenHolder.tokenKey = key;
  }
  tokenHolder.tokenValue = value;
  // console.log(`token updated at : ${tokenHolder.updatedAt} >>> ${value}`);
}

export async function getTokenHeaders() {
  if (tokenHolder.tokenValue) {
    return {
      [tokenHolder.tokenKey]: tokenHolder.tokenValue
    };
  }
  const account = await localForage.getItem(ACCOUNT_KEY);
  // console.log(`find account >>> ${JSON.stringify(account)}`);
  if (account) {
    setToken(account.token);
  }
  return {
    [tokenHolder.tokenKey]: tokenHolder.tokenValue
  };
}

function ajaxFn(fn, url, data, config) {
  return new Promise((resolve, reject) => {
    return fn(url, data, config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

// export default axiosRepeatAbandon;
axiosRepeatAbandon(axios, { time: 500, openSwitch: true });

const http = axios.create({
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: true,
    maxAge: 2000
  })
});

const api = {
  request: async (config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.request, Object.assign(config, { headers }));
  }, //
  get: async (url, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.get, url, Object.assign(config, { headers }));
  }, // axios.get (url[, config])
  delete: async (url, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.delete, url, Object.assign(config, { headers }));
  }, // axios.delete (url[, config])
  head: async (url, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.head, url, Object.assign(config, { headers }));
  }, // axios.head(url[, config])
  options: async (url, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.options, url, Object.assign(config, { headers }));
  }, // axios.options (url[, config])
  post: async (url, data, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.post, url, data, Object.assign(config, { headers }));
  }, // axios.post(url[, data[, config]])
  put: async (url, data, config = {}) => {
    const headers = await getTokenHeaders();
    return ajaxFn(http.put, url, data, Object.assign(config, { headers }));
  } // axios.put, // (url[, data[, config]])
};

export { api };

export default api;
