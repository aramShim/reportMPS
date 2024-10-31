$(function(){
  leftMenu();
  toggleFavorite();
  
  if ($('.js-btn-mypage').length > 0) {btnMypage();}
  if ($('.more-btn').length > 0) {moreBtn();}
  

  $('.mo-header-menu-btn').click(function(){
    $('body').toggleClass('no-scroll');
    $('.menu-wrap').toggleClass('open');
    $('.leftmenu').toggleClass('open');
  })
});
function toggleFavorite(){
  $('.btn-favorite').click(function(){
    let favoritPath = $(this).data('path');
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('icon-icon34 icon-icon36')
  })
}
function leftMenu(){
  //$('.sub-menu').hide();
  $('.menu-label').click(function(e){
    if($(this).attr('href') == '#'){
      e.preventDefault();
    }    
    $(this).toggleClass('active');
    $(this).next('.sub-menu').slideToggle();

  })
}
function btnMypage(){
	$('.js-btn-mypage').click(function(){
		$(this).toggleClass('open');
		$(this).next('.mypage-wrap').toggleClass('open');
	})
}

function moreBtn(){
  $('.more-btn').click(function(){
    $('.list-max-5').find('tr').each(function(){
      $(this).css('display','table-row');
    })
    $('.board-paging').show();
    $(this).hide();
  })
}
