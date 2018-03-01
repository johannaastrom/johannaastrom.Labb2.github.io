/*let result = document.getElementById('result');
let el = document.getElementById('myButton');
el.addEventListener('click', function(event) {
	result.innerHTML += 'Clicked! ';
}); 

let book = {
	author/*: 'JK rowling'*//*,
	title/*: 'harry potter'*/
/*}; 

function listOfUsers(){
for(let x of book){
    console.log(x);
    }
}

function myFunction() {
    document.getElementById("demo").innerHTML = "Added new book"; //add object to list here
}
*/


//new code

var titles  = [];
var authors   = [];

var titleInput  = document.getElementById('title');
var authorInput   = document.getElementById('author');

var listBox  = document.getElementById('result');

myButton.addEventListener('click', function(event) {
	
   function insert ( ) {
    titles.push( titleInput.value );
    authors.push( authorInput.value );
     
    clearAndShow();
   }
   
   function clearAndShow () {
     // Clear the fields
     titleInput.value = '';
     authorInput.value = '';
     
     // Show the output
     //listBox.innerHTML = '';
     
     listBox.innerHML = authors + ', ' + titles + '<br/>';
   }
});

