import { render } from '@redwoodjs/testing/web'

import GridPage from './GridPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GridPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GridPage />)
    }).not.toThrow()
  })
})
