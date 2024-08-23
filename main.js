document.title = 'TO-DO';

document.getElementById('submit').disabled = true; // by default

document.getElementById('input').onkeyup = () => {

  let displayValue = document.getElementById('input').value.length;
  let clickBtn = document.getElementById('submit');

  if (displayValue > 0) {
    clickBtn.disabled = false;
  } else {
    clickBtn.disabled = true;
  }
}

document.querySelector('form').onsubmit = () => {

  const task = document.getElementById('input').value.toUpperCase();
  const markBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const li = document.createElement('li');

  markBtn.id = 'markBtn';
  deleteBtn.id = 'deleteBtn';

  li.innerHTML = task;
  li.id = 'li';

  li.appendChild(markBtn);

  markBtn.addEventListener('click', function() {
    if (li.style.textDecoration === 'line-through') {
      li.style.textDecoration = 'none';
      li.style.color = '#11111b';
      li.classList.remove('new-content');
    } else {
      li.style.textDecoration = 'line-through';
      li.style.color = '#7f849c';
      li.classList.add('new-content');
    }

    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const index = todoList.indexOf(task);
    todoList[index] = li.innerHTML;
    localStorage.setItem('todoList', JSON.stringify(todoList));
  });

  document.getElementById('ul').append(li);

  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function() {
    const removeLi = this.parentNode;
    removeLi.remove();

    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const index = todoList.indexOf(task);
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  })

  const todoList = [];
  if (localStorage.getItem('todoList')) {
    todoList.push(...JSON.parse(localStorage.getItem('todoList')));
  }
  todoList.push(task);
  localStorage.setItem('todoList', JSON.stringify(todoList));

  document.getElementById('input').value = '';
  document.getElementById('submit').disabled = true;

  return false;
}

const todoList = localStorage.getItem('todoList');
if (todoList) {
  const tasks = JSON.parse(todoList);
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = task;
    li.id = 'li';

    const markBtn = document.createElement('button');
    markBtn.id = 'markBtn';
    li.appendChild(markBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteBtn';
    li.appendChild(deleteBtn);

    markBtn.addEventListener('click', function() {
      if (li.style.textDecoration === 'line-through') {
        li.style.textDecoration = 'none';
        li.style.color = '#11111b';
        li.classList.remove('new-content');
      } else {
        li.style.textDecoration = 'line-through';
        li.style.color = '#7f849c';
        li.classList.add('new-content');
      }

      const todoList = JSON.parse(localStorage.getItem('todoList'));
      const index = todoList.indexOf(task);
      todoList[index] = li.innerHTML;
      localStorage.setItem('todoList', JSON.stringify(todoList));
    });

    deleteBtn.addEventListener('click', function() {
      const removeLi = this.parentNode;
      removeLi.remove();

      const todoList = JSON.parse(localStorage.getItem('todoList'));
      const index = todoList.indexOf(task);
      todoList.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    })

    document.getElementById('ul').append(li);
  });
}