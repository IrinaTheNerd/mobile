$(document).("pagecreate","#pageone", function(){
	$('#submitButton').on("click", function() {
		submitText();
	});
});

function sumitText() {
	var text = $('#textinput').val();
	alert(text);
}

/*

function storeValue(name, value) {

}
*omc