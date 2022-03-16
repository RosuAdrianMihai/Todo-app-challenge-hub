const listItem = document.querySelector("#listItem");
const secondaryMenu = document.querySelector("#secondaryMenu");
const mainMenu = document.querySelector("#mainMenu");
const toDark = document.querySelector("#to-dark");
const toLight = document.querySelector("#to-light");
const input = document.querySelector("#input");
const html = document.querySelector("html");
const addItem = document.querySelector("#addItem");
const list = document.querySelector("#list");
const bottomPart = document.querySelector("#bottom-part");

localStorage.setItem("filter", "All");


// Light/ Dark mode

function viewMode(){
    if(this.id == "to-dark"){
        localStorage.setItem("mode", "dark");
        html.classList.add("dark");
    } else{
        localStorage.setItem("mode", "light");
        html.classList.remove("dark");
    }
}

toDark.addEventListener("click", viewMode);
toLight.addEventListener("click", viewMode);

if(localStorage.getItem("mode") == "dark"){
    html.classList.add("dark");
} else html.classList.remove("dark");



// Adding items to the todo + status (completed/uncompleted)

let todos = [];
let statusItem = [];
let filterParameter = [];

function generateToDos(){
    let getLocalStorage = localStorage.getItem("toDo");
    let statusStorage = localStorage.getItem("status");

    if(getLocalStorage != null){
        todos.push(JSON.parse(getLocalStorage));
        todos = [...todos[0]];
    } else todos = [];
  
    if(statusStorage != null){
        statusItem.push(JSON.parse(statusStorage));
        statusItem = [...statusItem[0]];
    } else statusItem = [];

    todos.forEach(element => {
        const item = document.importNode(listItem.content, true);
        const toDoContent = item.querySelector("#todoContent");
        toDoContent.textContent = element;

        for(let i = 0; i < statusItem.length; i++){
            if(todos.indexOf(element) == statusItem[i]){
                const storedStatus = item.querySelector("#status");
                toDoCompleted(storedStatus);
            }
        }

        list.appendChild(item);
    })

    if (todos.length > 0){
        appendMenus();
        scrollbarFetch();
    }

    addEvents();

}

function addToDo(){
    if(input.value.trim() != ""){
       todos.push(input.value);
       localStorage.setItem("toDo", JSON.stringify(todos));

       const item = document.importNode(listItem.content, true);
       const toDoContent = item.querySelector("#todoContent");
       toDoContent.textContent = input.value;
       list.appendChild(item);
       input.value = "";
    } else input.value = "";

     appendMenus()
     scrollbarFetch();

     addEvents();
}

generateToDos();
addItem.addEventListener("click", addToDo);
document.addEventListener("keypress", (event) => {
    if(event.keyCode === 13)
    addToDo();
})


//Delete to do

function deleteTodo(el){
    let index;
    for(let i = 0; i < todos.length; i++){
    if(list.children[i] == el.parentNode){
         index = i;
         list.children[i].remove();
    }
}
    todos.splice(index, 1);
    
    for(let i = 0; i < statusItem.length; i++){
        if(statusItem[i] == index){
            statusItem.splice(i, 1);
        }
       if(statusItem[i] > index){
           statusItem[i] -= 1;
       }
    }
    
    localStorage.setItem("toDo", JSON.stringify(todos));
    localStorage.setItem("status", JSON.stringify(statusItem));

    appendMenus();
    scrollbarFetch();
}


//Complete a to do

