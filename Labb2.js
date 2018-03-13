window.addEventListener('load', function(){
    let titles = [];
    let authors = [];

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');

    let listBox = document.getElementById('result'); //används denna???
    let addButton = document.getElementById('addButton');
    //let deleteButton = document.getElementById('deleteButton');
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
    let requestKeyButton = document.getElementById('requestKeyButton');

    //Request function key button
    function requestAPIKey(){
      let responseDiv = document.getElementById('response');
      fetch(url+requestKey)
      .then ( response => {
      console.log('Response from server: ' + response)
      return response.text();
    })
      .then (text => {
      console.log('We got text: ', text);
      responseDiv.innerText = text;
    })
  }

    function ClearTextboxes (){
        titleInput.value = '';
        authorInput.value = '';
    }

    function addItemToList(){
        const li = document.createElement('li');
        li.innerText = titleInput.value + ', by ' + authorInput.value;
        li.innerHTML = `<div id="box">Added ${titleInput.value}, by ${authorInput.value}<button id="editButton">edit</button> <button id="deleteOneButton">remove</button></div>`;
        list.appendChild(li);

        ClearTextboxes();
    }

    let addCounter = 0;
    function addAjax(){
        let titleInput = document.getElementById('title').value;
        let authorInput = document.getElementById('author').value;
        let addQuery = `op=insert&title=${titleInput}&author=${authorInput}&key=${key}`;
        fetch(url+addQuery)
        .then(response => { 
          console.log('added: ' + authorInput + ', ' + titleInput);
          return response.json();
        })
        .then(obj => {
          if(addCounter === 10){
            responseLabel.innerText = obj.message + ', please try again';
            addCounter = 0;
          }
          else if(obj.status === 'success'){
          console.log('Added new item: ', obj.data);
          addItemToList();
          addCounter = 0;
          responseLabel.innerHTML = '';
          }
          else if(obj.status !== 'success'){
            addCounter++;
            console.log('counter: ' + addCounter);
            addAjax();
          }
        })
        .catch(obj => {
          responseLabel.innerText = 'ERROR' + obj;
        })
        console.log('request sent');
      }

      let viewCounter = 0;
      function viewAjax(){
        fetch(url+viewQuery)
        .then(response => { 
          return response.json();
        })
        .then(obj =>{
            if(viewCounter === 10){
              responseLabel.innerText = obj.message + ', please try again';
              console.log(obj.data);
              viewCounter = 0;
            }
            else if(obj.status === 'success'){
                console.log('object: ' + obj);
                console.log('counter: ' + viewCounter);
                console.log(obj.data);
                viewCounter = 0;
        
                responseLabel.innerHTML = obj.data.map( book => `${book.title} by ${book.author} <br></br>` )
              }
            else{
                viewCounter++;
                console.log('counter: ' + viewCounter);
                viewAjax();
            }
        })
      }

    requestKeyButton.addEventListener('click', requestAPIKey);
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

