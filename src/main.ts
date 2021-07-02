const size : number = 8
const count : number = 8

let solutions : number[][] = []

const isNewSolution = (positions : number[]) : boolean => {
  return (solutions === []) ? true : solutions.every(sol => {
    const set = new Set(sol)
    positions.forEach(e => set.add(e))
    return set.size !== sol.length
  })
}

const isFreeField = (y : number, x : number, positions : number[]) : boolean => {
  return positions.every(num => {
    const Py = Math.floor(num / size)
    const Px = num % size
    return Py !== y && Px !== x && Math.abs(Py - y) !== Math.abs(Px - x)
  })
}


const func = (positions: number[] = []) : void => {
  for(let row : number = 0; row < size; row++){
    if(positions.every(num => Math.floor(num / size) !== row))
      for(let colum : number = 0; colum < size; colum++){

        if(isFreeField(row, colum, positions)){   

          const positionsBackup = [...positions]

          positions.push(row*size+colum)

          if(positions.length === size && isNewSolution(positions)){
            solutions.push(positions)
            console.log('solutions.length :>> ', solutions.length);
          }

          func(positions)

          if(positions[0] === size){
            return
          }

          positions = positionsBackup

        }
      }
  }
}





let start = document.getElementById("start-btn")
let result = document.getElementById("result")

let desk = document.getElementById("desk")
let list = document.getElementById("list")

start.addEventListener('click', () => {

  func()
  
  result.innerText = 'Result : ' + solutions.length


  solutions.forEach((sol, i) => {
    const element = document.createElement('p')
    element.innerText = i + 1 + '. ' + sol.reduce((acc, num) => acc += `[${Math.floor(num/size)}, ${num%size}] `, '')
    element.addEventListener('click', render.bind(null, sol))
    list.appendChild(element)
  })

  render(solutions[0])

})

const render = (positions : number[]) : void => {

  desk.innerHTML=''
  const area = new Array(size).fill(null).map(() => new Array(size).fill(false))
  positions.forEach(num => area[Math.floor(num/size)][num%size] = true);

  area.forEach((row, rowIndex) => {
    const r = document.createElement('div')
    row.forEach((e, columIndex) => {
      const element = document.createElement('div')
      let cls
      if(e) cls = 'queen'
      else cls = ((rowIndex + columIndex) % 2 === 0)? 'black' : 'white'
      element.className = cls
      r.appendChild(element)
    })
    r.className = 'r'
    desk.appendChild(r)
  })

}
