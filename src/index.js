import './css/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import $ from 'jquery'
import 'slick-carousel'
require("@fancyapps/fancybox");
require('./js/forms')
require('./js/jquery.form.min.js')
require('./js/jquery.maskedinput')

// $(window).on('load', function() {
//     let box = $('.category-list').innerHeight()
//     let items = document.querySelectorAll('.category-item')
//     let offsets = []
//     let offset = {}

//     for (var i = 0; i < items.length; i++) {
//         if(i > 1) {
//             if( i % 2 === 0) {
//                 offset = {
//                     height: offsets[i - 2].height +  $(items[i]).outerHeight() / box * 100 + 10.75
//                 }
//             } else {
//                 offset = {
//                     height: offsets[i - 2].height +  $(items[i]).outerHeight() / box * 100 + 9.1
//                 }
//             }
//         } else {
//             if (i % 2 === 0) {
//                 offset = {
//                     height: $(items[i]).outerHeight() / box * 100 + 15.05
//                 }
//             } else {
//                 offset = {
//                     height: $(items[i]).outerHeight() / box * 100 + 9.9
//                 }
//             }
//         }
//         offsets.push(offset)
        
        
//         if (i > 1) {
//             items[i].style.margin = offsets[i - 2].height + '% -50% 0 -50%'
//         }
//         if (i === items.length - 1) {
//             $(items[i]).css('float', 'right')
//             items[i].style.margin = offsets[i - 1].height + '% -50% 0 -50%'
//         }
//     }
// })

