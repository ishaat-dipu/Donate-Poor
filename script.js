document.addEventListener('DOMContentLoaded', function() {
    const donationBtn = document.getElementById('donation-btn');
    const historyBtn = document.getElementById('history-btn');
    const donationSection = document.getElementById('donation-section');
    const historySection = document.getElementById('history-section');
    const accountBalanceElem = document.getElementById('account-balance');
    let accountBalance = parseFloat(accountBalanceElem.textContent.replace('৳', '')); // Remove '৳' for calculation

    // Button Color Toggle and Section Switch
    donationBtn.addEventListener('click', () => {
        donationBtn.classList.remove('text-green-500', 'hover:bg-green-500');
        donationBtn.classList.add('text-blue-500', 'hover:bg-blue-500');
        
        historyBtn.classList.remove('text-blue-500', 'hover:bg-blue-500');
        historyBtn.classList.add('text-green-500', 'hover:bg-green-500');

        donationSection.classList.remove('hidden');
        historySection.classList.add('hidden');
    });
    
    historyBtn.addEventListener('click', () => {
        historyBtn.classList.remove('text-green-500', 'hover:bg-green-500');
        historyBtn.classList.add('text-blue-500', 'hover:bg-blue-500');
        
        donationBtn.classList.remove('text-blue-500', 'hover:bg-blue-500');
        donationBtn.classList.add('text-green-500', 'hover:bg-green-500');

        donationSection.classList.add('hidden');
        historySection.classList.remove('hidden');
    });

    // Donation Function
    window.donate = function(donationType) {
        const donationAmountElem = document.getElementById(`${donationType}-amount`);
        const donationAmount = parseFloat(donationAmountElem.value);
        const currentDonationElem = document.getElementById(`${donationType}-donation`);
        let currentDonation = parseFloat(currentDonationElem.textContent.replace('৳', ''));

        if (isNaN(donationAmount) || donationAmount <= 0) {
            showAlert('Please enter a valid donation amount.');
            return;
        }

        if (donationAmount > accountBalance) {
            showAlert('Insufficient balance.');
            return;
        }

        // Update balance and donation amount
        accountBalance -= donationAmount;
        currentDonation += donationAmount;
        accountBalanceElem.textContent = `৳${accountBalance.toFixed(2)}`;
        currentDonationElem.textContent = `৳${currentDonation.toFixed(2)}`;

        // Add to donation history
        const historyList = document.getElementById('history-list');
        const historyItem = document.createElement('li');
        const now = new Date();
        historyItem.textContent = `${now.toLocaleString()}: Donated ৳${donationAmount.toFixed(2)} to ${donationType}`;
        historyList.appendChild(historyItem);

        donationAmountElem.value = ''; // Clear input
    };

    // Show Alert Function
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        alertBox.innerHTML = '<img src="./assets/coin.png" alt="Coin" class="inline h-7 mr-2">' + message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});
