// xử lý trang chủ
const header_cart = document.querySelector('.header-cart');
// const header_list_product = document.querySelector('.header-list-product')
const renderStart = document.querySelector('.renderStart')
const icon_cart_product = document.querySelector('.icon-cart-product')
const header_list_product_buy = document.querySelector('.header-list-product-buy')
const header_sum_market = document.querySelector('.header-sum-market')
const header_history_list = document.querySelector('.header-history-list')
const header_input = document.querySelector('.header__search-input');
const header_box_history = document.querySelector('.header-box-history');
const main = document.querySelector('.app');
const box_icon_search = document.querySelector('.box-icon-search')
const allProduct = document.querySelector('.allProduct')
const allProduct_mobile = document.querySelector('.all_mobile')
const cosmetic = document.querySelector('.cosmetic')
const cosmetic_mobile = document.querySelector('.cosmetic_mobile')
const Men_Fashion = document.querySelector('.Men-Fashion')
const Men_Fashion_mobile = document.querySelector('.Men-Fashion_mobile')
const Women_Fashion = document.querySelector('.Women-Fashion')
const Women_Fashion_mobile = document.querySelector('.Women-Fashion_mobile')
const jewels = document.querySelector('.jewels')
const jewels_mobile = document.querySelector('.jewels_mobile')
const electronice = document.querySelector('.electronice')
const electronice_mobile = document.querySelector('.electronice_mobile')
const category_active_pc = document.querySelectorAll('.category-active-pc')
const category_item__link = document.querySelectorAll('.category-item__link')
const icon_increase = document.querySelector('.icon-increase')
const icon_reduced = document.querySelector('.icon-reduced')
const boxAccount = document.querySelector('.box-account')
const box_search = document.querySelector('.box-search')
var countProduct = 0;
var indexSearch = 0;
var Online = false
var StorageSearch = [];
var StorageAccount = []

const ArrAcne = [
    {
        id: 0,
        title: "Decumar Pure",
        image: "./accsess/img/DecumarPure.jpg",
        pricefirst: "500.000",
        price: "480.000",
        sumsell: "27 đã bán",
        brand: "Decumar",
        sumBuy: '1',
        sumPrice: 480000,
        selloff: "3%",
        selloffdes: "Giảm"
    },
    {
        id: 1,
        title: "Gel ngừa mụn NANO THC (Nghệ không màu)",
        image: "./accsess/img/gelnguamun.jpg",
        pricefirst: "400.000",
        price: "360.000",
        sumsell: "54 đã bán",
        brand: "Decumar",
        sumBuy: '1',
        sumPrice: 360000,
        selloff: "30%",
        selloffdes: "Giảm"
    },
    {
        id: 2,
        title: "Kem chống nắng ngừa mụn sáng da Decumar",
        image: "./accsess/img/kemchongnangnguamun.png",
        pricefirst: "360.000",
        price: "290.000",
        sumsell: "13 đã bán",
        brand: "Decumar",
        sumBuy: '1',
        sumPrice: 290000,
        selloff: "33%",
        selloffdes: "Giảm"
    },
    {
        id: 3,
        title: "Combo toàn diện cho da mụn Decumar",
        image: "./accsess/img/combotrimun.png",
        pricefirst: "1.000.000",
        price: "900.000",
        sumsell: "23 đã bán",
        brand: "Decumar",
        sumPrice: 900000,
        sumBuy: '1',
        selloff: "10%",
        selloffdes: "Giảm"
    },
    {
        id: 4,
        title: "Combo cơ bản cho da mụn Decumar",
        image: "./accsess/img/combocoban.png",
        pricefirst: "990.000",
        price: "800.000",
        sumsell: "88 đã bán",
        brand: "Decumar",
        sumPrice: 800000,
        sumBuy: '1',
        selloff: "13%",
        selloffdes: "Giảm"
    },
    {
        id: 5,
        title: "Gel ngừa mụn Decumar",
        image: "./accsess/img/gelnguamun.png",
        pricefirst: "250.000",
        price: "200.000",
        sumsell: "158 đã bán",
        brand: "Decumar",
        sumPrice: 200000,
        sumBuy: '1',
        selloff: "13%",
        selloffdes: "Giảm"
    },
    {
        id: 6,
        title: "Kem chống nắng ngừa mụn Decumar",
        image: "./accsess/img/kemchongnangnguamun.png",
        pricefirst: "190.000",
        price: "170.000",
        sumsell: "222 đã bán",
        brand: "Decumar",
        sumPrice: 170000,
        sumBuy: '1',
        selloff: "9%",
        selloffdes: "Giảm"
    },
    {
        id: 7,
        title: "Gel rửa mặt ngừa mụn Decumar 100g",
        image: "./accsess/img/gelruamatnguamun.png",
        pricefirst: "300.000",
        price: "250.000",
        sumsell: "59 đã bán",
        brand: "Decumar",
        sumPrice: 250000,
        sumBuy: '1',
        selloff: "6%",
        selloffdes: "Giảm"
    }
]
const ArrManClothes = []
const ArrWomanClothes = []
const ArrJewelery = []
const ArrElectronics = []
var ArrProduct = ArrAcne.slice()

