var navMenu = document.querySelectorAll('.desktop-nav--top-level');
var mobileNavTop = document.querySelectorAll('.mobile-nav--link');
var mobileNav = document.querySelector('.mobile-nav');
var closeBtn = document.querySelector('.close-btn');
var showMenuBtn = document.querySelector('.show-menu-btn');
// navMenu.mouseenter(function() {
//   $(this).children('.desktop-nav--second-level').css('display', 'flex');
// });
navMenu.forEach(function (menu) {
    var secondLevel = menu.querySelector('.desktop-nav--second-level');
    menu.addEventListener('mouseenter', function () {
        if (secondLevel)
            secondLevel.style.display = 'flex';
    });
    // navMenu.mouseleave(function() {
    //   $(this).children('.desktop-nav--second-level').hide();
    // });
    menu.addEventListener('mouseleave', function () {
        if (secondLevel)
            secondLevel.style.display = 'none';
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
mobileNavTop.forEach(function (topMenu) {
    topMenu.addEventListener('click', function () {
        topMenu.nextElementSibling.classList.toggle('hidden');
    });
});
// $closeBtn.click(function() {
//   $mobileNav.hide();
//   $showMenuBtn.show();
// });
closeBtn.addEventListener('click', function () {
    mobileNav.classList.add('hidden');
    showMenuBtn.classList.remove('hidden');
});
// $showMenuBtn.click(function() {
//   $showMenuBtn.hide();
//   $mobileNav.show();
// });
showMenuBtn.addEventListener('click', function () {
    showMenuBtn.classList.add('hidden');
    mobileNav.classList.remove('hidden');
});
