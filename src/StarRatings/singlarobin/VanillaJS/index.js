/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
let lastClickedId = 0;

function Star(el, count, callback) {
  // write logic to create star rating utility.
  const starWrapper = document.querySelector(el);
  for (let i = 1; i <= count; i++) {
    const element = document.createElement('i');
    element.setAttribute('id', i);
    element.classList.add('fa', 'fa-star-o');
    starWrapper.appendChild(element);
  }
  starWrapper.addEventListener('click', (e) => handleClick(e, count, callback));
  starWrapper.addEventListener('mouseover', handleHoverEnter);
  starWrapper.addEventListener('mouseout', handleHoverOut);
}

function handleHoverEnter(e) {
  const id = e.target.id;
  for (let i = lastClickedId === 0 ? 1 : lastClickedId; i <= id; i++) {
    const starElement = document.getElementById(i);
    starElement.classList.add('fa-star');
    starElement.classList.remove('fa-star-o');
  }
}

function handleHoverOut(e) {
  const id = e.target.id;
  if (parseInt(id) > lastClickedId) {
    for (let i = lastClickedId + 1; i <= parseInt(id); i++) {
      const starElement = document.getElementById(i);
      starElement.classList.remove('fa-star');
      starElement.classList.add('fa-star-o');
    }
  }
}

function handleClick(e, count, callback) {
  const id = e.target.id;
  for (let i = 1; i <= id; i++) {
    const starElement = document.getElementById(i);
    starElement.classList.add('fa-star');
    starElement.classList.remove('fa-star-o');
  }
  for (let i = parseInt(id) + 1; i <= count; i++) {
    const starElement = document.getElementById(i);
    starElement.classList.remove('fa-star');
    starElement.classList.add('fa-star-o');
  }
  lastClickedId = parseInt(id);
  callback(id);
}