function initAccount() {
    const data = JSON.parse(localStorage.getItem('ListAccount'))
    if (data !== null) {
        data.forEach((item) => {
            StorageAccount.push(item)
        })
    }
    StorageAccount.forEach(item => {
        if (item.CheckOnline === true) {
            boxAccount.innerHTML = `   <p class="username">${item.Username}</p>
            <a class="logout" onclick="Logout()">Đăng xuất</a>`
            Online = true
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
    setTimeout(location.reload(), 1500)
    ArrProduct = ArrAcne.slice()
}

// Lấy danh sách sản phẩm từ API
function callAPI() {
    let Api = 'https://fakestoreapi.com/products';

    fetch(Api)
        .then((res) => {
            return res.json();
        }).then(data => {
            let replace = 8
            data.forEach((item) => {
                let idNew = replace++;
                item.id = idNew
                if (item.category === "women's clothing") {
                    item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
                    let value = (item.price * 23000)
                    item.price = `${value.toLocaleString('vn')}`
                    item.brand = "H&M"
                    item.sumsell = '195 đã bán'
                    item.selloff = "5%"
                    item.selloffdes = "Giảm"
                    item.sumBuy = 1
                    item.sumPrice = value
                    ArrWomanClothes.push(item)
                    ArrProduct.push(item)
                } else if (item.category === "men's clothing") {
                    item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
                    let value = (item.price * 23000)
                    item.price = `${value.toLocaleString('vn')}`
                    item.brand = "H&M"
                    item.sumsell = '222 đã bán'
                    item.selloff = "9%"
                    item.selloffdes = "Giảm"
                    item.sumBuy = 1
                    item.sumPrice = value
                    ArrManClothes.push(item)
                    ArrProduct.push(item)
                } else if (item.category === "electronics") {
                    item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
                    let value = (item.price * 23000)
                    item.price = `${value.toLocaleString('vn')}`
                    item.brand = "Intel"
                    item.sumsell = '95 đã bán'
                    item.selloff = "7%"
                    item.selloffdes = "Giảm"
                    item.sumBuy = 1
                    item.sumPrice = value
                    ArrElectronics.push(item)
                    ArrProduct.push(item)
                } else {
                    item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
                    let value = (item.price * 23000)
                    item.price = `${value.toLocaleString('vn')}`
                    item.brand = "Minh Châu"
                    item.sumsell = '95 đã bán'
                    item.selloff = "3%"
                    item.selloffdes = "Giảm"
                    item.sumBuy = 1
                    item.sumPrice = value
                    ArrJewelery.push(item)
                    ArrProduct.push(item)
                }
            })
        })
}

setTimeout(function () {
    callAPI()
    console.log("Delayed message");
    renderProducStart()
}, 1000);

// let Api = 'https://fakestoreapi.com/products';
// fetch(Api)
//     .then((res) => {
//         return res.json();
//     }).then(data => {
//         let replace = 8
//         data.forEach((item) => {
//             let idNew = replace++;
//             item.id = idNew
//             if (item.category === "women's clothing") {
//                 item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
//                 let value = (item.price * 23000)
//                 item.price = `${value.toLocaleString('vn')}`
//                 item.brand = "H&M"
//                 item.sumsell = '195 đã bán'
//                 item.selloff = "5%"
//                 item.selloffdes = "Giảm"
//                 item.sumBuy = 1
//                 item.sumPrice = value
//                 ArrWomanClothes.push(item)
//                 ArrProduct.push(item)
//             } else if (item.category === "men's clothing") {
//                 item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
//                 let value = (item.price * 23000)
//                 item.price = `${value.toLocaleString('vn')}`
//                 item.brand = "H&M"
//                 item.sumsell = '222 đã bán'
//                 item.selloff = "9%"
//                 item.selloffdes = "Giảm"
//                 item.sumBuy = 1
//                 item.sumPrice = value
//                 ArrManClothes.push(item)
//                 ArrProduct.push(item)
//             } else if (item.category === "electronics") {
//                 item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
//                 let value = (item.price * 23000)
//                 item.price = `${value.toLocaleString('vn')}`
//                 item.brand = "Intel"
//                 item.sumsell = '95 đã bán'
//                 item.selloff = "7%"
//                 item.selloffdes = "Giảm"
//                 item.sumBuy = 1
//                 item.sumPrice = value
//                 ArrElectronics.push(item)
//                 ArrProduct.push(item)
//             } else {
//                 item.pricefirst = `${(item.price * 20000).toLocaleString('vn')}`
//                 let value = (item.price * 23000)
//                 item.price = `${value.toLocaleString('vn')}`
//                 item.brand = "Minh Châu"
//                 item.sumsell = '95 đã bán'
//                 item.selloff = "3%"
//                 item.selloffdes = "Giảm"
//                 item.sumBuy = 1
//                 item.sumPrice = value
//                 ArrJewelery.push(item)
//                 ArrProduct.push(item)
//             }
//         })
//     })

// xử lý khi nhấn enter khi search
header_input.addEventListener('keydown', (e) => {
    var input = header_input.value.trim();
    if (e.keyCode === 13) {
        saveStorageSearch(input)
        renderSearchHeader()
        header_box_history.classList.add('none')

        renderStart.innerHTML = "";
        ArrProduct.forEach((item) => {
            title = item.title.toLocaleLowerCase()
            input = input.toLocaleLowerCase()
            if (title.includes(input, 0)) {
                renderProduct(item)
            }
        })
    }
})

// xử lý khi ấn kính lúp search
box_icon_search.addEventListener('click', () => {
    var input = header_input.value.trim();
    saveStorageSearch(input)
    renderSearchHeader()

    header_box_history.classList.add('none')
    renderStart.innerHTML = "";
    ArrProduct.forEach((item) => {
        title = item.title.toLocaleLowerCase()
        input = input.toLocaleLowerCase()
        if (title.includes(input, 0)) {
            renderProduct(item)
        }
    })
})

// render từ khóa tìm kiếm 
function renderSearchHeader() {
    header_history_list.innerHTML = ''
    StorageSearch = StorageSearch.reverse()
    for (var i = 0; i < StorageSearch.length; i++) {
        let item = StorageSearch[i];
        header_history_list.innerHTML += `
        <li>
            <p class="header-history-item" onclick=searchHistory(${i})>${item}</p>
        </li>`
        // onclick=searchHistory(${item}) bắt sự kiện ấn vào dòng lịch sử search nào thì sẽ truyền vị trí của thẻ ý vào
    }
}

searchHistory = function (index) {
    var list = document.querySelectorAll('.header-history-item')
    var i = 0;

    list.forEach(e => {
        if (index === i) {
            var value = e.innerText
            header_input.value = value
            value = value.toLocaleLowerCase()
            renderStart.innerHTML = "";
            ArrProduct.forEach((item) => {
                title = item.title.toLocaleLowerCase()
                if (title.includes(value, 0)) {
                    renderProduct(item)
                }
            })
            header_box_history.classList.add('none')
        }
        i++
    })

}

// Delay 0.3s để k bị mất event chọn lsu search tìm sp
function blurBoxsearch() {
    setTimeout(() => {
        header_box_history.classList.add('none');
    }, "300")
}

// khi ấn vào ô nhập search
header_input.addEventListener('click', () => {
    box_search.classList.add('border-input')
    header_box_history.classList.remove('none')
})

// lưu các từ khóa tìm kiếm vào localStorage
function saveStorageSearch(input) {
    StorageSearch.push(input)
    localStorage.setItem('ListSearch', JSON.stringify(StorageSearch))
}

// render các từ khóa tìm kiếm khi load lại 
function initSearch() {
    const dataSearch = JSON.parse(localStorage.getItem('ListSearch'))
    if (dataSearch !== null) {
        dataSearch.forEach((item) => {
            StorageSearch.push(item)
        })
    }
    renderSearchHeader()
}
initSearch()

// render product 
function renderProduct(item) {
    div = document.createElement('div');
    div.className = "col l-2-4 m-4 c-6";
    div.innerHTML = `   
    <div href="./t.html" class="container-prouduct-item">
        <div class="product-item-img"
            style="background-image: url(${item.image});">
        </div>
        <h3 class="product-item-des">${item.title}</h3>
        <div class="product-item-price">
            <spand class="product-item-price-first">${item.pricefirst}đ</spand>
            <spand class="product-item-price-last">${item.price}đ</spand>
        </div>
        <div class="product-item-vote">
            <i class="icon-vote fa-solid fa-heart"></i>
            <div class="product-list-star">
                <i class="icon-star fa-solid fa-star"></i>
                <i class="icon-star fa-solid fa-star"></i>
                <i class="icon-star fa-solid fa-star"></i>
                <i class="icon-star fa-solid fa-star"></i>
                <i class="icon-star fa-solid fa-star"></i>
            </div>
            <spand class="product-sum-sell">${item.sumsell}</spand>
        </div>
        <div class="product-item-origin">
            <spand class="product-item-brand">${item.brand}</spand>
            <spand class="icon-cart-product product-item-cart" onclick=handleCart(${item.id})>
                <i class="fa-solid fa-cart-plus"></i>
            </spand>
        </div>
        <div class="product-like">
            <i class="icon-check ti-check"></i>
            <span class="product-like-name">Yêu thích</span>
        </div>
        <div class="product-selloff">
            <span class="selloff-number">${item.selloff}</span>
            <span class="selloff-des">${item.selloffdes}</span>
        </div>
    </div>`
    renderStart.appendChild(div)
}

// render từng loại hàng
function renderListProduct(NameArr) {
    NameArr.forEach((item) => {
        renderProduct(item)
    })
}

// render listsproduct khi start
function renderProducStart() {
    ArrProduct.forEach((item) => {
        renderProduct(item)
    })
    allProduct.classList.add('icon-active')
    allProduct_mobile.classList.add('active_mobile')
}

// hàm xóa actice cho category
function removeIconActive() {
    category_active_pc.forEach(item => {
        item.classList.remove('icon-active')
    })
    category_item__link.forEach(item => {
        item.classList.remove('active_mobile')
    })
}

function Allproduct() {
    removeIconActive()
    allProduct.classList.add('icon-active')
    allProduct_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrProduct)
}
// sự kiện chọn dmuc tất cả sp
allProduct.addEventListener('click', () => {
    Allproduct()
})
// sự kiện chọn dmuc tất cả sp trên mobile
allProduct_mobile.addEventListener('click', () => {
    Allproduct()
})


function Cosmetic() {
    removeIconActive()
    cosmetic.classList.add('icon-active')
    cosmetic_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrAcne)
}
// sự kiện chọn dmuc mỹ phẩm
cosmetic.addEventListener('click', () => {
    Cosmetic()
})
// sự kiện chọn dmuc mỹ phẩm on mobile
cosmetic_mobile.addEventListener('click', () => {
    Cosmetic()
})


function Clothes_men() {
    removeIconActive()
    Men_Fashion.classList.add('icon-active')
    Men_Fashion_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrManClothes)
}
// sự kiện chọn dmuc quần áo nam
Men_Fashion.addEventListener('click', () => {
    Clothes_men()
})
// sự kiện chọn dmuc quần áo nam on mobile
Men_Fashion_mobile.addEventListener('click', () => {
    Clothes_men()
})


