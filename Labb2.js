window.addEventListener('load', function(){
    let titles = [];
    let authors = [];

    let titleInput = document.getElementById('title');
    let authorInput = document.getElementById('author');

    let addButton = document.getElementById('addButton');
    let deleteOneButton = document.getElementById('deleteOneButton');
    let editButton = document.getElementById('editButton');
    let list = document.getElementById('list');

    //INSERT KEY HERE
    let key = 'ufa70';

    //API
    let viewAjaxButton = document.getElementById('viewAjaxButton');
    let responseLabel = document.getElementById('response');
    let requestKeyButton = document.getElementById('requestKeyButton');
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
    let requestKey = 'requestKey';
    const viewQuery = `op=select&key=${key}`;

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
          return response.json();
        })
        .then(obj => {
          if(addCounter === 10){
            responseLabel.innerText = obj.message + ', please try again';
            addCounter = 0;
          }
          else if(obj.status === 'success'){
          console.log(`Successfully added new book: ${titleInput}, by ${authorInput}`);
          addItemToList();
          addCounter = 0;
          responseLabel.innerHTML = '';
          }
          else if(obj.status !== 'success'){
            addCounter++;
            console.log('Counter: ' + addCounter);
            addAjax();
          }
        })
        .catch(obj => {
          responseLabel.innerText = 'ERROR: ' + obj;
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
                console.log(obj.data);
                viewCounter = 0;
        
                responseLabel.innerHTML = obj.data.map( book => `${book.title} by ${book.author} <br></br>` )
              }
            else{
                viewCounter++;
                console.log('Counter: ' + viewCounter);
                viewAjax();
            }
        })
      }

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

    requestKeyButton.addEventListener('click', requestAPIKey);
    addButton.addEventListener('click', addAjax);
    viewAjaxButton.addEventListener('click', viewAjax);

});
   /* deleteOneButton.addEventListener('click', function(event) {
        
        //code to remove one element

    });

    editOneButton.addEventListener('click', function(event) {
        
        //code to edit one element

    });*/

