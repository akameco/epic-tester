// @flow
const { TestScheduler } = require('rxjs')
const { ActionsObservable } = require('redux-observable')

/*::
type Test = {
  title: string,
  input$: string,
  expect$: string,
  values: Object,
}

type Props = {
  title: string,
  epic: *,
  state?: Object,
  dependencies?: Object,
  tests: Array<Test>,
}
*/

function epicTester(
  { title, epic, state = {}, dependencies = {}, tests = [] } /*: Props */
) {
  describe(title, () => {
    for (const t of tests) {
      it(t.title, () => {
        const testScheduler = new TestScheduler((expected, actual) => {
          expect(expected).toEqual(actual)
        })
        const cold = testScheduler.createColdObservable.bind(testScheduler)

        const test$ = epic(
          new ActionsObservable(cold(t.input$, t.values)),
          state,
          dependencies
        )
        testScheduler.expectObservable(test$).toBe(t.expect$, t.values)

        testScheduler.flush()
      })
    }
  })
}

module.exports = { epicTester }
