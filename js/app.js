document.addEventListener("DOMContentLoaded",function(){

    getBooks();

})


function getBooks(){
    $.ajax({
        url: "http://localhost:8282/books",
        dataType: "json"
    })
    .done(function(books){
        let listEl = document.getElementById("bookList");
        books.forEach( book => addBookToList(listEl, book) );
    })
}

function addBookToList(listEl ,bookObj){
    let newLi = document.createElement("li");
    let h2El = document.createElement("h2");
    h2El.innerText = bookObj.title;

    newLi.appendChild(h2El);
    listEl.appendChild(newLi)
}


