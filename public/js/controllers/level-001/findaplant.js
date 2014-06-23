$(function(){ // Loads javascript after page 

var findaplant = function(input){ // accepts a plant
  $(input).on('click', function(){
    alert('you found a plant');
    pollon++
  });
}

var stopforsmoke = function(input){ // accepts a class
  $(input).on('click', function(){
    alert('you smoke some hash');
    pollon++
  });
}

var hitwall = function(input){
  $(input).on('click', function(){
    alert('you have hit a wall');
  })
}

}

