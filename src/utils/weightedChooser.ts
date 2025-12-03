export const weightedChooser = (weights: number[]) => {
  console.log(weights)
  const total = weights.reduce((a, b) => a + b)
  const random = Math.random() * total
  console.log(total, random)
  let currentFill = 0
  for (let i = 0; i < weights.length; i++) {
    currentFill += weights[i]
    if (random <= currentFill) {
      return i
    }
  }
  throw new Error()
}
