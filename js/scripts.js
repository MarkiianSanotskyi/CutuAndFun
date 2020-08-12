/*placeholder*/
$(document).ready(function(){
        $.Placeholder.init({ color : "#a7a7a7" });
		
		
 });
 
 
(function($) {
		$(function() {
			$('input, select').styler({
				selectSearch: true
			});
		});
		})(jQuery);
 
 $(function() {

			//Сохраняем нужные элементы в перменных
			var slider  = $('#slider'),
				tooltip = $('.tooltip');

			//Скрываем подсказку в начале
			tooltip.hide();

			//Вызываем слайдер
			slider.slider({
				//Конфигурация
				range: "min",
				min: 1,
				value: 35,

				start: function(event,ui) {
				    tooltip.fadeIn('fast');
				},

				//Событие слайдреа
				slide: function(event, ui) { //При пермещении слайдера

					var value  = slider.slider('value'),
						volume = $('.volume');

					tooltip.css('left', value).text(ui.value);  //Выравниваем подсказку соответственно

					if(value <= 5) { 
						volume.css('background-position', '0 0');
					} 
					else if (value <= 25) {
						volume.css('background-position', '0 -25px');
					} 
					else if (value <= 75) {
						volume.css('background-position', '0 -50px');
					} 
					else {
						volume.css('background-position', '0 -75px');
					};

				},

				stop: function(event,ui) {
				    tooltip.fadeOut('fast');
				},
			});

		});
 

	$( ".like-box " ).click( function () {
        $( ".like-box a.ico-web " ).removeClass( "active" );
        $( this ).toggleClass( "active" );
    } )
	$( "#settings .creepers ul.creepers-box-list li a" ).click( function () {
        $( "#settings .creepers ul.creepers-box-list li  " ).removeClass( "active" );
        $( this ).toggleClass( "active" );
    } )
	
	$( "#contacts-info .creepers ul.creepers-box-list li a" ).click( function () {
        $( "#contacts-info .creepers ul.creepers-box-list li  " ).removeClass( "active" );
        $( this ).toggleClass( "active" );
    } )
 
 
 	
    /*Fancybox*/


    var forms = $( '.form-modal' ),
        cb_input = forms.find( 'input[type=text], input[type=email], input[type=tel] , textarea' ),
        cr_close = $.fancybox.close();

    $( "#fancybox-overlay" ).fancybox( {
        padding: [ 0, 0, 0, 0 ],
        margin: [ 120, 0, 0, 0 ],
        scrolling: 'visible',
        minWidth: 350,
        minHeight: 321,
        autoSize: false,
        autoHeight: true,
        autoWidth: true,
        maxWidth: 9999,
        maxHeight: 9999,
        fixed: false,
        autoCenter: false,
        closeBtn: true,
        afterClose: function () {
            cb_input.val( '' );
        }
    } );

    $( '.btr' ).click( function () {
        $.fancybox.close();
    } );


    /*Fancybox end*/



    //   $("a[href$='.jpg'], a[href$='.png']")
//           .addClass("fancybox");

    $( "a[href$='.jpg'], a[href$='.png']" ).each( function () {
        $( this ).addClass( "fancybox" );
        $( this ).attr( 'rel', 'gallery' );

    } );

    $( ".fancybox" ).fancybox( {
        padding: [ 0, 0, 0, 0 ],
        openEffect: 'elastic',
        openSpeed: 300,
//        closeEffect: 'elastic',
//        scrolling: 'visible',
        background: 'white',
        maxWidth: 800,
        arrows: true,
        fixed: false,
        autoCenter: true,
        beforeShow: function () {
            this.title = ( this.title ? '' + this.title + '' : '' ) + 'Image ' + ( this.index + 1 ) + '/' + this.group.length;
        }
    } );
	
	
		
		
		jQuery(function ($) {
    function fix_size() {
        var images = $('ul.work-box-list .image-box img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('ul.work-box-list .image-box');
            if (img_dom.complete) {
                resize();
            } else img.one('ready', resize);

            function resize() {
                if ((container.width() / container.height()) > (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();
});


			// Безопасные вэб цвета, добавляем на страницу:	
		    ColorPicker.insertInto( document.getElementById("color_picker_one"), "safe_color", "#ffffff" );		
			// Базовые вэб цвета + град. серого:
			ColorPicker.setPallete(["#BE2137","#FFA100","#00752C","#0052AC","#701F85",
									"#E62937","#FFCB00","#009E2F","#0079F1","#873CBE",
									"#FF7525","#FDF900","#00E430","#00A9FF","#C87AFF",
									"#FFFFFF","#999999","#666666","#333333","#000000"]);									
            // Так как цветов меньше - нужно скорректировать стили:									
			ColorPicker.setClasses(
                "col-safe-picker",  /* Имя класса для значка выбора цвета, по-умолчанию: "col-pic-picker" */
                "col-safe-palette", /* Имя класса для появляющейся палитры, по-умолчанию: "col-pic-palette" */
                "col-safe-item",    /* Имя класса элементов - образцов цвета в палитре, для  по-умолчанию: "col-pic-item" */
                "col-safe-closer"   /* Имя класса для значка "закрыть": "col-pic-closer" */
            );			
			// Добавляем на страницу:
			ColorPicker.insertInto( document.getElementById("color_picker_two"), "base_color", "#0000ff", 5, 5 );		
			
		
