function selectRandomBackground() {
  let newBackground = model.backgrounds[Math.floor(Math.random() * 7)];
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
  let damage = "";
  let hitPoints = "";
  let itemColor = item.color;
  let consume = "";
  if (item.bonusDamage != undefined) {
    damage = `<div>Bonus Damage: ` + item.bonusDamage + `</div><br>`;
  } else if (item.HealthPoints != undefined) {
    hitPoints = `<div>Health: ` + item.HealthPoints + `</div><br>`;
  }
  if (item.category === "consumable") {
    consume = `<button onclick="consumeItem(${itemIndex})">Consume</button><div>(For ${item.HealthPoints} health)</div>`;
  }

  model.itemTooltip =
    `
  <div class="itemInfo" style="border: solid ${itemColor} 4px"><img src="IMG/Buttons/close-button.png" class="xButton" onclick="clearAndUpdate()"/>
    <div>"${item.name}"</div><br>
    <div>Quality: ${item.quality}</div>
    <div>Value: ${item.value}</div>` +
    damage +
    hitPoints +
    `<div>Description: "${item.description}"</div>
  </div>
  <div class="actionBox itemInfo" style="text-align: center;">Actions:
    <button onclick="discardItem(${itemIndex})">Discard</button>
    <button onclick="sellItem(${itemIndex})">Sell for ${item.value} credits</button><br>` +
    consume +
    `</div>
    `;

  mainView();
}

function clearAndUpdate() {
  model.itemTooltip = "";
  mainView();
}

function discardItem(inventoryIndex) {
  model.inventory.contents.splice(inventoryIndex, 1);
  model.itemTooltip = "";
  mainView();
}

function consumeItem(inventoryIndex) {
  model.health =
    model.health + model.inventory.contents[inventoryIndex].HealthPoints;
  if (model.health > 100) {
    model.health = 100;
  }
  model.inventory.contents.splice(inventoryIndex, 1);
  model.itemTooltip = "";
  mainView();
}

function generateHealthBox() {
  return `
  <div class="cornerBox healthBox">
    <div>Health</div>
    <meter class="healthMeter" id="health" min="0" low="25" optimum="100" high="55" max="100" value="${model.health}"></meter>
    <div>${model.health} / 100 HP</div>
  </div>`;
}
function generateCoins() {
  return `
  <div class="cornerBox coinBox">
    <div>Coins:</div>
    <div style="font-size: 22px; color: lightgreen">${model.wallet}</div>
  </div>
  `;
}

function sellItem(inventoryIndex) {
  model.wallet = model.wallet + model.inventory.contents[inventoryIndex].value;
  model.inventory.contents.splice(inventoryIndex, 1);
  mainView();
}
