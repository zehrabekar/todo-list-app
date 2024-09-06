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
    //burada submit eventini sadece butona değil input alanına da eklemiş olduk. böylece değer girdikten sonra butona basarak ya da enter tuşuna basarak submit olayı gerçekleşir
    
}
function addTodo(e){
   
    const newTodo = todoInput.value.trim();
    

    if(newTodo === ""){
        
        showAlert("danger","lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","todo başarıyla eklendi");
    };

    e.preventDefault();
}
function getTodosFromStorage(){ // storagedan tüm todoları alma
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //console.log(alert); //<div class="alert alert-danger">lütfen bir todo girin</div>

    //setTimeout
    setTimeout(function() {
        alert.remove();
    },1000);
    //çıkan mesaj 1 sn sonra ekrandan silinir

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