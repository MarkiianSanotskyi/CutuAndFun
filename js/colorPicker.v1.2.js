/**
 * Объект "ColorPicker" Выбиралка цвета.
 * Browsers: IE6-9,FireFox,Opera,Chrom,Safari
 * version 1.1
 * autor Komarov Artem 
 * site : http://php-zametki.ru
 * email: arty-komarov@yandex.ru
 */
var ColorPicker = (function (GLOB) {

	"use strict";
	
	var DOC            = GLOB.document,
		pickerClass    = "col-pic-picker",
		paletteClass   = "col-pic-palette",
		closerClass    = "col-pic-closer",
		colorItemClass = "col-pic-item",
		PALETTE        = [],
        
		// Создаёт DOM-элемент для образца цвета
		getColorItem = function (clickHandler) {
			var colDiv = DOC.createElement("DIV");
			colDiv.className = colorItemClass;
			colDiv.onclick = clickHandler;
			return colDiv;
		},
		
		// Получить прокрутку страницы:
		pageScroll = function() {
			return {
				y: GLOB.pageYOffset || DOC.documentElement.scrollTop  || DOC.body.scrollTop,
				x: GLOB.pageXOffset || DOC.documentElement.scrollLeft || DOC.body.scrollLeft
			}
		},
		
		// Формирование палитры цветов ( используются 216 Safe Web Colors )
		// Эта ф-ция не доступна из вне.
		createPalette = function (srcPicker, srcInput) {
		
			var palette = DOC.createElement("DIV"),
				length  = PALETTE.length,
				hexR	= "",
				hexG	= "",
				hexB	= "",
				colItem	= null,
				i,
				q,
				m,
                
				// Обработчик кликов на образцах:
				clickHandler = function () {
					srcPicker.style.background = this.style.background;
					srcInput.value = this.hv;
					palette.style.display  = "none";
				},
                
				// Добавляет образец цвета в палитру:
				addColor	= function ( color ) {
					colItem = getColorItem(clickHandler);
					colItem.style.background = colItem.hv = color;
					palette.appendChild(colItem);
				};
                
			// Если пользователь не задал свою палитру:
			if (length === 0) {
				// Генерим палитру Safe Web Colors:
				for (i = 0x0; i <= 0xff; i += 0x33) {
					hexR = (i > 0) ? i.toString(16) : "00";
					for (q = 0x0; q <= 0xff; q += 0x33) {
						hexG = (q > 0) ? q.toString(16) : "00";
						for (m = 0x0; m <= 0xff; m += 0x33) {
							hexB = (m > 0) ? m.toString(16) : "00";
							addColor("#" + hexR + hexB + hexG);	
						}
					}
				}
            // Иначе, если пользователь ввёл свой массив цветов - выводим его:
			} else {
		        for (i = 0; i < length; i += 1) {
					addColor(PALETTE[i]);
				}
			}
			
			// Конфиг палитры:
			palette.className 		= paletteClass;
			palette.style.display	= "none";
			palette.style.position	= "absolute";
			
			// Добавляем в DOM
			DOC.body.appendChild(palette);            
			return palette;
		};
        
	return {
		/**
		 * Установка имён классов стилей.
		 * @param string picker - Имя класса для значка выбора цвета, по-умолчанию: "col-pic-picker".
		 * @param string palette - Имя класса для появляющейся палитры, по-умолчанию: "col-pic-palette".
		 * @param string colorItem - Имя класса элементов - образцов цвета в палитре, для  по-умолчанию: "col-pic-item". 
		 * @param string closer - Имя класса для значка "закрыть": "col-pic-closer". 
		 * @return ColorPicker
		 */
		setClasses : function (picker, palette, colorItem, closer) {
			pickerClass    = picker; 
			paletteClass   = palette; 
			colorItemClass = colorItem;
			closerClass    = closer;
			return this;
		},
		/**
		 * Установка своей палитры цветов.
		 * @param array arrayOfColors - массив HEX-значений цветов.
		 * @return ColorPicker
		 */
		setPallete : function (arrayOfColors) {
			PALETTE = arrayOfColors;
			return this;
		},
		/**
		 * Вставить выбиралку цвета в HTMLElement
		 * @param HTMLElement element - элемент, результат выборки: document.getElementById
		 * @param string name - атрибут для элемента формы, представляющего выбранный цвет.
		 * @param string selected - значение по-умолчанию для элемента формы, представляющего выбранный цвет.
		 * @param int offsX - смещение палитры относительно эемента выбора цвета по горизонтали
		 * @param int offsY - смещение палитры относительно эемента выбора цвета по вертикали
		 * @return ColorPicker
		 */
		insertInto : function (element, name, sel, offsX, offsY) {
		
			var picker		= DOC.createElement("DIV"),
				hideInput	= DOC.createElement("INPUT"),
				palette		= createPalette(picker, hideInput),
                selected    = sel   || "#FFFFFF",
				oX			= offsX || 1,
				oY			= offsY || 1;
				
			// Скрытый элемент формы, значение которого
			// будет меняться, в зависимости от выбора цвета 
			// и которое будет передаваться на сервер.
			hideInput.value	= picker.style.background = selected;	
			hideInput.type	= "hidden";
			hideInput.name	= name || element.id;
			
			picker.className = pickerClass;	
            
            // Обработчик клика на элементе - пикере
			picker.onclick   = function (ev) {			
				var e = ev || GLOB.event,
					x = e.clientX,
					y = e.clientY;
					
				palette.style.display  = "block";
				palette.style.top  = (y + pageScroll().y) - oY + "px";
				palette.style.left = (x + pageScroll().x) + oX + "px";
			};
			
			// Добавляем в DOM
			element.appendChild(picker);
            element.insertBefore(hideInput, picker);
            
            var closeLink = DOC.createElement("A");            
            closeLink.onclick = function () {
                palette.style.display  = "none";
                return false;
            };
            palette.insertBefore(closeLink, palette.firstChild);
            closeLink.innerHTML = "x";
            closeLink.href="#";
            closeLink.className = closerClass;
            
			return this;
		}
	};
}(this));