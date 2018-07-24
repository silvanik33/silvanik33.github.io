jQuery("#credits").on("click", function() {
var message = "Game created by Silvano!";
jQuery("#credits").append(
"<p>" + message + "</p>"
);
});


function registerScore(score) {
  append(
  "<p>"+ score + "</p>"
);
}

jQuery("#creditsbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<div>" + "Game created by Silvano!" + "</div>"
);
});
jQuery("#helpbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<ul>"
+ "<li>" + "Press SPACE to reverse gravity" + "</li>"
+ "<li>" + "Avoid the incoming pipes" + "</li>"
+ "</ul>"

);
});
