window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu__links'),
  menuItem = document.querySelectorAll('.menu_item'),
  hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger_active');
      menu.classList.toggle('menu__links_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger_active');
          menu.classList.toggle('menu__links_active');
      })
  })
})

$(window).scroll(function() {
  var height = $(window).scrollTop();
  if (height > 100) {
      $('#back2Top').fadeIn();
  } else {
      $('#back2Top').fadeOut();
  }
});
$(document).ready(function() {
  $("#back2Top").click(function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
  });

});


(function($) {
  $(function() {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })

    $('.catalog-item__back').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  });
})(jQuery);


const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDots = document.querySelector('.carousel-dots');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const cards = document.querySelectorAll('.card');

// Duplicate first item and add as last item
const firstItem = carouselItems[0].cloneNode(true);
carousel.appendChild(firstItem);

let currentItem = 0;
let timerId;

// Create carousel dots
for (let i = 0; i < carouselItems.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if (i === currentItem) dot.classList.add('active');
  dot.addEventListener('click', () => {
    setCurrentItem(i);
  });
  carouselDots.appendChild(dot);
}

function setCurrentItem(index) {
  if (index < 0 || index > carouselItems.length) return;
  if (index === carouselItems.length) {
    index = 0;
  }
  carousel.style.transform = `translateX(-${index * 100}%)`;
  carouselDots.querySelector('.active').classList.remove('active');
  carouselDots.children[index].classList.add('active');
  currentItem = index;
  resetTimer();
}

function nextItem() {
  currentItem = (currentItem + 1) % carouselItems.length;
  setCurrentItem(currentItem);
}

function resetTimer() {
  clearInterval(timerId);
  timerId = setInterval(nextItem, 8000);
}

carouselPrev.addEventListener('click', () => {
  setCurrentItem(currentItem - 1);
});

carouselNext.addEventListener('click', () => {
  setCurrentItem(currentItem + 1);
});

resetTimer();

valideForms('#consultation-form'); 
valideForms('#consultation form'); 
valideForms('#order form'); 

$('form').submit(function(e) {
  e.preventDefault();

  if (!$(this).valid()) {
      return;
  }

  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
  });
  return false;
});

/* smooth scroll and pageup */

$(window).scroll(function () {
  if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
  } else {
      $('.pageup').fadeOut();
  }
});

$("a[href^='#']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

