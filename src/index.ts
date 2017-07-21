// let WebFont: any;

// WebFont.load({
//   google: {
//     families: ['Libre Baskerville', 'Libre Franklin']
//   }
// });

const navMenu = document.querySelectorAll('.desktop-nav--top-level');
const mobileNavTop = document.querySelectorAll('.mobile-nav--link');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');
const showMenuBtn = document.querySelector('.show-menu-btn');

// navMenu.mouseenter(function() {
//   $(this).children('.desktop-nav--second-level').css('display', 'flex');
// });

navMenu.forEach(menu => {
  const secondLevel = menu.querySelector('.desktop-nav--second-level');
  menu.addEventListener('mouseenter', () => {
    if (secondLevel) secondLevel.style.display = 'flex';
  });

  // navMenu.mouseleave(function() {
  //   $(this).children('.desktop-nav--second-level').hide();
  // });
  menu.addEventListener('mouseleave', () => {
    if (secondLevel) secondLevel.style.display = 'none';
  });
});

// $mobileNavTop.click(function() {
//   const $children = $(this).parent().children('.mobile-nav--second-level');
//   if ($children.css('display') === 'none') {
//     $children.show();
//   } else {
//     $children.hide();
//   }
// });

mobileNavTop.forEach((topMenu: HTMLElement) => {
  topMenu.addEventListener('click', () => {
    topMenu.nextElementSibling.classList.toggle('hidden');
  });
});

// $closeBtn.click(function() {
//   $mobileNav.hide();
//   $showMenuBtn.show();
// });

closeBtn.addEventListener('click', () => {
  mobileNav.classList.add('hidden');
  showMenuBtn.classList.remove('hidden');
});

// $showMenuBtn.click(function() {
//   $showMenuBtn.hide();
//   $mobileNav.show();
// });

showMenuBtn.addEventListener('click', () => {
  showMenuBtn.classList.add('hidden');
  mobileNav.classList.remove('hidden');
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}
