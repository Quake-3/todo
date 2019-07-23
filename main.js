/**
 * 
 *	Todo - класс, отвечающий за создание внутри todo: текста, обозначения, что задача выполнена и изменения в todo.
 * 
*/

;class Todo {

/**
 * 
 *	constructor - метод, который инициализирует объекты, созданные в классе Todo.
 * 
*/

	constructor(text, isComplete = false,onChange = null) {
		this.text = text;
		this.isComplete = isComplete;
		this.onChange = onChange;
	}

/**
 * 
 * toggleComplete -  метод, меняет значение isComplete на обратное и если текст был изменен, то в onChange передается Todo.
 * 
 */

		toggleComplete() {
		this.isComplete = !this.isComplete;
		if (this.onChange) this.onChange(this);
		return this;
	}

/**
 * 
 * edit - метод, при котором если текст, переданный в edit не пустая строка - текст в Todo равен тексту, переданному в edit.
 * 
 */

	edit(text) {
		if (text) {
			this.text = text;
			this.onChange && this.onChange(this);
		}

		return this;
	}
}

/**
 * 
 * TodoList - класс, отвечающий за создание массива из todo, добавление в todo текста, удаление todo, сохранение изменений в todo и загрузку элементов из массива todos.
 * 
 */

class TodoList {
	constructor(todos = []) {
		this.todos = todos;
		this.todos.forEach((todo) => {
			todo.onChange = this.save.bind(this);
		})
	}

/**
 * 
 * add - метод, отвечающий за создание todo, добавление текущего todo в массив todos и вызов метода save.
 * 
 */

	add(text) {
		var todo = new Todo(text,false,this.save.bind(this));
		this.todos.push(todo);
		this.save();
		return todo;
	}

/**
 * 
 * remove - метод, отвечающий за удаление todo из массива todos по индексу и вызов метода save для сохранения изменений в массиве.
 * 
 */

	remove(todo) {
		const index = this.todos.indexOf(todo);
		if (index >= 0) {
			this.todos.splice(index, 1);	
		}
		this.save();
		return index;
	}

/**
 * 
 * save - метод, отвечающий за преобразование массива todos в строку и загрузку этой строки в localStorage по ключу - "todos";
 * 
 */

	save() {
		var todoStr = JSON.stringify(this.todos);
		localStorage.setItem("todos", todoStr);
	}

/**
 * 
 * static load - статический метод (статический, значит его можно вызвать только чеерез имя класса), отвечающий за преобразование строки из localStorage обратно в массив объектов и если массив не пустой, то для каждого элемента массива применить функцию, создание нового списка из перебранных todo.
 * 
 */

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

/**
 * 
 * TodoView - класс, отвечающий за вывод todo на страницу.
 * 
 */

class TodoView {
	constructor(todo, { onRemove = null } = {}) {
		this.todo = todo;
		this.onRemove = onRemove;
	}

/**
 * 
 * метод _build - отвечает за создание элементов списка.
 * 
 */

	_build() {
		const $el = document.createElement('li'); //создание li.
		$el.ondblclick = this.showEditor.bind(this); //при двойном клике на li передается метод showEditor.

		this.$text = document.createElement('span');//создание span.
		this.$text.textContent = this.todo.text;//текст в span взять из todo.

		this.$closeBtn = document.createElement('span');//создает span, который будет играть роль кнопки удаления элемента списка.
		this.$closeBtn.textContent = "✘";//задает текст внутри span.
		this.$closeBtn.className = "closeB";//задает класс span.
		this.$closeBtn.onclick = this._onRemove.bind(this);//при нажатии на span - передать метод _onRemove.


		this.$checkBtn = document.createElement('input');//создает input, который будет играть роль пометки если задача выполнена.
		this.$checkBtn.type = "checkbox";//задает тип input - checkbox.
		this.$checkBtn.className = "checkboxBtn";//задает класс input.
		this.$checkBtn.onchange = this._onToggle.bind(this);//при изменении input - передать метод _onToggle.
		this.$checkBtn.checked = this.todo.isComplete;//если input выран - todo.isComplete = true.

		this._setTextStyle();//изменение стиля текста внутри todo.

		$el.appendChild(this.$checkBtn);//добавляет в $el - дочерний элемент $checkBtn.
		$el.appendChild(this.$text);//добавляет в $el - дочерний элемент $text.
		$el.appendChild(this.$closeBtn);//добавляет в $el - дочерний элемент $closeBtn.

		this.$el = $el;//
	}

/**
 * 
 * _setTextStyle - метод, отвечающий за изменение стилей текста при нажатии на $checkBtn.
 * 
 */

	_setTextStyle() {
		if (this.todo.isComplete) {
			this.$text.style.textDecoration = 'line-through';//делает текст зачеркнутым
			this.$text.style.color = '#ccc';//делает текст серым.
		} else {
			this.$text.style.textDecoration = 'none';//убирает зачеркивание текста
			this.$text.style.color = '#fff';//возвращает белый цвет текста
		}
	}

/**
 * 
 * _onToggle - метод, отвечающий за вызов метода toggleComplete() из todo, вызов метода _setTextStyle для изменения стилей текста.
 * 
 */

	_onToggle() {
		this.todo.toggleComplete();
		this._setTextStyle();
	}

/**
 * 
 * _onRemove - метод, отвечающий за передачу в onRemove - todo, если onRemove = true.
 * 
 */

