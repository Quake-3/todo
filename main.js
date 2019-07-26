@@ -1,6 +1,6 @@
/**
 * 
 *	Todo - класс, отвечающий за создание внутри todo: текста, обозначения, что задача выполнена и изменения в todo.
 *	класс, отвечающий за создание внутри задачи: текста, обозначения, что задача выполнена и изменения в задаче.
 * 
*/

@ -8,7 +8,7 @@

/**
 * 
 *	constructor - метод, который инициализирует объекты, созданные в классе Todo.
 * метод, который создает объекты в классе .
 * 
*/

@ -20,7 +20,7 @@

/**
 * 
 * toggleComplete -  метод, меняет значение isComplete на обратное и если текст был изменен, то в onChange передается Todo.
 * метод, меняет значение выпоне пометки, что задача выполнена на обратное.
 * 
 */

@ -32,7 +32,7 @@

/**
 * 
 * edit - метод, при котором если текст, переданный в edit не пустая строка - текст в Todo равен тексту, переданному в edit.
 * метод, при котором если текст, переданный в этот метод не пустая строка он равен тексту в классе.
 * 
 */

@ -48,7 +48,7 @@

/**
 * 
 * TodoList - класс, отвечающий за создание массива из todo, добавление в todo текста, удаление todo, сохранение изменений в todo и загрузку элементов из массива todos.
 * класс, отвечающий за создание списка из todo, добавление в todo текста, удаление todo, сохранение изменений в todo и загрузку элементов из массива todos.
 * 
 */

