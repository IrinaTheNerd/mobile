		$(document).on("pagecreate", "#pageone",function(){
			$('#submitButton').on("click", function() {
				submitText();
			});
		});

function submitText() {
	var text = $('#textinput').val();
	//alert(text);
	var pizza = "fancies";
	storeValue(pizza, text);
}

function storeValue(pizza, text) { 
	
	var saved = window.localStorage.setItem(pizza, text);
	//alert(saved);
	
	
	var storedVal = window.localStorage.getItem(pizza);
	alert(storedVal);
}