	_onRemove() {
		if (this.onRemove) {
			this.onRemove(this.todo);
		}
	}

/**
 * 
 * build - метод, отвечающий за вызов метода _build, если this.$el = false, иначе вернуть $el.
 * 
 */

	build() {
		if (!this.$el) {
			this._build();
		}
		return this.$el
	}

/**
 * 
 * setText - метод, отвечающий за замену текста в todo на текст из формы изменения текста, вызов метода edit с аргументом - newText.
 * 
 */

	setText(newText) {
		this.$text.textContent = newText;
		this.todo.edit(newText);
	}

/**
 * 
 * _onFormSubmit - метод, отвечающий за взятие текста из формы и если это не пустая строка - вызвать метод setText с аргуменотм в виде этого текста, вызвать метод hideEditor.
 * 
 */

	_onFormSubmit(e) {
		e.preventDefault();
		const $input = e.target[0];
		const value = $input.value.trim();
		if (value.length) {
			this.setText(value);
			this.hideEditor();
		}
	}

/**
 * 
 * _buildEdior - метод, отвечающий за создание формы изменения текста.
 * 
 */

	_buildEditor() {
		const $form = document.createElement('form');//создание form.
		$form.className = 'editor';//изменение класса $form.
		const $input = document.createElement('input');//создание input для ввода текста.
		$input.value = this.todo.text;//изменить значение в input на текст из todo.
		$input.maxLength = 35;//задает max число символов в input - 35 symbols.
		$input.className = "editInput"//меняет класс input.
		$form.onsubmit = this._onFormSubmit.bind(this);//при отправке формы передать метод _onFormSubmit.
		$form.hidden = true; // по-умолчанию форма скрыта
		$form.appendChild($input);//добавляет в $form - дочерний элемент $input
		return $form;
	}

/**
 * 
 * showEditor - метод, отвечающий за отображение формы для редактирования текста и скрытее текста внутри todo и кнопки удаления.
 * 
 */

	showEditor() {
		if (!this.$form) {
			this.$form = this._buildEditor();//вызов метода _buildEditor
			this.$el.appendChild(this.$form);//добавляет в $el - дочерний элемент $form.
		}

		this.$text.hidden = true;//скрывает текст в todo.
		this.$closeBtn.hidden = true;//скрывает кнопку удаления
		this.$form.hidden = false;//делает видимой форму редактирования.
		this.$form.style.display = 'inline';//меняет стиль формы.
	}

/**
 *
 * hideEditor - метод, отвечающий за скрытее формы редактирования.
 *
 */

	hideEditor() {
		this.$text.hidden = false;//делате текст внутри todo видимым.
		this.$closeBtn.hidden = false;//делает кнопку удаления видимой.
		this.$form.hidden = true;//скрывает форму редактирования
		this.$form.style.display = 'none';//меняет стиль формы
	}
}

/**
 *
 * TodoListView - класс, отвечающий за вывод списка todo на страницу.
 *
 */

class TodoListView {

/**
 *
 * constructor - метод, который инициализирует объекты, созданные в классе TodoListView
 *
 */

	constructor(todoList) {
		this.todoList = todoList;
		this.$textInput = document.getElementById("todoInput");//получает элемент с id = todoInput.
		this.$list = document.getElementById("myUL");//получает элемент с id = myUL.
		this.$form = document.getElementById('todo-form');//получает элемент с id = todo-form.
		this.$form.onsubmit = this.createTodo.bind(this);//при отправке формы - передает метод createTodo.
		this.$todos = [];//делает todos пустым массивом.
		this.todoList.todos.forEach(todo => this._createNewElement(todo));
	}

/**
 *
 * createTodo - метод, отвечающий за создание todo.
 *
 */

	createTodo(e) {
		e.preventDefault();

		const text = this.$textInput.value.trim();//берет текст из input.

		if (text.length) {
			const todo = this.todoList.add(text);//вызывает метод add из todoList c аргументом в виде text.
			this._createNewElement(todo);//вызывает метод _createNewElement с аргументом в виде todo.
			this.$textInput.value = '';
		}
	}

/**
 *
 * _createNewElement - метод, отвечающий за создание нового элемента списка.
 *
 */

	_createNewElement(todo) {
		const todoView = new TodoView(todo);//создает экземпляр класса TodoView.
		todoView.onRemove = this._removeElement.bind(this);//передает метод _removeElement в todoView.onRemove.
		const $el = todoView.build();//вызывает метод build для $el.

		this.$todos.push($el);//добавляет $el в массив $todos.
		this.$list.appendChild($el);//добавляет в $el - дочерний элемент $list.
	}

/**
 *
 * _removeElement - метод, отвечающий за удаление элемента из списка.
 *
 */

	_removeElement(todo) {
		const index = this.todoList.remove(todo);//вызывает метод remove из todoList.
		const $els = this.$todos.splice(index, 1);//удаляет элемент из массива $todos.
		this.$list.removeChild($els[0]);//удаляет дочерний элемент из списка.
	}
}

const list = TodoList.load();//вызывает метод load из класса TodoList
new TodoListView(list);//создает новый экземпляр класса TodoListView.

window.onload = document.getElementById('todoInput').focus();//при загрузке страницы делает input активным.