@ -62,7 +62,7 @@ class TodoList {

/**
 * 
 * add - метод, отвечающий за создание todo, добавление текущего todo в массив todos и вызов метода save.
 * метод, отвечающий за создание задачи, добавление текущей задачи в массив и вызов метода для сохранения.
 * 
 */

@ -75,7 +75,7 @@ class TodoList {

/**
 * 
 * remove - метод, отвечающий за удаление todo из массива todos по индексу и вызов метода save для сохранения изменений в массиве.
 * метод, отвечающий за удаление задачи из массива по индексу и вызов метода сохранения изменений в массиве.
 * 
 */

@ -90,7 +90,7 @@ class TodoList {

/**
 * 
 * save - метод, отвечающий за преобразование массива todos в строку и загрузку этой строки в localStorage по ключу - "todos";
 * метод, отвечающий за преобразование массива задач в строку и загрузку этой строки в локальное хранилище по ключу - "todos";
 * 
 */

@ -101,9 +101,9 @@ class TodoList {

/**
 * 
 * static load - статический метод (статический, значит его можно вызвать только чеерез имя класса), 
 * отвечающий за преобразование строки из localStorage обратно в массив объектов и если массив не пустой, 
 * то для каждого элемента массива применить функцию, создание нового списка из перебранных todo.
 * статический метод (статический, значит его можно вызвать только чеерез имя класса), 
 * отвечающий за преобразование строки из локального хранилища обратно в массив объектов и если массив не пустой, 
 * то для каждого элемента массива применить функцию, создание нового списка из перебранных задач.
 * 
 */

@ -122,7 +122,7 @@ class TodoList {

/**
 * 
 * TodoView - класс, отвечающий за вывод todo на страницу.
 * класс, отвечающий за вывод задач на страницу.
 * 
 */

@ -134,58 +134,118 @@ class TodoView {

/**
 * 
 * метод _build - отвечает за создание элементов списка.
 * метод, отвечающий за создание элементов списка.
 * 
 */

	_build() {
		const $el = document.createElement('li'); //создание li.
		$el.ondblclick = this.showEditor.bind(this); //при двойном клике на li передается метод showEditor.

		this.$text = document.createElement('span');//создание span.
		this.$text.textContent = this.todo.text;//текст в span взять из todo.
		this.$text.className = 'content';

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
		const $el = document.createElement('li'); //создание элемента для помещения туда задачи.
		$el.className = "todoLi";
		$el.ondblclick = this.showEditor.bind(this); //при двойном клике на элемент передается метод для показа редактора содержимого.

		this.$text = document.createElement('span');//создание элемента для помещения туда текста задачи.
		this.$text.textContent = this.todo.text;//текст в элемент взять из задачи.
		this.$text.className = 'content';//задачет класс элементу.

		this.bgBlue = document.createElement('input');
		this.bgBlue.type = "button"
		this.bgBlue.className = "blue changerBg";
		this.bgBlue.onclick = function () {
			var div = this.parentElement;
			div.style.background = "blue";
			localStorage.setItem('bgColor', 'blue');
		};

		this.bgYellow = document.createElement('input');
		this.bgYellow.type = "button"
		this.bgYellow.className = "yellow  changerBg";
		this.bgYellow.onclick = function () {
			var div = this.parentElement;
			div.style.background = "yellow";
			localStorage.setItem('bgColor', 'yellow');
		};

		this.bgGreen = document.createElement('input');
		this.bgGreen.type = "button"
		this.bgGreen.className = "green  changerBg";
		this.bgGreen.onclick = function () {
			var div = this.parentElement;
			div.style.background = "green";
			localStorage.setItem('bgColor', 'green');
		};

		this.bgOrange = document.createElement('input');
		this.bgOrange.type = "button"
		this.bgOrange.className = "orange  changerBg";
		this.bgOrange.onclick = function () {
			var div = this.parentElement;
			div.style.background = "orange";
			localStorage.setItem('bgColor', 'orange');
		};

		this.bgPink = document.createElement('input');
		this.bgPink.type = "button"
		this.bgPink.className = "pink changerBg";
		this.bgPink.onclick = function () {
			var div = this.parentElement;
			div.style.background = "pink";
			localStorage.setItem('bgColor', 'pink');
		};

		this.bgPurple = document.createElement('input');
		this.bgPurple.type = "button"
		this.bgPurple.className = "purple  changerBg";
		this.bgPurple.onclick = function () {
			var div = this.parentElement;
			div.style.background = "purple";
			localStorage.setItem('bgColor','purple');
		};

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
		$el.appendChild(this.bgBlue);
		$el.appendChild(this.bgGreen);
		$el.appendChild(this.bgYellow);
		$el.appendChild(this.bgOrange);
		$el.appendChild(this.bgPink);
		$el.appendChild(this.bgPurple);
		this.$el = $el;
	}

/**
 * 
 * _setTextStyle - метод, отвечающий за изменение стилей текста при нажатии на $checkBtn.
 * метод, отвечающий за изменение стилей текста при нажатии на флажок.
 * 
 */

	_setTextStyle() {
		if (this.todo.isComplete) {
			this.$text.style.textDecoration = 'line-through';//делает текст зачеркнутым
			this.$text.style.textDecoration = 'line-through';//делает текст зачеркнутым.
			this.$text.style.color = '#ccc';//делает текст серым.
		} else {
			this.$text.style.textDecoration = 'none';//убирает зачеркивание текста
			this.$text.style.color = '#fff';//возвращает белый цвет текста
			this.$text.style.textDecoration = 'none';//убирает зачеркивание текста.
			this.$text.style.color = '#fff';//возвращает белый цвет текста.
		}
	}

/**
 * 
 * _onToggle - метод, отвечающий за вызов метода toggleComplete() из todo, вызов метода _setTextStyle для изменения стилей текста.
 * метод, отвечающий за вызов метода для пометки что задача выполнена, вызов метода  для изменения стилей текста.
 * 
 */

@ -196,7 +256,7 @@ class TodoView {

/**
 * 
 * _onRemove - метод, отвечающий за передачу в onRemove - todo, если onRemove = true.
 * метод, отвечающий за .
 * 
 */

@ -208,7 +268,7 @@ class TodoView {

/**
 * 
 * build - метод, отвечающий за вызов метода _build, если this.$el = false, иначе вернуть $el.
 * метод, отвечающий за вызов метода для создания задачи.
 * 
 */

@ -221,7 +281,7 @@ class TodoView {

/**
 * 
 * setText - метод, отвечающий за замену текста в todo на текст из формы изменения текста, вызов метода edit с аргументом - newText.
 * метод, отвечающий за замену текста в задаче на текст из формы редактирования текста.
 * 
 */

@ -232,7 +292,7 @@ class TodoView {

/**
 * 
 * _onFormSubmit - метод, отвечающий за взятие текста из формы и если это не пустая строка - вызвать метод setText с аргуменотм в виде этого текста, вызвать метод hideEditor.
 * метод, отвечающий за взятие текста из формы и если это не пустая строка - вызвать метод для изменения стиля текста и скрыть редактор.
 * 
 */

@ -248,58 +308,62 @@ class TodoView {

/**
 * 
 * _buildEdior - метод, отвечающий за создание формы изменения текста.
 * метод, отвечающий за создание формы редактирования текста.
 * 
 */

	_buildEditor() {
		const $button = document.createElement('input');
		$button.type = 'submit';
		$button.className = "submitBtn";
		const $form = document.createElement('form');//создание form.
		$form.className = 'editor';//изменение класса $form.
		const $input = document.createElement('input');//создание input для ввода текста.
		const $input = document.createElement('textarea');//создание input для ввода текста.
		$input.value = this.todo.text;//изменить значение в input на текст из todo.
		$input.maxLength = 50;//задает max число символов в input - 35 symbols.
		$input.maxLength = 100;//задает max число символов в input - 35 symbols.
		$input.className = "editInput"//меняет класс input.
		$form.onsubmit = this._onFormSubmit.bind(this);//при отправке формы передать метод _onFormSubmit.
		$form.hidden = true; // по-умолчанию форма скрыта
		$form.appendChild($input);//добавляет в $form - дочерний элемент $input
		$form.appendChild($button);
		return $form;
	}

/**
 * 
 * showEditor - метод, отвечающий за отображение формы для редактирования текста и скрытее текста внутри todo и кнопки удаления.
 * метод, отвечающий за отображение формы для редактирования текста и скрытее текста внутри задачи и кнопки удаления.
 * 
 */

	showEditor() {
		if (!this.$form) {
			this.$form = this._buildEditor();//вызов метода _buildEditor
			this.$el.appendChild(this.$form);//добавляет в $el - дочерний элемент $form.
			this.$form = this._buildEditor();//вызов метода для создания формы редактирования.
			this.$el.appendChild(this.$form);//добавляет в главный элемент дочерний элемент - форму редактирования.
		}

		this.$text.hidden = true;//скрывает текст в todo.
		this.$closeBtn.hidden = true;//скрывает кнопку удаления
		this.$text.hidden = true;//скрывает текст в задаче.
		this.$closeBtn.hidden = true;//скрывает кнопку удаления.
		this.$form.hidden = false;//делает видимой форму редактирования.
		this.$form.style.display = 'inline';//меняет стиль формы.
	}

/**
 *
 * hideEditor - метод, отвечающий за скрытее формы редактирования.
 * метод, отвечающий за скрытее формы редактирования.
 *
 */

	hideEditor() {
		this.$text.hidden = false;//делате текст внутри todo видимым.
		this.$text.hidden = false;//делате текст внутри задачи видимым.
		this.$closeBtn.hidden = false;//делает кнопку удаления видимой.
		this.$form.hidden = true;//скрывает форму редактирования
		this.$form.style.display = 'none';//меняет стиль формы
		this.$form.style.display = 'none';//меняет стиль формы.
	}
}

/**
 *
 * TodoListView - класс, отвечающий за вывод списка todo на страницу.
 * класс, отвечающий за вывод списка задач на страницу.
 *
 */

@ -307,7 +371,7 @@ class TodoListView {

/**
 *
 * constructor - метод, который инициализирует объекты, созданные в классе TodoListView
 * метод, который создает объекты в классе.
 *
 */

@ -323,51 +387,51 @@ class TodoListView {

/**
 *
 * createTodo - метод, отвечающий за создание todo.
 *  метод, отвечающий за создание задачи.
 *
 */

	createTodo(e) {
		e.preventDefault();

		const text = this.$textInput.value.trim();//берет текст из input.
		const text = this.$textInput.value.trim();//берет текст из поля ввода.

		if (text.length) {
			const todo = this.todoList.add(text);//вызывает метод add из todoList c аргументом в виде text.
			this._createNewElement(todo);//вызывает метод _createNewElement с аргументом в виде todo.
			this.$textInput.value = '';
			const todo = this.todoList.add(text);//вызывает метод из класса создания списка задач, для создания задачи.
			this._createNewElement(todo);//вызывает метод для создания элемента с задачей.
			this.$textInput.value = '';//делает поле ввода задачи пустым.
		}
	}

/**
 *
 * _createNewElement - метод, отвечающий за создание нового элемента списка.
 * метод, отвечающий за создание нового элемента списка.
 *
 */

	_createNewElement(todo) {
		const todoView = new TodoView(todo);//создает экземпляр класса TodoView.
		todoView.onRemove = this._removeElement.bind(this);//передает метод _removeElement в todoView.onRemove.
		const $el = todoView.build();//вызывает метод build для $el.
		const todoView = new TodoView(todo);//создает экземпляр класса отображения задачи.
		todoView.onRemove = this._removeElement.bind(this);//передает метод удаления элемента(задачи).
		const $el = todoView.build();//вызывает метод для создания задачи.

		this.$todos.push($el);//добавляет $el в массив $todos.
		this.$list.appendChild($el);//добавляет в $el - дочерний элемент $list.
		this.$todos.push($el);//добавляет задачу в массив.
		this.$list.appendChild($el);//добавляет элемент в список как дочерний элемент.
	}

/**
 *
 * _removeElement - метод, отвечающий за удаление элемента из списка.
 * метод, отвечающий за удаление элемента из списка.
 *
 */

	_removeElement(todo) {
		const index = this.todoList.remove(todo);//вызывает метод remove из todoList.
		const $els = this.$todos.splice(index, 1);//удаляет элемент из массива $todos.
		const index = this.todoList.remove(todo);//вызывает метод для удаления задачи.
		const $els = this.$todos.splice(index, 1);//удаляет элемент из массива.
		this.$list.removeChild($els[0]);//удаляет дочерний элемент из списка.
	}
}

const list = TodoList.load();//вызывает метод load из класса TodoList
new TodoListView(list);//создает новый экземпляр класса TodoListView.
const list = TodoList.load();//вызывает метод загрузки из класса, отвечающего за создание списка задач.
new TodoListView(list);//создает новый экземпляр класса отображения списка задач.

window.onload = document.getElementById('todoInput').focus();//при загрузке страницы делает input активным.
window.onload = document.getElementById('todoInput').focus();//при загрузке страницы делает поле ввода активным.
