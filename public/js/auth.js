window.onload = function(){
  var $scoreList = $('.scoreList');
  var counter = 0;

  $.get('/scores', function(data){
    data.forEach(function(score){
      counter += 1
      var scores = '<div class="score-container">'+'<div class="name">'+counter+ ". Name: "+score.name+'</div>'+'<div class="score">'+"Score: "+score.score+'</div>'+'</div>'
      $scoreList.append(scores);
    })
  })
}
