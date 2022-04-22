interface XHROptions {
  silent?: boolean
  type: XMLHttpRequest['responseType']
  log: Console['log'] | null
  body?: any
}

type XHROptionsType = XHROptions | null

const xhrDefaultOptions: XHROptions = {
  silent: false,
  type: 'blob',
  log: null // console.log
}

function createOnNotLoad (method: string, reason: string, name: string, reject: (reason: XMLHttpRequest) => void) {
  return function (event: ProgressEvent): void {
    console.error(method, reason, name, event)
    reject((event.currentTarget as XMLHttpRequest).response)
  }
}

function runXHR (
  method: string, url: string, name: string, options: XHROptionsType): Promise<XMLHttpRequest['response']> {
  if (!options) {
    options = xhrDefaultOptions
  } else {
    options = { ...xhrDefaultOptions, ...options }
  }
  return XHR(method, url, name, options)
}

function XHR (
  method: string, url: string, name = 'unknown', options = xhrDefaultOptions): Promise<XMLHttpRequest['response']> {
  return new Promise((resolve, reject) => {
    const log = options.log
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = options.type
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // 1 On load start
    xhr.onloadstart = (event) => {
      log && log(Date.now(), method, 'onloadstart', name, event)
    }
    // 2 On upload
    xhr.upload.onprogress = (event) => {
      log && log(Date.now(), method, 'onupload', name, event)
    }
    // 3 On progress
    xhr.onprogress = (event) => {
      log && log(Date.now(), method, 'onprogress', name, event)
    }
    // 4 On load
    xhr.onload = (event) => {
      log && log(Date.now(), method, 'onload', name, event)
      const blob: Blob = (event.currentTarget as XMLHttpRequest).response
      if (blob.type === 'application/json') {
        blob.text()
          .then((text) => {
            resolve(event.loaded ? JSON.parse(text) : null)
          })
      } else if (blob.type === 'text/html') {
        blob.text()
          .then((text) => {
            resolve(text)
          })
      } else {
        resolve((event.currentTarget as XMLHttpRequest).response)
      }
    }
    // 5 Error | Abort | Timeout
    xhr.onerror = createOnNotLoad(method, 'error', name, reject)
    xhr.onabort = createOnNotLoad(method, 'abort', name, reject)
    xhr.ontimeout = createOnNotLoad(method, 'timeout', name, reject)

    options.body ? xhr.send(options.body) : xhr.send()
  })
}

export function GET (
  url: string, name = 'unknown', options: XHROptionsType = null): Promise<XMLHttpRequest['response']> {
  return runXHR('GET', url, name, options)
}

export function HEAD (
  url: string, name = 'unknown', options: XHROptionsType = null): Promise<XMLHttpRequest['response']> {
  return runXHR('HEAD', url, name, options)
}

export function POST (
  url: string, name = 'unknown', options: XHROptionsType = null): Promise<XMLHttpRequest['response']> {
  return runXHR('POST', 'http://localhost:5000/api/login', 'name', options)
}
