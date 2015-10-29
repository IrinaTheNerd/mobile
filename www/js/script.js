$( "#panel" )
    .panel( "open" , optionsHash )
    .then( function( options ){
        $( "#open" ).panel( "open" , options );
    });
	