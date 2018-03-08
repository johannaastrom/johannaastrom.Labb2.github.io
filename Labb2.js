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

    //API
    let viewAjaxBtn = document.getElementById('viewAjaxBtn');
    let responseLabel = document.getElementById('response');
    let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
    let requestKey = 'reguestKey';
    let key = 'j3pod';
    const viewQuery = `op=select&key=${key}`;
    let addQuery = `op=insert&title=${titleInput.value}&author=${titleInput.value}&key=${key}`;

    function Clear (){
        titleInput.value = '';
        authorInput.value = '';
    }

    function addToList(){
        const li = document.createElement('li');
        li.innerText = titleInput.value + ', by ' + authorInput.value;
        li.innerHTML = `<div id="box">${titleInput.value}, by ${authorInput.value} <button id="editButton">edit</button> <button id="deleteOneButton">remove</button></div>`;
        list.appendChild(li);

        Clear();
    }

    function addAjax(){
        fetch(url+addQuery)
        .then(response => { 
          return response.json(); //om det är json data retuneras ett promise.
        })
        .then(json => {
          console.log('We got json object', json);
          addToList();
        })
        .catch(obj => {
          responseLabel.innerText = 'ERROR' + obj;
          if(obj.status == 'success'){
            console.log(obj);
            console.log(obj.data);
          }
          else (obj.status == 'error')
              return addAjax();
          //anropa funktionen rekursivt här?? 
        })
        console.log('request sent');
      }

      function viewAjax(){
        fetch(url+viewQuery)
        .then(response => { 
          return response.json(); //om det är json data retuneras ett promise.
        })
        .then(json => {
          console.log('Viewing data: ', json);
          responseLabel.innerText = json; //ta bort detta sedan
          viewAjaxBtn.disabled = false;
        })
        .catch(obj => {
          responseLabel.innerText = 'ERROR' + obj;
          viewAjaxBtn.disabled = false;

          if(obj.status == 'success'){
            console.log(obj);
            console.log(obj.data);
          }
          else
              return viewAjax();
          //anropa funktionen rekursivt här?? 

        })
        console.log('request sent');
      }

     //lägg in ifsats med counter och rekursivt om det blir error så anropas den igen tills det blir success

    addButton.addEventListener('click', function(event) { 
        addAjax();
    });

    deleteButton.addEventListener('click', function(event) {
        
        list.innerHTML = '';

    });

    viewAjaxBtn.addEventListener('click', function(event){
        viewAjax();
    });

});
   /* deleteOneButton.addEventListener('click', function(event) {
        
        //code to remove one element

    });

    editOneButton.addEventListener('click', function(event) {
        
        //code to edit one element

    });*/

