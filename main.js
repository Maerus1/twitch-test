$(function(){
  var users = ["freecodecamp", "lowkotv", "juliesss", "koshkiisc", "medrybw", "missmagitek", "nathanias","kanesc2","majinphil","polt", "raggen71"];
  var used = []; //this helps prevent the creation of duplicates
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
    ); //learn about MIME checking
});
$.getJSON('https://api.twitch.tv/kraken/streams/' + users[i], function(obj){
  if(obj.stream !== null){ //highlight if online (green)
    $(".name" + i.toString()).css("background-color", "rgba(255, 255, 255, 0.5)");
  }
});
})(i); //this (function(i){})(i); prevents the for loop above it from going straight to the end when it goes through the callback function
}

  var box = $("#box");
  var texts = $("#texts");
  $(box).keyup(function(){
    $(texts).text($(this).val());
    if($(this).val() !== ''){
      $("p:not(:contains(" + $(this).val() + "))").closest("div").hide();
    }
    else {
      $("p").closest("div").show();
    }
  });

  //add new streamer to list and re-populate
  var add = $("#add");
  add.keypress(function(){
    if(event.which === 13){
      users.push(add.val());
      $.getJSON("https://api.twitch.tv/kraken/channels/" + add.val(), function(obj){
        text.append(
          "<a href='" + obj.url + "' target='_blank'>" +
          "<div class='name" + users.length.toString() + "'>" +
          "<img src='" + obj.logo + "'/>" +
          "<p style='display:inline'>" + obj.display_name + "</p><br/><br/>" +
          "</div>" +
          "</a>"
        );
    }).error(function(){
      console.log("File not found!");
    });

    $.getJSON('https://api.twitch.tv/kraken/streams/' + add.val(), function(obj){
      if(obj.stream !== null){ //highlight if online (green)
        $(".name" + users.length.toString()).css("background-color", "rgba(255, 255, 255, 0.5)");
      }

    });
    }
  });


});
