$(window).scroll(function () {
    var scrollTop = $('html, body').scrollTop();
    if ( scrollTop > 200 ) {
        $('.g-btn-top').fadeIn( 100 );
    } else {
        $('.g-btn-top').fadeOut( 100 );
    }
});

$(document).ready(function () {
    //tab menu, tab-cont
    var swiper = new Swiper('.g-tab', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.g-tab .swiper-button-next',
            prevEl: '.g-tab .swiper-button-prev',
        }
    });

    $('.g-tab .swiper-slide a').click(function (e) {
        e.preventDefault();

        var menuIdx = $(this).closest('li').index();

        if ( !$(this).closest('li').is('.swiper-slide-active') ) {
            $(this).closest('li').addClass('swiper-slide-active');
            $(this).closest('li').siblings().removeClass('swiper-slide-active');
        }

        $('.g-tab-cont').eq(menuIdx).addClass('crnt');
        $('.g-tab-cont').eq(menuIdx).siblings().removeClass('crnt');
    });

    $('.g-inf > a').click(function () {
        var contIdx = $(this).closest('.g-tab-cont').index();
        if ( !$(this).closest('.g-tab-cont').is('.crnt') ) {
            $(this).closest('.g-tab-cont').addClass('crnt');
            $(this).closest('.g-tab-cont').siblings().removeClass('crnt');

            $('.g-tab .swiper-slide').eq(contIdx).addClass('swiper-slide-active');
            $('.g-tab .swiper-slide').eq(contIdx).siblings().removeClass('swiper-slide-active');
        } else {
            $(this).closest('.g-tab-cont').removeClass('crnt');
            $('.g-tab .swiper-slide').eq(contIdx).removeClass('swiper-slide-active');
        }
    });

    //count
    $('.g-list').each(function () {
        var ing = $(this).find('.g-pack.ing').size();
        var dele = $(this).find('.g-pack.delete').size();
        var complete = $(this).find('.g-pack.complete').size();
        var total = $(this).find('tbody > tr').size();
        var percent = ( complete / ( total - dele ) ) * 100;
        var percentRou = Math.round(percent);

        $(this).find('tbody > tr').each(function () {
            var lstNum = $(this).index() + 1;
            $(this).find('.g-num span').text(lstNum);
        });
 
        $(this).closest('.g-cont').find('.g-inf .g-total .num').text(total);
        $(this).closest('.g-cont').find('.g-inf .g-ing .num').text(ing);
        $(this).closest('.g-cont').find('.g-inf .g-delete .num').text(dele);
        $(this).closest('.g-cont').find('.g-inf .g-complete .num').text(complete);
        $(this).closest('.g-cont').find('.g-inf .g-percent .num').text(percentRou);
    });

    //page top
    $('.g-btn-top').hide();
    $('.g-btn-top').click(function () {
        $('html, body').animate({'scrollTop' : 0}, 300);
    });
});