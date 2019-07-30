/**
 * 
 *	класс, отвечающий за создание внутри задачи: текста, обозначения, что задача выполнена и изменения в задаче.
 * 
*/

; class Todo {

	/**
	 * 
	 * метод, который создает объекты в классе .
	 * 
	*/

	constructor(text, isComplete = false, onChange = null) {
		this.text = text;
		this.isComplete = isComplete;
		this.onChange = onChange;
	}

	/**
	 * 
	 * метод, меняет значение выпоне пометки, что задача выполнена на обратное.
	 * 
	 */

	toggleComplete() {
		this.isComplete = !this.isComplete;
		if (this.onChange) this.onChange(this);
		return this;
	}

	/**
	 * 
	 * метод, при котором если текст, переданный в этот метод не пустая строка он равен тексту в классе.
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
 * класс, отвечающий за создание списка из todo, добавление в todo текста, удаление todo, сохранение изменений в todo и загрузку элементов из массива todos.
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
	 * метод, отвечающий за создание задачи, добавление текущей задачи в массив и вызов метода для сохранения.
	 * 
	 */

	add(text) {
		var todo = new Todo(text, false, this.save.bind(this));
		this.todos.push(todo);
		this.save();
		return todo;
	}

	/**
	 * 
	 * метод, отвечающий за удаление задачи из массива по индексу и вызов метода сохранения изменений в массиве.
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
	 * метод, отвечающий за преобразование массива задач в строку и загрузку этой строки в локальное хранилище по ключу - "todos";
	 * 
	 */

	save() {
		var todoStr = JSON.stringify(this.todos);
		localStorage.setItem("todos", todoStr);
	}

	/**
	 * 
	 * статический метод (статический, значит его можно вызвать только чеерез имя класса), 
	 * отвечающий за преобразование строки из локального хранилища обратно в массив объектов и если массив не пустой, 
	 * то для каждого элемента массива применить функцию, создание нового списка из перебранных задач.
	 * 
	 */

	static load() {
		var todoStr = localStorage.getItem("todos");
		var todos = JSON.parse(todoStr);
		if (todos !== null) {
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
 * класс, отвечающий за вывод задач на страницу.
 * 
 */

class TodoView {
	constructor(todo, { onRemove = null } = {}) {
		this.todo = todo;
		this.onRemove = onRemove;
	}

	/**
	 * 
	 * метод, отвечающий за создание элементов списка.
	 * 
	 */

	_build() {
		const $el = document.createElement('li'); //создание элемента для помещения туда задачи.
		$el.className = "todoLi";
		$el.ondblclick = this.showEditor.bind(this); //при двойном клике на элемент передается метод для показа редактора содержимого.

		this.$text = document.createElement('span');//создание элемента для помещения туда текста задачи.
		this.$text.textContent = this.todo.text;//текст в элемент взять из задачи.
		this.$text.className = 'content';//задачет класс элементу.

		this.$closeBtn = document.createElement('span');//создает элемент, который будет играть роль кнопки удаления элемента списка.
		this.$closeBtn.textContent = "✘";//задает текст внутри элемента.
		this.$closeBtn.className = "closeB";//задает класс элементу.
		this.$closeBtn.onclick = this._onRemove.bind(this);//при нажатии на элемент - передать метод для удаления задачи.


		this.$checkBtn = document.createElement('input');//создает элемент, который будет играть роль пометки если задача выполнена.
		this.$checkBtn.type = "checkbox";//задает тип элементу - флажок.
		this.$checkBtn.className = "checkboxBtn";//задает класс элементу.
		this.$checkBtn.onchange = this._onToggle.bind(this);//при изменении флажка - передать метод для пометки, что задачи выполнена.
		this.$checkBtn.checked = this.todo.isComplete;//если флажок выран - пометка в данных, что задача выполнена.

		this._setTextStyle();//изменение стиля текста внутри задачи.

		$el.appendChild(this.$checkBtn);//добавляет в главный элемент - дочерний элемент флажок.
		$el.appendChild(this.$text);//добавляет в главный элемент - дочерний элемент текст.
		$el.appendChild(this.$closeBtn);//добавляет в главный элемент - дочерний элемент кнопка удаления.
		this.$el = $el;
	}

	/**
	 * 
	 * метод, отвечающий за изменение стилей текста при нажатии на флажок.
	 * 
	 */

	_setTextStyle() {
		if (this.todo.isComplete) {
			this.$text.style.textDecoration = 'line-through';//делает текст зачеркнутым.
			this.$text.style.color = '#ccc';//делает текст серым.
		} else {
			this.$text.style.textDecoration = 'none';//убирает зачеркивание текста.
			this.$text.style.color = '#fff';//возвращает белый цвет текста.
		}
	}

	/**
	 * 
	 * метод, отвечающий за вызов метода для пометки что задача выполнена, вызов метода  для изменения стилей текста.
	 * 
	 */

	_onToggle() {
		this.todo.toggleComplete();
		this._setTextStyle();
	}

	/**
	 * 
	 * метод, отвечающий за .
	 * 
	 */

	_onRemove() {
		if (this.onRemove) {
			this.onRemove(this.todo);
		}
	}

	/**
	 * 
	 * метод, отвечающий за вызов метода для создания задачи.
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
	 * метод, отвечающий за замену текста в задаче на текст из формы редактирования текста.
	 * 
	 */

	setText(newText) {
		this.$text.textContent = newText;
		this.todo.edit(newText);
	}

	/**
	 * 
	 * метод, отвечающий за взятие текста из формы и если это не пустая строка - вызвать метод для изменения стиля текста и скрыть редактор.
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
	 * метод, отвечающий за создание формы редактирования текста.
	 * 
	 */

	_buildEditor() {
		const $form = document.createElement('form');//создание form.
		$form.className = 'editor';//изменение класса $form.
		const $input = document.createElement('input');//создание input для ввода текста.
		$input.value = this.todo.text;//изменить значение в input на текст из todo.
		$input.maxLength = 100;//задает max число символов в input - 35 symbols.
		$input.className = "editInput"//меняет класс input.
		$form.onsubmit = this._onFormSubmit.bind(this);//при отправке формы передать метод _onFormSubmit.
		$form.hidden = true; // по-умолчанию форма скрыта
		$form.appendChild($input);//добавляет в $form - дочерний элемент $input
		return $form;
	}

	/**
	 * 
	 * метод, отвечающий за отображение формы для редактирования текста и скрытее текста внутри задачи и кнопки удаления.
	 * 
	 */

	showEditor() {
		if (!this.$form) {
			this.$form = this._buildEditor();//вызов метода для создания формы редактирования.
			this.$el.appendChild(this.$form);//добавляет в главный элемент дочерний элемент - форму редактирования.
		}

		this.$text.hidden = true;//скрывает текст в задаче.
		this.$closeBtn.hidden = true;//скрывает кнопку удаления.
		this.$form.hidden = false;//делает видимой форму редактирования.
		this.$form.style.display = 'inline';//меняет стиль формы.
	}

	/**
	 *
	 * метод, отвечающий за скрытее формы редактирования.
	 *
	 */

	hideEditor() {
		this.$text.hidden = false;//делате текст внутри задачи видимым.
		this.$closeBtn.hidden = false;//делает кнопку удаления видимой.
		this.$form.hidden = true;//скрывает форму редактирования
		this.$form.style.display = 'none';//меняет стиль формы.
	}
}

/**
 *
 * класс, отвечающий за вывод списка задач на страницу.
 *
 */

class TodoListView {

	/**
	 *
	 * метод, который создает объекты в классе.
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
	 *  метод, отвечающий за создание задачи.
	 *
	 */

	createTodo(e) {
		e.preventDefault();

		const text = this.$textInput.value.trim();//берет текст из поля ввода.

		if (text.length) {
			const todo = this.todoList.add(text);//вызывает метод из класса создания списка задач, для создания задачи.
			this._createNewElement(todo);//вызывает метод для создания элемента с задачей.
			this.$textInput.value = '';//делает поле ввода задачи пустым.
		}
	}

	/**
	 *
	 * метод, отвечающий за создание нового элемента списка.
	 *
	 */

	_createNewElement(todo) {
		const todoView = new TodoView(todo);//создает экземпляр класса отображения задачи.
		todoView.onRemove = this._removeElement.bind(this);//передает метод удаления элемента(задачи).
		const $el = todoView.build();//вызывает метод для создания задачи.

		this.$todos.push($el);//добавляет задачу в массив.
		this.$list.appendChild($el);//добавляет элемент в список как дочерний элемент.
	}

	/**
	 *
	 * метод, отвечающий за удаление элемента из списка.
	 *
	 */

	_removeElement(todo) {
		const index = this.todoList.remove(todo);//вызывает метод для удаления задачи.
		const $els = this.$todos.splice(index, 1);//удаляет элемент из массива.
		this.$list.removeChild($els[0]);//удаляет дочерний элемент из списка.
	}
}

const list = TodoList.load();//вызывает метод загрузки из класса, отвечающего за создание списка задач.
new TodoListView(list);//создает новый экземпляр класса отображения списка задач.