function Clothes_women() {
    removeIconActive()
    Women_Fashion.classList.add('icon-active')
    Women_Fashion_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrWomanClothes)
}
// sự kiện chọn dmuc quần áo nữ
Women_Fashion.addEventListener('click', () => {
    Clothes_women()
})
// sự kiện chọn dmuc quần áo nữ trên mobile
Women_Fashion_mobile.addEventListener('click', () => {
    Clothes_women()
})


function Jewels() {
    removeIconActive()
    jewels.classList.add('icon-active')
    jewels_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrJewelery)
}
// sự kiện chọn dmuc trang sức nữ
jewels.addEventListener('click', () => {
    Jewels()
})
// sự kiện chọn dmuc trang sức nữ on mobile
jewels_mobile.addEventListener('click', () => {
    Jewels()
})


function Electronice() {
    removeIconActive()
    electronice.classList.add('icon-active')
    electronice_mobile.classList.add('active_mobile')
    renderStart.innerHTML = ''
    renderListProduct(ArrElectronics)
}
// sự kiện chọn dmuc công nghệ
electronice.addEventListener('click', () => {
    Electronice()
})
// sự kiện chọn dmuc công nghệ on mobile
electronice_mobile.addEventListener('click', () => {
    Electronice()
})


// Sự kiện thêm sản phẩm vào giỏ hàng
handleCart = function (id) {
    if (Online) {
        // check xem giỏ hàng đã có sản phẩm này chưa
        let check = true
        StorageAccount.forEach(item => {
            if (item.CheckOnline) {
                item.Cart.forEach(i => {
                    if (i.id === id) {
                        check = false
                    }
                })
            }
        })
        if (check) {
            ArrProduct.forEach(item => {
                if (item.id === id) {
                    StorageAccount.forEach(i => {
                        if (i.CheckOnline) {
                            i.Cart.unshift(item)
                        }
                    })
                    saveStorageAccount()
                }
            })
            renderCartHeader()
        }
    } else {
        window.location = './login.html'
    }
}

