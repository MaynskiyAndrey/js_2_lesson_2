function onLoad() {
	class GoodsItem {
		constructor({ title, price }) {
			this.title = title;
			this.price = price;
		}
		render() {
			return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
		}
	}

	class GoodsList {
		constructor() {
			this.goods = [];
		}
		fetchGoods() {
			this.goods = [
				{ title: 'Shirt', price: 150 },
				{ title: 'Socks', price: 50 },
				{ title: 'Jacket', price: 350 },
				{ title: 'Shoes', price: 250 },
			];
		}
		render() {
			let listHtml = '';
			this.goods.forEach(good => {
				const goodItem = new GoodsItem(good);
				listHtml += goodItem.render();
			});
			document.querySelector('.goods-list').innerHTML = listHtml;
		}
	}

	const list = new GoodsList();
	list.fetchGoods();
	list.render();


	class Basket {
		constructor() {
			this.items = [];
		}
		addItem(goodsItem, count) {
			const newItem = new BasketItem(goodsItem, count);
			this.items.push(newItem);
		}
		removeItem(goodsItem) {
			let index = this.items.indexOf(s => s.goodItem == goodsItem);
			if (index > 1) {
				this.items.slice(index, 1);
			}
		}

		getSummCost() {
			const result = 0;
			this.items.forEach((item, index, array) => {
				result += item.goodItem.price * item.count;
			})

			return result;
		}
	}

	class BasketItem {
		constructor(goodsItem, count) {
			this.googsItem = goodsItem;
			this.count = count;
		}

		addItem() {
			this.count++;
		}
		removeItem() {
			this.count--;
		}
	}


	//задание со звездочкой
	class Topping {
		constructor(name, price, kall, main = true) {
			this.name = name;
			this.price = price;
			this.kall = kall;
			this.main = main;
		}
	}

	const stuffingChees = new Topping('сыр', 10, 20);
	const stuffingSalat = new Topping('салат', 20, 5);
	const stuffingPotato = new Topping('картофель', 15, 10);

	const toppingFlavoring = new Topping('приправа', 15, 0, false);
	const toppingMayonnaise = new Topping('майонез', 20, 5, false);


	const smallSize = 'min';
	const bigSize = 'max';
	const smallSizePrice = 50;
	const bigSizePrice = 100;

	const smallSizeKall = 20;
	const bigSizeKall = 40;

	class Hamburger {
		constructor(size, stuffing) {
			this.size = size;
			this.stuffings = [];
			this.stuffings.push(stuffing);
		}
		addTopping(topping) {    // Добавить добавку 
			this.stuffings.push(topping);
		}
		removeTopping(topping) { // Убрать добавку 
			let removeIndex = -1;
			let removerItem = this.stuffings.find((i, index, array) => {

				if (i.name.localeCompare(topping.name) == 0) {
					removeIndex = index;
					return true;
				};
				return false;
			});
			if (removeIndex == -1) {
				return;
			}
			let mainSaveIndex = this.stuffings.find((i, index, array) => index != removeIndex && i.main == true);

			if (mainSaveIndex != null) {
				this.stuffings.splice(removeIndex, 1);
			}
		}
		getToppings() {   // Получить список добавок
			return this.stuffings.filter(i => i.main == false);
		}
		getSize() {              // Узнать размер гамбургера 
			return this.size;
		}
		getStuffing() {          // Узнать начинку гамбургера 
			return this.stuffings.filter(i => i.main == true);
		}
		calculatePrice() {       // Узнать цену 
			let result = 0;
			if (this.size == smallSize) {
				result += smallSizePrice;
			}
			else {
				result += bigSizePrice;
			}

			this.stuffings.forEach(i => result += i.price);

			return result;
		}
		calculateCalories() {    // Узнать калорийность 
			let result = 0;
			if (this.size == smallSize) {
				result += smallSizeKall;
			}
			else {
				result += bigSizeKall;
			}

			this.stuffings.forEach(i => result += i.kall);

			return result;
		}
	}

	let ham1 = new Hamburger(bigSize, stuffingChees);
	ham1.addTopping(stuffingChees);
	ham1.removeTopping(stuffingChees);
	ham1.calculateCalories();
};