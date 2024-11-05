$(function(){
  leftMenu();
  
  if ($('.js-btn-mypage').length > 0) {btnMypage();}
  if ($('.more-btn').length > 0) {moreBtn();}
  

  $('.mo-header-menu-btn').click(function(){
    $('body').toggleClass('no-scroll');
    $('.menu-wrap').toggleClass('open');
    $('.leftmenu').toggleClass('open');
  })


  const favoriteList = $('.favorit-list');
  const currentPath = window.location.pathname;

  loadFavorites()
  

  // btn-favorite 버튼 클릭 시
  $('.btn-favorite').on('click', function () {
    const $this = $(this);
    const path = $this.data('path');
    const label = $this.siblings('a').text();

    // active 클래스 토글
    $this.toggleClass('active');

    if ($this.hasClass('active')) {
      // active 상태로 변경 시 로컬 스토리지에 추가하고 리스트에 추가
      addFavorite(path, label);
    } else {
      // active 해제 시 로컬 스토리지에서 제거하고 리스트에서 제거
      removeFavorite(path);
    }
  });

  // btn-remove-favorite 클릭 시
  favoriteList.on('click', '.btn-remove-favorite', function () {
    const path = $(this).data('path');
    removeFavorite(path);

    // left 메뉴의 btn-favorite에서 active 클래스 제거
    $(`.btn-favorite[data-path="${path}"]`).removeClass('active');
  });

  // 로컬 스토리지에서 즐겨찾기 항목을 불러와 추가
  function loadFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // storedFavorites 배열을 순회하여 favorit-list에 추가
    storedFavorites.forEach(item => {
      // 현재 페이지와 즐겨찾기 path가 동일하면 active 클래스 추가
      const isActive = item.path.indexOf(currentPath) !== -1 ? 'active' : '';;
  
      // favorit-list에 항목 추가
      const listItem = `
        <li>
          <div class="favorite-item ${isActive}">
            <button type="button" class="btn-remove-favorite" data-path="${item.path}"><i class="icon-sign07"></i></button>
            <a data-path="${item.path}" href="${item.path}">${item.label}</a>
          </div>
        </li>`;
      favoriteList.append(listItem);
  
      // left 메뉴에서 해당 path의 btn-favorite에 active 클래스 추가
      $(`.btn-favorite[data-path="${item.path}"]`).addClass('active');
    });
  }

  // 즐겨찾기 추가 함수
  function addFavorite(path, label) {
    console.log(1)
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // 중복 확인 후 추가
    if (!favorites.some(item => item.path === path)) {
      favorites.push({ path, label });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // favorit-list에 항목 추가
      //const isActive = '/'+path === currentPath ? 'active' : '';
      const isActive = path.indexOf(currentPath) !== -1 ? 'active' : '';
      const listItem = `
        <li>
          <div class="favorite-item ${isActive}">
            <button type="button" class="btn-remove-favorite" data-path="${path}"><i class="icon-sign07"></i></button>
            <a data-path="${path}" href="${path}">${label}</a>
          </div>
        </li>`;
      favoriteList.append(listItem);
    }
  }

  // 즐겨찾기 제거 함수
  function removeFavorite(path) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // 해당 항목 제거
    favorites = favorites.filter(item => item.path !== path);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // favorit-list에서 항목 제거
    favoriteList.find(`a[data-path="${path}"]`).closest('li').remove();
  }

});


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
