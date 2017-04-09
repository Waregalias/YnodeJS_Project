/* jshint sub:true */
var socketConnection = io.connect("http://localhost:3000/");
var app = angular.module('ChatApp', ['ngCookies']);
var colorcode = "#ecf0f1";

function ChangeColorcode(newcode) {
   colorcode = newcode;
   document.getElementById('buttonsubmit').style.backgroundColor = colorcode;
}

app.controller('Chatctrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  socketConnection.on('message', function(message) {
      var tmpHtml =  document.getElementById("messages").innerHTML;
      var dateconverted = "INFO";
      if (message['date'])
      {
          dateconverted = (new Date(message['date'])).toUTCString();
      }
       //tmpHtml =  "</br>"+"<div class=\"msg\" style=\"background-color : "+ message['color'] +"\"><span style=\"font-weight: bold\">"+  message['user'] +" [" + dateconverted +"]</span></br>"+ message['msg'] +" </div>" + tmpHtml;
       tmpHtml = "<li class=\"right clearfix\"><span class=\"chat-img pull-right\"><div class=\"colormessage\"  style=\"background-color : "+ message['color'] +"\">"+ message['user'].charAt(0) +"</div></span><div class=\"chat-body clearfix\"><div class=\"header\"><small class=\" text-muted\"><i class=\"fa fa-clock-o fa-fw\"></i>" + dateconverted + "</small><strong class=\"pull-right primary-font\">"+message['user']+"</strong></div><p>"+ message['msg'] +"</p></div></li>" + tmpHtml;
       document.getElementById("messages").innerHTML   =  tmpHtml;
  });
  $scope.Send = function Send() {
      var NewName = $('#Name').val();
      var NewMessage = $('#Message').val();
      $('#Message').val("");
      if(NewName === "" || !NewName)
      {
          NewName = $cookies.get('user');
      }
      if(NewName !== "" && NewMessage !== "")
      {
          socketConnection.emit('newmessage', {user : NewName ,msg : NewMessage, color : colorcode});
      }
  };
}]);
