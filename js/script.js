window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const contentTabs = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');

    function hideContent() {
        contentTabs.forEach((item) => {
            item.style.display = "none";
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0) {
        contentTabs[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active');
    }
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            hideContent(contentTabs);
            tabs.forEach((item, index) => {
                if (target == item) {
                    showContent(index);
                }
            });
        }
    });
    hideContent();
    showContent();

    //Timer
    const deadline = '2022-09-28'; //конечная цель
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const day = Math.floor(t / (1000 * 60 * 60 * 24));
        const minutes = Math.floor(t / (1000 * 60 * 60) % 60);
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);
        const seconds = Math.floor((t / 1000) % 60);
        return {
            "total": t,
            "day": day,
            "minutes": minutes,
            "hours": hours,
            "seconds": seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(endTime) {
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            minutes.innerHTML = addZero(t.minutes);
            days.innerHTML = addZero(t.day);
            hours.innerHTML = addZero(t.hours);
            seconds.innerHTML = addZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(deadline);

    //Classes
    class MenuCard {
        constructor(src, alt, title, descr, price, parent, transfer) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            element.innerHTML = `
            <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        10,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        14,
        '.menu .container'
    ).render();
});