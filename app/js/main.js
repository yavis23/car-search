document.addEventListener("DOMContentLoaded", function(event) {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    $(window).scroll(function () {
        var height = $(window).scrollTop();
        var docHeight = $( document ).height()
        if (height > 90 && docHeight > 1200) {
            document.querySelector('.header').classList.add('header__scroll')
        } else {
            document.querySelector('.header').classList.remove('header__scroll')
        }
    
    });

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(block).style.cssText = 'left: 0';
                document.body.style.overflow = "hidden"
            })
            document.querySelector(close).addEventListener('click', () => {
                document.body.style.overflow = "auto"
                document.querySelector(block).style.cssText = 'left: -100%';
            })
        }
    } 
    menu('.header__menu', '.header-mobile', '.header-mobile__close');

    $(document).ready(function() {
        $('.car__for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.car__nav',
            prevArrow: "<div class='prev'><img src='../img/svg/select-arrow.svg' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/select-arrow.svg' alt='2'></div>",
        });
        $('.car__nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.car__for',
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            prevArrow: "<div class='prev'><img src='../img/svg/select-arrow.svg' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/select-arrow.svg' alt='2'></div>",
        });
        if (document.querySelector('.car__links')) {
            document.querySelector('.car__current').textContent = $('.car__for').slick('slickCurrentSlide') + 1
            document.querySelector('.car__length').textContent = $(".car__for").slick("getSlick").slideCount
            document.querySelector('.car__for .next').addEventListener('click', () => {
                document.querySelector('.car__current').textContent = $('.car__for').slick('slickCurrentSlide') + 1
            })
            document.querySelector('.car__for .prev').addEventListener('click', () => {
                document.querySelector('.car__current').textContent = $('.car__for').slick('slickCurrentSlide') + 1
            })
            document.querySelector('.car__nav .next').addEventListener('click', () => {
                document.querySelector('.car__current').textContent = $('.car__for').slick('slickCurrentSlide') + 1
            })
        }

        $('.car__links').slick({
			centerMode: true,
            arrows: true,
			slidesToShow: 3,
			variableWidth: true,
			prevArrow: "<div class='prev'><img src='../img/svg/arrow.svg' alt='1'></div>",
			nextArrow: "<div class='next'><img src='../img/svg/arrow.svg' alt='2'></div>",
			responsive: [
            {
                breakpoint: 1250,
                settings: {
                centerMode: false,
                slidesToShow: 2
                }
            },
			{
				breakpoint: 768,
				settings: {
				centerMode: true,
				slidesToShow: 1
				}
			}
			]
		});
    })

    function tabs() {
		$('.graph').each(function() {
			let ths = $(this);
			ths.find('.graph__contentItem').not(':first').hide();
			ths.find('.graph__tab').click(function() {
				ths.find('.graph__tab').removeClass('graph__yearActive').eq($(this).index()).addClass('graph__yearActive');
				ths.find('.graph__contentItem').hide().eq($(this).index()).fadeIn()
			}).eq(0).addClass('active');
		});
	}
    tabs();



    var numberOfSelects = $('select').length;

    // Iterate over each select element
    $('select').each( function() {
        
        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        
        // Hides the select element
        $this.addClass('hidden');
        
        // Wrap the select element in a div
        $this.wrap('<div class="select" />');
        
        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');
        
        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');
        
        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());
        
        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class' : 'options'
        }).insertAfter($styledSelect);
        
        // Insert a list item into the unordered list for each select option
        for(var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text()
            }).appendTo($list);
        }
        
        // Cache the list items
        var $listItems = $list.children('li');
        
        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click( function(e) {
            e.stopPropagation();
            $('div.styledSelect.active').each( function() {
                $(this).removeClass('active')
                    .next('ul.options').filter(':not(:animated)').slideUp(250);   
            });
            /* Use this instead of the .each() method when dealing with a large number of elements:
            for(var i = 0; i < numberOfSelects; i++) {
                if($('div.styledSelect').eq(i).hasClass('active') === true) {
                    $('div.styledSelect').eq(i).removeClass('active')
                        .next('ul.options').filter(':not(:animated)').slideUp(250);
                }
            } */
            $(this).toggleClass('active')
                .next('ul.options').filter(':not(:animated)').slideToggle(250);
        });
        
        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click( function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text())
                .removeClass('active');
            $this.val($(this).text().toLowerCase());
            $list.filter(':not(:animated)').slideUp(250);
        });
        
        // Hides the unordered list when clicking outside of it
        $(document).click( function() {
            $styledSelect.removeClass('active');
            $list.filter(':not(:animated)').slideUp(250);
        });
        
    });


});