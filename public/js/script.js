const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})


// $(document).ready(function() {
//     $('#cashPayment').on('click', function() {
//         localStorage.clear();
//     })
//     $('#withoutBankPayment').on('click', function() {
//         localStorage.clear();
//     })
//     $('#withBankPayment').on('click', function() {
//         localStorage.clear();
//     })
// })

let cash = document.getElementById('cashPayment');
let withoutBank = document.getElementById('withoutBankPayment');
let withBank = document.getElementById('withBankPayment');

cash.onclick = function() {
    localStorage.clear();
}

withoutBank.onclick = function() {
    localStorage.clear();
}

withBank.onclick = function() {
    localStorage.clear();
}
