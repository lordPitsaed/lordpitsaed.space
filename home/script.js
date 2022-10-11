/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
function darkMode() {
  const background = document.querySelector('.background');
  const textColor = document.querySelectorAll('a');
  const button = document.querySelectorAll('.addForm button');
  const input = document.querySelectorAll('.addForm input');
  const addFormBackground = document.querySelector('.addForm');
  const addSelectorColor = document.querySelector('.addForm select');


  if (document.getElementById('theme-button').checked == true) {
    background.style.background = '#f5f3ed';
    background.style.color = '#1c1f20';

    textColor.forEach((el) => el.style.color = '#1c1f20');
    button.forEach((el) => {
      el.style.color = '#1c1f20'; el.style.backgroundColor = '#f5f3ed';
    });
    input.forEach((el) => {
      el.style.color = '#1c1f20'; el.style.backgroundColor = '#f5f3ed';
    });

    addFormBackground.style.backgroundColor = '#9c9789';
    addSelectorColor.style.backgroundColor = '#f5f3ed';
    addSelectorColor.style.color = '#1c1f20';
  } else {
    background.style.background = '#1c1f20';
    background.style.color = '#f5f3ed';

    textColor.forEach((el) => el.style.color = '#f5f3ed');
    button.forEach((el) => {
      el.style.color = '#f5f3ed'; el.style.backgroundColor = '#1c1f20';
    });
    input.forEach((el) => {
      el.style.color = '#f5f3ed'; el.style.backgroundColor = '#1c1f20';
    });

    addFormBackground.style.backgroundColor = '#737373';
    addSelectorColor.style.backgroundColor = '#1c1f20';
    addSelectorColor.style.color = '#f5f3ed';
  }
};

const addForm = document.querySelector('.add_form');


document.querySelector('.expand_button').onclick = function() {
  addForm.style.opacity = '1';
  addForm.style.zIndex = '1';

  updateDropdownSelectorList();
};
document.querySelector('.close_button').onclick = function() {
  addForm.style.opacity = '0';
  addForm.style.zIndex = '-2';

  clearDropdownSelectorList();
};


const cattegoriesArr = [];
const selector = document.querySelector('#categories');


function updateDropdownSelectorList() {
  const categories = document.querySelectorAll('.category');


  categories.forEach((element) => {
    const item = document.createElement('option');


    item.innerText = element.innerText;
    selector.append(item);
    cattegoriesArr.push(element.innerText);
  });
};

function clearDropdownSelectorList() {
  cattegoriesArr.length = 0;
  const categoriesElements = document.querySelectorAll('#categories option');


  categoriesElements.forEach((element) => {
    element.remove();
  });
};

function openAddCategory() {
  document.getElementById('category_name').style.opacity='1';
  document.getElementById('category_name').style.width='150px';
  document.getElementById('add_category').classList.add('clicked');
  document.querySelector('.add_form').style.width='40%';
};
function closeAddCategory() {
  document.getElementById('category_name').style.opacity='0';
  document.getElementById('category_name').style.width='0px';
  document.getElementById('add_category').classList.remove('clicked');
  document.querySelector('.add_form').style.width='25%';
};

function clearAddForm() {
  const elements = document.querySelectorAll('.add_form input');
  elements.forEach((element) => {
    element.value = '';
  });
}

document.querySelector('#add_button').onclick = function() {
  const url = document.getElementById('add_url').value;
  const name = document.getElementById('add_name').value;
  const selectedCategory = document.querySelectorAll('.flex')[cattegoriesArr.indexOf(selector.value)];


  if (url != '' & name != '') {
    const addItem = document.createElement('a');
    addItem.setAttribute('href', url);
    addItem.innerHTML = '<img height="16" width="16" src="http://www.google.com/s2/favicons?domain=' + url + '"' + 'style="padding: 0px 5px 0 0;">'+name;
    selectedCategory.append(addItem);
    clearAddForm();
  }
};

console.log(document.getElementById('add_category').classList.contains('clicked'));

const categoryName = document.querySelector('#category_name');


document.querySelector('#add_category').onclick = function() {
  if (document.querySelector('#add_category').classList.contains('clicked') === false) {
    openAddCategory();
  } else {
    if (categoryName.value != '') {
      const addItem1 = document.createElement('div');
      const addItem2 = document.createElement('div');


      addItem1.classList.add('flex');
      addItem2.classList.add('category');
      addItem2.innerText = categoryName.value;

      document.querySelectorAll('.flex')[cattegoriesArr.length-1].after(addItem1);
      document.querySelectorAll('.flex')[cattegoriesArr.length].append(addItem2);

      clearDropdownSelectorList();
      updateDropdownSelectorList();
    }
    closeAddCategory();
    clearAddForm();
  }
};

