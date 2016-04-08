window.onload = function(){
console.log("yooo");
  var $scoreList = $('.scoreList');
  $.get('/scores', function(data){
    data.forEach(function(score){
      var scores = '<div class="score-container">'+'<div class="name">'+"Name: "+score.name+'</div>'+'<div class="score">'+"Score: "+score.score+'</div>'+'</div>'
      $scoreList.append(scores);
    })
  })

}
