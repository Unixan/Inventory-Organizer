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
    let array = model.items[item.quality];
    if (!array) array = model.items[item.quality] = [];
    array.push(item);
  }
}
