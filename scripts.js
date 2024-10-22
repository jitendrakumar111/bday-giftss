// Set initial gift unlock times and states
const gifts = [
    { unlockTime: '22:30', link: 'https://example.com/gift1', unlocked: false, message: "Happy Birthday! Here is your first gift as celebration!" },
    { unlockTime: '02:30', link: 'https://drive.google.com/file/d/1dkKVFA-YbUrOEnmSp-Z8lEvUX3CM7CRa/view?usp=sharing', unlocked: false, message: "goodmorning babe! Here is something for you!" },
    { unlockTime: '06:30', link: 'https://drive.google.com/file/d/1w09fJSzvSdE8qAnbcY8Q9_C5cKmeHwIV/view?usp=sharing', unlocked: false, message: "Surprise! enjoy song created by me as you know our lyrics!" },
    { unlockTime: '10:30', link: 'https://drive.google.com/file/d/1j7Y7Dcq_NgN9FTaGs8ABDUdKPHUNLU4G/view?usp=sharing', unlocked: false, message: "Unseen video as gift just for you!" },
    { unlockTime: '14:30', link: 'https://example.com/gift5', unlocked: false, message: "Though I can’t give you your gift today but it's added in list, I promise it’s on its way, just like all the love I’ll always have for you. Something special is coming soon, just like you deserve! 💖✨" },
    { unlockTime: '18:30', link: 'https://heyzine.com/flip-book/714ec342d3.html', unlocked: false, message: "dear, here is book written by me as last gift, read and enjoy, love u!" }
];

const giftsContainer = document.getElementById('giftsContainer');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const giftLink = document.getElementById('giftLink');
const popupClose = document.getElementById('popupClose');

// Create gift cards for each gift
gifts.forEach((gift, index) => {
    const giftCard = document.createElement('div');
    giftCard.classList.add('gift-card', 'locked');
    giftCard.innerHTML = `
        <h2>Gift ${index + 1}</h2>
        <p>Locked</p>
    `;
    giftCard.setAttribute('data-index', index);
    giftsContainer.appendChild(giftCard);
});

// Start countdown and unlock gifts
function startCountdown() {
    updateGifts();
    setInterval(updateGifts, 1000);
}

function updateGifts() {
    const now = new Date();
    gifts.forEach((gift, index) => {
        const nextUnlockTime = getNextUnlockTime(gift.unlockTime);
        const giftCard = giftsContainer.children[index];
        
        const distance = nextUnlockTime - now;

        if (distance <= 0 && !gift.unlocked) {
            // Unlock the gift
            gift.unlocked = true;
            giftCard.classList.remove('locked');
            giftCard.classList.add('unlocked');
            giftCard.querySelector('p').textContent = 'Surprise Unlocked!';
            giftCard.addEventListener('click', () => showPopup(index));
        } else if (!gift.unlocked) {
            // Update countdown for locked gifts
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            giftCard.querySelector('p').textContent = `Locked (${hours}h ${minutes}m ${seconds}s)`;
        }
    });
}

function getNextUnlockTime(timeString) {
    const now = new Date();
    let nextUnlock = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);

    nextUnlock.setHours(hours, minutes, 0, 0);

    // If unlock time is earlier in the day, set it to the next day
    if (nextUnlock <= now) {
        nextUnlock.setDate(nextUnlock.getDate() + 1);
    }

    return nextUnlock;
}

function showPopup(index) {
    const gift = gifts[index];
    popupMessage.textContent = gift.message;
    giftLink.href = gift.link;
    popup.style.display = 'flex';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 10000); // Automatically close popup after 10 seconds
}

// Close popup when clicking "X"
popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Start the countdown when the page loads
startCountdown();
