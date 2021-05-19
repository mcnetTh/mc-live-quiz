/*    var express = require("express");
 var app = express();
 var http = require("http").Server(app);
 
 const io = require("socket.io")(http, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
     allowedHeaders: ["Access-Control-Allow-Origin"],
     credentials: true,
   },
 });

 console.log('ddd888dd')

   const nsp = io.of("/liveQuiz");
nsp.on("connection", function (socket) {
  console.log("someone connectedxxxx");
});
nsp.emit("hi", "everyone!");
 */

 

 // console.log('ooooo') 


  module.exports = function (io) {
      const  nsp = io.of("/liveQuiz");

        let questionPlayNo = 0;
        let playTime = null;
        let questionStatus = null;
          let openAnswer = 0;
          let youtubeID = null;
          let msg = null;
          let gameStatus  = 'H'
            let gameStartDate = null;
       
            let users = {};
            let socketList = {};
            let connectCounter = 0;
    




    nsp.on("connection", function (socket) {

 
    connectCounter++;
    console.log(connectCounter);
   
   


      
  socket.on("setOpenAnswer", function(q_no) {
    openAnswer = q_no;
    nsp.emit("openAnswer", {
      openAnswer,
    });
  });

         socket.on("setGameStatus", function(game) {
           gameStatus = game.status;
           gameStartDate = game.start_date;
           nsp.emit("gameStatus", {
             gameStatus: gameStatus,
             gameStartDate: gameStartDate,
           });
         });

          socket.on("setStartQuestion", function(val) {
            
          playTime = val.PlayTime;
           questionPlayNo = val.QuestionPlayNo; 
           questionStatus = 'PLAY'
           console.log(val);

           nsp.emit("startQuestion", {
             playTime: playTime,
             questionPlayNo: questionPlayNo,
             questionStatus: "PLAY",
           });
         });


      socket.on("setQuestionStatus", function(val) {
           questionStatus = val.questionStatus;
           questionPlayNo = val.questionPlayNo

           console.log(val);
          

        nsp.emit("questionStatus", {
          questionStatus: questionStatus,
          questionPlayNo: questionPlayNo,
        });
      });

   socket.on("setMsg", function(val) {
     msg = val;
     nsp.emit("Msg", msg);
   });

 

     socket.on("setMember", function(val) {
       users[val] = val;
       socketList[socket.id] = val; 

        nsp.emit("userOnline", {userOnline:users, totalOnline:Object.keys(users).length});
     });

         socket.on("setYoutube", function(val) {
           youtubeID = val;
           nsp.emit("YoutubeID", youtubeID);
         });

       socket.on("getYoutube", function() {
         nsp.emit("YoutubeID", youtubeID);
       });
    

     socket.on("disconnect", function() {

       console.log("offline : " + socket.id);
         connectCounter--;
         console.log(connectCounter);

      
       delete users[socketList[socket.id]];
      nsp.emit("userOnline", {userOnline:users, totalOnline:Object.keys(users).length});
     });


     
   

    








          socket.on("resetData", function(val) {
              questionPlayNo = 0;
              totalTime = null;
              questionStatus = null;
              openAnswer = 0;

               gameStatus = 'H';
               gameStartDate = null;
               nsp.emit("gameStatus", {
                 gameStatus: gameStatus,
                 gameStartDate: gameStartDate,
               });

             
          });


        socket.on("startBrowser", function(val) {
 
          nsp.emit("getStart", {
            questionStatus: questionStatus,
            questionPlayNo: questionPlayNo,
            userOnline: users,
            playTime: playTime,
            gameStatus: gameStatus,
            youtubeID:youtubeID,
            gameStartDate: gameStartDate,
            totalOnline: Object.keys(users).length,
          });
        });


        
 
 
 
    
    });



  };