let size : number = 8
let solutions : number[][] = []

const isNewSolution = (positions : number[]) : boolean => {
  return (solutions === []) ? true : solutions.every(sol => JSON.stringify(sol) !== JSON.stringify(positions))
}

const isFreeField = (y : number, x : number, positions : number[]) : boolean => {
  return positions.every((Px, Py) =>  Py !== y && Px !== x && Math.abs(Py - y) !== Math.abs(Px - x))  
}

const func = (positions: number[] = []) : void => {
  for(let row : number = positions.length; row < size; row++){
      for(let colum : number = 0; colum < size; colum++){

        if(isFreeField(row, colum, positions)){   
          
          positions.push(colum)

          if(positions.length === size && isNewSolution(positions)){
            solutions.push([...positions])
          }

          func(positions)

          positions.pop()

        }

        if(colum === size - 1) return

      }
  }
}

let start : HTMLElement = document.getElementById("start-btn")
let result : HTMLElement = document.getElementById("result")

let desk : HTMLElement = document.getElementById("desk")
let list : HTMLElement = document.getElementById("list")
let input : HTMLInputElement | HTMLElement = document.getElementById("input")
list.style.display = 'none'

start.addEventListener('click', () => {

  solutions = []
  desk.innerHTML=''
  list.innerHTML=''
  list.style.display = 'none'
  result.style.display = 'none'

  if('value' in input && +input.value > 0 ) size = + input.value
  else return
  
  const startTime = performance.now()
  func()
  
  result.style.display = 'block'
  result.innerText = 'Result : ' + solutions.length + ' Time : ' + (performance.now() - startTime)

  solutions.forEach((sol, i) => {
    const element = document.createElement('p')
    element.innerText = i + 1 + '. ' + sol.reduce((acc, colum, row) => acc += `[${row}, ${colum}] `, '')
    element.addEventListener('click', render.bind(null, sol))
    list.appendChild(element)
  })

  if(solutions.length){
    render(solutions[0])
    list.style.display = 'block'
  }
  else{
    list.style.display = 'none'
  }

})

const render = (positions : number[]) : void => {

  desk.innerHTML=''
  
  const area = new Array(size).fill(null).map(() => new Array(size).fill(false))
  positions.forEach((colum, row) => area[row][colum] = true);

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
