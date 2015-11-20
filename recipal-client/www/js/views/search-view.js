"use strict"

angular.$rootscope.$watch(
  "SearchCtrl.searchResults",
  function handleFooChange( newValue, oldValue ) {
    console.log( "Test: ", newValue );
  }
);

function buildTable(searchResults) {
  var resultTable = "<div class='row'>"
                + "<div class='col col-67'>Recipe</div>"
                + "<div class='col'>Difficulty</div>"
                + "<div class='col'>Select</div>"
                + "</div>";

  for (var i=0; i < searchResults.length; i++) {
    resultTable += "<div class='row'>"
                  + "<div class='col col-67'>" + searchResults[i].name + "</div>"
                  + "<div class='col'>" + searchResults[i].difficulty + "</div>"
                  + "<div class='col'><button onclick='onRecipeSelect()'>Select</button></div>"
                  + "</div>";
  }

  document.getElementById("searchresults").innerHTML = resultTable;
}

searchModel.updateSubscribe(function() {
  buildTable(searchModel.getResults());
});

function onRecipeSelect() {
    // \x22myNavigator.pushPage('recipetitlepage.html')\x22
    console.log("YAY!!!!");
  }