const add = document.querySelector('#addbtn')
const input = document.querySelector('#input')
const todolist = document.querySelector('.todo-container')

let editTodo = null

function updateEmpty() {
    const emptyMsg =  document.querySelector('#empty')
    emptyMsg.style.display = todolist.children.length === 0 ? "block" : "none";
}

function saveTodos(){
    const todos = []
    todolist.querySelectorAll('.todo span').forEach(todo=>{
        todos.push(todo.innerText)
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todoText => {
        createTodo(todoText);
    });
    updateEmpty();
}

function createTodo(value){
    const todo = document.createElement('div')
    todo.classList.add("todo");

    const span = document.createElement('span')
    span.innerText = value

    const btns = document.createElement('div')
    btns.classList.add("btns")

    const del = document.createElement('button');
    del.innerText = 'Delete';
    del.classList.add('delete')

    const edit = document.createElement('button');
    edit.innerText = 'Edit';
    edit.classList.add('edit')

    
    del.addEventListener('click', () => {
        todolist.removeChild(todo);
        saveTodos();
        updateEmpty();
        if(editTodo==span){
            input.value = ''
            editTodo = null
            add.textContent = 'Add'
            add.style.backgroundColor = '#1d9929';
        }
    });

    edit.addEventListener('click', ()=>{
        input.value = span.innerText;
        editTodo = span;
        add.textContent = 'edit'
        add.style.backgroundColor = '#d1a909ff';
    })
        
    btns.append(edit, del)
    todo.append(span, btns)
    todolist.prepend(todo)
}

add.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

    if(editTodo){
        editTodo.innerText = value;
        editTodo = null;
        add.textContent = 'Add';
        add.style.backgroundColor = '';
    }
    else{
        createTodo(value)
    }
    saveTodos()
    input.value = '';
    updateEmpty();
});

loadTodos();