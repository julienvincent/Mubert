import _ from 'lodash'


const format = val => val === undefined ? null : (typeof val === 'function') ? val() : val
export const ifElse = statement => (renderIfTrue, renderIfFalse) => statement ? format(renderIfTrue) : format(renderIfFalse)