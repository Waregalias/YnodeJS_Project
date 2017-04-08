 'use strict'
 
 var socketConnection = io.connect("https://tp-thomassifferlen-thomassif.c9users.io:8080");
 
            var app = angular.module('ChatApp', []);
            
             
             
              var colorcode = "#ecf0f1";
             
             window.addEventListener("keydown", keypress, false);
             
             function ready()
             {
                 var tmp = $(window).height();
                 document.getElementById("messages").style.height = tmp.toString() + "px";
             }
             
             function keypress(e)
             {
                 if(e.keyCode == 13)
                 {
                     angular.element(document.getElementById('Body')).scope().Send();
                 }
             }
             
             function ChangeColorcode(newcode)
             {
                 colorcode = newcode;
                 document.getElementById('buttonsubmit').style.backgroundColor = colorcode;
             }
            
            app.controller('Chatctrl', function($scope, $http)
            {
            
                socketConnection.on('message', function(message) 
                {
                    
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
                
                $scope.Send = function Send()
                {
                    
                    
                    var NewName = $('#Name').val();
                    var NewMessage = $('#Message').val();
                    $('#Message').val("");
                    
                    console.log(NewMessage);
                    
                    if(NewName =="" || !NewName)
                    {
                        NewName = "Anon";
                    }
                    
                    if(NewName != "" && NewMessage != "")
                    {
                        console.log("Send");
                        socketConnection.emit('newmessage', {user : NewName ,msg : NewMessage, color : colorcode});
                    }
                }
                
                     
            });