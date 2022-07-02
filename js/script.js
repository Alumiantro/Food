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
});