const size = 8;
const count = 8;
let solutions = [];
const isNewSolution = (positions) => {
    if (solutions === [])
        return true;
    return solutions.every(sol => {
        const set = new Set(sol);
        positions.forEach(e => set.add(e));
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
const func = (area, positions = []) => {
    for (let row = 0; row < size; row++) {
        for (let colum = 0; colum < size; colum++) {
            if (area[row][colum] === false) {
                const newArea = setQueen(row, colum, area);
                const newPositions = [...positions, row * size + colum];
                if (newPositions.length === size && isNewSolution(newPositions)) {
                    solutions.push(newPositions);
                }
                if (!isFill(newArea))
                    func(newArea, newPositions);
                if (newPositions[0] === size) {
                    return;
                }
            }
        }
    }
};
let start = document.getElementById("start-btn");
let result = document.getElementById("result");
start.addEventListener('click', () => {
    func(new Array(size).fill(null).map(() => new Array(size).fill(false)));
    result.innerText = 'Result : ' + solutions.length;
});
