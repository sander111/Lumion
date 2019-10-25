import './css/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import $ from 'jquery'
import 'slick-carousel'
require("@fancyapps/fancybox");

$(document).ready(function(){

    let box = $('.category-list').innerHeight()
    let items = document.querySelectorAll('.category-item')
    let offsets = []
    let offset = {}

    for (var i = 0; i < items.length; i++) {
        if(i > 1) {
            if( i % 2 === 0) {
                offset = {
                    height: offsets[i - 2].height +  $(items[i]).outerHeight() / box * 100 + 10.75
                }
            } else {
                offset = {
                    height: offsets[i - 2].height +  $(items[i]).outerHeight() / box * 100 + 9.1
                }
            }
        } else {
            if (i % 2 === 0) {
                offset = {
                    height: $(items[i]).outerHeight() / box * 100 + 15.05
                }
            } else {
                offset = {
                    height: $(items[i]).outerHeight() / box * 100 + 9.9
                }
            }
        }
        offsets.push(offset)
        
        
        if (i > 1) {
            items[i].style.margin = offsets[i - 2].height + '% -50% 0 -50%'
        }
        if (i === items.length - 1) {
            $(items[i]).css('float', 'right')
            items[i].style.margin = offsets[i - 1].height + '% -50% 0 -50%'
        }
    }

    $('.nav-toggle').on('click', function(){
        $('.menu-layout').fadeIn(300)
        $('.layout').addClass('blured')
    })
    $('.menu-close-btn').on('click', function(){
        $('.menu-layout').fadeOut(300)
        $('.layout').removeClass('blured')
    })

    $('.dropdown-current').on('click', function() {
        let parent = $(this).parents('.dropdown')
        $(parent).find('.dropdown-list').fadeIn(300)
    })
    $(document).on('click', function(e){
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

})