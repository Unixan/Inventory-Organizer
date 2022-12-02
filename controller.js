function selectRandomBackground() {
  let newBackground = model.backgrounds[Math.floor(Math.random() * 8)];
  if (newBackground === model.currentBackground) {
    selectRandomBackground();
  } else {
    model.currentBackground = newBackground;
  }
  document.body.style.backgroundImage = "url(" + model.currentBackground + ")";
}

function createQualityObjectLists() {
  for (let item of model.loot) {
    let array = model.itemsByQuality[item.quality];
    if (!array) array = model.itemsByQuality[item.quality] = [];
    array.push(item);
  }
}

function inventory() {
  let inventoryBoxes = generateInventorySlots();
  let inventoryScreen = /*HTML*/ `
  <div class="inventoryBox">${inventoryBoxes}</div>
  `;
  return inventoryScreen;
}

function generateInventorySlots() {
  let inventorySlots = "";
  for (x = 0; x < 50; x++) {
    let inventoryItem = "";
    if (model.inventory.contents[x] !== undefined) {
      inventoryItem = model.inventory.contents[x].icon;
      inventorySlots += `<div class="inventorySlot"><img src="${inventoryItem}" id="${x}" class="icon" onmouseover="displayItemInfo(this.id)" onmouseleave="clearMouseoverItem()"/></div>`;
    } else {
      inventorySlots += `<div class="inventorySlot"></div>`;
    }
  }
  return inventorySlots;
}
function openInventory() {
  model.inventory.isOpen = !model.inventory.isOpen;
  mainView();
}

function displayItemInfo(index) {
  model.mouseOverItem = model.inventory.contents[index];
  console.log(model.mouseOverItem);
  return /*HTML*/ `
  <p>Name: ${model.mouseOverItem}</p>
  `;
}

function clearMouseoverItem() {
  model.mouseOverItem = "";
  console.log(model.mouseOverItem);
  mainView();
}
