var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
for (var i = 0;i<close.length;i++) {
  close[i].onclick = function() {
		var div = this.parentElement;
    div.remove();
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var edit = document.createElement('span');
  edit.className = "editor";
  var textEdit = document.createTextNode("Edit");
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  
  edit.appendChild(textEdit);
  li.appendChild(t);
  if (inputValue === '') {
    
  } else {
    li.appendChild(edit);
		li.appendChild(checkbox);
    document.getElementById("myUL").appendChild(li);
				
	}

		
		
		
		
		
  document.getElementById("myInput").value = "";
	var c = document.getElementById("myUL").childElementCount;
	document.getElementById('counter').innerHTML = c;
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0;i<close.length;i++) {
    close[i].onclick = function() {
			var div = this.parentElement;
      div.remove();
			document.getElementById('counter').innerHTML -=1;
    }
  }

 
	


	
	
	
	
	
	
}









































