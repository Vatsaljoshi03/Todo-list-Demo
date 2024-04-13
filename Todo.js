let todos = [];

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        todos.push({
            text: todoText,
            completed: false
        });
        displayTodos();
        todoInput.value = "";
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    displayTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    displayTodos();
}

function editTodo(index) {
    const todoList = document.getElementById("todoList");
    const li = todoList.childNodes[index];
    
    const span = li.querySelector('span');
    const editInput = document.createElement("input");
    editInput.className = "editbutton"
    editInput.type = "text";
    editInput.value = span.textContent;
    
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "savebutton"
    saveButton.onclick = function() {
        const newTodo = editInput.value.trim();
        
        if (newTodo !== "") {
            todos[index].text = newTodo;
            displayTodos();
        }
    };

    // Clear the current content of the li and append new elements
    li.innerHTML = "";
    li.appendChild(editInput);
    li.appendChild(saveButton);
}

// ...existing code...

function searchTodos() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.toLowerCase();

    const filteredTodos = todos.filter(todo => {
        return todo.text.toLowerCase().includes(query);
    });

    const searchMessage = document.getElementById("searchMessage");

    if (filteredTodos.length === 0 && query !== "") {
        searchMessage.style.display = "block"; // Show the message
    } else {
        searchMessage.style.display = "none"; // Hide the message
    }

    displayFilteredTodos(filteredTodos);
}

function displayFilteredTodos(filteredTodos) {
    const todoList = document.getElementById("todoList");
    const searchMessage = document.getElementById("searchMessage");

    todoList.innerHTML = "";

    if (filteredTodos.length === 0) {
        searchMessage.style.display = "block"; // Show the message
        return; // Exit function if no todos match the search query
    } else {
        searchMessage.style.display = "none"; // Hide the message
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        
        // Highlight matching text
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const regex = new RegExp(searchTerm, 'gi');
        const highlightedText = todo.text.replace(regex, (match) => `<span class="match">${match}</span>`);
        
        li.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${index})" ${todo.completed ? 'checked' : ''}>
            <span ${todo.completed ? 'class="completed"' : ''}>${highlightedText}</span>
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}




function displayTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${index})" ${todo.completed ? 'checked' : ''}>
            <span ${todo.completed ? 'class="completed"' : ''}>${todo.text}</span>
            <button class="editButton" onclick="editTodo(${index})">Edit</button>
            <button class="deleteButton" onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

displayTodos();
