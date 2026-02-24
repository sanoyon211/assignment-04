let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let cardStatusMap = {};

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');

let cardIdCounter = 0;
const allOriginalCards = allCardSection.querySelectorAll('.card');
allOriginalCards.forEach(card => {
  const id = String(cardIdCounter++);
  card.setAttribute('data-id', id);
  cardStatusMap[id] = 'NOT APPLIED'; // default status
});

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

function toggleStyle(id) {
  allFilterBtn.classList.add('bg-white', 'text-black');
  interviewFilterBtn.classList.add('bg-white', 'text-black');
  rejectedFilterBtn.classList.add('bg-white', 'text-black');

  allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

  const selected = document.getElementById(id);
  currentStatus = id;

  selected.classList.remove('bg-white', 'text-black');
  selected.classList.add('bg-[#3B82F6]', 'text-white');

  if (id == 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id == 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');

    const allCards = allCardSection.querySelectorAll('.card');
    allCards.forEach(card => {
      const cardId = card.getAttribute('data-id');
      if (cardStatusMap[cardId]) {
        card.querySelector('.status').innerText = cardStatusMap[cardId];
      }
    });
  } else if (id == 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  }
}