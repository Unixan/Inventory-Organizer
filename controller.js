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
      inventorySlots += `<div class="inventorySlot"><img src="${inventoryItem}" id="${x}" class="icon" onclick="displayItemInfo(this.id)" /></div>`;
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
  model.itemTooltip = "";
  itemIndex = parseInt(index);
  let item = model.inventory.contents[itemIndex];
  let itemColor = item.color;
  model.itemTooltip = `
  <div class="itemInfo" style="border: solid ${itemColor} 4px">
    <div>Name: ${item.name}</div>
    <div>Quality: ${item.quality}</div>
    <div>Value: ${item.value}</div>
    <div>Description: "${item.description}"</div>
  </div>
    `;
  console.log(model.itemTooltip);
  mainView();
}