$(document).ready(function(){

    $(window).on('scroll', function(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 40) {
            $('.page-header').addClass('sticky')
        } else {
            $('.page-header').removeClass('sticky')
        }
    })

    if ($('.page-header').offset().top > 0) {
        $('.page-header').addClass('sticky')
    } 


    $('.nav-toggle').on('click', function(){
        $('.menu-layout').fadeIn(300).addClass('active')
        $('.layout').addClass('blured')
        $('.page-header').addClass('blured')
    })
    $('.menu-close-btn').on('click', function(){
        $('.menu-layout').removeClass('active')
        setTimeout(() => {
            $('.menu-layout').fadeOut(300)
            $('.layout').removeClass('blured')
            $('.page-header').removeClass('blured')    
        }, 400);
    })

    $('.dropdown-current').on('click', function() {
        let parent = $(this).parents('.dropdown')
        $(parent).find('.dropdown-list').fadeIn(300)
    })
    $(document.body).on('click', function(e){
        if($(e.target).parents('.dropdown').length === 0) {
            $('.dropdown-list').fadeOut(300)
        }
    })

    $('.gallery-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        asNavFor: '.gallery-nav',
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon fa fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon fa fa-angle-right"></i></button>',
        responsive: [
			{
				breakpoint: 1024,
				settings: {
					fade: false,
				}
			}
		]
    })
    $('.gallery-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.gallery-main',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });
    $('[data-fancybox="gallery"]').fancybox({
        protect: true,
        animationEffect: "zoom",
        transitionEffect: "slide",
    })

    // Reload gallery
    setTimeout(function() {
        $('.colors-options input:first').prop('checked', true)
        $('.colors-options input:first').change()
    },300)
    
    $('.colors-options input').on('change', function() {
        var color = $(this).val()
        $.ajax({
            url: '/assets/components/request/connectors/web/connector.php',
            dataType: 'json',
            data: {
                action: 'getgallery',
                color: color,
                productId: +$('#msProduct input[name=id]').val()
            },
            success: function(data){
                if (!data.success) {
                    console.log('error:' + message);
                    return;
                } else {
                    // console.log(data.object.galleryMain)
                    // console.log(data.object.galleryNav)
                    $('.gallery-main').slick('unslick');
                    $('.gallery-nav').slick('unslick');

                    $('.gallery-main').html(data.object.galleryMain)
                    $('.gallery-nav').html(data.object.galleryNav)

                    

                    $('.gallery-main').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: false,
                        asNavFor: '.gallery-nav',
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon fa fa-angle-left"></i></button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon fa fa-angle-right"></i></button>',
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    fade: false,
                                }
                            }
                        ]
                    })
                    $('.gallery-nav').slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        asNavFor: '.gallery-main',
                        dots: false,
                        arrows: false,
                        centerMode: false,
                        focusOnSelect: true
                    });
                    
                    setTimeout(function(){
                        // $('.gallery-main').slick('refresh')
                        // $('.gallery-nav').slick('refresh')
                        // $('.gallery-nav').slick('reInit')
                    },1000)
                }
            }
        });
    })

    $('.colors .option-box-title').on('mouseenter', function(e){
        if($('.tooltip').length === 0) {
            setTimeout(() => {
                let y = $(this).offset().top + $(this).height() - 5
                const x = $(this).offset().left + $(this).width()
                let text = $(this).attr('data-tooltip')
                $(this).append(`<div class="tooltip" style="left: ${x}px; top: ${y}px;">${text}</div>`)
            })
        }
    })
    $('.colors .option-box-title').on('mouseleave', function(e){
        setTimeout(() => {
            if($('.tooltip').length > 0) {
                $('.tooltip').remove()
            }
        })
    })

    // Tabs
    $('.tab').on('click', function(){
        var item = $(this)
        var index = $('.tab').index(item) + 1

        $('.tab').removeClass('active')
        $('.tab-content').removeClass('active')
        var i = 0
        $('.tab').each(function(){
            i++
            if (i === index) {
                $(this).addClass('active')
            }
        })
        var idx = 0
        $('.tab-content').each(function(){
            idx++
            if (idx === index) {
                $(this).addClass('active')
            }
        })
    })


    // Minicart count change
    $(document).on('click', '.count-btn', function(e) {
        e.preventDefault()
        var input = $(this).parents('.cart-count-row').find('.cart-count')
        var currentCount = $(input).val()
        if ($(this).hasClass('plus')) {
            $(input).val(+currentCount + 1).change()
        } else if ($(this).hasClass('minus')) {
            if (+currentCount > 1) {
                $(input).val(+currentCount - 1).change()
            }
        }
    })

    $('.articles-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="icon fa fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="icon icon-right-open-mini"></i></button>',
        responsive: [
			{
				breakpoint: 550,
				settings: {
                    fade: false,
                    slidesToShow: 1
				}
			}
		]
    })

    if (typeof $('.content') !== undefined) {
        const wordsPerMinute = 200
        let result

        let textLength = $('.content').text().split(' ').length
        if(textLength > 0){
            let value = Math.ceil(textLength / wordsPerMinute);
            result = `${value}`;
        }

        $('.read-time').text(result)
    }

    $("input[name=phone]").mask("+380 (99) 999-9999");

    $('.one-click-btn').on('click', function(e) {
        // e.preventDefault()

        let lang = $('html').attr('lang')
        let btnText = lang == 'ru' ? 'Заказать' : 'Замовити'

        $(this).text(btnText)
        $('.fast-order-form').addClass('active')
    })

    $(document).on('beforeClose.fb', function( e, instance, slide ) {
        $('.layout').removeClass('blured')
        if(typeof $('#modal-map') !== undefined) {
            $('#modal-map').remove()
        }
    });

    // SHARE
    $('.share-btn').on('click', function(e){
        e.preventDefault()
        window.open($(this).attr('data-url'))
    })
    

    $('.allow-cookie-btn').on('click', function(e){
        e.preventDefault();
        
        $.ajax({
            url: '/assets/components/request/connectors/web/connector.php',
            dataType: 'json',
            data: {
                action: 'allowcookie',
            },
            success: function(data){
                if (!data.success) {
                    console.log('error:' + message);
                    return;
                } else {
                    $('.cookie-allowed-window').remove()
                }
            }
        });
    })


    $(".add-review").on("click", function (e) {
        e.preventDefault();

        var top = $('.review-form').offset().top;
        
        $('body,html').animate({scrollTop: top}, 400);
    });


    $('.get-map').on('click', function(){
        $.ajax({
            url: '/assets/components/request/connectors/web/connector.php',
            dataType: 'json',
            data: {
                action: 'getmap',
            },
            success: function(data){
                if (!data.success) {
                    console.log('error:' + message);
                    return;
                } else {
                    $('body').append(data.object.html)
                    $.fancybox.open({
                        src  : '#modal-map',
                    });
                }
            }
        });
    })

    require('./js/cart')
})