import './css/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import $ from 'jquery'

// MODX Components
import '../assets/components/minishop2/js/web/default'
import '../assets/components/msmcd/js/web/msmcdminicart'
import '../assets/components/easycomm/js/web/ec.default'
import '../assets/components/pdotools/js/custom'
import '../assets/components/msoptionsprice/js/web/custom'
import '../assets/components/looked/js/web/looked'
import '../assets/components/msearch2/js/web/default'


import 'slick-carousel'
require("@fancyapps/fancybox");
require('./js/forms')
require('./js/jquery.form.min.js')
require('./js/jquery.maskedinput')
require('./js/lazysize')


$(window).on('load', function() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop
    scrolled = scrolled + document.documentElement.clientHeight - (document.documentElement.clientHeight / 4)
    if($('.category-item').length > 0) {
        $('.category-item').each(function() {
            if($(this).offset().top < scrolled) {
                $(this).addClass('show')
            } else {
                $(this).removeClass('show')
            }
        })
    }

    if($('.product-item').length > 0) {
        $('.product-item').each(function() {
            if($(this).offset().top < scrolled + (document.documentElement.clientHeight / 20)) {
                $(this).addClass('show')
            } else {
                $(this).removeClass('show')
            }
        })
    }
    
    if($('.section-social').length > 0) {
        if($('.section-social').offset().top < scrolled + (document.documentElement.clientHeight / 20)) {
            $('.section-social').addClass('show')
        } else {
            $('.section-social').removeClass('show')
        }
    }

    if($('.animate').length > 0) {
        $('.animate').each(function() {
            if($(this).offset().top < scrolled + 100) {
                $(this).addClass('show')
            } else {
                $(this).removeClass('show')
            }
        })
    }
    

})


$(document).ready(function(){

    if($('.content .calc-lead-block-before').length > 0) {
        let margin = $('.content').offset().left
        $('.calc-lead-block-before').css({ 'width': document.documentElement.clientWidth + 'px','left': `-${ margin }px`})
        
        $(window).on('resize', function(){
            setTimeout(() => {
                let margin = $('.content').offset().left
                $('.calc-lead-block-before').css({ 'width': document.documentElement.clientWidth + 'px','left': `-${ margin }px`})
            },100)
        })
    }

    // scroll animate
    

    $(window).on('scroll', function() {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop
        scrolled = scrolled + document.documentElement.clientHeight - (document.documentElement.clientHeight / 4)
        
        if($('.category-item').length > 0) {
            $('.category-item').each(function() {
                if($(this).offset().top < scrolled) {
                    $(this).addClass('show')
                } else {
                    $(this).removeClass('show')
                }
            })
        }

        if($('.product-item').length > 0) {
            $('.product-item').each(function() {
                if($(this).offset().top < scrolled + (document.documentElement.clientHeight / 20)) {
                    $(this).addClass('show')
                } else {
                    $(this).removeClass('show')
                }
            })
        }

        if($('.section-social').length > 0) {
            if($('.section-social').offset().top < scrolled + (document.documentElement.clientHeight / 20)) {
                $('.section-social').addClass('show')
            } else {
                $('.section-social').removeClass('show')
            }
        }

        if($('.animate').length > 0) {
            $('.animate').each(function() {
                if($(this).offset().top < scrolled + 100) {
                    $(this).addClass('show')
                } else {
                    $(this).removeClass('show')
                }
            })
        }
    })

    // Options module
    $('#msProduct').on('change', '.option-box input', function() {
        
        let optionRelations = $(this).parents('.options-list').attr('data-relation-options').split('&')
        let needle = $(this).attr('name').match(/[^[\]]+(?=])/g) + '=' + $(this).val()
        let relations = []
        
        for (let i = 0; i < optionRelations.length; i++) {
            $('#msProduct .option-box input[name="options['+optionRelations[i]+']"]').each(function(){
                if (typeof $(this).attr('data-relations') !== 'undefined') {
                    relations = $(this).attr('data-relations').split('&')
                    if (relations.indexOf( needle ) == -1) {
                        if ($(this).prop('checked') === true) {
                            $('#msProduct .option-box input[name="options['+optionRelations[i]+']"]:first').prop('checked', true);
                            $(this).prop('checked', false)
                        }
                        $(this).prop('disabled', true)
                        
                    } else {
                        $(this).prop('disabled', false)
                    }
                }
            })
        }
    })


    // search
    $('.search-toggle, .search-close-btn').on('click', function() {
        if(document.body.clientWidth <= 1024) {
            // $('.layout').toggleClass('blured')
        }
        $('.search-form').toggleClass('active')
    })

    // cart module
    miniShop2.Callbacks.add('Cart.add.ajax.always', 'ajax_log', function(xhr) {
        if (xhr.responseJSON.data.total_count > 0) {
            $('.minicart-count').removeClass('hidden')
        }
    });
    miniShop2.Callbacks.add('Cart.remove.ajax.always', 'ajax_log', function(xhr) {
        if (xhr.responseJSON.data.total_count == 0) {
            $('.minicart-count').addClass('hidden')
        }
    });


    $('.works-list, .works-list-metro .rows').on('click', '.work-item', function(e){
        e.preventDefault()

        let id = $(this).attr('data-id')

        $.ajax({
            url: '/assets/components/request/connectors/web/connector.php',
            dataType: 'json',
            data: {
                action: 'getobjectgallery',
                id: id
            },
            success: function(data){
                if (!data.success) {
                    console.log('error:' + message);
                    return;
                } else {
                    $('body').append(data.object.html)
                    let images = data.object.response

                    let options = {
                        loop : true,
                        animationEffect: "zoom",
                        transitionEffect: "slide",
                    }

                    if (images.length > 0) {
                        $.fancybox.open(images, options);
                    }
                }
            }
        })
    })

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