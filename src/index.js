/* eslint-disable spaced-comment */
/* dropdown menu */
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

/* relevant contact search */
const searchInput = document.querySelector('.search__input');

const infoForUser = Array.from(document.querySelectorAll('.chat-list_user'));
const usersTitle = infoForUser.map((user) => user.querySelector('.chat-list__title h3'));

searchInput.oninput = () => {
  const valueEnteredByTheUser = searchInput.value.trim().toLowerCase();

  if (valueEnteredByTheUser !== '') {
    usersTitle.forEach((element, index) => {
      if (element.innerText.toLowerCase().search(valueEnteredByTheUser) === -1) {
        infoForUser[index].classList.add('hidden');
      } else {
        infoForUser[index].classList.remove('hidden');
      }
    });
  } else {
    usersTitle.forEach((element, index) => {
      infoForUser[index].classList.remove('hidden');
    });
  }
};

/* deleted value in the search */
const clearSearchButton = document.querySelector('.search__button-svg_clear');

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  const event = new Event('input');
  searchInput.dispatchEvent(event);
});
