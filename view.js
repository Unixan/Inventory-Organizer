function mainView() {
  if (model.health > 0) {
    let buttonText = model.inventory.isOpen ? "Close Bag" : "Open Bag";
    if (model.currentBackground === "") {
      selectRandomBackground();
      createQualityObjectLists();
      generateLoot();
    }
    let html = "";
    html += /*HTML*/ `
  <div class="mainInfo">
    You look around you and discover that there recently was a battle here. Dead bodies of animals and humans lie around you.<br> You search the bodies and discover:
   </div>
    <button class="buttons walkOn" onclick="walkOn()">Walk on</button>
    <button class="inventory buttons" onclick="openInventory()">${buttonText}</button>
  
  
  `;
    if (model.inventory.isOpen === true) {
      html += inventory();
    } else {
      model.itemTooltip = "";
    }

    html += model.lootDisplay;
    html += model.lootQueryDisplay;
    html += model.itemTooltip;
    html += model.actionBox;
    html += generateHealthBox();
    html += generateCoins();
    model.html.appDiv.innerHTML = html;
  } else if (model.health <= 0) {
    html = /*HTML*/ `
    <p class="mainInfo" style="font-size: x-large">You died!</p>
    <button class="buttons walkOn" onclick="restart()">Restart</button>
    `;
    document.body.style.backgroundImage = "url(IMG/Backgrounds/1052.jpg)";
    model.html.appDiv.innerHTML = html;
  }
}
