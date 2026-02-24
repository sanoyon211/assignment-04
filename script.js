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


mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {
    const card = event.target.closest('.card');
    const parenNode = card.querySelector('.card-info');
    const cardId = card.getAttribute('data-id');

    const companyName = parenNode.querySelector('.companyName').innerText;
    const jobName = parenNode.querySelector('.jobName').innerText;
    const country = parenNode.querySelector('.country').innerText;
    const time = parenNode.querySelector('.time').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'INTERVIEW';

    cardStatusMap[cardId] = 'INTERVIEW';

    const cardInfo = {
      id: cardId,
      companyName,
      jobName,
      country,
      time,
      salary,
      status: 'INTERVIEW',
      notes,
    };

    const jobExist = interviewList.find(item => item.id == cardId);
    if (!jobExist) {
      interviewList.push(cardInfo);
    } else {
      jobExist.status = 'INTERVIEW';
    }

    rejectedList = rejectedList.filter(item => item.id != cardId);

    const originalCard = allCardSection.querySelector(`[data-id="${cardId}"]`);
    if (originalCard) {
      originalCard.querySelector('.status').innerText = 'INTERVIEW';
    }

    if (currentStatus == 'rejected-filter-btn') renderRejected();
    if (currentStatus == 'interview-filter-btn') renderInterview();

    calculateCount();
  } else if (event.target.classList.contains('rejected-btn')) {
    const card = event.target.closest('.card');
    const parenNode = card.querySelector('.card-info');
    const cardId = card.getAttribute('data-id');

    const companyName = parenNode.querySelector('.companyName').innerText;
    const jobName = parenNode.querySelector('.jobName').innerText;
    const country = parenNode.querySelector('.country').innerText;
    const time = parenNode.querySelector('.time').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'REJECTED';

    cardStatusMap[cardId] = 'REJECTED';

    const cardInfo = {
      id: cardId,
      companyName,
      jobName,
      country,
      time,
      salary,
      status: 'REJECTED',
      notes,
    };

    const jobExist = rejectedList.find(item => item.id == cardId);
    if (!jobExist) {
      rejectedList.push(cardInfo);
    } else {
      jobExist.status = 'REJECTED';
    }

    interviewList = interviewList.filter(item => item.id != cardId);

    const originalCard = allCardSection.querySelector(`[data-id="${cardId}"]`);
    if (originalCard) {
      originalCard.querySelector('.status').innerText = 'REJECTED';
    }

    if (currentStatus == 'interview-filter-btn') renderInterview();
    if (currentStatus == 'rejected-filter-btn') renderRejected();

    calculateCount();
  } else if (event.target.closest('.btn-delete')) {
    const card = event.target.closest('.card');
    const cardId = card.getAttribute('data-id');

    interviewList = interviewList.filter(item => item.id != cardId);
    rejectedList = rejectedList.filter(item => item.id != cardId);

    if (filterSection.contains(card)) {
      card.remove();

      const originalCard = allCardSection.querySelector(
        `[data-id="${cardId}"]`,
      );
      if (originalCard) {
        originalCard.querySelector('.status').innerText = 'NOT APPLIED';
        cardStatusMap[cardId] = 'NOT APPLIED';
      }
    }

    if (allCardSection.contains(card)) {
      card.remove();
      delete cardStatusMap[cardId];
    }

    calculateCount();
  }
});

function renderInterview() {
  filterSection.innerHTML = '';

  if (interviewList.length === 0) {
    filterSection.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 bg-white text-gray-400 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
        <img src="assets/jobs.png" alt="">
        <p class="text-xl text-[#002C5C] font-semibold">No jobs available</p>
        <p class="text-sm mt-1">Check back soon for new opportunities</p>
      </div>
    `;
    return;
  }

  for (let interview of interviewList) {
    let div = document.createElement('div');
    div.className =
      'card flex flex-col items-center gap-y-8 md:flex-row md:justify-between md:items-start rounded-md shadow-[0_0_15px_rgba(0,0,0,0.2)] p-8 mb-6';
    div.setAttribute('data-id', interview.id);
    div.innerHTML = `
        <div class="card-info space-y-5">
            <div>
              <p class="companyName text-2xl font-bold text-[#002C5C]">${interview.companyName}</p>
              <p class="jobName">${interview.jobName}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-x-6 gap-y-2">
              <p class="country">${interview.country}</p>
              <ul class="list-disc pl-3 flex gap-6">
                <li class="time">${interview.time}</li>
                <li class="salary">${interview.salary}</li>
              </ul>
            </div>
            <p class="status bg-[#EEF4FF] py-2 px-3 rounded-[8px] inline">${interview.status}</p>
            <p class="notes mt-3">${interview.notes}</p>
            <div class="flex gap-5">
              <button class="interview-btn bg-white text-lg text-green-600 px-4 py-2 rounded-lg border border-green-600 hover:bg-green-500 hover:text-white hover:border-transparent transition duration-300 ease-in-out cursor-pointer">INTERVIEW</button>
              <button class="rejected-btn bg-white text-lg text-red-600 px-4 py-2 rounded-lg border border-red-600 hover:bg-red-500 hover:text-white hover:border-transparent transition duration-300 ease-in-out cursor-pointer">REJECTED</button>
            </div>
        </div>
        <div>
          <button class="btn-delete rounded-full p-2 border border-gray-500 cursor-pointer">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
    `;
    filterSection.appendChild(div);
  }
}

function renderRejected() {
  filterSection.innerHTML = '';

  if (rejectedList.length === 0) {
    filterSection.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 bg-white text-gray-400 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
        <img src="assets/jobs.png" alt="">
        <p class="text-xl text-[#002C5C] font-semibold">No jobs available</p>
        <p class="text-sm mt-1">Check back soon for new opportunities</p>
      </div>
    `;
    return;
  }

  for (let rejected of rejectedList) {
    let div = document.createElement('div');
    div.className =
      'card flex flex-col items-center gap-y-8 md:flex-row md:justify-between md:items-start rounded-md shadow-[0_0_15px_rgba(0,0,0,0.2)] p-8 mb-6';
    div.setAttribute('data-id', rejected.id);
    div.innerHTML = `
        <div class="card-info space-y-5">
            <div>
              <p class="companyName text-2xl font-bold text-[#002C5C]">${rejected.companyName}</p>
              <p class="jobName">${rejected.jobName}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-x-6 gap-y-2">
              <p class="country">${rejected.country}</p>
              <ul class="list-disc pl-3 flex gap-6">
                <li class="time">${rejected.time}</li>
                <li class="salary">${rejected.salary}</li>
              </ul>
            </div>
            <p class="status bg-[#EEF4FF] py-2 px-3 rounded-[8px] inline">${rejected.status}</p>
            <p class="notes mt-3">${rejected.notes}</p>
            <div class="flex gap-5">
              <button class="interview-btn bg-white text-lg text-green-600 px-4 py-2 rounded-lg border border-green-600 hover:bg-green-500 hover:text-white hover:border-transparent transition duration-300 ease-in-out cursor-pointer">INTERVIEW</button>
              <button class="rejected-btn bg-white text-lg text-red-600 px-4 py-2 rounded-lg border border-red-600 hover:bg-red-500 hover:text-white hover:border-transparent transition duration-300 ease-in-out cursor-pointer">REJECTED</button>
            </div>
        </div>
        <div>
          <button class="btn-delete rounded-full p-2 border border-gray-500 cursor-pointer">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
    `;
    filterSection.appendChild(div);
  }
}
