const add = document.querySelector('#addbtn')
const input = document.querySelector('#input')
const todolist = document.querySelector('.todo-container')

function updateEmpty() {
    const emptyMsg =  document.querySelector('#empty')
    emptyMsg.style.display = todolist.children.length === 0 ? "block" : "none";
}


add.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

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
        updateEmpty();
    });
        
    btns.append(edit, del)
    todo.append(span, btns)

    input.value = '';
    todolist.prepend(todo)
    updateEmpty();
});

updateEmpty();



