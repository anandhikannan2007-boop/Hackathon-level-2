let clickSound;

function initSound(){
clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
}

// LOGIN
function login(){
let name = document.getElementById("username").value;

if(name===""){
alert("Enter name da!");
return;
}

initSound();

localStorage.setItem("user",name);

document.getElementById("loginPage").style.display="none";
document.getElementById("app").style.display="block";

document.getElementById("welcomeText").innerText="Hello "+name+" 👋";

render();
}

// DATA
let activities = JSON.parse(localStorage.getItem("activities")) || [
{ name:"HTML Basics",completed:false },
{ name:"CSS Styling",completed:false },
{ name:"JavaScript",completed:false },
{ name:"UI Design",completed:false },
{ name:"Responsive Layout",completed:false },
{ name:"Project Build",completed:false }
];

// NAVIGATION
function showPage(page){
document.getElementById("home").style.display="none";
document.getElementById("activity").style.display="none";
document.getElementById("progressPage").style.display="none";

document.getElementById(page).style.display="block";
}

// RENDER
function render(){
let box=document.getElementById("activityList");
box.innerHTML="";

activities.forEach((a,i)=>{
box.innerHTML+=`
<div class="activity">
<span>${a.name}</span>
<button onclick="done(${i})"
class="${a.completed?'completed':'done'}"
${a.completed?'disabled':''}>
${a.completed?'✔ Completed':'Done'}
</button>
</div>
`;
});

update();
}

// DONE
function done(i){
activities[i].completed=true;
localStorage.setItem("activities",JSON.stringify(activities));

if(clickSound){
clickSound.currentTime = 0;
clickSound.play();
}

render();
}

// UPDATE
function update(){
let c=activities.filter(x=>x.completed).length;
let t=activities.length;

let txt=c+" / "+t+" completed";

if(c===t){
txt+=" 💯 100% Completed";
}

document.getElementById("progressText").innerText=txt;
document.getElementById("progressFill").style.width=(c/t*100)+"%";
}

// CERTIFICATE
function downloadCertificate(){
let user = localStorage.getItem("user") || "Student";

let htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate</title>
</head>
<body style="text-align:center;padding:50px;">
<h1>🏆 CERTIFICATE</h1>
<p>This is to certify that</p>
<h2>${user}</h2>
<p>has successfully completed all activities.</p>
<h3>💯 100% Completed</h3>
</body>
</html>
`;

let blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });

let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "certificate.html";
link.click();
}

// LOAD
window.onload = function(){
render();
};
