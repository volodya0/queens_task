const size : number = 8
const count : number = 8

let solutions : number[][] = []

const isNewSolution = (positions : number[]) : boolean => {
  if(solutions === []) return true
  return solutions.every(sol => {
    const set = new Set(sol)
    positions.forEach(e => set.add(e))
    return set.size !== sol.length
  })
}

const isFill = (area : boolean[][]) : boolean => {
  return area.every(row => row.every(e => e))
} 

const setQueen = (row : number, colum : number, area : boolean [][]) : boolean[][] => {
  const newArea = [...area.map(row => [...row])]
  if(!newArea[row][colum]){
    newArea[row] = new Array(size).fill(true)
    newArea.forEach(row => row[colum] = true)
      for(let i = 0; i < size; i++){
        newArea[i][colum - row + i] = true
        newArea[i][colum + row - i] = true
      }
  }
  return newArea.map((row, i) => newArea[i] = row.slice(0,8))
} 

const func = (area: boolean[][], positions: number[] = []) : void => {
  for(let row : number = 0; row < size; row++){
    for(let colum : number = 0; colum < size; colum++){

      if(area[row][colum] === false){   

        const newArea = setQueen(row, colum, area)
        const newPositions = [...positions, row*size + colum]

        if(newPositions.length === size && isNewSolution(newPositions)){
          solutions.push(newPositions)
        }

        if(!isFill(newArea))
          func(newArea, newPositions)

        if(newPositions[0] === size){
          return
        }
        
      }
    }
  }
}





let start = document.getElementById("start-btn")
let result = document.getElementById("result")

// let desk = document.getElementById("desk")
// let list = document.getElementById("list")

start.addEventListener('click', () => {

  func(new Array(size).fill(null).map(() => new Array(size).fill(false)))
  
  result.innerText = 'Result : ' + solutions.length


  // solutions.forEach((sol, i) => {
  //   const element = document.createElement('p')
  //   element.innerText = i + 1 + '. ' + sol.reduce((acc, num) => acc += `[${Math.floor(num/size)}, ${num%size}] `, '')
  //   element.addEventListener('click', render.bind(null, sol))
  //   list.appendChild(element)
  // })

  // render(solutions[0])

})

// const render = (positions : number[]) : void => {

//   desk.innerHTML=''
//   const area = new Array(size).fill(null).map(() => new Array(size).fill(false))
//   positions.forEach(num => area[Math.floor(num/size)][num%size] = true);

//   area.forEach((row, rowIndex) => {
//     const r = document.createElement('div')
//     row.forEach((e, columIndex) => {
//       const element = document.createElement('div')
//       let cls
//       if(e) cls = 'queen'
//       else cls = ((rowIndex + columIndex) % 2 === 0)? 'black' : 'white'
//       element.className = cls
//       r.appendChild(element)
//     })
//     r.className = 'r'
//     desk.appendChild(r)
//   })

// }
