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
  // prevent text/item from being highlighted when dragging the cursor
  event.preventDefault();
  currentMousePosition = event.clientX;

  const calculateElementSize = window.getComputedStyle(leftMainColumn);
  elementSize = parseInt(calculateElementSize.width, 10);

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

resizeHandle.addEventListener('mousedown', mouseDownHandler);

/* changed Send button icon */
const messageInputForm = document.querySelector('.js-footer_message-input-form');
const recordButtonIcon = document.querySelector('.js-icon-button_voice__svg');
const sendButtonIcon = document.querySelector('.js-icon-button_voice__svg-send');

messageInputForm.addEventListener('input', (event) => {
  const inputValue = event.target.textContent;

  if (inputValue !== '') {
    recordButtonIcon.classList.add('footer__button_voice__svg_hidden');
    sendButtonIcon.classList.add('footer__button_voice__svg-send_active');
  } else {
    recordButtonIcon.classList.remove('footer__button_voice__svg_hidden');
    sendButtonIcon.classList.remove('footer__button_voice__svg-send_active');
  }
});

// input event trigger to display the voice button
const formEventTrigger = () => {
  messageInputForm.dispatchEvent(new Event('input'));
};

/* message send form */
const messageSendButton = document.querySelector('.js-message-send-button');
const messagesContainer = document.querySelector('.js-messages-container');

const sendMessage = () => {
  const inputValue = messageInputForm.innerText.trim();
  if (!inputValue) return; // if nothing is entered, abort

  messageInputForm.innerText = ''; // leaves the input field blank after sending

  const newDiv = document.createElement('div');
  newDiv.className = 'message-body message-body_rigth';
  const newParagraph = document.createElement('p');
  newParagraph.className = 'message-body__p';

  newParagraph.innerText = inputValue;
  newDiv.appendChild(newParagraph);

  messagesContainer.appendChild(newDiv);
};

/* date in the message */
const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

let called = false;

const sendDate = () => {
  // func call check
  if (called) return;
  called = true;

  const currentTime = new Date();
  const currentMonth = currentTime.getMonth();
  const currentDate = currentTime.getDate();
  const monthToday = `${month[currentMonth]} ${currentDate}`;

  const newDiv = document.createElement('div');
  newDiv.className = 'message-date';
  const newSpan = document.createElement('span');
  newSpan.className = 'message-date__span';

  newSpan.innerText = monthToday;
  newDiv.appendChild(newSpan);

  messagesContainer.appendChild(newDiv);
};

messageSendButton.addEventListener('click', () => {
  sendDate();
  sendMessage();
  formEventTrigger();
});

messageInputForm.addEventListener('keypress', (event) => {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    sendDate();
    sendMessage();
    formEventTrigger();
  }
});
