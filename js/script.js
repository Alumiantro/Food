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
});