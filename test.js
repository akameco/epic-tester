// @flow
const { Observable } = require('rxjs')
const { epicTester } = require('.')

const success = payload => ({ type: 'success', payload })
const failure = error => ({ type: 'failure', error })

const epic = (action$, _, { API }) =>
  action$.ofType('fetchUser').mergeMap(() => {
    return API.getUser()
      .map(v => success(v.data))
      .catch(err => Observable.of(failure(err)))
  })

epicTester({
  title: 'API success',
  epic,
  dependencies: {
    API: {
      getUser: () => Observable.of({ data: 'result' }),
    },
  },
  tests: [
    {
      title: 'fetchUser',
      input$: '-a',
      expect$: '-b',
      values: {
        a: { type: 'fetchUser' },
        b: {
          type: 'success',
          payload: 'result',
        },
      },
    },
  ],
})

epicTester({
  title: 'API failure',
  epic,
  dependencies: {
    API: {
      getUser: () => Observable.throw('msg'),
    },
  },
  tests: [
    {
      title: 'fetchUser',
      input$: '-a',
      expect$: '-b',
      values: {
        a: { type: 'fetchUser' },
        b: {
          type: 'failure',
          error: 'msg',
        },
      },
    },
  ],
})
