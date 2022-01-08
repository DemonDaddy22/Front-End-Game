/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

function Star(el, count, callback) {
  // select element 'el'
  const element = document.querySelector(el);
  // keep track of last filled star
  let lastFilledStarIndex = -1;

  // initially render 'count' empty stars
  for (let counter = 0; counter < count; counter++) {
    const emptyStar = document.createElement('i');
    emptyStar.classList.add('fa', 'fa-star-o');
    emptyStar.dataset.id = counter + 1;

    element.append(emptyStar);
  }
  // get NodeList of all the stars
  const stars = element.childNodes;

  // add event listener on element for mouseover, mouseout, click events
  element.addEventListener('mouseover', (e) => handleHover(e, true));
  element.addEventListener('mouseout', (e) => handleHover(e, false));
  element.addEventListener('click', handleClick);

  // on mouseover - change empty class to filled class till the hovered star
  // on mouseout - change filled class to empty class for temp stars
  function handleHover(e, isMouseover) {
    const star = e.target;
    if (!star)
      return;

    const starIndex = Number(star.dataset.id);
    if (!starIndex)
      return;

    for (let counter = lastFilledStarIndex + 1; counter < starIndex;
         counter++) {
      stars[counter].classList.remove(isMouseover ? 'fa-star-o' : 'fa-star');
      stars[counter].classList.add(isMouseover ? 'fa-star' : 'fa-star-o');
    }
  }

  // on click - update the index of last filled star
  function handleClick(e) {
    const star = e.target;
    if (!star)
      return;

    const starIndex = Number(star.dataset.id);
    if (!starIndex)
      return;

    if (lastFilledStarIndex >= starIndex) {
      for (let counter = starIndex; counter <= lastFilledStarIndex; counter++) {
        stars[counter].classList.remove('fa-star');
        stars[counter].classList.add('fa-star-o');
      }
    } else {
      for (let counter = lastFilledStarIndex + 1; counter < starIndex;
           counter++) {
        stars[counter].classList.remove('fa-star-o');
        stars[counter].classList.add('fa-star');
      }
    }

    lastFilledStarIndex = starIndex - 1;
    callback(starIndex);
  }
}
