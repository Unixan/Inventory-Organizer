function mainView() {
  // if (model.currentBackground === "") {
  //   selectRandomBackground();
  //   createQualityObjectLists();
  
  let html = '';
  html += /*HTML*/`
  <p class="mainInfo">You look around you and discover that there recently was a battle here. Dead bodies of animals and humans lie around you. You search the bodies and discover:</p>
  `
  if (model.inventory.isOpen === true){
    html += inventory()
  }
  model.html.appDiv.innerHTML = html;
}
