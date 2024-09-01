//tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filterInput = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

// butona submit olayı ekleme

function eventListeners(){
    // bu fonksiyonun görevi event listener atamak
    form.addEventListener("submit",addTodo);
    
}
function addTodo(e){
    //todoInputa girilen değeri almak için :
    const newTodo = todoInput.value.trim();
    //console.log(newTodo); //input alanına girilen değeri todo ekleyin butonuna tıkladıktan sonra console'a yazdırdı
    // trim() : input alanına girilen değerin başındaki ve sonundaki gereksiz boşlukları siler 

    //input alanına girilen todo , todolar kısmına list item olarak eklenecek :
    addTodoToUI(newTodo);

    e.preventDefault();
}
function addTodoToUI(newTodo){  //input alanına girilen todo , todolar kısmına list item olarak eklenecek :

    //      <li class="list-group-item d-flex justify-content-between">
    //     Todo 1
    //     <a href="#" class="delete-item">
    //       <i class="fa fa-remove"></i>
    //     </a>
    //   </li> 
    //bu yapıyı oluşturacağız

    // list item oluşturma
    const listItem = document.createElement("li"); // todoInput alanına bir değer girdik, submit olayı sonrası consoleda li boş li etiketi yazıldı
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    console.log(listItem);

    listItem.className = "list-group-item d-flex justify-content-between";

    //text node ekleme
    listItem.appendChild(document.createTextNode(newTodo)); //input alanına girilen değeri list item olarak ekler
    
    // list item içindeki linki ekleme
    listItem.appendChild(link); 

    // li etiketini ul(todoList) içine ekleme
    todoList.appendChild(listItem);

    todoInput.value = ""; // input alanına girilen değer todo ekleyin butonuna tıklanıp todolar kısmına eklendikten sonra input alanı temizlenir 
};