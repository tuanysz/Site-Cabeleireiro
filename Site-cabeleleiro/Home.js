let items = document.querySelectorAll('.container .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');



let active = 0;

function loadShow() {
  let stt = 0;


  for (let i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `perspective(1000px) translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  stt = 0;
 
  for (let i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `perspective(1000px) translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  items[active].style.transform = 'perspective(1000px) translateX(0) scale(1) rotateY(0deg)';
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;
}

loadShow();

next.onclick = function () {
  active = (active + 1) % items.length;
  loadShow();
};

prev.onclick = function () {
  active = (active - 1 + items.length) % items.length;
  loadShow();
};

setInterval(() => {
  next.click();
}, 5000);

