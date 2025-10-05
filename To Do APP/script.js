const add = document.querySelector('#addbtn')
const input = document.querySelector('#input')
const todolist = document.querySelector('.todo-container')
const filterbtns = document.querySelectorAll('.filters a')
const deleteCompletebtn = document.querySelector('.deleteall')

let editTodo = null
let filter = 'All';

function updateEmpty() {
    const emptyMsg = document.querySelector('#empty')
    emptyMsg.style.display = todolist.children.length === 0 ? "block" : "none";
}

function saveTodos() {
    const todos = [];
    todolist.querySelectorAll('.todo').forEach(todoEl => {
        const span = todoEl.querySelector('span');
        const checkbox = todoEl.querySelector('input[type="checkbox"]');
        todos.push({
            title: span.innerText,
            check: checkbox.checked
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos.reverse()));
}

function loadTodos(Currfilter = "All") {
    filter = Currfilter
    todolist.innerHTML = '';

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.reverse().forEach(todoObj => {
        if (filter === 'All') createTodo(todoObj.title, todoObj.check);
        else if (filter === 'Completed' && todoObj.check) createTodo(todoObj.title, todoObj.check);
        else if (filter === 'Pending' && !todoObj.check) createTodo(todoObj.title, todoObj.check);
    });
    updateEmpty();
}

function createTodo(value, check = false) {
    const todo = document.createElement('div')
    todo.classList.add("todo");

    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.checked = check;
    checkbox.classList.add("check")

    const span = document.createElement('span')
    span.innerText = value
    if (check) span.classList.add("completed");

    const btns = document.createElement('div')
    btns.classList.add("btns")

    const del = document.createElement('button');
    del.innerText = 'Delete';
    del.classList.add('delete')

    const edit = document.createElement('button');
    edit.innerText = 'Edit';
    edit.classList.add('edit')

    checkbox.addEventListener('change', () => {
        span.classList.toggle("completed", checkbox.checked);
        saveTodos();
        loadTodos(filter);
    })

    del.addEventListener('click', () => {
        todolist.removeChild(todo);
        saveTodos();
        updateEmpty();
        if (editTodo == span) {
            input.value = ''
            editTodo = null
            add.textContent = 'Add'
            add.style.background = 'linear-gradient(135deg, #00c6ff, #0072ff)';
        }
    });

    edit.addEventListener('click', () => {
        input.value = span.innerText;
        editTodo = span;
        add.textContent = 'Edit'
        add.style.background = 'linear-gradient(135deg, #ffb300ff, #fff200ff)';
    })

    const div = document.createElement('div')
    btns.append(edit, del)
    div.append(span, btns)
    todo.append(checkbox, div)
    todolist.appendChild(todo)
}

add.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

    if (editTodo) {
        editTodo.innerText = value;

        editTodo = null;
        add.textContent = 'Add';
        add.style.background = 'linear-gradient(135deg, #00c6ff, #0072ff)';
    }
    else {
        createTodo(value)
    }
    saveTodos()
    input.value = '';
    updateEmpty()
});

filterbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterbtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active')
        loadTodos(btn.textContent);
    })
})

deleteCompletebtn.addEventListener('click', () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updated = todos.filter(t => !t.check);
    localStorage.setItem("todos", JSON.stringify(updated));
    loadTodos(filter);

})

loadTodos();