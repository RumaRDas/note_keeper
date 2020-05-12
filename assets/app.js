console.log("Hello Ruma");
// show all previous save notes
showNotes();
// if user adds a note, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addText = document.getElementById("addText");
    //checking local storage notes
    let notes = localStorage.getItem("notes");
    //if local storage is null 
    if (notes == null) {
        //notes object array
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }
    //adding notes into noteobj array
    notesObj.push(addText.value);
    //notes is converting in string for  for saving in json file 
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // for clear input text area after saving note
    addText.value = "";
    console.log(notesObj);
    showNotes();
});

//function for inserting and showing element note from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    //if local storage is null 
    if (notes == null) {
        //notes object array
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }
    // declearing a  html  blank string
    let html = "";
    //
    notesObj.forEach(function (element, index) {
        // append the  blank string html and add this div to html
        html += `
        <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element}</p>
            <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-info">Delete Note</button>
        </div>
    </div>
        `
            ;
    });
    let notesElm = document.getElementById("notes");
    // if notes length is not 0 
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

    } else {
        // if notes length is 0
        notesElm.innerHTML = `<h2 class="text-info">You can save your Note Here</h2>`
    }
}

// Function to Delet Note
function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");
    //if local storage is null 
    if (notes == null) {
        //notes object array
        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }
    // deleting 1 element from local object array
    notesObj.splice(index, 1);
    // after deleting updating localtorage  string element
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// For search notes by input
let search = document.getElementById("searchTxt");
// adding event listener
search.addEventListener("input" ,function(){
   // alltype of input lowercase or upper case
    let inputVal = search.value;

   // console.log('Input for ntes', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function(element){
       
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

    })

});
