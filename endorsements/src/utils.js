export const transpose = function(outerlist) {
  let array = [];
  outerlist.forEach((d,i) => {
    d.forEach((e, j) => {
      if (typeof array[j] === 'undefined') {
        array[j] = []
      }
      array[j].push(e)
    })
  })
  return array
}
