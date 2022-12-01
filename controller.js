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
    itemIcon = "";
    if (model.inventory.contents[x] == undefined) {
      itemIcon = "";
    } else {
      itemIcon = model.inventory.contents[x].icon;
    }
    inventorySlots += `<div class="inventorySlot" id="${x}">${itemIcon}</div>`;
  }
  return inventorySlots;
}
