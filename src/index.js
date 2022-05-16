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

searchInput.addEventListener('input', () => {
  if (searchInput.value !== '') {
    clearSearchButton.classList.add('show-search-button-clear');
  } else {
    clearSearchButton.classList.remove('show-search-button-clear');
  }
});

/* Stretch the block (chat) with the mouse */
const leftMainColumn = document.querySelector('.js-left-main-column');
const resizeHandle = document.querySelector('.js-resize-handle');

let currentMousePosition = 0;
let elementSize = 0;

const mouseMoveHandler = (event) => {
  const mouseDistance = event.clientX - currentMousePosition;
  leftMainColumn.style.width = `${elementSize + mouseDistance}px`;
};

const mouseUpHandler = () => {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

const mouseDownHandler = (event) => {
  event.preventDefault(); //Prevent text/item from being highlighted when dragging the cursor
  currentMousePosition = event.clientX;

  const calculateElementSize = window.getComputedStyle(leftMainColumn);
  elementSize = parseInt(calculateElementSize.width, 10);

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

resizeHandle.addEventListener('mousedown', mouseDownHandler);
