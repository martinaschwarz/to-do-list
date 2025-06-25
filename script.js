const newItemInput = document.getElementById("item-input");
const newItemBtn = document.getElementById("add-btn");
const list = document.getElementById("drag-list");

let draggedItem = null;
let itemId = 0;

const addItem = (text) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("key", itemId);
  listItem.draggable = "true";
  listItem.className = "draggable-item";
  listItem.innerHTML = `<div>
                          <input type="checkbox" id="item-${itemId}" class="native-toggle" />
                          <label for="item-${itemId}" class="custom-label">
                            <div class="custom-toggle"></div>
                            <span class="label-text">${text}</span>
                          </label>
                        </div>
                        <button class="del-btn">Delete</button>`;

  listItem.querySelector(".del-btn").addEventListener("click", () => {
    listItem.remove();
  });

  list.appendChild(listItem);
};

newItemBtn.addEventListener("click", () => {
  const itemText = newItemInput.value.trim();
  if (itemText !== "") {
    addItem(itemText);
    newItemInput.value = "";
    itemId++;
  }
});

document.addEventListener("change", (e) => {
  if (e.target.matches(".native-toggle")) {
    const customToggle =
      e.target.nextElementSibling.querySelector(".custom-toggle");
    const label = e.target.nextElementSibling.querySelector(".label-text");

    customToggle.classList.toggle("checked", e.target.checked);
    label.classList.toggle("struck", e.target.checked);
  }
});

list.addEventListener("dragstart", (e) => {
  if (e.target.matches(".draggable-item")) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = "move";
  }
});

list.addEventListener("dragover", (e) => {
  e.preventDefault();

  const target = e.target.closest(".draggable-item");
  if (!target || target === draggedItem) {
    return;
  }
  const bounding = target.getBoundingClientRect();
  const offset = e.clientY - bounding.top;

  if (offset < bounding.height / 2) {
    list.insertBefore(draggedItem, target);
  } else {
    list.insertBefore(draggedItem, target.nextSibling);
  }
});

list.addEventListener("drop", (e) => {
  e.preventDefault();
});

list.addEventListener("dragend", () => {
  draggedItem = null;
});