function toDoCompleted(el){
    let index;

    if(!el.classList.contains("bg-gradient-to-br")){
        el.classList.add("bg-gradient-to-br", "from-from-g", "to-to-g");

        for(let i = 0; i < todos.length; i++){
        if(list.children[i] == el.parentNode.parentNode){
             index = i;
             statusItem.push(index);
             localStorage.setItem("status", JSON.stringify(statusItem));
             }
        }

    } else {
        el.classList.remove("bg-gradient-to-br", "from-from-g", "to-to-g");

        for(let i = 0; i < todos.length; i++){
            if(list.children[i] == el.parentNode.parentNode){
                 index = i;
                 for(let j = 0; j < statusItem.length; j++){
                 if(statusItem[j] == index){
                 statusItem.splice(j, 1);
                 localStorage.setItem("status", JSON.stringify(statusItem));
                   }
                 }
                }
            }
    }
    const showImage = el.querySelector("#taskCompleted");
    showImage.classList.toggle("hidden");
    const paragraph = el.parentNode.querySelector("#todoContent");
    paragraph.classList.toggle("line-through"); 
    paragraph.classList.toggle("text-dark-completed");
}



// Appending the menus

function appendMenus(){
    const secMenu = document.importNode(secondaryMenu.content, true);
    const numberItems = secMenu.querySelector("#itemsNumber");
    const prinMenu = document.importNode(mainMenu.content, true);

    const deleteFor = 2;

    let itemsLeft = 0;

    for(let i = 0; i < list.children.length; i++){
        if(list.children[i].classList.contains("flex"))
        itemsLeft++;
    }

    numberItems.textContent = `${itemsLeft} items left`;

    
    if(bottomPart.children.length > 2){
        for(let i = 0; i < deleteFor; i++){
            bottomPart.lastElementChild.remove();
        }
        if(todos.length > 0){
            bottomPart.appendChild(secMenu);
            bottomPart.appendChild(prinMenu);
        }
    } else if(todos.length > 0){
        bottomPart.appendChild(secMenu);
        bottomPart.appendChild(prinMenu);
    }

    if(todos.length > 0)
    colorOfMenu();

}



// Color of main menu

function colorOfMenu(){
    const menu = bottomPart.querySelector("#filter-menu");

    for(let i = 0; i < 3; i++){
        menu.children[i].classList.remove("text-filter-selected");
        if(menu.children[i].textContent == localStorage.getItem("filter")){
            menu.children[i].classList.add("text-filter-selected");
        }
    }
}



// Scrollbar

function scrollbarFetch(){
    if(todos.length > 0){
    for(let i = 0; i < list.children.length; i++){
        if(list.children[i].classList.contains("flex")){
            itemHeight = list.children[i].clientHeight;
            break;
        }
    }

    let displayedItems = 0;

    for(let i = 0; i < list.children.length; i++){
        if(list.children[i].classList.contains("flex")){
            displayedItems++;
        }
    }

    const phoneListHeight = itemHeight * 6;
    const desktopListHeight = itemHeight * 4;

    if(innerWidth < 640){
        if(displayedItems > 6){
            list.classList.add("scrollbar", "w-[103%]");
            list.setAttribute("style", `height:${phoneListHeight + 10}px`);  
        } else {
        list.classList.remove("scrollbar", "w-[103%]");
        list.removeAttribute("style");
    } 
   }

    if(innerWidth > 640){
        if(displayedItems > 4){
            list.classList.add("scrollbar", "w-[102%]");
            list.setAttribute("style", `height:${desktopListHeight + 5}px`); 
        } else {
            list.classList.remove("scrollbar", "w-[102%]");
            list.removeAttribute("style");
    } 
  }
 }
}



// Clear completed todos

 function clearCompleted(){
    for(let i = 0; i < list.children.length; i++){
        const itemToDelete = list.children[i].querySelector("#todoContent");
        if(itemToDelete.classList.contains("line-through")){
            list.children[i].remove();
            todos.splice(i, 1);
            localStorage.setItem("toDo", JSON.stringify(todos)); 

            i = -1;
        }
    }
    statusItem = [];
    localStorage.setItem("status", JSON.stringify(statusItem));

    scrollbarFetch();
    appendMenus();
}



//Filter items

