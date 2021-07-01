var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const size = 8;
const count = 8;
let solutions = [];
const isNewSolution = (array) => {
    if (solutions === [])
        return true;
    return solutions.every(sol => {
        const set = new Set(sol);
        array.forEach(e => set.add(e));
        return set.size !== sol.length;
    });
};
const isFill = (area) => {
    return area.every(row => row.every(e => e));
};
const setQueen = (row, colum, area) => {
    const newArea = [...area.map(row => [...row])];
    if (!newArea[row][colum]) {
        newArea[row] = new Array(size).fill(true);
        newArea.forEach(row => row[colum] = true);
        for (let i = 0; i < size; i++) {
            newArea[i][colum - row + i] = true;
            newArea[i][colum + row - i] = true;
        }
    }
    return newArea.map((row, i) => newArea[i] = row.slice(0, 8));
};
const func = (area, queens) => __awaiter(this, void 0, void 0, function* () {
    for (let row = 0; row < size; row++) {
        for (let colum = 0; colum < size; colum++) {
            if (area[row][colum] === false) {
                const newArea = setQueen(row, colum, area);
                const newQueens = [...queens];
                newQueens.push(row * size + colum);
                if (newQueens.length === size && isNewSolution(newQueens)) {
                    solutions.push(newQueens);
                }
                if (!isFill(newArea))
                    func(newArea, newQueens);
                if (newQueens[0] === size) {
                    return;
                }
            }
        }
    }
});
const render = (area) => {
    block.innerHTML = '';
    area.forEach(row => {
        const r = document.createElement('div');
        row.forEach(e => {
            const element = document.createElement('div');
            element.className = 'field ' + e ? 'fill' : 'empty';
            r.appendChild(element);
        });
        r.className = 'r';
        block.appendChild(r);
    });
};
let start = document.getElementById("start-btn");
let block = document.getElementById("main");
let list = document.getElementById("solution-list");
let result = document.getElementById("result");
start.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    yield start.setAttribute('disabled', 'true');
    yield func(new Array(size).fill(null).map(() => new Array(size).fill(false)), []);
    start.removeAttribute('disabled');
    result.innerText = 'Result : ' + solutions.length;
}));
