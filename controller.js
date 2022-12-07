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
      borderColor = model.inventory.contents[x].color
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
  model.lootQueryDisplay = "";
  itemIndex = parseInt(index);
  let item = model.inventory.contents[itemIndex];
  let damage = "";
  let hitPoints = "";
  let armor = "";
  let itemColor = item.color;
  let consume = "";
  if (item.bonusDamage != undefined) {
    damage = `<div>Bonus Damage: ` + item.bonusDamage + `</div><br>`;
  } else if (item.HealthPoints != undefined) {
    hitPoints = `<div>Health: ` + item.HealthPoints + `</div><br>`;
  } else if (item.bonusArmor != undefined) {
    armor = `<div>Bonus Armor: ` + item.bonusArmor + `</div><br>`;
  }
  if (item.category === "Consumable") {
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
    armor +
    `<div>Description: "${item.description}"</div>
  </div>
  <div class="actionBox itemInfo" style="text-align: center;">Actions:
    <button onclick="discardItem(${itemIndex})">Discard</button>
    <button onclick="sellItem(${itemIndex})">Sell for ${item.value} credits</button><br>` +
    consume +
    `</div>`;
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
  model.itemTooltip = "";
  mainView();
}

function walkOn() {
  selectRandomBackground();
  model.health = model.health - 5;
  model.lootQueryDisplay = "";
  generateLoot();
  mainView();
}

function restart() {
  model.wallet = 0;
  model.inventory.contents = [];
  model.health = 100;
  model.currentBackground = "";
  mainView();
}

function generateLoot() {
  model.currentLoot = [];
  randomLootNumber = Math.floor(Math.random() * 5) + 3;
  for (i = 0; i < randomLootNumber; i++) {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber < 31) {
      model.currentLoot.push(
        model.itemsByQuality.Poor[
          Math.floor(Math.random() * model.itemsByQuality.Poor.length)
        ]
      );
    } else if (randomNumber < 51) {
      model.currentLoot.push(
        model.itemsByQuality.Common[
          Math.floor(Math.random() * model.itemsByQuality.Common.length)
        ]
      );
    } else if (randomNumber < 71) {
      model.currentLoot.push(
        model.itemsByQuality.Uncommon[
          Math.floor(Math.random() * model.itemsByQuality.Uncommon.length)
        ]
      );
    } else if (randomNumber < 91) {
      model.currentLoot.push(
        model.itemsByQuality.Rare[
          Math.floor(Math.random() * model.itemsByQuality.Rare.length)
        ]
      );
    } else if (randomNumber <= 100) {
      model.currentLoot.push(
        model.itemsByQuality.Epic[
          Math.floor(Math.random() * model.itemsByQuality.Epic.length)
        ]
      );
    }
  }
  createLootDisplay();
}

function createLootDisplay() {
  model.lootDisplay = "";
  loot = "";
  for (index in model.currentLoot) {
    currentItem = model.currentLoot[index];
    loot += `
    <div class="lootItem" style="border: solid ${currentItem.color} 3px" onclick="pickupItem(${index})"><div>"${currentItem.name}"</div>
      <img src="${currentItem.IMG}" class="img"/>    
    </div>
      `;
  }
  model.lootDisplay = `<div class="lootBox">${loot}</div>`;
}

function pickupItem(index) {
  model.itemTooltip = "";
  model.lootQueryDisplay = "";
  lootItem = model.currentLoot[index];
  lootItemHP = "";
  lootItemArmor = "";
  lootItemDamage = "";
  if (lootItem.bonusDamage != undefined) {
    lootItemDamage =
      `<div>Bonus Damage: ` + lootItem.bonusDamage + `</div><br>`;
  } else if (lootItem.HealthPoints != undefined) {
    lootItemHP = `<div>Health: ` + lootItem.HealthPoints + `</div><br>`;
  } else if (lootItem.bonusArmor != undefined) {
    lootItemArmor = `<div>Bonus Armor: ` + lootItem.bonusArmor + `</div><br>`;
  }
  model.lootQueryDisplay = `
<div class="lootQuery" style="border: solid ${lootItem.color} 4px">
<img src="IMG/Buttons/close-button.png" class="xButton" onclick="clearAndUpdateLootQuery()"/>  
<div style="text-align: center; font-size: x-large">"${lootItem.name}"</div><br>
  <div>${lootItem.quality}</div><br>
  <div>Type: ${lootItem.category}</div><br>
  <div>Value: ${lootItem.value}</div><br>
  ${lootItemHP}${lootItemArmor}${lootItemDamage}
  <div>Description:<br><br> "${lootItem.description}"</div><br>
  <button onclick="pickUpLoot(${index})">Pick up</button>
  <button onclick="discardLoot(${index})">Discard</button>
</div><br>  
`;
  mainView();
}

function pickUpLoot(index) {
  model.inventory.contents.push(model.currentLoot[index]);
  model.currentLoot.splice(index, 1);
  createLootDisplay();
  model.lootQueryDisplay = "";
  mainView();
}

function discardLoot(index) {
  model.currentLoot.splice(index, 1);
  createLootDisplay();
  model.lootQueryDisplay = "";
  mainView();
}

function clearAndUpdateLootQuery() {
  model.lootQueryDisplay = "";
  mainView();
}
