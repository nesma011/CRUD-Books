let bookName = document.getElementById('input1');
let authorName = document.getElementById('input2');
let imageBook = document.getElementById('input3');
let pdfFile = document.getElementById('input4');
let add = document.getElementById('add');
let deleteBook = document.getElementById("delete");
let search = document.getElementById("searchInput");
let searchOption = document.getElementById("searchOption");


var bookList = [];

if (localStorage.getItem('books') != null) {
    bookList = JSON.parse(localStorage.getItem('books'));
    displayBooks();
}

add.addEventListener('click', function addBook() {

    let books = {
        bName: bookName.value,
        author: authorName.value,
        image: `./images/${imageBook.value.slice(12)}`,
        bookFile: `./pdfs/${pdfFile.value.slice(12)}`
    };
    bookList.push(books);
    localStorage.setItem("books", JSON.stringify(bookList));
    displayBooks();
    clearInput();
});

function clearInput() {
    bookName.value = '';
    authorName.value = '';
    imageBook.value = '';
    pdfFile.value = '';
}


function displayBooks() {
    let cartona = ``;
    for (let i = 0; i < bookList.length; i++) {
        cartona += `
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <button type="button" onclick="deleteBooks(${i})" id="delete" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">X</button>
            <a href="#">
                <img class="rounded-t-lg" src="${bookList[i].image}" alt="book" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${bookList[i].bName}</h5>
                </a>
                <h6 class="mb-3 font-normal text-gray-700 dark:text-gray-400">${bookList[i].author}</h6>
                 <a href="${bookList[i].bookFile}?t=${new Date().getTime()}" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read PDF
                    </a>
            </div>
        </div>`;
    }
    document.getElementById('display').innerHTML = cartona;
}

function deleteBooks(i) {
    bookList.splice(i, 1);
    localStorage.setItem('books', JSON.stringify(bookList));
    displayBooks();
}

function searchInput() {
    let term = search.value.toLowerCase(); 
    let option = searchOption.value; 

    let cartona = "";
    for (let i = 0; i < bookList.length; i++) {
        let searchField = option === "name" ? bookList[i].bName : bookList[i].author;
        
        if (searchField.toLowerCase().includes(term)) {
            cartona += `
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <button type="button" onclick="deleteBooks(${i})" id="delete" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">X</button>
                <a href="#">
                    <img class="rounded-t-lg" src="${bookList[i].image}" alt="book" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${bookList[i].bName}</h5>
                    </a>
                    <h6 class="mb-3 font-normal text-gray-700 dark:text-gray-400">${bookList[i].author}</h6>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read
                    </a>
                </div>
            </div>`;
        }
    }
    document.getElementById("display").innerHTML = cartona;
}


search.addEventListener("keyup", searchInput);


displayBooks();