function filterItems(filterList, el2){
    localStorage.setItem("filter", filterList);

    const filterStorage = localStorage.getItem("filter");

    const parentMenu = document.querySelector("#filter-menu");

    if(filterStorage == "All"){
        for(let i = 0; i < list.children.length; i++){
            list.children[i].classList.remove("hidden");
            list.children[i].classList.add("flex");
        } 
        for(let j = 0; j < 3; j++){
            parentMenu.children[j].classList.remove("text-filter-selected");
        }
        el2.classList.add("text-filter-selected");
    } else if(filterStorage == "Active"){

        for(let j = 0; j < 3; j++){
            parentMenu.children[j].classList.remove("text-filter-selected");
        }
        el2.classList.add("text-filter-selected");

      for(let i = 0; i < list.children.length; i++){
         const stateItem = list.children[i].querySelector("#todoContent");

         if(stateItem.classList.contains("line-through")){
             list.children[i].classList.remove("flex");
            list.children[i].classList.add("hidden");
         } else {
             list.children[i].classList.remove("hidden");
             list.children[i].classList.add("flex");
        }
      }
    } else if(filterStorage == "Completed"){

        for(let j = 0; j < 3; j++){
            parentMenu.children[j].classList.remove("text-filter-selected");
        }
        el2.classList.add("text-filter-selected");

        for(let i = 0; i < list.children.length; i++){
            const stateItem = list.children[i].querySelector("#todoContent");
   
            if(stateItem.classList.contains("line-through")){
               list.children[i].classList.remove("hidden");
               list.children[i].classList.add("flex");
            } else {
                list.children[i].classList.add("hidden");
                list.children[i].classList.remove("flex");
         }
        }
    }

    appendMenus();
    scrollbarFetch();

}



// Drag and drop items

let dragStartIndex;
let dragStartStatus

function dragStart(){
     dragStartStatus = undefined;

    for(let i = 0; i < list.children.length; i++){
        if(list.children[i] == this){
            dragStartIndex = i;

            for(let j = 0; j < statusItem.length; j++){
                if(dragStartIndex == statusItem[j]){
                    dragStartStatus = j;
                }
            }
        }
    }
}

function dragOver(event){
    event.preventDefault();
}

function dragEnter(){
    this.classList.remove("dark:bg-dark-list");
    this.classList.add("bg-drag-over");
}

function dragLeave(){
    this.classList.remove("bg-drag-over");
    this.classList.add("dark:bg-dark-list");
}

function dragDrop(){
    let dragEndIndex;
    let dragEndStatus = undefined;

    for(let i = 0; i < list.children.length; i++){
        if(list.children[i] == this){
            dragEndIndex = i;

            for(let j = 0; j < statusItem.length; j++){
                if(dragEndIndex == statusItem[j]){
                    dragEndStatus = j;
                }
            }
        }
    }
       swapItems(dragStartIndex, dragEndIndex, dragStartStatus, dragEndStatus);

        this.classList.remove("bg-drag-over");
        this.classList.add("dark:bg-dark-list");
}

function swapItems(fromIndex, toIndex, dragStartStatus, dragEndStatus){
    const itemOne = list.children[fromIndex];
    const itemTwo = list.children[toIndex];

    let itemAux = document.createElement("div");

    itemAux.innerHTML = itemTwo.innerHTML;

    itemTwo.innerHTML = itemOne.innerHTML;
    itemOne.innerHTML = itemAux.innerHTML;

    let toDoAux = todos[toIndex];

    todos[toIndex] = todos[fromIndex];
    todos[fromIndex] = toDoAux;

    localStorage.setItem("toDo", JSON.stringify(todos));

    if(dragStartStatus != undefined && dragEndStatus == undefined){
        statusItem[dragStartStatus] = toIndex;
    } else if(dragStartStatus == undefined && dragEndStatus != undefined){
        statusItem[dragEndStatus] = fromIndex;
    }

    localStorage.setItem("status", JSON.stringify(statusItem));
}

function addEvents(){
   let draggablesItems = [...list.children];

   draggablesItems.forEach((element) => {
       element.addEventListener("dragstart", dragStart);
       element.addEventListener("dragenter", dragEnter);
       element.addEventListener("dragover", dragOver);
       element.addEventListener("dragleave", dragLeave);
       element.addEventListener("drop", dragDrop);
   })
}
