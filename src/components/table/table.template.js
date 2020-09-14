const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, index) {
  return `
    <div class="cell" contenteditable data-col='${index}'></div>
  `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type='resizable' data-col='${index}'>
      ${col}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}

function createRow(index, content) {
  const resizer = `<div class='row-resize' data-resize='row'></div>`
  const resizable = `data-type='resizable'`
  return `
    <div class='row' ${index ? resizable : ''} data-row='${index - 1}'>
      <div class='row-info'>
        ${index ? index : ''}
        ${index ? resizer : ''}
      </div>
      <div class='row-data'>${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}