import {
  itemIndexToVirtualIndex,
  virtualIndexToItemIndex,
} from './comboinput-helpers'

const sections = [
  ['a', 'b', 'c', 'd'],
  ['A', 'B', 'C', 'D'],
  ['I', 'II', 'III', 'IV'],
]

describe('itemIndexToVirtualIndex', () => {
  const items = [
    'Header 1',
    ...sections[0],
    'Header 2',
    ...sections[1],
    'Header 3',
    ...sections[2],
  ]

  it('should return header for first element', () => {
    expect(items[itemIndexToVirtualIndex(sections, 0)]).toBe('Header 1')
  })

  it('should return 2 for second element', () => {
    expect(items[itemIndexToVirtualIndex(sections, 1)]).toBe(sections[0][1])
  })

  it('should return header for first element in 2nd section', () => {
    expect(items[itemIndexToVirtualIndex(sections, 4)]).toBe('Header 2')
  })

  it('should return item for 2nd element in 2nd section', () => {
    expect(items[itemIndexToVirtualIndex(sections, 5)]).toBe(sections[1][1])
  })

  it('should return header for first element in 3rd section', () => {
    expect(items[itemIndexToVirtualIndex(sections, 8)]).toBe('Header 3')
  })

  it('should return item for 2nd element in 3rd section', () => {
    expect(items[itemIndexToVirtualIndex(sections, 9)]).toBe(sections[2][1])
  })

  it('should return the last item in the last section', () => {
    expect(items[itemIndexToVirtualIndex(sections, 11)]).toBe(sections[2][3])
  })

  const items2 = [...[], 'Header 2', ...sections[1], 'Header 3', ...sections[2]]

  it('should return header for first element', () => {
    expect(items2[itemIndexToVirtualIndex(sections, 0)]).toBe('Header 2')
  })

  it('should return 2 for second element', () => {
    expect(items2[itemIndexToVirtualIndex(sections, 1)]).toBe(sections[1][1])
  })

  it('should return header for first element in 3nd section', () => {
    expect(items2[itemIndexToVirtualIndex(sections, 4)]).toBe('Header 3')
  })

  it('should return item for 2nd element in 3nd section', () => {
    expect(items2[itemIndexToVirtualIndex(sections, 5)]).toBe(sections[2][1])
  })

  const items3 = ['Header 1', ...sections[0], ...[], 'Header 3', ...sections[2]]

  it('should return header for first element', () => {
    expect(items3[itemIndexToVirtualIndex(sections, 0)]).toBe('Header 1')
  })

  it('should return 2 for second element', () => {
    expect(items3[itemIndexToVirtualIndex(sections, 1)]).toBe(sections[0][1])
  })

  it('should return header for first element in 3nd section', () => {
    expect(items3[itemIndexToVirtualIndex(sections, 4)]).toBe('Header 3')
  })

  it('should return item for 2nd element in 3nd section', () => {
    expect(items3[itemIndexToVirtualIndex(sections, 5)]).toBe(sections[2][1])
  })
})

describe('virtualIndexToItemIndex', () => {
  const items = [...sections[0], ...sections[1], ...sections[2]]

  it('should return first element for index 0', () => {
    expect(items[virtualIndexToItemIndex(sections, 0)]).toBe(sections[0][0])
  })

  it('should return first element for index 1', () => {
    expect(items[virtualIndexToItemIndex(sections, 1)]).toBe(sections[0][0])
  })

  it('should return second element for index 2', () => {
    expect(items[virtualIndexToItemIndex(sections, 2)]).toBe(sections[0][1])
  })

  it('should return first element of section 2 for index 5', () => {
    expect(items[virtualIndexToItemIndex(sections, 5)]).toBe(sections[1][0])
  })

  it('should return second element of section 2 for index 7', () => {
    expect(items[virtualIndexToItemIndex(sections, 7)]).toBe(sections[1][1])
  })

  it('should return first element of section 3 for index 10', () => {
    expect(items[virtualIndexToItemIndex(sections, 10)]).toBe(sections[2][0])
  })

  it('should return second element of section 3 for index 12', () => {
    expect(items[virtualIndexToItemIndex(sections, 12)]).toBe(sections[2][1])
  })

  it('should return last element of section 3 for index 14', () => {
    expect(items[virtualIndexToItemIndex(sections, 14)]).toBe(sections[2][3])
  })

  it('should return last element for any index that is too high', () => {
    expect(items[virtualIndexToItemIndex(sections, 27)]).toBe(sections[2][3])
  })

  const items2 = [...sections[0], ...[], ...sections[2]]

  it('should return first element for index 0', () => {
    expect(items2[virtualIndexToItemIndex(sections, 0)]).toBe(sections[0][0])
  })

  it('should return first element for index 1', () => {
    expect(items2[virtualIndexToItemIndex(sections, 1)]).toBe(sections[0][0])
  })
})
