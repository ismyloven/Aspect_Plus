


window.console = window.console || function (t) {
};

if (document.location.search.match(/type=embed/gi)) {
	window.parent.postMessage("resize", "*");
}




// Слайдшоу

(function () {

	function init(item) {
		var items = item.querySelectorAll('li'),
			current = 0,
			timeTrans = 1000000;

		//create nav
		var nav = document.createElement('nav');
		nav.className = 'nav_arrows';

		//create button prev
		var prevbtn = document.createElement('button');
		prevbtn.className = 'prev';
		prevbtn.setAttribute('aria-label', 'Prev');

		//create button next
		var nextbtn = document.createElement('button');
		nextbtn.className = 'next';
		nextbtn.setAttribute('aria-label', 'Next');

		//create counter
		var counter = document.createElement('div');
		counter.className = 'counter';
		counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

		if (items.length > 1) {
			nav.appendChild(prevbtn);
			nav.appendChild(counter);
			nav.appendChild(nextbtn);
			item.appendChild(nav);
		}

		items[current].className = "current";
		if (items.length > 1) items[items.length - 1].className = "prev_slide";

		var navigate = function (dir) {
			items[current].className = "";

			if (dir === 'right') {
				current = current < items.length - 1 ? current + 1 : 0;
			} else {
				current = current > 0 ? current - 1 : items.length - 1;
			}

			var nextCurrent = current < items.length - 1 ? current + 1 : 0,
				prevCurrent = current > 0 ? current - 1 : items.length - 1;

			items[current].className = "current";
			items[prevCurrent].className = "prev_slide";
			items[nextCurrent].className = "";

			//update counter
			counter.firstChild.textContent = current + 1;
		};

		item.addEventListener('mouseenter', function () {
			autoUpdate = false;
		});

		item.addEventListener('mouseleave', function () {
			autoUpdate = true;
		});

		setInterval(function () {
			if (autoUpdate) navigate('right');
		}, timeTrans);

		prevbtn.addEventListener('click', function () {
			navigate('left');
		});

		nextbtn.addEventListener('click', function () {
			navigate('right');
		});

		//keyboard navigation
		document.addEventListener('keydown', function (ev) {
			var keyCode = ev.keyCode || ev.which;
			switch (keyCode) {
				case 37:
					navigate('left');
					break;
				case 39:
					navigate('right');
					break;}

		});

		// swipe navigation
		// from http://stackoverflow.com/a/23230280
		item.addEventListener('touchstart', handleTouchStart, false);
		item.addEventListener('touchmove', handleTouchMove, false);
		var xDown = null;
		var yDown = null;
		function handleTouchStart(evt) {
			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
		};
		function handleTouchMove(evt) {
			if (!xDown || !yDown) {
				return;
			}

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;

			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
				if (xDiff > 0) {
					/* left swipe */
					navigate('right');
				} else {
					navigate('left');
				}
			}
			/* reset values */
			xDown = null;
			yDown = null;
		};


	}

	[].slice.call(document.querySelectorAll('.cd-slider')).forEach(function (item) {
		init(item);
	});

})();



// Меню

var accordion = (function (element) {

	var _getActiveItems = function (elements) { // функция для получения элементов с указанным классом
		var items = [];
		elements.forEach(function (item) {
			if (item.classList.contains('show')) {
				items.push(item);
			}
		});
		return items;
	};

	return function () {
		var _mainElement = {}, // .accordion
			_items = {}, // .accordion-item
			_contents = {}; // .accordion-item-content


		var _actionClick = function (e) {
				if (!e.target.classList.contains('accordion-item-header')) { // прекращаем выполнение функции если кликнули не по заголовку
					return;
				}
				e.preventDefault();   // Отменям стандартное действие
				// получаем необходимые данные
				var header = e.target,
					item = header.parentElement,
					activeItems = _getActiveItems(_items);

				if (!activeItems.length) { // добавляем класс show к элементу (в зависимости от выбранного заголовка)
					item.classList.add('show');
				} else {
					// удаляем класс show
					activeItems.forEach(function (activeItem) {
						if (!activeItem.contains(item)) {
							activeItem.classList.remove('show');
						}
					});
					item.classList.toggle('show');
				}
			},
			_setupListeners = function () {
				// добавим к элементу аккордиона обработчик события click
				_mainElement.addEventListener('click', _actionClick);
			};

		return {
			init: function (element) {
				_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
				_items = _mainElement.querySelectorAll('.accordion-item');
				_setupListeners();
			}
		}

	}
})();


var accordion1 = accordion();
accordion1.init('#accordion');
