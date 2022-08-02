let x = document.getElementById('shop')

let shopItemsData = [{
    id: "white_bowl",
    name: "Bowl",
    price: 10,
    desc: "stuff about bowl",
    img: "images/bowl.jpg"
}, {
    id: "white_cup",
    name: "Cup",
    price: 7,
    desc: "stuff about cup",
    img: "images/cup.jpg"
}, {
    id: "thermo_flask",
    name: "Flask",
    price: 20,
    desc: "stuff about flask",
    img: "images/flask.jpg"
}, {
    id: "fork_knife",
    name: "Fork & Knife",
    price: 3,
    desc: "stuff about f/k",
    img: "images/fork_knife.jpg"
}, {
    id: "black_kettle",
    name: "Kettle",
    price: 15,
    desc: "stuff about kettle",
    img: "images/kettle.jpg"
}];

let basket = JSON.parse(localStorage.getItem("info")) || []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map( (x) => {
        let {id,name,price,desc,img} = x;
        let search = basket.find((x) => x.id === id) || [] /*return empty arr if nothing found*/
        return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        `
    } ).join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;

    /*checks if selected item already exists in cart*/
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id:selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }

    localStorage.setItem("info", JSON.stringify(basket));
    update(selectedItem.id);
    //console.log(basket);
};


let decrement = (id) => {
    let selectedItem = id;

    /*checks if selected item already exists in cart*/
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if(search.item === 0) return; /*stops when item count reaches zer*/
    else {
        search.item -= 1;
    }

    //console.log(basket);
    basket = basket.filter((x) => x.item !== 0)
    update(selectedItem.id);

    localStorage.setItem("info", JSON.stringify(basket));
}


let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item);

    document.getElementById(id).innerHTML = search.item;

    totalItems();
};

let totalItems = () => {
    let  cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map( (x) => x.item).reduce((x, y) => x+y, 0);
    //cartIcon.innerHTML = 100;
}

totalItems();