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
    
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI); //sayfa her yüklendiğinde, localStorage'daki tüm todolar kullanıcı arayüzüne (UI) eklenir.

    secondCardBody.addEventListener("click",deleteTodo);

    filterInput.addEventListener("keyup",filterTodos);

    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //arayüzden todoları temizleme
       // todoList.innerHTML = ""; bu şekilde de yapılabilir
       while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
       }
       localStorage.removeItem("todos");
    }

};
function filterTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){

        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // Bulamazsa
            listItem.setAttribute("style","display:none !important");
        }else{
            listItem.setAttribute("style","display:block");
        };

    });

}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent); 
        //e.target.parentElement.parentElement.textContent arayüzde sildiğimiz todonun içeriğini local storagea gönderir
        showAlert("success","Todo başarıyla silindi");
    }
    //console.log(e.target); // tıkladığımız yeri gösterir
}

function deleteTodoFromStorage(todo){
    let todos = getTodosFromStorage();

    todos.forEach(function(deletetodo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // todos arrayinden arayüzden sildiğimiz todonun indexinden başlayarak 1 tane todo siler
        }

    });

    localStorage.setItem("todos",JSON.stringify(todos)); // todo silindikten sonra todos arrayinin güncel halinin local storageda olmasını sağlar
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    //getTodosFromStorage() fonksiyonunu çağırarak localStorage'dan tüm todoları alır. Bu fonksiyon, localStorage'daki "todos" anahtarına ait değeri bir dizi olarak döndürür.

    todos.forEach(function(todo){
        addTodoToUI(todo);
        //todos.forEach kullanarak, alınan her bir todo için addTodoToUI(todo) fonksiyonu çağrılır. Yani her todo, ekrana liste öğesi (list item) olarak eklenir.
    })
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
    //console.log(listItem);

    listItem.className = "list-group-item d-flex justify-content-between";

    //text node ekleme
    listItem.appendChild(document.createTextNode(newTodo)); //input alanına girilen değeri list item olarak ekler
    
    // list item içindeki linki ekleme
    listItem.appendChild(link); 

    // li etiketini ul(todoList) içine ekleme
    todoList.appendChild(listItem);

    todoInput.value = ""; // input alanına girilen değer todo ekleyin butonuna tıklanıp todolar kısmına eklendikten sonra input alanı temizlenir 
};