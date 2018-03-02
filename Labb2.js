window.addEventListener('load', function(){
    let titles = [];
    let authors = [];

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');

    let listBox = document.getElementById('result');
    let addButton = document.getElementById('addButton');
    let deleteButton = document.getElementById('deleteButton');
    let deleteOneButton = document.getElementById('deleteOneButton');
    let editButton = document.getElementById('editButton');
    let list = document.getElementById('list');

    //let btn = '<button id="deleteOneButton">remove</button>';

    //old code
/*function insert () {
    titles.push(titleInput.value);
    authors.push(authorInput.value);

    // Clean and print output
    titleInput.value = '';
    authorInput.value = '';

        listBox.innerHTML = '';
        listBox.innerHTML += titles + ', By ' + authors + '</br>';
}*/
    function Clear (){
        titleInput.value = '';
        authorInput.value = '';
    }

    addButton.addEventListener('click', function(event) { 

        const li = document.createElement('li');
        li.innerText = titleInput.value + ', by ' + authorInput.value;
        li.innerHTML = `<div id="box">${titleInput.value}, by ${authorInput.value} <button id="editButton">edit</button> <button id="deleteOneButton" position="absolute" right="5px">remove</button></div>`;
        list.appendChild(li);

        Clear();
    });

    deleteButton.addEventListener('click', function(event) {
        
        list.innerHTML = '';

    });

    deleteOneButton.addEventListener('click', function(event) {
        
        //code to remove one element

    });

    editOneButton.addEventListener('click', function(event) {
        
        //code to edit one element

    });
});
