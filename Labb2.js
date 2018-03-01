let titles = [];
let authors = [];

let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');

let listBox = document.getElementById('result');
let addButton = document.getElementById('addButton');

function insert () {
    titles.push( titleInput.value );
    authors.push( authorInput.value );

    // Print output
    titleInput.value = '';
    authorInput.value = '';

        listBox.innerHTML = '';
        listBox.innerHTML += authors + ', ' + titles + '<br/>';
}

addButton.addEventListener('click', function(event) { 

   insert();

});

