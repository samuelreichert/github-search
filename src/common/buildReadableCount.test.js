import buildReadableCount from './buildReadableCount'

describe('buildReadableCount', () => {
  it('should show the exact same number when the count is smaller than 1000', () => {
    const count = 50
    expect(buildReadableCount(count)).toEqual('50')
  })

  it('should show the number in a readable way when bigger than 1000', () => {
    const count = 1500
    expect(buildReadableCount(count)).toEqual('1.5k')
  })
})
