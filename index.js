'use strict'
const { TestScheduler } = require('rxjs')
const { ActionsObservable } = require('redux-observable')

function epicTester({ title, epic, dependencies = {}, tests = [] }) {
  describe(title, () => {
    for (const t of tests) {
      it(t.title, () => {
        const testScheduler = new TestScheduler((expected, actual) => {
          expect(expected).toEqual(actual)
        })
        const cold = testScheduler.createColdObservable.bind(testScheduler)

        const test$ = epic(
          new ActionsObservable(cold(t.input$, t.values)),
          testScheduler,
          dependencies
        )
        testScheduler.expectObservable(test$).toBe(t.expect$, t.values)

        testScheduler.flush()
      })
    }
  })
}

module.exports = {
  epicTester,
}
