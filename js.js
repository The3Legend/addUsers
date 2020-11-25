const container = document.querySelector('.container')
const btnAddPost = document.querySelector('.btn-add-post')
const form = document.forms['addTask'];
const nameForm = form.elements['name']
const emailForm = form.elements['Email']
const userNameForm = form.elements['User name']
const phoneForm = form.elements['phone']
const websiteForm = form.elements['website']

form.addEventListener('submit', createForm);



function createForm(e) {
  e.preventDefault();
  const nameValue = nameForm.value
  const emailValue = emailForm.value
  const userNameValue = userNameForm.value
  const phoneValue = phoneForm.value
  const websiteValue = websiteForm.value
  const newTask = {
    name: nameValue,
    email: emailValue,
    username: userNameValue,
    phone: phoneValue,
    website: websiteValue
  };

  createPost(newTask, response => {

    const card = cardTemp(response);
    container.insertAdjacentElement('afterbegin', card)
  })




}

function getPosts(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://jsonplaceholder.typicode.com/users');

  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);

    cb(response);
  });


  xhr.addEventListener('error', () => {
    console.log('error')
  })


  xhr.send();
}

function createPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'https://jsonplaceholder.typicode.com/posts');

  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);

    cb(response);
  });

  xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  xhr.addEventListener('error', () => {
    console.log('error')
  })


  xhr.send(JSON.stringify(body));
}

function cardTemp({
  name,
  username,
  email,
  phone,
  website,
}) {
  const div = document.createElement('div');
  div.style.border = '1px solid black'
  div.style.margin = '10px'
  div.style.padding = '10px'
  div.classList.add('show')
  const title = document.createElement('h5')
  title.textContent = name
  title.style.textAlign = 'center'
  const article = document.createElement('p')
  article.innerHTML = `<strong>Username:</strong> ${username}</br>Email: ${email}</br>Phone: ${phone}</br>website: ${website}</br>`;
  const btn = document.createElement('button')
  btn.classList.add('btn', 'btn-primary')
  btn.textContent = 'See Profile'
  article.classList.add('d-none')


  div.appendChild(title);
  div.appendChild(article);
  div.appendChild(btn)

  return div;

}




getPosts((response) => {
  const fragm = document.createDocumentFragment();
  response.forEach(({
    name,
    username,
    email,
    phone,
    website,


  } = {}) => {
    const div = cardTemp({
      name,
      username,
      email,
      phone,
      website,
    })

    fragm.appendChild(div);
  });
  container.appendChild(fragm)
})

container.addEventListener('click', show);

function show({
  target
}) {

  if (target.classList.contains('btn')) {
    target.closest('.show').children[1].classList.toggle('d-none')

  }
}