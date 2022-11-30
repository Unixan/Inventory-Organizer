function mainView() {
  if (model.currentBackground === "") {
    selectRandomBackground();
    createQualityObjectLists();
  }
  let html = "<div>Test</div>";
  model.html.appDiv.innerHTML = html;
}
