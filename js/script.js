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

    //Modal
    const btnsModal = document.querySelectorAll("[data-modal]");
    // const closeModal = document.querySelector("[data-close]");
    const modal = document.querySelector('.modal');

    btnsModal.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // если юзер открыл окно сам, мы не будем его открывать повторно через таймаут
    }

    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('add');
        document.body.style.overflow = '';
    }

    // closeModal.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //Classes
    class MenuCard {
        constructor(src, alt, title, descr, price, parent, transfer, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parent);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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

    //Post Data

    const messages = {
        success: 'Перезвоним через минуту',
        error: 'Что-то пошло не так',
        download: 'img/form/spinner.svg'
    };

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        postData(form);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const answer = document.createElement('img');
            answer.src = messages.download;
            answer.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', answer);

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            })

            fetch('server1.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
                answer.remove();
            }).catch(() => {
                showThanksModal(messages.error);
            }).finally(() => {
                form.reset();
            })

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(messages.success);
            //         answer.remove();
            //         form.reset();
            //     } else {
            //         showThanksModal(messages.error);
            //     }
            // });
        });
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            name: 'Adelya',
            age: 12
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide')

        openModal()

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>`;

        modal.insertAdjacentElement('beforeend', thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            modalDialog.classList.add('show')
            modalDialog.classList.remove('hide')
            hideModal()
        }, 40000)
    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res))
});