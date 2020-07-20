const sortAndRank = require('./sort-and-rank')

const ArrayA = [
  { id: 1, rank: 1 },
  { id: 2, rank: 3 },
  { id: 3, rank: 5 },
  { id: 4, rank: 6 },
  { id: 5, rank: 9 }
]

const ArrayB = [
  { id: 2, rank: 2 },
  { id: 4, rank: 7 },
  { id: 6, rank: 4 },
  { id: 7, rank: 8 },
  { id: 8, rank: 10 }
]

describe('func: sortAndRank', () => {
  it('fails when first or second array arg is empty', () => {
    expect(() => sortAndRank([{ id: 1, rank: 1 }], [])).toThrow(
      'Array can not be empty'
    )
    expect(() => sortAndRank([], [{ id: 1, rank: 1 }])).toThrow(
      'Array can not be empty'
    )
  })

  it('fails when sortKey is not a valid propery of an object', () => {
    expect(() =>
      sortAndRank([{ id: 1, rank: 1 }], [{ id: 2, rank: 2 }], 4, 'someKey')
    ).toThrow('Sort key does not exist on object')
  })

  it('fails when sortDirection is invalid', () => {
    expect(() =>
      sortAndRank(
        [{ id: 1, rank: 1 }],
        [{ id: 2, rank: 2 }],
        4,
        'rank',
        'ascending'
      )
    ).toThrow('Unsupported sort direction')
  })

  it("fails when property's value is not a number", () => {
    expect(() =>
      sortAndRank([{ id: 1, rank: '1' }], [{ id: 2, rank: 2 }])
    ).toThrow('Object properties must be of type number')
  })

  it('limits result set to first 4 then 6 objects', () => {
    expect(sortAndRank(ArrayA, ArrayB).length).toEqual(4)
    expect(expect(sortAndRank(ArrayA, ArrayB, 6).length).toEqual(6))
  })

  it('sorts by sortKey: (default: rank) in ascending order', () => {
    const id = sortAndRank(ArrayA, ArrayB, undefined, undefined, 'asc').map(
      obj => obj.id
    )
    const rank = sortAndRank(ArrayA, ArrayB, undefined, undefined, 'asc').map(
      obj => obj.rank
    )

    expect(id).toEqual([1,2,3,4])
    expect(rank).toEqual([1,2,5,7])
  })

  it('sorts by sortKey: (default: rank) in descending order', () => {
    const id = sortAndRank(ArrayA, ArrayB).map(obj => obj.id)
    const rank = sortAndRank(ArrayA, ArrayB).map(obj => obj.rank)

    expect(id).toEqual([8, 5, 7, 4])
    expect(rank).toEqual([10, 9, 8, 7])
  })

  it('combines, sorts, and limits a single array', () => {
    expect(sortAndRank(ArrayA, ArrayB)).toEqual([
      { id: 8, rank: 10 },
      { id: 5, rank: 9 },
      { id: 7, rank: 8 },
      { id: 4, rank: 7 }
    ])
  })
})
