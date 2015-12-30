$(function(){
  var users = ["freecodecamp", "lowkotv", "juliesss", "koshkiisc", "medrybw", "missmagitek", "nathanias","kanesc2","majinphil","polt", "raggen71"];
  var text = $("#text");

  for(var i in users){
    (function(i){
  $.getJSON("https://api.twitch.tv/kraken/channels/" + users[i], function(obj){
    text.append(
      "<a href='" + obj.url + "' target='_blank'>" +
      "<div class='name" + i.toString() + "'>" +
      "<img src='" + obj.logo + "'/>" +
      "<p style='display:inline'>" + obj.display_name + "</p><br/><br/>" +
      "</div>" +
      "</a>"
    ); //create elements to be contained within a div containing the correct info from the twitch API
  //  console.log(names[i]); //learn about MIME checking
  console.log(obj);
});
$.getJSON('https://api.twitch.tv/kraken/streams/' + users[i], function(obj){
  if(obj.stream !== null){ //highlight if online (green)
    $(".name" + i.toString()).css("background-color", "green");
  }
});
})(i); //this (function(i){})(i); prevents the for loop above it from going straight to the end when it goes through the callback function
}
});
