const dropdownMenuButton = document.querySelector('.js-dropdown-menu__button');
const dropdownMenuNav = document.querySelector('.dropdown-menu__nav');

dropdownMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenuNav.classList.toggle('dropdown-menu__nav_active');
});

dropdownMenuNav.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('click', () => {
    dropdownMenuNav.classList.remove('dropdown-menu__nav_active');
});
