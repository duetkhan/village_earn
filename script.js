let balance = 0;
let watchedAds = 0;
const maxAdsBeforeClickThis = 20;

// Show Rewarded Ad (Watch Ad)
function showRewardAd() {
  const modal = document.getElementById('reward-ad-modal');
  const closeBtn = document.getElementById('close-btn');
  const timerText = document.getElementById('timer-text');
  const monetagContainer = document.getElementById('monetag-ad-container');

  modal.style.display = 'block';
  closeBtn.disabled = true;
  monetagContainer.innerHTML = ''; // clear old ad

  // Monetag Rewarded Popup
  show_10497540('pop').then(() => {
    // Reward user (increment later via Click This Ad)
  }).catch(e => console.log(e));

  // Timer
  let seconds = 15;
  timerText.innerText = seconds + " seconds remaining";
  const interval = setInterval(() => {
    seconds--;
    timerText.innerText = seconds + " seconds remaining";
    if (seconds <= 0) {
      clearInterval(interval);
      closeBtn.disabled = false;
      timerText.innerText = "You can now close the ad";
    }
  }, 1000);

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    watchedAds++;
    if (watchedAds >= maxAdsBeforeClickThis) {
      document.getElementById('watch-ad-btn').style.display = 'none';
      document.querySelector('.click-this-section').style.display = 'block';
    }
  };
}

// Click This Ad Logic
function clickThisAd() {
  const modal = document.getElementById('reward-ad-modal');
  const closeBtn = document.getElementById('close-btn');
  const timerText = document.getElementById('timer-text');
  const monetagContainer = document.getElementById('monetag-ad-container');

  modal.style.display = 'block';
  closeBtn.disabled = true;
  monetagContainer.innerHTML = '';

  show_10497540().then(() => {
    // Reward user
    balance += 5;
    document.getElementById('balance').innerText = balance;
  }).catch(e => console.log(e));

  let seconds = 15;
  timerText.innerText = seconds + " seconds remaining";
  const interval = setInterval(() => {
    seconds--;
    timerText.innerText = seconds + " seconds remaining";
    if (seconds <= 0) {
      clearInterval(interval);
      closeBtn.disabled = false;
      timerText.innerText = "Video Finished! Close to claim reward";
    }
  }, 1000);

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.querySelector('.click-this-section').style.display = 'none';
    document.getElementById('watch-ad-btn').style.display = 'inline-block';
    watchedAds = 0; // reset counter
  };
}

// Withdraw Logic
function withdrawBalance() {
  const amount = parseInt(document.getElementById('withdraw-amount').value);
  if (amount < 110) { alert("Minimum withdraw 110 TK"); return; }
  if (amount > balance) { alert("Insufficient balance"); return; }

  balance -= amount;
  document.getElementById('balance').innerText = balance;
  alert(`Successful Request: Withdraw ${amount} TK`);

  // Show Monetag popup ad on withdraw
  show_10497540('pop').catch(e => console.log(e));
}

// Event Listeners
document.getElementById('watch-ad-btn').addEventListener('click', showRewardAd);
document.getElementById('click-this-ad-btn').addEventListener('click', clickThisAd);
document.getElementById('withdraw-btn').addEventListener('click', withdrawBalance);
