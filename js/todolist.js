

// select elements
const clear = document.querySelector('.clear')
const date = document.getElementById('date')

const list = document.getElementById('list')
const input = document.getElementById('input')

// classese names
const UNCHECK = 'fa-circle-thin'
const CHECK = 'fa-check-circle'
const LINE_THROUGH = 'lineThrough'

// variable
let LIST, id
// LIST
const data = localStorage.getItem('todo')

if (data) {
  LIST = JSON.parse(data)
  id = LIST.length
  loadList(LIST)
} else {
  LIST = []
  id = 0
}

// load items to the user's interface when user refresh
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

// add a to do
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return
  }
  const DONE = done ? CHECK : UNCHECK
  const lineAcross = done ? LINE_THROUGH : ''
  const position = 'beforeend'
  const text = `<li class='item'>
      <i class='fa ${DONE} co' job='complete' id='${id}'></i>
      <p class='text ${lineAcross}'>${toDo}</p>
      <i class='fa fa-trash-o de' job='delete' id='${id}'></i>
    </li>`
  list.insertAdjacentHTML(position, text)
}

document.addEventListener('keyup', function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value
    if (toDo) {
      addToDo(toDo, id, false, false)
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      })
      localStorage.setItem('todo', JSON.stringify(LIST))
      id++
    }
    input.value = ''
  }
})

// complete todo
function completeToDo(element) {
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.nextElementSibling.classList.toggle(LINE_THROUGH)
  LIST[element.id].done = LIST[element.id].done ? false : true
}

// delete todo
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].trash = true
}
// toggle
list.addEventListener('click', function (event) {
  const element = event.target
  const elementJob = element.attributes.job.value
  // complete or delete

  if (elementJob == 'complete') {
    completeToDo(element)
  } else if (elementJob == 'delete') {
    removeToDo(element)
  }
  localStorage.setItem('todo', JSON.stringify(LIST))
})
// clear data
clear.addEventListener('click', function () {
  localStorage.clear()
  location.reload()
})

// date
const options = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
}

const today = new Date()

date.innerHTML = today.toLocaleDateString('en-US', options)
