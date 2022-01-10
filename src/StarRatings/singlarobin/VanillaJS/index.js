const stars = document.querySelectorAll('.star');
const number = document.getElementById('number');
let clickEvent = false;

const handleHoverEnter = (e) => {
    const key = e.target.dataset.key;
    for (let i = 0; i < parseInt(key); i++) {
        stars[i].classList.add('color');
    }
    for (let i = parseInt(key); i < 5; i++) {
        stars[i].classList.remove('color');
    }
};

const handleHoverOut = (e) => {
    if (clickEvent) {
        clickEvent = false;
        return;
    };
    const key = e.target.dataset.key;
    for (let i = 0; i < parseInt(key); i++) {
        stars[i].classList.remove('color');
    }
}

const handleClickState = (e) => {
    clickEvent = true;
    const key = e.target.dataset.key;
    number.innerHTML = key;
    for (let i = 0; i < parseInt(key); i++) {
        stars[i].classList.add('color');
    }
};

stars.forEach((item) => {
    item.addEventListener('mouseover', (e) => handleHoverEnter(e));
    item.addEventListener('mouseout', (e) => handleHoverOut(e));
    item.addEventListener('click', (e) => handleClickState(e));
});

document.addEventListener('click', (e) => {
    
})
