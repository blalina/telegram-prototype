/* eslint-disable spaced-comment */
/* dropdown menu */
const dropdownMenuButton = document.querySelector('.js-dropdown-menu__button');
const dropdownMenuNav = document.querySelector('.js-dropdown-menu-nav');

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
const searchInput = document.querySelector('.js-search-input');

const infoForUser = Array.from(document.querySelectorAll('.js-chat-list-user'));
const usersTitle = infoForUser.map((user) => user.querySelector('.js-chat-list-title h3'));

searchInput.addEventListener('input', () => {
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
});

/* deleted value in the search */
const clearSearchButton = document.querySelector('.js-search-button-clear');

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  const event = new Event('input');
  searchInput.dispatchEvent(event);
});
