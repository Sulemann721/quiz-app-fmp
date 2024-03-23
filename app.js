  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getDatabase,ref,onChildAdded } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBWnTjILlInEdPZivtz1CQPhfdlXxWpv6Y",
    authDomain: "quiz-app-fmpp.firebaseapp.com",
    projectId: "quiz-app-fmpp",
    storageBucket: "quiz-app-fmpp.appspot.com",
    messagingSenderId: "984629760426",
    appId: "1:984629760426:web:4d018a51f46ddcc7b25bd3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase()


  window.getDataFromDatabase  = function (){
        
    const reference = ref(db,'Question/')
    onChildAdded(reference,function(data){
        console.log(data.val())
        questions.push(data.val())
        showQuestion()
        // console.log("Check")
    })
}
 getDataFromDatabase()
 

var questions = [
    {
        question:"Html Stands For _________",
        option: ["Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language"
        ],
        correctAnswer: "Hypertext markup language",
    },

];


 var displayQuestion = document.getElementById("displayQuestion")
 var optionParent = document.getElementById("optionParent")
 var currentQuestion = document.getElementById("currentQuestion")
 var totalQuestion = document.getElementById("totalQuestion")
 var quizDisplay = document.getElementById("quizDisplay")

 var resultDisplay = document.getElementById("resultDisplay")
 var percentage = document.getElementById("percentage")
 var startAgain = document.getElementById("startAgain")
 var timer = document.getElementById("timer")
 var box = document.getElementById("box")
 var prevQues = document.getElementById("prevQues")

 
 var indexValue = 0;
 var marks = 0 ;
 
 window.startQuiz = function (val) {
        box.setAttribute("class","d-none")  
        quizDisplay.setAttribute("class","d-block")
        

      setInterval(() => {
            timer.innerHTML--
            if(timer.innerHTML == 0 ){
                timer.innerHTML = 60
                timer.innerHTML--
                nextQuestion()
                prevQues.setAttribute("class","d-block")
                prevQues.setAttribute("class",`btn btn-success ps-3 pe-3 rounded`)
                
            }

        }, 1000);
        
    }

   
     
     
     window.showQuestion  = function () {
        // console.log(data.val())
         optionParent.innerHTML = ""
         
     displayQuestion.innerHTML = questions[indexValue].question

    for(var i = 0; i<questions[indexValue].option.length; i++){

        var optionvalue = questions[indexValue].option[i];
        var correctvalue = questions[indexValue].correctAnswer;
        
        optionParent.innerHTML += `<button class="btn bg-success option p-2 rounded m-2"
        onclick="checkQuestion('${optionvalue}','${correctvalue}')" >${questions[indexValue].option[i]} </button>`
        
    }
    totalQuestion.innerHTML = questions.length
    currentQuestion.innerHTML = indexValue + 1
 }
 
 

window.nextQuestion  =function () {
     
     optionParent.innerHTML = ""
    if(indexValue + 1  == questions.length){
        quizDisplay.setAttribute("class","d-none")
        resultDisplay.setAttribute("class","d-block")
        
        
        //  

        var totalmarks = (marks / questions.length) * 100;
        
        percentage.innerHTML = `Result: ${marks} out of ${questions.length} <br> Your Percentage is ${totalmarks.toFixed(2)}%  `;
                              

    }

    else{
        prevQues.setAttribute("class","d-block")
        prevQues.setAttribute("class",`btn btn-success ps-3 pe-3 rounded`)
        indexValue++
        timer.innerHTML = 60
        showQuestion()        

     
    }
    
 }

window.previousQuestion  = function (val) {
    console.log("previous")
    
    if(indexValue > 0){
          optionParent.innerHTML = ""
        indexValue--
        showQuestion()
    }
   

   

 }

 
window.checkQuestion  = function (a,b) {
    // console.log(a,b)
    if(a == b) {
        marks++;
        nextQuestion()
        console.log()
    }   
    else{
        nextQuestion()
    }
 }


window.startagain = function () {

    indexValue = 0 
    marks = 0      
    timer.innerHTML = 60
    prevQues.setAttribute("class","d-none")

    resultDisplay.setAttribute("class","d-none")
    quizDisplay.setAttribute("class","d-block")
    showQuestion()
    
}