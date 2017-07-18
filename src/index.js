var $navMenu = $('.desktop-nav--top-level');
var $mobileNavTop = $('.mobile-nav--top-level > .mobile-nav--link');
var $mobileNav = $('.mobile-nav');
var $closeBtn = $('.close-btn');
var $showMenuBtn = $('.show-menu-btn');
$navMenu.mouseenter(function () {
    $(this).children('.desktop-nav--second-level').css('display', 'flex');
});
$navMenu.mouseleave(function () {
    $(this).children('.desktop-nav--second-level').hide();
});
$mobileNavTop.click(function () {
    var $children = $(this).parent().children('.mobile-nav--second-level');
    if ($children.css('display') === 'none') {
        $children.show();
    }
    else {
        $children.hide();
    }
});
$closeBtn.click(function () {
    $mobileNav.hide();
    $showMenuBtn.show();
});
$showMenuBtn.click(function () {
    $showMenuBtn.hide();
    $mobileNav.show();
});
