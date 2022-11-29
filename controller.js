function selectRandomBackground() {
  console.log(model.currentBackground)
  console.log(model.backgrounds)  
  model.currentBackground =
    model.backgrounds[Math.floor(Math.random() * 8)];
    console.log(model.currentBackground)
}
