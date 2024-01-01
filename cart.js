var boxAccount = document.querySelector('.box-account')
var CartlistProduct = document.querySelector('.Cart-listProduct')
var totalbill = document.querySelector('.totalbill')
var StorageAccount = []

function initAccount() {
    const data = JSON.parse(localStorage.getItem('ListAccount'))
    if (data !== null) {
        data.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    StorageAccount.forEach(item => {
        if (item.CheckOnline) {
            boxAccount.innerHTML = `   <p class="username">${item.Username}</p>
            <a class="logout" onclick="Logout()">Đăng xuất</a>`
        }
    })
}
initAccount()

Logout = function () {
    StorageAccount.forEach(item => {
        if (item.CheckOnline) {
            item.CheckOnline = false
            saveStorageAccount()
        }
    })
    window.location.href = 'index.html'
}

// lưu Account vào localStorage
function saveStorageAccount() {
    localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
}

function renderProductCart() {
    CartlistProduct.innerHTML = ''
    StorageAccount.forEach(i => {
        if (i.CheckOnline) {
            i.Cart.forEach(item => {
                CartlistProduct.innerHTML += `
                <div class="Cart-listProduct_item" >
                    <div class="Cart-ProductBuy">
                        <div class="box-ImgTitle">
                            <img src="${item.image}" alt="" class="Img-product">
                                <div class="Cart-header-product">
                                    <h4 class="Cart-product-dis">${item.title}</h4>
                                    <spand class="Cart-product-type">${item.brand}</spand>
                                </div>
                        </div>
                        <div class="Cart-product-price">
                            <div class="box-price">
                                <span class="Cart-priceOld">${item.pricefirst}đ</span>
                                <span class="Cart-priceNew">${item.price}đ</span>
                            </div>
                            <div class="Cart-Directional">
                                <i class="fa-solid fa-plus Cart-iconIncrease" onclick=HandleIncrease(${item.id})></i>
                                <span tabindex=${item.id} class="Cartamount">${item.sumBuy}</span>
                                <i class="fa-solid fa-minus Cart-iconReduced" onclick=HandleReduced(${item.id})></i>
                            </div>
                            <span tabindex=${item.id} class="SumPrice">${(item.sumPrice).toLocaleString('vn')}đ</span>
                            <span class="btnDelete">
                                <button class="Cart-productDelete" onclick=deleteProduct(${item.id})>Xóa</button>
                            </span>
                        </div>
                    </div>
                 </div >`
            })
        }
    })
}
renderProductCart()

// lưu số lượng mua của từng sản phẩm
function saveSumBuy(id, count) {
    StorageAccount.forEach(i => {
        if (i.CheckOnline) {
            i.Cart.forEach(item => {
                if (item.id === id) {
                    item.sumBuy = count
                    saveStorageAccount()
                }
            })
        }
    })
}

// xử lý skien tăng số lượng sản phẩm
HandleIncrease = function (id) {
    let ListAmount = document.querySelectorAll('.Cartamount')
    ListAmount.forEach(item => {
        let index = item.getAttribute("tabindex")
        if (parseInt(index) === id) {
            let count = parseInt(item.innerText);
            count++;
            CalculateBill(count, id)
            item.innerHTML = `${count}`
        }
    })
    CalculatetheBill()
}

function CalculateBill(count, id) {
    const ListSumPrice = document.querySelectorAll('.SumPrice')
    ListSumPrice.forEach(i => {
        let a = i.getAttribute("tabindex")
        if (parseInt(a) === id) {
            StorageAccount.forEach(j => {
                if (j.CheckOnline) {
                    j.Cart.forEach(k => {
                        if (k.id === id) {
                            let mystring = k.price
                            do {
                                mystring = mystring.replace(".", "")
                            } while (mystring.lastIndexOf(".") > 0)
                            let value = count * parseInt(mystring)
                            k.sumPrice = value
                            k.sumBuy = count
                            i.innerHTML = value.toLocaleString('vn') + 'đ'
                        }
                    })
                }
            })
        }
    })
    saveStorageAccount()
}

// xử lý skien giảm số lượng sản phẩm
HandleReduced = function (id) {
    let ListAmount = document.querySelectorAll('.Cartamount')
    ListAmount.forEach(item => {
        let index = item.getAttribute("tabindex")
        if (parseInt(index) === id) {
            let count = parseInt(item.innerText)
            let result = count > 1 ? count = count - 1 : 1
            CalculateBill(count, id)
            item.innerHTML = `${result}`
        }
    })
    CalculatetheBill()
}

// xóa sản phẩm trong giỏ hàng
deleteProduct = function (id) {
    StorageAccount.forEach(i => {
        if (i.CheckOnline) {
            i.Cart.forEach((item, index) => {
                if (item.id === id) {
                    i.Cart.splice(index, 1)
                }
            })
        }
    })
    saveStorageAccount()
    renderProductCart()
    CalculatetheBill()
}

// tính tổng số tiền cho hóa đơn
function CalculatetheBill() {
    let sum = 0
    StorageAccount.forEach(item => {
        if (item.CheckOnline) {
            item.Cart.forEach(i => {
                sum += i.sumPrice
            })
        }
    })
    totalbill.innerHTML = sum.toLocaleString('vn') + 'đ'
}
CalculatetheBill()