const addButton = document.getElementById("addButton");
const tagInput = document.getElementById("tagInput");
addButton.addEventListener("click", addListItem);

function addListItem() {
    const myList = document.getElementById("tags-container");
    const newListItem = document.createElement("li");
    newListItem.textContext = tagInput.innerText;

    myList.appendChild(newListItem);
}




