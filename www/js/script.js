		$(document).on("pagecreate", "#pageone",function(){
			$('#submitButton').on("click", function() {
				submitText();
			});
		});

function submitText() {
	var text = $('#textinput').val();
	storeValue(text);
}

function storeValue(text) { 
	//var newName = window.localStorage.getItem(text);
	alert(newName);
}

