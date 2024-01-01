var messform = document.querySelector('.mess-form')
var username = document.querySelector('.username')
var gmail = document.querySelector('.gmail')
var pasword = document.querySelector('.password')
var repassword = document.querySelector('.re_password')
var inputs = document.querySelectorAll('.input')
var messageNoti = document.querySelector('#btn_error')
var checkname = true
var checkpass = true
var checkgmail = true
var checkrepass = true
var StorageAccount = []

function initAccount() {
    const dataSearch = JSON.parse(localStorage.getItem('ListAccount'))
    if (dataSearch !== null) {
        dataSearch.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    StorageAccount.forEach(item => {
        console.log(item)
        console.log(StorageAccount.length)
    })
}
initAccount()

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('span');
    span.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('span');
    span.innerText = '';
}

// check ten dang nhap phai co 6 ky tu
username.onblur = username.onclick = function () {
    if (username.value.trim().length < 6) {
        setErrorFor(username, "Tên đăng nhập phải có ít nhất 6 ký tự")
        checkname = false
    } else {
        setSuccessFor(username)
        checkname = true
    }
}

// check gmail phai dung dinh dang
gmail.onblur = gmail.onclick = function () {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (regex.test(gmail.value.trim()) == false) {
        setErrorFor(gmail, "Gmail chưa đúng định dạng")
        checkgmail = false
    } else {
        setSuccessFor(gmail)
        checkgmail = true
    }

}

// Check Mật khẩu phải có số và ký tự thường và ký tự in hoa
function numberPassword(password) {
    var numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
        return true;
    }
    else return false;
}

function charactersPassword(password) {
    var characters = /[a-z]/g;
    if (password.value.match(characters)) {
        return true;
    }
    else return false;
}

function CharactersPassword(password) {
    var Characters = /[A-Z]/g;
    if (password.value.match(Characters)) {
        return true;
    }
    else return false;
}

password.onblur = password.onclick = function () {
    if (!numberPassword(password) || !charactersPassword(password) || !CharactersPassword(password)) {
        setErrorFor(password, "Mật khẩu phải có số, ký tự thường và ký tự in hoa ");
        checkpass = false
    }
    else {
        setSuccessFor(password);
        checkpass = true
    }
}

// Check nhap lai mat khau
repassword.onblur = repassword.onclick = function () {
    if (password.value.trim() != repassword.value.trim()) {
        setErrorFor(repassword, "Mật khẩu nhập lại không trùng với mật khẩu")
        checkrepass = false
    } else {
        setSuccessFor(repassword)
        checkrepass = true
    }
}


// Khi nhấn vào ô nhập bất kỳ sẽ ẩn lỗi
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function () {
        setErrorFor(inputs[i], '');
    }
}

submit.onclick = function (e) {
    if (checkname && checkgmail && checkpass && checkrepass) {
        var check = true
        StorageAccount.forEach(item => {
            if (item.Username == username.value.trim() || item.Gmail == gmail.value.trim()) {
                check = false
                messageNoti.innerHTML = "Tài khoản đã tồn tại."
            }
        })
        if (check) {
            const ArrAccount = {
                Username: username.value.trim(),
                Password: password.value.trim(),
                Gmail: gmail.value.trim(),
                CheckOnline: false,
                Cart: []
            }
            StorageAccount.push(ArrAccount)
            messageNoti.innerHTML = "Đăng ký thành công."
        }
        localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
        checkRegister = false
    }
}