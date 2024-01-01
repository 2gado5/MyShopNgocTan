var username = document.querySelector('#username')
var password = document.querySelector('#password')
var messageError = document.querySelector('#mess_error')
var StorageAccount = []

function initAccount() {
    const dataAccount = JSON.parse(localStorage.getItem('ListAccount'))
    if (dataAccount !== null) {
        dataAccount.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    StorageAccount.forEach(item => {
        console.log(item)
    })
}
initAccount()

submit.onclick = function (e) {
    if (username === '' || password === '') {
        messageError.innerHTML = 'Không được để trống.'
    } else {
        var check = false
        StorageAccount.forEach(item => {
            if (item.Username === username.value.trim()) {
                if (item.Password === password.value.trim()) {
                    check = true
                    item.CheckOnline = true
                    localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
                    window.location.href = 'index.html'
                }
            }
        })
        if (check === false) {
            messageError.innerHTML = 'Tài khoản hoặc mật khẩu bị sai!'
        }
    }
}