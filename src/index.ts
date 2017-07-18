const $navMenu = $('.desktop-nav--top-level');
const $mobileNavTop = $('.mobile-nav--top-level > .mobile-nav--link');
const $mobileNav = $('.mobile-nav');
const $closeBtn = $('.close-btn');
const $showMenuBtn = $('.show-menu-btn');

$navMenu.mouseenter(function() {
  $(this).children('.desktop-nav--second-level').css('display', 'flex');
});

$navMenu.mouseleave(function() {
  $(this).children('.desktop-nav--second-level').hide();
});

$mobileNavTop.click(function() {
  const $children = $(this).parent().children('.mobile-nav--second-level');
  if ($children.css('display') === 'none') {
    $children.show();
  } else {
    $children.hide();
  }
});

$closeBtn.click(function() {
  $mobileNav.hide();
  $showMenuBtn.show();
});

$showMenuBtn.click(function() {
  $showMenuBtn.hide();
  $mobileNav.show();
});
