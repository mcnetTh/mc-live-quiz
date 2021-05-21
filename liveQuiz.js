

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

             let countAnswer = 0;
    
  let userScore = {};
  let userAnswer = {};


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
           countAnswer = 0
           console.log(val);

           nsp.emit("startQuestion", {
             countAnswer: countAnswer,
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

 

     socket.on("setMember", function(member_id) {
       users[member_id] = member_id;
       socketList[socket.id] = member_id; 

    
        nsp.emit("userOnline", {userOnline:users, totalOnline:Object.keys(users).length});
     });

         socket.on("setYoutube", function(val) {
           youtubeID = val;
           nsp.emit("YoutubeID", youtubeID);
         });

       socket.on("getYoutube", function() {
         nsp.emit("YoutubeID", youtubeID);
       });



     socket.on("setMemberAnswer", function(data) {  
       console.log(data)

       if(data) {
         if(data.collect) {
           if(data.collect != 'C') {

               countAnswer++;
               console.log(countAnswer);
               nsp.emit("countAnswer", {
                 countAnswer,
               });
              
           }
         }
       }
     
      //userAnswer[data.member_id][data.question_no] = data.collect

    //  let uAnswer =  userAnswer[data.member_id] ;

     // uAnswer[data.question_no] = data.collect
        // console.log('XXX');
        // console.log(uAnswer);
         
       //  uAnswer[data.question_no] = '56445465' 

          //userAnswer[data.member_id][data.question_no] = data.collect;

        
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
             

                userScore = val.userScore;
                userAnswer = val.userAnswer;

               console.log(userScore);
               console.log(userAnswer);


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