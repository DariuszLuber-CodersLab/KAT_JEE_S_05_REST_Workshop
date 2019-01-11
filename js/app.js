document.addEventListener("DOMContentLoaded",function(){

    getBooks();
    addBookAction();

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


function addBookAction(){

    let form = document.getElementById("bookForm");

    form.addEventListener("submit",function(e){
        e.preventDefault();

        //get data from form
        let title = this.querySelector("input[name=title]").value;
        let author = this.querySelector("input[name=author]").value;
        let isbn = this.querySelector("input[name=isbn]").value;
        let publisher = this.querySelector("input[name=publisher]").value;
        let type = this.querySelector("input[name=type]").value;

        //es6 - if variable name is the same as obj. attribute
        let book = {title, author, isbn, publisher, type};

        $.ajax({
            url: "http://localhost:8282/books",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(book),
            dataType: "json"
        })
        .done(function(data){
            console.log(data);
            form.reset();

            let listEl = document.getElementById("bookList");
            addBookToList(listEl, data);
        })
        .fail(function(){
            alert("Nie udało się zapisać książki - spróbuj ponownie");
        })

    })
}