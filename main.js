class Todo {
	constructor (text, isComplete = false){
		this.text = text;
		this.isComplete = isComplete;
	}
	toggleComplete() {
		this.isComplete = !this.isComplete;
	}
}


class TodoList {
	constructor(todos = []){
		this.todos = todos;
	}

	add(text) {
		var todo = new Todo(text);
		this.todos.push(todo);

		return todo;
	}

	remove(todo) {
		const index = this.todos.indexOf(todo);
		if (index >= 0) {
			this.todos.splice(index,1);
		}

		return index;
	}
}

class TodoView {
	constructor(todo, { onRemove = null } = {}) {
		this.todo = todo;
		this.onRemove = onRemove;
	}

	_build() {
		const $el = document.createElement('li');
		$el.ondblclick = this.showEditor.bind(this);

		this.$text = document.createElement('span');
		this.$text.textContent = this.todo.text;

		this.$closeBtn = document.createElement('span');
		this.$closeBtn.textContent = "✘";
		this.$closeBtn.className = "close";
		this.$closeBtn.onclick = this._onRemove.bind(this);

		$el.appendChild(this.$text);
		$el.appendChild(this.$closeBtn);

		this.$el = $el;
	}

	_onRemove() {
		if(this.onRemove) {
			 this.onRemove(this.todo);
		}
	}

	build() {
		if (!this.$el) {
			this._build();
		}

		return this.$el
	}

	setText(newText) {
		this.todo.text = newText;
		this.$text.textContent = newText;
	} 

	_onFormSubmit(e) {
		e.preventDefault();

		const $input =  e.target[0];
		const value = $input.value.trim();
		if (value.length) {
			this.setText(value);
			this.hideEditor();
		}
	}

	_buildEditor() {
		const $form = document.createElement('form');
		const $input = document.createElement('input');
		$input.value = this.todo.text;
		$form.onsubmit = this._onFormSubmit.bind(this);
		$form.hidden = true; // by default form is hidden 
		$form.appendChild($input);

		return $form;
	}

 	showEditor() {
		if (!this.$form) {
			 this.$form = this._buildEditor();
			 this.$el.appendChild(this.$form);
		}

		this.$text.hidden = true;
		this.$closeBtn.hidden = true;
		this.$form.hidden = false;
	}

	hideEditor() {
		this.$text.hidden = false;
		this.$closeBtn.hidden = false;
		this.$form.hidden = true;
	}
}

class TodoListView {
	constructor(todoList) {
		this.todoList = todoList;
		this.$textInput = document.getElementById("todoInput");
		this.$list = document.getElementById("myUL");
		this.$form = document.getElementById('todo-form');
		this.$form.onsubmit = this.createTodo.bind(this);

		this.$todos = [];
	}

	createTodo(e) {
		e.preventDefault();

		const text = this.$textInput.value.trim();

		if (text.length) {
			const todo = this.todoList.add(text);
			this._createNewElement(todo);

			this.$textInput.value = '';
		}
	}

	_createNewElement(todo) {
		const todoView = new TodoView(todo);
		todoView.onRemove =  this._removeElement.bind(this);
		const $el = todoView.build();

		this.$todos.push($el);
  		this.$list.appendChild($el);
	}

	_removeElement(todo) {
		const index = this.todoList.remove(todo);
		const $els = this.$todos.splice(index, 1);
		this.$list.removeChild($els[0]);
	}
}

const list = new TodoList();
const listView = new TodoListView(list);

window.list = list;