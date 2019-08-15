var app = {};

app.SLIDER =  $('.slider');
app.document = $(document);
app.sortList = $('.sort');
app.scrollEl = $('.scroll-status');
app.hamburger = $('.hamburger');
app.asideOpen = $('.aside-title');


app.document.ready(function(){
  function showHeaderSearch(){
    if($(window).width() < 1400 && $(window).width() > 1139){
      console.log('yes');
    }
  }
  function currentSlideCount(item){
    var dotsLenght = $(item).find('.slick-dots li').length,
        activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

    $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
    $(item).find('.slick-dots').attr('data-current',activeIndex);
  }
  showHeaderSearch();
  $(window).on('resize', function(){
    showHeaderSearch();
  });
  app.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });
  $('.responses__show').on('click', function(){
    $(this).parents('.responses').toggleClass('show');
  });
  app.asideOpen.on('click', function(){
    $(this).parents('.main-aside__content').toggleClass('show');
  });
  app.SLIDER.each(function(key, item) {
    var options = {
      infinite: false,
      slidesToShow: attr('show'),
      slidesToScroll: attr('scroll')? attr('show') : 1,
      arrows: true,
      focusOnSelect: true,
      dots: true,
      prevArrow: '<button class="slick-prev slick-arrow flex-c-c"><i class="icon-slider-left"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow flex-c-c"><i class="icon-slider-right"></i></button>',
      responsive: [{
        breakpoint: 1140,
        settings: {
          slidesToShow: attr('show-tablet'),
          slidesToScroll: attr('show-tablet'),
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: attr('show-mobile'),
          slidesToScroll: 1,
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
    currentSlideCount(item);
    $(item).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setTimeout(function(){
        currentSlideCount(item);
      },0);
    });
  });
  
  app.sortList.each(function(key,item){
    getCurrentText(item);
  });

  function getCurrentText(item){
    var current = $(item).find('.current').text();

    $(item).find('.text').html(current + '<i class="icon-dropdown"></i>');
  }
  app.sortList.on('click', function(){
    $(this).toggleClass('active');
  }).on('click','li', function(){
    var parent = $(this).parents('.sort')

    parent.find('.current').removeClass('current');
    $(this).addClass('current');
    getCurrentText(parent);
  });
  
  app.document.on('scroll', function(){
    var docHeight = app.document.height() - window.innerHeight,
      posTop = $('body,html').scrollTop(),
      scrollPercent = (posTop*100) / docHeight;

    app.scrollEl.css({
      'width': scrollPercent +'%',
    });
  });
});//document ready