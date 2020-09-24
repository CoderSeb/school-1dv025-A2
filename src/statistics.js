/**
 * Module for obtaining statistical analysis about a set of data.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// ------------------------------------------------------------------------------
//  Type definitions
// ------------------------------------------------------------------------------

/**
 * Represents statistical summary.
 *
 * @typedef {object} StatisticalSummary
 * @property {number} average - The average value.
 * @property {number} maximum - The maximum value.
 * @property {number} median - The median value.
 * @property {number} minimum - The minimum value.
 * @property {number[]} mode - The mode value.
 * @property {number} range - The range value.
 * @property {number} standardDeviation - The standard deviation value.
 */

// ------------------------------------------------------------------------------
//  Public interface
// ------------------------------------------------------------------------------

/**
 * Passes in an array to check if it's content is valid (consists of only numbers) otherwise it will throw custom error messages.
 *
 * @param {Array} anyArr - the array to be validated.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 */
export const errorHandling = function (anyArr) {
  if (anyArr.constructor !== Array) {
    throw new TypeError('The passed argument is not an array.')
  }
  if (anyArr.length < 1) {
    throw new Error('The passed array contains no elements.')
  }
  if (anyArr.some(isNaN) || anyArr.some(x => (typeof x !== 'number'))) {
    throw new TypeError('The passed array may only contain valid numbers.')
  }
}

/**
 * Returns the average value.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the average value of the parameter.
 */
export const average = function (numbers) {
  errorHandling(numbers)
  const total = numbers.reduce(function (a, b) {
    return a + b
  }, 0)
  const avgValue = total / numbers.length
  return avgValue
}

/**
 * Function to return maximum value.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the maximum value in the parameter.
 */
export const maximum = function (numbers) {
  errorHandling(numbers)
  const maxValue = Math.max(...numbers)

  return maxValue
}

/**
 * Function to return median value.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the median value of the parameter.
 */
export const median = function (numbers) {
  errorHandling(numbers)
  const sorted = numbers.slice(0, numbers.length)
  sorted.sort((a, b) => a - b)
  const middleOf = Math.ceil(sorted.length / 2)

  const medValue = sorted.length % 2 === 0 ? (sorted[middleOf] + sorted[middleOf - 1]) / 2 : sorted[middleOf - 1]
  return medValue
}

/**
 * Returns the minimum value of a set of numbers.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the minimum value of the parameter.
 */
export const minimum = function (numbers) {
  errorHandling(numbers)
  const minValue = Math.min(...numbers)
  return minValue
}

/**
 * Returns the mode value of a set of numbers sorted in a new array.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number[]} as the mode value(s) of the parameter.
 */
export const mode = function (numbers) {
  errorHandling(numbers)
  const frequency = {}
  let maxFrequency = 0
  let modeValues = []

  for (const x in numbers) {
    frequency[numbers[x]] = (frequency[numbers[x]] || 0) + 1
    if (frequency[numbers[x]] > maxFrequency) {
      maxFrequency = frequency[numbers[x]]
    }
  }

  for (const y in frequency) {
    if (frequency[y] === maxFrequency) {
      modeValues.push(y)
    }
  }
  modeValues = modeValues.map(Number)
  modeValues = modeValues.sort((a, b) => a - b)
  console.log(modeValues)
  return modeValues
}

/**
 * Returns the range value of a set of numbers.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the range value of the parameter.
 */
export const range = function (numbers) {
  errorHandling(numbers)
  const rngValue = maximum(numbers) - minimum(numbers)
  return rngValue
}

/**
 * Function to return the standard deviation value of a set of numbers.
 *
 * @param {number[]} numbers - The passed array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {number} as the standard deviation value of the parameter.
 */
export const standardDeviation = function (numbers) {
  errorHandling(numbers)
  const deviationsSquared = numbers.map(function (number) {
    const deviation = number - average(numbers)
    const devSquared = Math.pow(deviation, 2)
    return devSquared
  })
  const avgOfDeviationsSquared = average(deviationsSquared)
  const standardDeviationValue = Math.sqrt(avgOfDeviationsSquared)
  return standardDeviationValue
}

/**
 * Returns several descriptive statistics (average, maximum, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers - The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array may only contain valid numbers.
 * @returns {StatisticalSummary} An object whose properties correspond to the descriptive statistics from the data set.
 */
export function summary (numbers) {
  errorHandling(numbers)
  const StatisticalSummary = {
    average: average(numbers),
    maximum: maximum(numbers),
    median: median(numbers),
    minimum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }
  return StatisticalSummary
}
