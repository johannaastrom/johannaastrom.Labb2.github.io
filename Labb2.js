window.addEventListener('load', function(){
    let titles = [];
    let authors = [];

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');

    let listBox = document.getElementById('result'); //används denna???
    let addButton = document.getElementById('addButton');
    let deleteButton = document.getElementById('deleteButton');
    let deleteOneButton = document.getElementById('deleteOneButton');
    let editButton = document.getElementById('editButton');
    let list = document.getElementById('list');

    //API
    let viewAjaxBtn = document.getElementById('viewAjaxBtn');
    let responseLabel = document.getElementById('response');
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
    let requestKey = 'requestKey';
    let key = '1pN6M'; //tidigare: j3pod
    const viewQuery = `op=select&key=${key}`;
    let counter = 0;

    function ClearTextboxes (){
        titleInput.value = '';
        authorInput.value = '';
    }

    function addItemToList(){
        const li = document.createElement('li');
        li.innerText = titleInput.value + ', by ' + authorInput.value;
        li.innerHTML = `<div id="box">${titleInput.value}, by ${authorInput.value} <button id="editButton">edit</button> <button id="deleteOneButton">remove</button></div>`;
        list.appendChild(li);

        ClearTextboxes();
    }

    function addAjax(){ //fixa denna function, varför skickas bara tomma objekt?? + fixa if sats om error eller success
        let titleInput = document.getElementById('title').value;
        let authorInput = document.getElementById('author').value;
        let addQuery = `op=insert&title=${titleInput}&author=${authorInput}&key=${key}`;
        
        fetch(url+addQuery)
        .then(response => { 
          console.log('added: ' + authorInput.value + ', ' + titleInput.value); //vad är detta
          return response.json(); //om det är json data retuneras ett promise.
        })
        .then(json => {
          console.log('Added new item: ', json.data);
          addItemToList();
        })
        .catch(obj => {
          responseLabel.innerText = 'ERROR' + obj;
        })
        console.log('request sent');
      }

      function viewAjax(){

        fetch(url+viewQuery)
        .then(response => { 
          return response.json(); //om det är json/text data retuneras ett promise.
        })
        .then(obj =>{
            if(counter === 1){
              responseLabel.innerText = obj.message + ', please try again';
              console.log(obj.data);
              counter = 0;
            }
            else if(obj.status === 'success'){
                console.log('object: ' + obj);
                console.log('counter: ' + counter);
                console.log(obj.data);
        
                responseLabel.innerHTML = obj.data.map( book => `${book.title} by ${book.author} <br></br>` )
              }
              else{
                counter++; //lägg till if-sats om counter är === 10 bla bla
                console.log('counter: ' + counter);
                viewAjax();
               }
               console.log('request sent'); //ha kvar detta eller inte?,den skrivs ut två gånger..
            })
      }

    addButton.addEventListener('click', addAjax);
    viewAjaxBtn.addEventListener('click', viewAjax);
    deleteButton.addEventListener('click', function(event) { list.innerHTML = ''; });

});
   /* deleteOneButton.addEventListener('click', function(event) {
        
        //code to remove one element

    });

    editOneButton.addEventListener('click', function(event) {
        
        //code to edit one element

    });*/

