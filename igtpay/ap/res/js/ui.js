var ios = (/iphone|ipod|ipad|mini/i.test(navigator.userAgent.toLowerCase()));

if (ios) {
	$('html').addClass('ios');
} else {
	$('html').removeClass('ios');
}

window.onload = function () {
	$('head').append('<link rel="stylesheet" href="/igtpay/ap/res/css/js.css">'); //개발전달시 미포함 
}

var WIP = WIP || {};
var WIP = {
	init : function() {
		WIP.ini.init();
		WIP.combobox();
		WIP.inputCheck.single();
		WIP.entry.focus();
		WIP.entry.delete();
		WIP.lyrContents.reset();
		WIP.toggle.init();
		WIP.tab();
		WIP.popup.event();
		WIP.selectPeriod();
		WIP.fncImg.creatClass();
		WIP.tooltip();
	},

	//ini
	ini : {
		init : function() {
			this.event();

            var deviceH = (window.screen.height > $(window).height()) ? $(window).height() : window.screen.height;
			var deviceW = (window.screen.width > $(window).width()) ? $(window).width() : window.screen.width;
			//alert(deviceW + '*' + deviceH);
            $('.btn-set').each(function () {
				$(this).addClass('off');
			});

			$('.btn-set2').click(function () {
				if( $(this).is('.off') ) {
					$(this).addClass('on').removeClass('off');
					
					if ( $(this).closest('.account-management') ) {
						$(this).find('.txt').text('잔액');
					}
				} else {
					$(this).addClass('off').removeClass('on');
					
					if ( $(this).closest('.account-management') ) {
						$(this).find('.txt').text('숨김');
					}
				}
			});
		},

		event : function() {
			this.action();
		},

		action : function() {
			//잔액 숨김
			$('.account-management .info-top .btn-set2').click(function () {
				var $accManagement = $(this).closest('.account-management');
				var $showState = $accManagement.find('.total-balance .balance > span, .account-title .total-amount > span, .balance .amount');
				var $hideState = $accManagement.find('.total-balance .balance .hide-amount, .balance .hide-amount');

				if ( !$(this).is('.off') ) {
					//off : 잔액, 합계 숨김
					$showState.hide();
					$hideState.show();

				} else {
					//on : 잔액, 합계 노출
					$showState.show();
					$hideState.hide();
				}

			});
		}
	},

	//combobox
	combobox : function() {
		$('.el-combobox').each(function () {
			var $comboBtn = $(this).find('.combo-btn');
			var $comboListBtn = $(this).find('.opt-close');
			var $comboboxInp = $(this).find('.combo');
			var $comboList = $(this).find('.opt-list');
			var $comboOpt = $(this).find('.opt');

			$comboOpt.attr('tabindex', '-1');

			//combobox list : open
			$comboBtn.off("click").on("click", function () {
				$(this).children('span').text('선택 목록 닫기');
				$(this).addClass('on');

				$('body').css({'overflow':'hidden','height':'100%'});
				$(this).closest('.el-combobox').find('.combo-list').append('<div class="dimmed"></div>');
				
				var comboboxlist = $(this).closest('.el-combobox').find('.combo-list');
				
				$(comboboxlist).show();
				var comboboxlistH = $(comboboxlist).children('.in-wrap').height();
				
				$(comboboxlist).children('.in-wrap').css('bottom','-' + comboboxlistH + 'px').animate({bottom: '0'}, 300, function () {
					$(comboboxlist).find('.lyr-cntr-ty2').focus();
				});

				$(this).closest('.combobox').find('.combo').attr('aria-expanded','true');
				$(comboboxlist).find('.opt-list').attr({'aria-hidden':'false', 'tabindex': ''});
				$(comboboxlist).find('.opt').attr('tabindex', '0');
				
				$('.combo-list .dimmed, .opt-head .lyr-cntr-ty2').on('touchend', function () {
					var comboboxlist = $(this).closest('.combo-list');
					var comboboxlistH = $(comboboxlist).find('.in-wrap').height();
					$(comboboxlist).find('.in-wrap').animate({bottom: '-' + comboboxlistH + 'px'}, 300, function () {
						$(this).closest('.combo-list').css('display','none');
					});
	
					if ( $(this).is('.dimmed') ) {
						$(this).remove();
					} else {
						$(comboboxlist).find('div.dimmed').remove();
					}
					
					$('body').css({'overflow':'','height':''});
					$(this).closest('.el-combobox').find('.combo-btn').removeClass('on').focus();
					$(this).closest('.el-combobox').find('.combo-btn').children('span').text('선택 목록 열기');
					$(this).closest('.el-combobox').find('.combo').attr('aria-expanded','false');
					$(comboboxlist).find('.opt-list').attr({'aria-hidden':'true', 'tabindex': '-1'});
					$(comboboxlist).find('.opt').attr('tabindex', '-1');
				});
			});

			$comboboxInp.off("click").on("click", function () {
				$(this).closest('.combobox').find('.combo-btn').children('span').text('선택 목록 닫기');
				$(this).closest('.combobox').find('.combo-btn').addClass('on');

				$('body').css({'overflow':'hidden','height':'100%'});
				$(this).closest('.el-combobox').find('.combo-list').append('<div class="dimmed"></div>');

				var comboboxlist = $(this).closest('.el-combobox').find('.combo-list');

				$(comboboxlist).show();
				var comboboxlistH = $(comboboxlist).children('.in-wrap').height();

				$(comboboxlist).children('.in-wrap').css('bottom','-' + comboboxlistH + 'px').animate({bottom: '0'}, 300, function () {
					$(comboboxlist).find('.lyr-cntr-ty2').focus();
				});

				$(this).attr('aria-expanded','true');
				$(comboboxlist).find('.opt-list').attr({'aria-hidden':'false', 'tabindex': ''});
				$(comboboxlist).find('.opt').attr('tabindex', '0');

				$('.combo-list .dimmed, .opt-head .lyr-cntr-ty2').on('touchend', function () {
					var comboboxlist = $(this).closest('.combo-list');
					var comboboxlistH = $(comboboxlist).find('.in-wrap').height();
					$(comboboxlist).find('.in-wrap').animate({bottom: '-' + comboboxlistH + 'px'}, 300, function () {
						$(this).closest('.combo-list').css('display','none');
					});
	
					if ( $(this).is('.dimmed') ) {
						$(this).remove();
					} else {
						$(comboboxlist).find('div.dimmed').remove();
					}
					
					$('body').css({'overflow':'','height':''});
					$(this).closest('.el-combobox').find('.combo-btn').removeClass('on').focus();
					$(this).closest('.el-combobox').find('.combo-btn').children('span').text('선택 목록 열기');
					$(this).closest('.el-combobox').find('.combo').attr('aria-expanded','false');
					$(comboboxlist).find('.opt-list').attr({'aria-hidden':'true', 'tabindex': '-1'});
					$(comboboxlist).find('.opt').attr('tabindex', '-1');
				});
			});

			//combobox list : close
			$comboListBtn.off("click").on("click", function () {
				var comboboxlistH = $(this).closest('.combo-list .in-wrap').height();
				$(this).closest('.combo-list .in-wrap').animate({bottom: '-' + comboboxlistH + 'px'}, 300, function () {
					$(this).closest('.combo-list').css('display','none');
				});

				$(this).closest('.combo-list').find('div.dimmed').remove();
				$('body').css({'overflow':'','height':''});

				$(this).closest('.el-combobox').find('.combo-btn').removeClass('on').focus();
				$(this).closest('.el-combobox').find('.combo-btn').children('span').text('선택 목록 열기');
				$(this).closest('.el-combobox').find('.combo').attr('aria-expanded','false');
				$(this).closest('.combo-list').find('.opt-list').attr({'aria-hidden':'true', 'tabindex': '-1'});
				$(this).closest('.combo-list').find('.opt').attr('tabindex', '-1');
			});

			//option data 전달
			$comboList.find('.opt').each(function () {
				var $opt = $(this);

				$opt.on("click", function () {
					var optId = $(this).attr('id');
					var optVal = $(this).text();

					$(this).addClass('select');
					$(this).siblings().removeClass('select');

					$(this).attr('aria-selected','true');
					$(this).siblings().attr('aria-selected','false');

					var comboboxlistH = $(this).closest('.combo-list .in-wrap').height();
					$(this).closest('.combo-list .in-wrap').animate({bottom: '-' + comboboxlistH + 'px'}, 300, function () {
						$(this).closest('.combo-list').css('display','none');
					});

					$(this).closest('.combo-list').find('div.dimmed').remove();
					$('body').css({'overflow':'','height':''});

					$(this).closest('.el-combobox').find('.combo-btn').removeClass('on');
					$(this).closest('.el-combobox').find('.combo-btn').children('span').text('선택 목록 열기');
					$(this).closest('.el-combobox').find('.combo').attr('aria-expanded','false');
					$(this).closest('.opt-list').attr({'aria-hidden':'true', 'tabindex': '-1'});

					$(this).closest('.el-combobox').find('.combo').attr({'aria-activedescendant': optId});
					
					if ( $(this).closest('.el-combobox').is('.card-combo') ) {
						//카드 선택 콤보박스 타입
						$(this).closest('.el-combobox').find('.combo .inf .item').text(optVal);
					} else if ( $(this).closest('.el-combobox').is('.paymethod-combo') ) {
						//결제수단 선택 콤보박스 타입
						var optVal = $(this).find('.inf').text();
						$(this).closest('.el-combobox').find('.combo').attr({'value': optVal});
					} else {
						$(this).closest('.el-combobox').find('.combo').attr({'value': optVal});
					}
				});
			});
		});
	},

	//input : radio/checkbox
	inputCheck : {
		single : function() {
			$('[class^="inp-chk"]').each(function () {
				if ( $(this).is('.single') ) {
					$(this).append('<span class="gesture"/>');
				}
			});
		}
	},

	//input : 입력
	entry : {
		focus : function() {
			$('.inp-box').each(function () {
				$(this).find('.inp input, .btn-delete').focusin(function () {
					$(this).closest('.inp-box').addClass('focus');
				});

				$(this).find('.inp input, .btn-delete').focusout(function (e) {
					$(this).closest('.inp-box').removeClass('focus');
					if ( $(e.currentTarget).is('.btn-delete') ) {
						$(this).closest('.inp-box').find('.btn-delete').hide();
					}
				});

				$('html').click(function (e) {
					if ( !$(e.target).is('.inp-box.focus') ) {
						$('.inp-box').find('.btn-delete').hide();
					}
				});
			});

			$('.inp-card-num .inp-box').each(function () {
				$(this).find('.inp input, .btn-delete').focusin(function () {
					$(this).closest('.inp-card-num').addClass('focus');
				});

				$(this).find('.inp input, .btn-delete').focusout(function (e) {
					$(this).closest('.inp-card-num').removeClass('focus');
					if ( $(e.currentTarget).is('.btn-delete') ) {
						$(this).closest('.inp-card-num').find('.btn-delete').hide();
					}
				});

				$('html').click(function (e) {
					if ( !$(e.target).is('.inp-card-num.focus .inp-box') ) {
						$('.inp-box').find('.btn-delete').hide();
					}
				});
			});
		},

		delete : function() {
			$('.inp-box.be-del').each(function () {
				var $inp = $(this).find('.inp input');
				var $del = $(this).find('.btn-delete');
				
				$inp.bind('keyup', function(e){
					var value = $(this).val();
					if ( value != '' ) {
						$(this).closest('.inp-box').find('.btn-delete').show();    
					}
				});
				
				$del.click(function () {
					$(this).hide();
					$(this).closest('.inp-box').find('.inp input').val("").focus();
				});
			});
		}
	},
	
	//popup
	popup : {
		open : function(lyrId) {
			var lyr = lyrId;
			
			if ( !$("[data-lyr-id='" + lyr + "']").is('.popup, .toast, .lyr-popup, .pop-toast') ) {
				$("[data-lyr-id='" + lyr + "']").append('<div class="dimmed"></div>');
				$('body').css({'overflow':'hidden','height':'100%'});
			}

			if ( $("[data-lyr-id='" + lyr + "']").is('.toast, .pop-toast') ) {
				$("[data-lyr-id='" + lyr + "']").fadeIn(300);
			} else if ( $("[data-lyr-id='" + lyr + "']").is('.bottom-sheet') ) {
				$("[data-lyr-id='" + lyr + "']").show();
				var sheetH = $("[data-lyr-id='" + lyr + "']").children('.in-wrap').height();
				
				$("[data-lyr-id='" + lyr + "']").children('.in-wrap').css('bottom','-' + sheetH + 'px').animate({bottom: '0'}, 300, function () {
					//$("[data-lyr-id='" + lyr + "']").find('.lyr-cntr-ty2').focus();
					$('.dv_transkey_div').animate({opacity: '1'}, 50);
					WIP.popup.event();
				});
			} else if ( $("[data-lyr-id='" + lyr + "']").is('.lyr-popup') ) {
				//$('body').css({'overflow':'hidden','height':'100%'});
				$("[data-lyr-id='" + lyr + "']").show();
				WIP.lyrContents.reset();
				var layerH = $("[data-lyr-id='" + lyr + "']").children('.in-lyr').height();
				
				$("[data-lyr-id='" + lyr + "']").children('.in-lyr').css('bottom','-' + layerH + 'px').animate({bottom: '0'}, 300, function () {
					WIP.entry.focus();

					//$("[data-lyr-id='" + lyr + "']").find('.lyr-cntr-ty1').focus();
					if ( $("[data-lyr-id='" + lyr + "']").is('.lyr-my') ) {
						$('.wrap-my').find('.tab').addClass('fixed');
					} else if ( $("[data-lyr-id='" + lyr + "']").is('.tab-comfort') ) {
						$('.tab-comfort').find('.tab').addClass('fixed');
					}
				});

				var deviceH = (window.screen.height > $(window).height()) ? $(window).height() : window.screen.height;
				var tabContsH = deviceH - $('.lyr-header').innerHeight() - $('.tab-container.ty-flex .tab').innerHeight();
				if ( deviceH < 640 ) {
					$('.account-management .box-notice').css('height', ( tabContsH - 53 ) * 0.1 + 'rem'); //내 계좌 관리-등록된 계좌 없음 컨텐츠
				} else if ( deviceH >= 640 ) {
					$('.account-management .box-notice').css('height', ( tabContsH - 102 ) * 0.1 + 'rem'); //내 계좌 관리-등록된 계좌 없음 컨텐츠
				}
				
				
			} else {
				$("[data-lyr-id='" + lyr + "']").show();
				WIP.lyrContents.reset();
			}
		},

		close : function(lyrId) {
			var lyr = lyrId;

			if ( $("[data-lyr-id='" + lyr + "']").is('.toast, .pop-toast') ) {
				$("[data-lyr-id='" + lyr + "']").fadeOut(300);
			} else if ( $("[data-lyr-id='" + lyr + "']").is('.bottom-sheet') ) {
				var sheetH = $("[data-lyr-id='" + lyr + "']").children('.in-wrap').height();

				$("[data-lyr-id='" + lyr + "']").find('.dv_transkey_div').fadeOut(100);
				
				$("[data-lyr-id='" + lyr + "']").children('.in-wrap').animate({bottom: '-' + sheetH + 'px'}, 300, function () {
					$("[data-lyr-id='" + lyr + "']").hide();
				});
			} else if ( $("[data-lyr-id='" + lyr + "']").is('.lyr-popup') ) {
				var layerH = $("[data-lyr-id='" + lyr + "']").children('.in-lyr').height();
				
				$("[data-lyr-id='" + lyr + "']").children('.in-lyr').animate({bottom: '-' + layerH + 'px'}, 300, function () {
					$("[data-lyr-id='" + lyr + "']").hide();
					$('body').css({'overflow':'','height':''});
				});
			} else {
				$("[data-lyr-id='" + lyr + "']").hide();
			}
			
			if ( !$("[data-lyr-id='" + lyr + "']").is('.popup, .toast, .lyr-popup') ) {
				$("[data-lyr-id='" + lyr + "']").find('div.dimmed').remove();
				$('body').css({'overflow':'','height':''});
			}
		},

		event : function () {
			$('.dimmed, .lyr-cntr-ty2').on('touchend', function () {
				var $lyr = $(this).closest('.bottom-sheet');
				if ( $lyr ) {
					var sheetH = $lyr.children('.in-wrap').height();
		
					$lyr.find('.dv_transkey_div').fadeOut(100);
					
					$lyr.children('.in-wrap').animate({bottom: '-' + sheetH + 'px'}, 300, function () {
						$lyr.hide();
						$lyr.find('div.dimmed').remove();
						$('body').css({'overflow':'','height':''});
					});
				}
			});
		},
		
		windowPopOpen : function(w, h, url, name) {
			var popWidth = w, popHeight = h, URL = url, service = name;
			var posX = (screen.width / 2) - (popWidth / 2);
			var posY = (screen.height / 2) - (popHeight / 2);
			var options = 'width=' + popWidth + ',height=' + popHeight + ',left=' + posX + ',top=' + posY + ',location=no,menubar=no,resizable=no,status=no,toolbar=no';
		
			window.open(URL, service, options);
		}
	},
	
	swiper: function () {
        const swiper_MB01LP01 = new Swiper('.swiper_MB01LP01', {
            direction: 'horizontal',
            height: 466,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
	},
	swiper_pay_cards: function () {
	const $slide_card = $('.card-img-wrap');
	const $promotion_view = $('.last-slide-promotion');

	$slide_card.on('click touchstart', (e) => {
		const $target = $(e.target).parent();
		$target.addClass('on');
	});
	$slide_card.on('click touchend', (e) => {
		const $target = $(e.target).parent();
		$target.removeClass('on');
	});
	const swiper = new Swiper('.js_swiper_card_pay', {
		effect: 'cards',
		on: {
			slideChange: (e) => {
				$currentSlide = $(e.slides[e.activeIndex]);
				const isLastSlide = e.slides.length === e.activeIndex + 1 && $currentSlide.hasClass('swiper-slide-paycard-add');

				if(isLastSlide) {
					$promotion_view.addClass('on');
					$('.lyr-popup-pay-method-spot .tabs-pay-method-spot').hide();
				} else {
					$promotion_view.removeClass('on');
					$('.lyr-popup-pay-method-spot .tabs-pay-method-spot').show();
				}
			},
		},
		longSwipesMs: 100000
	});
	swiper.setProgress(0, 600);
	},
	swiper_remit_main: function() {
		const $slide_btn = $('.slide-btn');
		const $slide = $('.wrap-slide');
		$slide_btn.click(function() {
			const idx = $(this).index();
			$slide_btn.removeClass('active');
			$slide_btn.eq(idx).addClass('active');
			$slide.removeClass('active');
			$slide.eq(idx).addClass('active');
		})

		const swiper_recently = new Swiper('.js_swiper_recently', {
			slidesPerView:3,
			speed: 400,
			width:270
		});
		const swiper_frequently = new Swiper('.js_swiper_frequently', {
			slidesPerView:3,
			speed: 400,
			width:270
		});
		const swiper_my = new Swiper('.js_swiper_my', {
			slidesPerView:3,
			speed: 400,
			width:270
		});
	},

	//layer contents
	lyrContents : {
		reset : function() {
			var deviceH = (window.screen.height > $(window).height()) ? $(window).height() : window.screen.height;
			
			$('.popup-contents').each(function () {
				if ( $(this).closest('.popup').is('.shadow-ty') ) {
					$(this).closest('.popup').find('.btn-area').addClass('shadow');
				}
			});
			
			if ( deviceH < 640 ) {
				$('.lyr-contents').each(function () {
					var lyrContentsH = $(this).innerHeight();
					if ( lyrContentsH >= ( deviceH - 108 ) && !$(this).closest('.lyr-popup').is('.lyr-my') ) {
						$(this).addClass('scr');
					} 
					if ( $(this).closest('.lyr-popup').is('.lyr-error') ) {
						$(this).find('.sec-error').innerHeight( deviceH - 210 );//
					}
					if ( $(this).is('.not-scr') ) {
						$(this).removeClass('scr');
					}
				});
			} else if ( deviceH >= 640 ) {
				$('.lyr-contents').each(function () {
					var lyrContentsH = $(this).innerHeight();
					if ( lyrContentsH >= ( deviceH - 120 ) && !$(this).closest('.lyr-popup').is('.lyr-my') ) {
						$(this).addClass('scr');
					} 
					if ( $(this).closest('.lyr-popup').is('.lyr-error') ) {
						$(this).find('.sec-error').innerHeight( deviceH - 222 );
					}
					if ( $(this).is('.not-scr') ) {
						$(this).removeClass('scr');
					}
				});
			} else if( deviceH >= 641 ) {
				
			}
		}
	},

	toggle : {
		init : function() {
			this.event();
		},

		event : function() {
			this.action();
		},

		action : function() {
			$('.accordion').each(function () {
				var $anc = $(this).find('.toggle-anchor > a');
				$anc.off('click').on('click', function () {
					if ( !$(this).closest('.accordion').is('.crnt') ) {
						$(this).closest('.accordion').addClass('crnt');
						$(this).closest('.accordion').find('.toggle-contents').slideDown();
						$(this).closest('.accordion').siblings('.accordion').removeClass('crnt');
						$(this).closest('.accordion').siblings('.accordion').find('.toggle-contents').slideUp();
					} else {
						$(this).closest('.accordion').removeClass('crnt');
						$(this).closest('.accordion').find('.toggle-contents').slideUp();
					}
				});
			});

			$('.wrap-faq .conts-list').each(function () {
				var $anc = $(this).find('.conts-tit.btn-toggle > a');
				$anc.off('click').on('click', function () {
					if ( !$(this).closest('.conts-list').is('.on') ) {
						$(this).closest('.conts-list').addClass('on');
						$(this).closest('.conts-list').find('.conts-answer').slideDown();
						$(this).closest('.conts-list').siblings().removeClass('on');
						$(this).closest('.conts-list').siblings().find('.conts-answer').slideUp();
					} else {
						$(this).closest('.conts-list').removeClass('on');
						$(this).closest('.conts-list').find('.conts-answer').slideUp();
					}
				});
			});

			$('.card-info-accordion .conts-list').each(function () {
				var $anc = $(this).find('.conts-tit.btn-toggle > a');
				$anc.on('click', function () {
					$list = $(this).closest('.conts-list');
					const isActive = $list.is('.on');
					if (isActive) {
						$list.removeClass('on');
						$list.find('.conts-card').slideUp();
					} else {
						$list.addClass('on');
						$list.find('.conts-card').slideDown();
						$list.siblings().removeClass('on');
						$list.siblings().find('.conts-card').slideUp();
					}
				});
			});
		}
	},

	tab : function() {
		var $tab = $('.tab-container .tab-menu');
		$tab.each(function () {
			$(this).click(function () {
				var idx = $(this).index();
				$(this).addClass('crnt');
				$(this).siblings().removeClass('crnt');
	
				$(this).closest('.tab-container').find('.tab-conts').find('.tab-cont').hide();
				$(this).closest('.tab-container').find('.tab-conts').find('.tab-cont').eq(idx).show();
			});
		});
	},

	selectPeriod: function() {
		const $month_btn = $('.popup-select-filter #ph-chk04');
		const $month = $('.popup-select-filter .month-wrap');
		const $inp_btn = $('.popup-select-filter .inp-btn:not(:last-child)');

		$month_btn.on('click', () => {
			$month.addClass('on');
		});

		$inp_btn.on('click', () => {
			$month.removeClass('on');
		});
	},

	myAccountRegAllCheck() {
		$('.all-check').off("click").on("click", function () {
			const isChecked = $(this).prop("checked");
			const $checkBox = $('.wrap-select-list .select-list input[type="checkbox"]');
			if (isChecked) {
				$(this).prop("checked",true).attr('checked','checked');
				$(this).closest('.section').find($checkBox).prop("checked",true).attr('checked','checked');
			} else {
				$(this).prop("checked",false).attr('checked','');
				$(this).closest('.section').find($checkBox).prop("checked",false).attr('checked','');
			}
		});
	},

	//금융 로고
	fncImg : {
		creatClass : function() {
			$('.img-fnc').each(function () {
				
				var fncCode = $(this).attr('data-fnc-code');
				
				if ( typeof fncCode !== "undefined" && fncCode !== null && fncCode != '' ) {
					var className = 'fnc' + fncCode;
					$(this).addClass(className);
				}
			});
		}
	},

	categorySelect : function(){
		const $categoryExpandBtn = $('.category-expand-btn');
		const $categoryCheckboxWrap = $('.category-checkbox-wrap');
		const $checkboxWrap = $('.checkbox-wrap');
		const targetHeight = $categoryCheckboxWrap.outerHeight() + 30;
		$categoryExpandBtn.on('click', () => {
			$categoryExpandBtn.toggleClass('on');
			if($categoryCheckboxWrap.is('.on')) {
				$checkboxWrap.css({'height':'3.6rem'});
				$categoryCheckboxWrap.removeClass('on').addClass('off');
			} else {
				$checkboxWrap.css({'height':targetHeight})
				$categoryCheckboxWrap.removeClass('off').addClass('on');
			}
		});
	},

	categoryCheckBox: function(){
		const $allCheck = $('.category-checkbox-wrap .all-check');
		const $checkBox = $('.category-checkbox-wrap input[type="checkbox"]');
		const $resetBtn = $('.category-checkbox-wrap .reset-btn');
		const $categoryExpandBtn = $('.category-expand-btn');
		$allCheck.on('click', function(){
			let isChecked = $(this).prop("checked");
			if (isChecked) {
				$(this).prop("checked",true);
				$checkBox.prop("checked",true);
			} else {
				$(this).prop("checked",false);
				$checkBox.prop("checked",false);
			}
			if($categoryExpandBtn.is('.on') === false){
				$categoryExpandBtn.click();
			}
		});
		$checkBox.each(function(){
			$(this).on('click',function(){
				$allCheck.prop("checked",false)
			});
		});
		$resetBtn.on('click', function(){
			$checkBox.prop("checked",false);
		});
	},

	boardSearchBar : function(){
		const $boardSearchInput = $('.search-input');
		const $searchInputIcon = $('.search-input-icon');
		$boardSearchInput.on('click focus', () => {
			$boardSearchInput.addClass('on');
		});
		$boardSearchInput.on('focusout', () => {
			if($boardSearchInput.val() === '') {
				$boardSearchInput.removeClass('on');
			}
		});
		$searchInputIcon.on('click', () => {
			$boardSearchInput.val('');
			$boardSearchInput.focus();
		});
	},

	reservCollect: function(){
		const $reservCollectWrap = $('.reserv-collect-wrap');
		const $reservRemitDate = $('.reserv-remit-date');
		const $reservRemitBtn = $('.reserv-collect-wrap .btn-set');
		const $reservCollectBtn = $('.reserv-collect-btn');
		$reservCollectBtn.on('click', () => {
			$reservCollectBtn.toggleClass('on');
			$reservCollectWrap.toggleClass('on');
		});

		$reservRemitBtn.on('click', () => {
			$reservRemitDate.toggleClass('on');
			$reservCollectWrap.toggleClass('expand');
		})
	},

	//tooltip
	tooltip : function(){
		$('.tooltip-wrap .btn-tooltip, .index-info .card-info .badge').on('click', function () {
			$(this).closest('.tooltip-wrap').find('.tooltip-msg').toggleClass('on');
		});

		$('.tooltip-close').on('click', function () {
			$(this).closest('.tooltip-msg').toggleClass('on');
		});
	},
	
	/* remitLimitTooltip: function(){
		const $remitLimitTooltipBtn = $('.receiver .tooltip-btn');
		const $remitLimitTooltipMessage = $('.receiver .tooltip-msg');
		const $remitLimitTooltipMessageCloseBtn = $('.receiver .tooltip-msg .btn-close');
		$remitLimitTooltipBtn.on('click', () => {
			$remitLimitTooltipMessage.toggleClass('on');
		});
		$remitLimitTooltipMessageCloseBtn.on('click', () => {
			$remitLimitTooltipMessage.toggleClass('on');
		});
	}, */
	
	receiverAccount: function(){
		const $toastBookmarkAddTemplate = $(`<div class="toast toast-bookmark-add">
		<div class="in-wrap">
			<p>자주 쓰는 계좌가 추가되었습니다.</p>
		</div>
	</div>`);
		const $toastBookmarkDeleteTemplate = $(`<div class="toast toast-bookmark-delete">
		<div class="in-wrap">
			<p>자주 쓰는 계좌가 삭제되었습니다.</p>
		</div>
	</div>`);
		const $toastRecentDeleteTemplate = $(`<div class="toast toast-recent-delete">
		<div class="in-wrap">
			<p>최근 송금 계좌가 삭제되었습니다.</p>
		</div>
	</div>`);
		const $accountBookmarkBtn = $('.account-bookmark-btn');
		const $accountDeleteBtn = $('.account-delete-btn');
		const $body = $('body');
		
		$accountBookmarkBtn.each(function () {
			$(this).on('click',() => {
				let $cloneAddToast = $toastBookmarkAddTemplate.clone().css({'display':'block'});
				let $cloneDeleteToast = $toastBookmarkDeleteTemplate.clone().css({'display':'block'});
				$(this).toggleClass('on');

				if ($(this).hasClass('on')) {
					$body.append($cloneAddToast);
					setTimeout(() => {
						$cloneAddToast.remove();
					}, 1000);
				} else {
					$body.append($cloneDeleteToast);
					setTimeout(() => {
						$cloneDeleteToast.remove();
					}, 1000);
				}
			})
		});

		$accountDeleteBtn.each(function () {
			$(this).on('click',() => {
				let $cloneRecentDelete = $toastRecentDeleteTemplate.clone().css({'display':'block'});
				$(this).toggleClass('on');
				$(this).closest('.account-info').remove();

				$body.append($cloneRecentDelete);
				setTimeout(() => {
					$cloneRecentDelete.remove();
				}, 1000);
			})
		});
	},

	remitKeypad:function(fullAmount){
		const $input = $('.inp-remit');
		const $keypad = $('.remit-key-pad');
		const $keypadNumBtn = $('.keypad-number-btn');
		const $confirmBtn = $('.remit-key-pad .keypad-btn-confirm');
		const $deleteBtn = $('.remit-key-pad .keypad-btn-delete');
		const $remitUnitBtn = $('.remit-unit-btn');
		let resultVal = '0';
		const getInputVal = function(){
			return $input.val();
		}
		const setInputVal = function(value){
			resultVal = value;
		}
		const isOverAmount = function(){
			if (resultVal > fullAmount * 10000) {
				return true;
			} else {
				return false;
			}
		}
		const applyInputVal = function(){
			if(isOverAmount()) {
				$input.val(fullAmount * 10000);
			} else {
				$input.val(resultVal);
			}
		}

		// 키패드 호출
		$input.on('focus', function(){
			$keypad.addClass('on');
		});

		// 복사 방지
		$input.on('paste', function(){
			return false;
		});

		// 키패드 숫자 버튼 event
		$keypadNumBtn.each(function(){
			$(this).on('click',function(){
				let keypadNumBtnVal = $(this).val();
				if(getInputVal() === '' && keypadNumBtnVal === '0') {
					return false;
				} else {
					setInputVal(Number(getInputVal() + keypadNumBtnVal));
				}
				applyInputVal();
				$input.focus();
			})
		});

		// 키패드 송금 단위 버튼 event
		$remitUnitBtn.each(function(){
			// 1, 5, 10, 100, 999 : 전액
			$(this).on('click', function(){
				let remitUnitBtnVal = $(this).val();
				if(remitUnitBtnVal === '999') {
					setInputVal(fullAmount * 10000);
				} else {
					setInputVal(Number(getInputVal()) + (remitUnitBtnVal * 10000));
				}
				applyInputVal();
				$input.focus();
			});
		});

		$confirmBtn.on('click',function(){
			$keypad.removeClass('on');
		});

		$deleteBtn.on('click',function(){
			const result = Number(getInputVal().slice(0, -1));
			if (result !== 0) {
				setInputVal(result);
			} else {
				setInputVal('');
			}
			applyInputVal();
		});
	},
	noticeToggleBox: function(){
		const $btn = $('.expand-btn');
		const $target = $('.notice');
		$btn.on('click',() => {
			$target.toggleClass('on');
		});
	},
	allCheck: function() {
		$('.all-check').off("click").on("click", function () {
			const isChecked = $(this).prop("checked");
			const $checkBox = $('.checkbox-list-wrap input[type="checkbox"]');
			if (isChecked) {
				$(this).prop("checked",true).attr('checked','checked');
				$(this).closest('.checkbox-wrap').find($checkBox).prop("checked",true).attr('checked','checked');
			} else {
				$(this).prop("checked",false).attr('checked','');
				$(this).closest('.checkbox-wrap').find($checkBox).prop("checked",false).attr('checked','');
			}
		});
	},
	swiperTab: function(){
		const swiper = new Swiper('.swiper-tab', {
			// Optional parameters
			direction: 'horizontal',
			width:128 + 40,
		});
	},
	creditLimitAccept: function(){
		const $checkbox = $('#chkC01');
		const $radio1onBtn = $('#chkA01');
		const $radio1offBtn = $('#chkA02');
		const $radio2onBtn = $('#chkA03');
		const $radio2offBtn = $('#chkA04');
		var $accordion = $('.checkbox-wrap .accordion');
		var $anc = $('.checkbox-wrap .toggle-anchor > a');
		
		$checkbox.on("click",function(){
			if(!$accordion.is('.crnt')){
				$anc.click();
			}
			$radio1onBtn.prop("checked",true);
			$radio2onBtn.prop("checked",true);
		});

		$checkbox.on('change',function(){
			let isChecked = $(this).prop("checked");
			if(isChecked){
				$radio1onBtn.prop("checked",true);
				$radio2onBtn.prop("checked",true);
				$radio1offBtn.prop("checked",false);
				$radio2offBtn.prop("checked",false);
			} else {
				$radio1onBtn.prop("checked",false);
				$radio2onBtn.prop("checked",false);
				$radio1offBtn.prop("checked",true);
				$radio2offBtn.prop("checked",true);
			}
		})
		$radio1onBtn.on("click",function(){
			$radio1onBtn.prop("checked",true);
			$radio1offBtn.prop("checked",false);
		});
		$radio2onBtn.on("click",function(){
			$radio2onBtn.prop("checked",true);
			$radio2offBtn.prop("checked",false);
		});
		
		$radio1offBtn.on("click",function(){
			$radio1onBtn.prop("checked",false);
			$radio1offBtn.prop("checked",true);
			$checkbox.prop("checked",false);
		});
		$radio2offBtn.on("click",function(){
			$radio2onBtn.prop("checked",false);
			$radio2offBtn.prop("checked",true);
			$checkbox.prop("checked",false);
		});
	}
//end
};
function inputPhoneNumber(obj) {
	var number = obj.value.replace(/[^0-9]/g, '');
	var phone = '';
	if (number.length < 4) {
		return number;
	} else if (number.length < 7) {
		phone += number.substr(0, 3);
		phone += '-';
		phone += number.substr(3);
	} else if (number.length < 11) {
		phone += number.substr(0, 3);
		phone += '-';
		phone += number.substr(3, 3);
		phone += '-';
		phone += number.substr(6);
	} else {
		phone += number.substr(0, 3);
		phone += '-';
		phone += number.substr(3, 4);
		phone += '-';
		phone += number.substr(7);
	}
//end
};

function btnSet() {
	$('.btn-set').each(function () {
		$(this).off('click').on('click', function () {
			if ( $(this).is('.off') ) {
				$(this).removeClass('off').addClass('on');
			} else {
				$(this).removeClass('on').addClass('off');
			}
		});
	});
}

function agrToggle() {
	$('.agree-wrap.toggle').each(function () {
		var $toggBtn = $(this).find('.agree-all-check .btn-toggle');
			
		$(this).find('.all-check').off("click").on("click", function () {
			if ( $(this).prop("checked") ) {
				$(this).prop("checked",true).attr('checked','checked');
				$(this).closest('.agree-all-check').addClass('on');
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap').slideDown();
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap input[type="checkbox"]').prop("checked",true).attr('checked','checked');
				$(this).closest('.agree-all-check').find('.btn-toggle > span').text('세부 약관 숨기기');
			} else {
				$(this).prop("checked",false).attr('checked','');
				$(this).closest('.agree-all-check').removeClass('on');
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap').slideUp();
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap input[type="checkbox"]').prop("checked",false).attr('checked','');
				$(this).closest('.agree-all-check').find('.btn-toggle > span').text('세부 약관 보기');
			}
		});
		
		$toggBtn.on("click", function () {
			if ( !$(this).closest('.agree-all-check').is('.on') ) {
				$(this).find('span').text('세부 약관 숨기기');
				$(this).closest('.agree-all-check').addClass('on');
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap').slideDown();
			} else {
				$(this).find('span').text('세부 약관 보기');
				$(this).closest('.agree-all-check').removeClass('on');
				$(this).closest('.agree-wrap').find('.checkbox-list-wrap').slideUp();
			}
		});
	});
}

function layerMore() {
	$('.account-management .layer-more .content-more').hide();
	$('.account-management .layer-more .btn-more').click(function () {
		if ( !$(this).closest('.layer-more').is('.on') ) {
			$(this).closest('.layer-more').find('.content-more').show();
			$(this).closest('.layer-more').addClass('on');
		} else {
			$(this).closest('.layer-more').find('.content-more').hide();
			$(this).closest('.layer-more').removeClass('on');
		}
	});
}

$(window).resize(function () {
	WIP.init();	
});

$(function() {
	WIP.init();
	WIP.swiper();
	btnSet(); //세트 스위치
	agrToggle(); //약관동의 toggle
	layerMore();//생활/금융 > 내 계좌 관리-더 보기

	var deviceH = (window.screen.height > $(window).height()) ? $(window).height() : window.screen.height;

	$('.wrap-info-list .btn-infos').click(function () {
		if( !$(this).is('.on') ) {
			$(this).addClass('on').append('<span class="state"> 닫기</span>');
		} else {
			$(this).removeClass('on');
			$(this).find('.state').remove();
		}
	});

	if ( $('.lyr-contents').find('.details-account') ) {
		$('.lyr-contents').scroll(function() {
			var top = $('.lyr-contents').scrollTop();
			if ( top > 0 ) {
				$('.account-inquiry').addClass('sticky');
			} else {
				$('.account-inquiry').removeClass('sticky');
			}
		});
	}
});