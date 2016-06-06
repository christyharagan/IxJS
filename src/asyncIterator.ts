import {$$asyncIterator} from './symbol'

type Type = 'next' | 'throw' | 'return'
interface Value<T> {
  type: Type
  value?: T
  resolve: (value?: IteratorResult<T> | PromiseLike<IteratorResult<T>>) => void
  reject: (reason?: any) => void
}

export interface AsyncIterator<T> {
  next(value?: T): Promise<IteratorResult<T>>
  throw?(error: any): Promise<IteratorResult<T>>
  return?(value?: T): Promise<IteratorResult<T>>
}

export abstract class AsyncIteratorClass<T> implements AsyncIterator<T> {
  private queue: Value<T>[] = []
  private current: Value<T> | undefined = undefined

  private enqueue(type: Type, value?: T) {
    const self = this
    return new Promise<IteratorResult<T>>((resolve, reject) => {
      self.queue.push({
        type: type,
        value: value,
        resolve: resolve,
        reject: reject
      })
      self.resume()
    })
  }

  [$$asyncIterator](): AsyncIterator<T> {
    return this
  }

  next(value?: T): Promise<IteratorResult<T>> {
    return this.enqueue('next', value)
  }

  throw(error: any): Promise<IteratorResult<T>> {
    return this.enqueue('throw', error)
  }

  return(value?: T): Promise<IteratorResult<T>> {
    return this.enqueue('return', value)
  }

  protected abstract _next(value?: T): void

  private resume() {
    if (this.current || this.queue.length === 0) {
      return
    }
    this.current = this.queue.shift()
    const current = <Value<T>>this.current
    switch (current.type) {
      case 'throw': {
        current.reject(current.value)
        break
      }
      case 'return': {
        current.resolve({ done: true, value: <T>current.value })
        break
      }
      default: {
        this._next(current.value)
        break
      }
    }
  }

  protected settleThrow(error: any) {
    this.settle('throw', error)
  }

  protected settleReturn(value?: T) {
    this.settle('return', value)
  }

  private settle(type: Type, valueOrError: any) {
    const self = this
    Promise.resolve(valueOrError).then(value => {
      const current = <Value<T>>self.current
      self.current = undefined
      switch (type) {
        case 'throw': {
          current.reject(value)
          break
        }
        case 'return': {
          current.resolve({ done: true, value: value })
          break
        }
        default: {
          current.resolve({ done: false, value: value })
          break
        }
      }
      self.resume()
    }, error => {
      const current = <Value<T>>self.current
      current.reject(error)
      self.current = undefined
      self.resume()
    })
  }

  protected settleNext(value: T) {
    this.settle('next', value)
  }
}