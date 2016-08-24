$(document).ready(function() { 
  var countries = [
	   { value: 'aos', data: 'AD' },
	   { value: 'Zimbabwe', data: 'ZZ1' },
	   { value: 'asd', data: 'ZZ2' },
	   { value: 'abs', data: 'ZZ3' },
	];
 
$('#autocomplete').autocomplete({
    lookup: countries,
    onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', data is ' + suggestion.data);
        }
    });
  
  
});