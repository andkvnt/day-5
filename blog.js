let blogs = [];

function addBlog(event) {
  event.preventDefault();

  // Input Value
  (projectName = document.getElementById('name').value), (startDate = document.getElementById('start-date').value), (endDate = document.getElementById('end-date').value), (description = document.getElementById('description').value);

  // image
  let image = document.getElementById('upload');
  image = URL.createObjectURL(image.files[0]);

  if (!projectName || !startDate || !endDate || !description) {
    return alert('Form cannot be empty');
  }

  let blog = {
    projectName,
    description,
    image,
    duration: countDuration(new Date(startDate), new Date(endDate)),
    technologies: filterChecboxChecked(),
  };

  blogs.push(blog);

  alert('Form successfully created');

  renderBlog();
}

// Getting checbox checked
function filterChecboxChecked() {
  // querry all checkbox inputs
  const checkboxChecked = document.querySelectorAll(".checkbox__group input[type='checkbox']:checked");

  // Array Container
  let cbValue = [];

  // turn nodelist into array
  for (let i = 0; i < checkboxChecked.length; i++) {
    cbValue.push(checkboxChecked[i].value);
  }

  return cbValue;
}

// Render Blog
function renderBlog() {
  let blogContainer = document.getElementById('blog-container');

  blogContainer.innerHTML = '';

  for (let i = 0; i < blogs.length; i++) {
    const techs = blogs[i].technologies;
    blogContainer.innerHTML += `
    <div class="blog__items">
      <a href="./blog-detail.html">
        <div class="blog__image">
          <img src="${blogs[i].image}" alt="Blog Image" />
        </div>
        <div class="blog__header">
          <h3 class="blog__title">${blogs[i].projectName}</h3>
          <p class="blog__duration">Duration : ${blogs[i].duration} Month</p>
        </div>
        <div class="blog__body">
          <p class="blog__description truncate">${blogs[i].description}</p>
        </div>
        <div class="blog__techs">
          ${techs[0] ? `<i class="fa-brands fa-${techs[0]}"></i>` : ''}
          ${techs[1] ? `<i class="fa-brands fa-${techs[1]}"></i>` : ''}
          ${techs[2] ? `<i class="fa-brands fa-${techs[2]}"></i>` : ''}
          ${techs[3] ? `<i class="fa-brands fa-${techs[3]}"></i>` : ''}
        </div>
        <div class="blog__actions">
          <button type="button" class="action__btn">Edit</button>
          <button type="button" class="action__btn">Delete</button>
        </div>
      </a>
    </div>
        `;
  }
}

// Count Project Duration
function countDuration(startDate, endDate) {
  const result = startDate.getMonth() - endDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear());

  return Math.abs(result);
}
