let balance = 0;
let watchCount = 0;
let timer;
let timeLeft = 15;

function watchAd(){
  startTimer();
  // Monetag In-App / Interstitial
  show_10497540({
    type:'inApp'
  });
}

function clickThisAd(){
  show_10497540().then(()=>{
    balance += 5;
    document.getElementById("balance").innerText = balance;
    watchCount = 0;
    document.getElementById("clickBtn").style.display="none";
    document.getElementById("watchBtn").style.display="block";
    alert("You earned 5 TK!");
  });
}

function startTimer(){
  timeLeft = 15;
  document.getElementById("timerModal").style.display="flex";
  document.getElementById("closeTimerBtn").disabled = true;
  document.getElementById("timerText").innerText = timeLeft;

  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timerText").innerText = timeLeft;
    if(timeLeft<=0){
      clearInterval(timer);
      document.getElementById("closeTimerBtn").disabled = false;
    }
  },1000);
}

function closeTimer(){
  document.getElementById("timerModal").style.display="none";
  watchCount++;

  if(watchCount >= 20){
    document.getElementById("watchBtn").style.display="none";
    document.getElementById("clickBtn").style.display="block";
  }
}

function withdraw(){
  let amount = parseInt(document.getElementById("amount").value);
  let acc = document.getElementById("account").value;

  if(amount < 110){
    alert("Minimum withdraw 110 TK");
    return;
  }
  if(amount > balance){
    alert("Not enough balance");
    return;
  }
  if(acc.length < 6){
    alert("Enter valid account number");
    return;
  }

  balance -= amount;
  document.getElementById("balance").innerText = balance;
  alert("Withdraw Request Successful!");

  // Show popup ad on withdraw
  (function(s){
    s.dataset.zone='10501336';
    s.src='https://al5sm.com/tag.min.js';
  })(document.body.appendChild(document.createElement('script')));
}

// Auto popup every 2 minutes
setInterval(()=>{
  (function(s){
    s.dataset.zone='10501336';
    s.src='https://al5sm.com/tag.min.js';
  })(document.body.appendChild(document.createElement('script')));
},120000);
