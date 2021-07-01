const size : number = 8
const count : number = 8

let solutions : number[][] = []

const isNewSolution = (array : number[]) : boolean => {
  if(solutions === []) return true
  return solutions.every(sol => {
    const set = new Set(sol)
    array.forEach(e => set.add(e))
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

const func = async(area : boolean[][], queens: number[]) : Promise<void> => {
  for(let row = 0; row < size; row++){
    for(let colum = 0; colum < size; colum++){
      if(area[row][colum] === false){   

        const newArea = setQueen(row, colum, area)
        const newQueens = [...queens]
        newQueens.push(row*size + colum)

        if(newQueens.length === size && isNewSolution(newQueens)){
          solutions.push(newQueens)
        }

        if(!isFill(newArea))
          func(newArea, newQueens)

        if(newQueens[0] === size){
          return
        }

      }
    }
  }
}

const render = (area : boolean[][]) => {
  block.innerHTML=''
  area.forEach(row => {
    const r = document.createElement('div')
    row.forEach(e => {
      const element = document.createElement('div')
      element.className = 'field '+ e? 'fill' : 'empty'
      r.appendChild(element)
    })
    r.className = 'r'
    block.appendChild(r)
  })
}

let start = document.getElementById("start-btn")
let block = document.getElementById("main")
let list = document.getElementById("solution-list")
let result = document.getElementById("result")

start.addEventListener('click', async() => {
  await start.setAttribute('disabled', 'true')
  await func(new Array(size).fill(null).map(() => new Array(size).fill(false)), [])
  start.removeAttribute('disabled')
  result.innerText = 'Result : ' + solutions.length
})

// render(new Array(size).fill(null).map(() => new Array(size).fill(0)))