var countDownDate = new Date("Feb 23, 2020 13:00:00").getTime();

function doCountdownTick() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("countdown-text").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-text").innerHTML = "ENDED";
  }
}

// Update the count down every 1 second
doCountdownTick();
var x = setInterval(doCountdownTick, 1000);

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const TWITTER_PROXY = "https://steem.tools/twitterbud/imageloader39023523.php?twitter=";

function getTwitterData() {
$.get("https://steem.tools/twitterbud/index.php", "", function(twitter){
  $("main").html("");
  var statuses = shuffle(twitter["statuses"]);

  statuses.slice(0,6).forEach(function(value) {
    let media = "";
    try {
      media = "<div alt='Media from twitter' style='background-image:url(" + TWITTER_PROXY + value["entities"]["media"][0]["media_url_https"] + ");'></div>";
    } catch {}
    let profile = "";
    try {
      profile = '<img class="avatar" alt="Profile Image" src="' + TWITTER_PROXY + value["user"]["profile_image_url_https"] + '">';
    } catch {}
    $(
'<div class="tweet"><div class="profile">' + profile + '<div><p class="username">' + value["user"]["name"] + '</p><p class="bio">' + value["user"]["description"] + '</p></div><div class="divider"></div><p class="message">' + value["text"] + '</p><div class="image-box">' + media + '</div></div></div>').appendTo("main");
  });
}, "JSON");
}

getTwitterData();

setInterval(getTwitterData, 60000);