// xóa lưu sản phẩm thêm vào giỏ hàng vào localStorage
function saveStorageCart() {
    localStorage.setItem('ListProduct', JSON.stringify(StorageCart))
}

// lưu Account vào localStorage
function saveStorageAccount() {
    localStorage.setItem('ListAccount', JSON.stringify(StorageAccount))
}

// hiện sp đã thêm vào giỏ hàng khi Load lại
function initCart() {
    if (Online) {
        renderCartHeader()
    }
}
initCart()

// hiện sp đc thêm vào giỏ hàng ở header
function renderCartHeader() {
    StorageAccount.forEach(item => {
        if (item.CheckOnline) {
            countProduct = item.Cart.length
        }
    })

    header_sum_market.innerHTML = `${countProduct}`
    header_list_product_buy.innerHTML = ''
    StorageAccount.forEach(i => {
        if (i.CheckOnline) {
            i.Cart.forEach(item => {
                header_list_product_buy.innerHTML += `
                <div class="header-product-buy-item">
                    <img src="${item.image}" alt="" class="product-buy">
                    <div class="header-product-buy-dis">
                        <h3 class="product-dis">${item.title}</h3>
                        <spand class="product-buy-type">Hãng: ${item.brand}</spand>
                    </div>
                    <div class="product-buy-price">
                        <span class="price">${item.price}</span>
                    </div>
                </div>`
            })
        }
    })
}

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
handleIncrease = function (id) {
    let ListAmount = document.querySelectorAll('.amount')
    ListAmount.forEach(item => {
        let index = item.getAttribute("tabindex")
        if (parseInt(index) === id) {
            let count = parseInt(item.innerText);
            count++;
            item.innerHTML = `${count}`
            saveSumBuy(id, count)
        }
    })
}

// xử lý skien giảm số lượng sản phẩm
handleReduced = function (id) {
    let ListAmount = document.querySelectorAll('.amount')
    ListAmount.forEach(item => {
        let index = item.getAttribute("tabindex")
        if (parseInt(index) === id) {
            let count = parseInt(item.innerText)
            let result = count > 1 ? count = count - 1 : 1
            item.innerHTML = `${result}`
            saveStorageAccount()
        }
    })
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
    renderCartHeader()
}