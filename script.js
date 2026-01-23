let balance = 0;
let watchedAds = 0;
const maxAdsBeforeClickThis = 20;

function checkClickThisAd(){
  if(watchedAds >= maxAdsBeforeClickThis){
    document.getElementById('watch-ad-btn').style.display='none';
    document.querySelector('.click-this-section').style.display='block';
  }
}

// Watch Ad Button
function showRewardAd(){
  const modal = document.getElementById('reward-ad-modal');
  const closeBtn = document.getElementById('close-btn');
  const timerText = document.getElementById('timer-text');
  const monetagContainer = document.getElementById('monetag-ad-container');

  modal.style.display='block';
  closeBtn.disabled=true;
  monetagContainer.innerHTML='';

  // Monetag Rewarded Popup
  show_10497540('pop').catch(e => console.log(e));

  let seconds=15;
  timerText.innerText=seconds+" sec remaining";
  const timer=setInterval(()=>{
    seconds--;
    timerText.innerText=seconds+" sec remaining";
    if(seconds<=0){
      clearInterval(timer);
      closeBtn.disabled=false;
      timerText.innerText="Close to claim reward";
    }
  },1000);

  closeBtn.onclick=()=>{
    modal.style.display='none';
    watchedAds++;
    checkClickThisAd();
  };
}

// Click This Ad Button
function clickThisAd(){
  const modal=document.getElementById('reward-ad-modal');
  const closeBtn=document.getElementById('close-btn');
  const timerText=document.getElementById('timer-text');
  const monetagContainer=document.getElementById('monetag-ad-container');

  modal.style.display='block';
  closeBtn.disabled=true;
  monetagContainer.innerHTML='';

  show_10497540().then(()=>{
    balance+=5;
    document.getElementById('balance').innerText=balance;
  }).catch(e=>console.log(e));

  let seconds=15;
  timerText.innerText=seconds+" sec remaining";
  const timer=setInterval(()=>{
    seconds--;
    timerText.innerText=seconds+" sec remaining";
    if(seconds<=0){
      clearInterval(timer);
      closeBtn.disabled=false;
      timerText.innerText="Video Finished! Close to claim reward";
    }
  },1000);

  closeBtn.onclick=()=>{
    modal.style.display='none';
    document.querySelector('.click-this-section').style.display='none';
    document.getElementById('watch-ad-btn').style.display='inline-block';
    watchedAds=0;
  };
}

// Withdraw Button
function withdrawBalance(){
  const amount=parseInt(document.getElementById('withdraw-amount').value);
  const account=document.getElementById('withdraw-account').value;
  const method=document.getElementById('withdraw-method').value;

  if(!account){alert("Please enter account number"); return;}
  if(amount<110){alert("Minimum withdraw 110 TK"); return;}
  if(amount>balance){alert("Insufficient balance"); return;}

  balance-=amount;
  document.getElementById('balance').innerText=balance;
  alert(`Successful Request: Withdraw ${amount} TK to ${method} (${account})`);

  // Monetag popup ad on withdraw
  show_10497540('pop').catch(e=>console.log(e));
}

// Event Listeners
document.getElementById('watch-ad-btn').addEventListener('click', showRewardAd);
document.getElementById('click-this-ad-btn').addEventListener('click', clickThisAd);
document.getElementById('withdraw-btn').addEventListener('click', withdrawBalance);
