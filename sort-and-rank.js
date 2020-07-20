'use strict'

const isNumber = (value) => typeof value === 'number'

const SORT_DIR_OPTS = {
  asc: (a, b) => b + a,
  desc: (a, b) => b - a
}

const ERROR_EMPTY_ARRAY = 'Array can not be empty'
const ERROR_VALUE_TYPE = 'Object properties must be of type number'
const ERROR_SORT_OPT = 'Unsupported sort direction'
const ERROR_INCORRECT_SORT_KEY = 'Sort key does not exist on object'

const sortAndRank = (
  arr1,
  arr2,
  limit = 4,
  sortKey = 'rank',
  sortDirection = 'desc',
) => {

  if (!arr1.length || !arr2.length) {
    throw new Error(ERROR_EMPTY_ARRAY)
  }

  if (!Object.keys(arr1[0]).includes(sortKey)) {
    throw new Error(ERROR_INCORRECT_SORT_KEY)
  }

  if (!SORT_DIR_OPTS.hasOwnProperty(sortDirection)) {
    throw new Error(ERROR_SORT_OPT)
  }

  const results = [...arr1, ...arr2].reduce((acc, currentObj) => {
    if (!isNumber(currentObj.id) || !isNumber(currentObj.rank)) {
      throw new Error(ERROR_VALUE_TYPE)
    }

    acc[currentObj.id] = currentObj
    return acc
  }, {})

  return Object.keys(results)
    .map(key => results[key])
    .sort((a, b) => SORT_DIR_OPTS[sortDirection](a[sortKey], b[sortKey]))
    .slice(0, limit)
}

module.exports = sortAndRank

