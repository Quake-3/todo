class Todo {
	constructor(text, isComplete = false,onChange = null) {
		this.text = text;
		this.isComplete = isComplete;
		this.onChange = onChange;
	}

	toggleComplete() {
		this.isComplete = !this.isComplete;
		if (this.onChange) this.onChange(this);
		return this;
	}

	edit(text) {
		if (text) {
			this.text = text;
			this.onChange && this.onChange(this);
		}

		return this;
	}
}

class TodoList {
	constructor(todos = []) {
		this.todos = todos;
		this.todos.forEach((todo) => {
			todo.onChange = this.save.bind(this);
		})
	}

	add(text) {
		var todo = new Todo(text,false,this.save.bind(this));
		this.todos.push(todo);
		this.save();
		return todo;
	}

	remove(todo) {
		const index = this.todos.indexOf(todo);
		if (index >= 0) {
			this.todos.splice(index, 1);	
		}
		this.save();
		return index;
	}

	save() {
		var todoStr = JSON.stringify(this.todos);
		localStorage.setItem("todos", todoStr);
	}

	static load() {
		var todoStr = localStorage.getItem("todos");
		var todos = JSON.parse(todoStr);
		if(todos !== null) {
		var toDos = todos.map(function (todo) {
			return new Todo(todo.text, todo.isComplete);
		});
		}
		var todoList = new TodoList(toDos);
		return todoList;
	}
}

class TodoView {
	constructor(todo, { onRemove = null } = {}) {
		this.todo = todo;
		this.onRemove = onRemove;
	}

	_build() {
		const $el = document.createElement('li');
		$el.style.opacity = 0;
		$el.ondblclick = this.showEditor.bind(this);

		this.$text = document.createElement('span');
		this.$text.textContent = this.todo.text;

		this.$closeBtn = document.createElement('span');
		this.$closeBtn.textContent = "✘";
		this.$closeBtn.className = "closeB";
		this.$closeBtn.onclick = this._onRemove.bind(this);


		this.$checkBtn = document.createElement('input');
		this.$checkBtn.type = "checkbox";
		this.$checkBtn.className = "checkboxBtn";
		this.$checkBtn.onchange = this._onToggle.bind(this);
		this.$checkBtn.checked = this.todo.isComplete;

		this._setTextStyle();

		$el.appendChild(this.$checkBtn);
		$el.appendChild(this.$text);
		$el.appendChild(this.$closeBtn);
		$el.style.opacity = 1;

		this.$el = $el; 
	}

	_setTextStyle() {
		if (this.todo.isComplete) {
			this.$text.style.textDecoration = 'line-through';
			this.$text.style.color = '#ccc';
		} else {
			this.$text.style.textDecoration = 'none';
			this.$text.style.color = '#fff';
		}
	}

	_onToggle() {
		this.todo.toggleComplete();
		this._setTextStyle();
	}

	_onRemove() {
		if (this.onRemove) {
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
		this.$text.textContent = newText;
		this.todo.edit(newText);
	}

	_onFormSubmit(e) {
		e.preventDefault();
		const $input = e.target[0];
		const value = $input.value.trim();
		if (value.length) {
			this.setText(value);
			this.hideEditor();
		}
	}

	_buildEditor() {
		const $form = document.createElement('form');
		$form.className = 'editor';
		const $input = document.createElement('input');
		$input.value = this.todo.text;
		$input.maxLength = 35;
		$input.className = "editInput"
		$form.onsubmit = this._onFormSubmit.bind(this);
		$form.hidden = true; // по-умолчанию форма скрыта
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
		this.$form.style.display = 'inline';
	}

	hideEditor() {
		this.$text.hidden = false;
		this.$closeBtn.hidden = false;
		this.$form.hidden = true;
		this.$form.style.display = 'none';
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
		this.todoList.todos.forEach(todo => this._createNewElement(todo));
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
		todoView.onRemove = this._removeElement.bind(this);
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

const list = TodoList.load();
new TodoListView(list);

window.onload = document.getElementById('todoInput').focus();