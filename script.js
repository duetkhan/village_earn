let balance = 0;
let watched = 0;

const watchBtn = document.getElementById("watchBtn");
const clickBtn = document.getElementById("clickBtn");
const clickBox = document.getElementById("clickBox");

const modal = document.getElementById("modal");
const timerText = document.getElementById("timerText");
const closeBtn = document.getElementById("closeBtn");

function startAdTimer(callback){
  modal.style.display="block";
  closeBtn.disabled=true;
  let sec = 15;
  timerText.innerText = sec + " seconds...";
  let t = setInterval(()=>{
    sec--;
    timerText.innerText = sec + " seconds...";
    if(sec<=0){
      clearInterval(t);
      closeBtn.disabled=false;
      timerText.innerText="You can close now";
      closeBtn.onclick=()=>{
        modal.style.display="none";
        callback();
      }
    }
  },1000);
}

// WATCH AD
watchBtn.onclick = ()=>{
  showPopAd();
  startAdTimer(()=>{
    watched++;
    if(watched>=20){
      watchBtn.style.display="none";
      clickBox.style.display="block";
    }
  });
}

// CLICK THIS AD (+5 TK)
clickBtn.onclick = ()=>{
  showPopAd();
  startAdTimer(()=>{
    balance += 5;
    document.getElementById("balance").innerText = balance;
    watched = 0;
    watchBtn.style.display="inline-block";
    clickBox.style.display="none";
  });
}

// WITHDRAW
document.getElementById("withdrawBtn").onclick = ()=>{
  let amount = Number(document.getElementById("amount").value);
  let acc = document.getElementById("account").value;

  if(amount < 110) return alert("Minimum withdraw 110 TK");
  if(amount > balance) return alert("Insufficient balance");
  if(!acc) return alert("Enter account number");

  balance -= amount;
  document.getElementById("balance").innerText = balance;
  alert("Withdraw Request Successful!");
  showPopAd();
}

// POPUNDER FUNCTION
function showPopAd(){
  (function(s){
    s.dataset.zone='10501336';
    s.src='https://al5sm.com/tag.min.js';
  })(document.body.appendChild(document.createElement('script')));
}

// AUTO POP EVERY 2 MIN
setInterval(()=>{
  showPopAd();
},120000);
