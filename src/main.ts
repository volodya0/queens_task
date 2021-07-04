let size : number = 8
let half : number = 4
let solutionsCount : number = 0
let solutionsCountTemp : number = 0
let solutions : number[][] = []
let showSolutions : boolean = true

const isFreeField = (y : number, x : number, positions : number[]) : boolean => {
  return positions.every((Px, Py) =>  Py !== y && Px !== x && Math.abs(Py - y) !== Math.abs(Px - x))  
}

const func = (positions: number[] = [], deep: number = 0) : void => {
  deep++ 
  for(let row : number = deep - 1; row < size; row++){
      for(let colum : number = 0; colum < size; colum++){

        if(isFreeField(row, colum, positions)){   

          if(deep === size){
            solutionsCount++
          }else{
            positions.push(colum)
            func(positions, deep)
            positions.pop()
          }
        }
        
        if(colum + 1 === size) return
        if(deep === 1 && colum + 1 === half)return
        if(size % 2 !== 0 && deep === 1 && colum + 2 === half) solutionsCountTemp = solutionsCount
      }
  }
}

const funcWithSolutions = (positions: number[] = [], deep: number = 0) : void => {
  deep++
  for(let row : number = deep - 1; row < size; row++){
      for(let colum : number = 0; colum < size; colum++){

        if(isFreeField(row, colum, positions)){   

          if(deep === size){
            solutions.push([...positions, colum])
          }else{
            positions.push(colum)
            funcWithSolutions(positions, deep)
            positions.pop()
          }
        }
        
        if(colum + 1 === size) return
      }
  }
}

let start : HTMLElement = document.getElementById("start-btn")
let result : HTMLElement = document.getElementById("result")

let desk : HTMLElement = document.getElementById("desk")
let list : HTMLElement = document.getElementById("list")
let input : HTMLInputElement | HTMLElement = document.getElementById("input")
let checkbox : HTMLInputElement | HTMLElement = document.getElementById("show-solutions")
list.style.display = 'none'

start.addEventListener('click', () => {

  solutions = []
  solutionsCount = 0
  desk.innerHTML=''
  list.innerHTML=''
  list.style.display = 'none'
  result.style.display = 'none'

  if('value' in input && +input.value > 0 ) size = + input.value
  else return

  const startTime = performance.now()

  if('checked' in checkbox && checkbox.checked){

    funcWithSolutions()
    solutionsCount = solutions.length

  }else{

    showSolutions = true
    half = Math.ceil(size/2)
    func()
    solutionsCount += (size % 2 === 0)? solutionsCount : solutionsCountTemp
  }
  
  const time = performance.now() - startTime

  result.style.display = 'block'
  result.innerText = 'Result : ' + solutionsCount + ' Time : ' + (time).toFixed(3) + ' milliseconds'

  if(showSolutions){  
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