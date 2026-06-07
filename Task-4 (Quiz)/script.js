const questions=[
    {
        question:"Which of the following is a high-level programming language?",//1
        answers:[
            { text: "Assembly", correct: false},
            { text: "Machine Language", correct: false},
            { text: "Python", correct: true},
            { text: "Binary", correct: false}
        ]
    },
    {
        question:"Which symbol is used for a single-line comment in Python?",//2
        answers:[
            { text: "//", correct: false},
            { text: "#", correct: true},
            { text: " &lt; !-- -- &gt; ", correct: false},
            { text: "/* */", correct: false}
        ]
    },
    {
        question:"Which of the following tag is used to embed css in html page?",//3
        answers:[
            { text: " &lt; css &gt; ", correct: false},
            { text: " &lt; !DOCTYPE html &gt; ", correct: false},
            { text: " &lt; script &gt; ", correct: false},
            { text: " &lt; style &gt; ", correct: true}
        ]
    },
    {
       question:"Which of the following can be used to call a JavaScript Code Snippet?",//4
        answers:[
            { text: "Function/Method", correct: true},
            { text: "Preprocessor", correct: false},
            { text: "Triggering Event", correct: false},
            { text: "RMI", correct: false}
        ] 
    },
    {
        question:"What is PHP?",//5
        answers:[
            { text: "PHP is an open-source programming language", correct: false},
            { text: "PHP is used to develop dynamic and interactive websites", correct: false},
            { text: "PHP is a server-side scripting language", correct: false},
            { text: "All of the mentioned", correct: true}
        ] 
    },
    {
        question:" Which HTML tag is used to create a hyperlink?",//6
        answers:[
            { text: " &lt; link &gt; ", correct: false},
            { text: " &lt; href &gt; ", correct: false},
            { text: " &lt; a &gt; ", correct: true},
            { text: " &lt; hyperlink &gt; ", correct: false}
        ] 
    },
    {
        question:"Which of the following is a type of cloud computing service?",//7
        answers:[
            { text: "Service-as-a-Software (SaaS)", correct: false},
            { text: "Software-and-a-Server (SaaS)", correct: false},
            { text: "Software-as-a-Service (SaaS)", correct: true},
            { text: "Software-as-a-Server (SaaS)", correct: false}
        ] 
    },
    {
        question:"What is Linux primarily known as?",//8
        answers:[
            { text: "A Web Server", correct: false},
            { text: "An Operating System", correct: true},
            { text: "A Programming Language", correct: false},
            { text: "A Hardware Platform", correct: false}
        ]  
    },
    {
        question:"Who is the father of C language?",//9
        answers:[
            { text: "Steve Jobs", correct: false},
            { text: "James Gosling", correct: false},
            { text: "Dennis Ritchie", correct: true},
            { text: "Rasmus Lerdorf", correct: false}
        ]  
    },
    {
        question:"What is a data structure?",//10
        answers:[
            { text: "A programming language", correct: false},
            { text: "A collection of algorithms", correct: false},
            { text: "A way to store and organize data", correct: true},
            { text: "A type of computer hardware", correct: false}
        ] 
    },
    {
        question:"What is the extension of java code files?",//11
        answers:[
            { text: ".js", correct: false},
            { text: ".txt", correct: false},
            { text: ".class", correct: false},
            { text: ".java", correct: true}
        ] 
    },
    {
        question:"Which feature of OOP indicates code reusability?",//12
        answers:[
            { text: "Abstraction", correct: false},
            { text: "Polymorphism", correct: false},
            { text: "Encapsulation", correct: false},
            { text: "Inheritance", correct: true}
        ] 
    },
    {
        question:"In Python, which keyword is used to define a function?",//13
        answers:[
            { text: "function", correct: false},
            { text: "def", correct: true},
            { text: "fun", correct: false},
            { text: "Inheritdefinence", correct: false}
        ] 
    },
    {
        question:"Which of the following is an example of the cloud?",//14
        answers:[
            { text: "Amazon Web Services (AWS)", correct: false},
            { text: "Dropbox", correct: false},
            { text: "Cisco WebEx", correct: false},
            { text: "All of the above", correct: true}
        ] 
    },
    {
        question:"Which of the following is one of the key data science skills?",//15
        answers:[
            { text: "Data Visualization", correct: false},
            { text: "Machine Learning", correct: false},
            { text: "Statistics", correct: false},
            { text: "All of the mentioned", correct: true}
        ] 
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement=document.getElementById('timer');

let timeLeft=600; //for 10 mins
let timerInterval;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    timeLeft=600; //Reset the timer
    nextButton.innerHTML="Next";
    clearInterval(timerInterval); //Reset old timer
    timerElement.style.display='block';
    startTimer();
    showQuestion();
}

function showQuestion()
{
    resetState();
    //for displaying questions
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    //for dislaying answers
    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState()
{
    nextButton.style.display='none';
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore()
{
    clearInterval(timerInterval); //Stop the timer (Clear it)
    resetState();
    timerElement.style.display='none'; //Hide the timer
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }
});

function startTimer()
{
    timerInterval=setInterval(function()
    {
        let minutes=Math.floor(timeLeft/60);
        let seconds=timeLeft % 60;

        if(minutes < 10)
        {
            minutes="0"+ minutes;
        }

        if(seconds < 10)
        {
            seconds="0"+ seconds;
        }
        timerElement.innerHTML="Time Left:" + minutes + ":" + seconds;
        timeLeft--;

        if(timeLeft < 0)
        {
            clearInterval(timerInterval);
            showScore();
        }
    },1000
    );
}

startQuiz();


