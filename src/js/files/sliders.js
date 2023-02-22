/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Parallax, Autoplay, Thumbs } from 'swiper'
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
//!!!! добавил  "_" _swiper.scss (файлы тоже переименовал в base и в libs)
import '../../scss/base/_swiper.scss'
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
// !!! в самом шаблоне этой функции НЕТ! пришлось дописывать (без нее не работает observer и неправильно располагает слайды (по вертикале, а не по горизонтали))
function bildSliders() {
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)')
	if (sliders) {
		sliders.forEach((slider) => {
			slider.parentElement.classList.add('swiper')
			slider.classList.add('swiper-wrapper')
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide')
			}
		})
	}
}

// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders()

	// Перечень слайдеров
	// Проверяем, есть ли слайдер на странице
	// ! если нужно добавить еще один слайдел с другим функционалом - нужно скопировать и вставить ниже этот if ()
	if (document.querySelector('.main-block__slider')) {
		// Указываем класс нужного слайдера
		// Создаем слайдер
		new Swiper('.main-block__slider', {
			// Указываем класс нужного слайдера Pagination, Navigation или другие.
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Parallax, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1, // ! сколько изначально выведено объектов!!! если в брейкпоинтах будет стоять другое число то тут не сработает
			spaceBetween: 50, // !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			parallax: true,
			// autoHeight: true, //! закомментировал как в видео
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,//! смена слайдов по кругу (если слайд 1 он добавит еще 2)//!!! (Раскоментировать как в видео)
			//preloadImages: false,
			//lazy: true,

			// Эффекты
			// effect: 'fade',
			//! автоматическая смена слайда //!!! Раскоментировать
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// Пагинация

			pagination: {
				// прописываю сюда класс из Html
				el: '.controll-main-block__dotts',
				clickable: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				//! Кастомная фракция (счетчик слайдов)
				init: function (swiper) {
					//получаю объект
					const allSlides = document.querySelector('.fraction-controll__all')

					//! если включить loop то slider добавляет классы дупликаты (.swiper-slide-duplicate) по этому нужно брать количество объектов по классу (.slide-main-block) без учета класса дупликата (строю запрос :not(.swiper-slide-duplicate)!!!). И этот массив использую для получение общего количества
					const allSlidesItem = document.querySelectorAll('.slide-main-block:not(.swiper-slide-duplicate)')
					allSlides.innerHTML = allSlidesItem.length < 10 ? `0${allSlidesItem.length}` : allSlidesItem.length

					//! смотрю что находится в swiper
					// console.log(swiper)
					//! swiper.slides.length -> консоль хрома->Swiper->sliders<-(массив из моих слайдов)
					// allSlides.innerHTML = swiper.slides.length < 10 ? `0${swiper.slides.length}` : swiper.slides.length
					// console.log(allSlides)
				},
				slideChange: function (swiper) {
					//получаю объект
					const currentSlide = document.querySelector('.fraction-controll__current')
					//! смотрю что находится в swiper
					// console.log(swiper)
					//! swiper.slides.length -> консоль хрома->Swiper->sliders<-(массив из моих слайдов)
					currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1
				},
			},
		})
	}

	//! еще один слайдер
	if (document.querySelector('.products-slider')) {
		// Указываем класс нужного слайдера
		// Создаем слайдер
		new Swiper('.products-slider__slider', {
			// Указываем класс нужного слайдера Pagination, Navigation или другие.
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 4, // ! сколько изначально выведено объектов !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			spaceBetween: 30, // ! расстояние между объектами !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			parallax: true,
			// autoHeight: true, //! закомментировал как в видео
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true, //! (если слайд 1 он добавит еще 2) смена слайдов по кругу
			//! автоматическая смена слайда //!!! Раскоментировать
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			//preloadImages: false,
			//lazy: true,

			// Эффекты
			// effect: 'fade',

			// Пагинация

			pagination: {
				// прописываю сюда класс из Html
				el: '.products-slider__dotts',
				clickable: true,
				dynamicBullets: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			// ! при разных разрешениях меняю количество слайдов ка экране
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
					// autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1370: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},

			// События
			on: {},
		})
	}

	//! еще один слайдер
	if (document.querySelector('.products-new')) {
		// Указываем класс нужного слайдера
		// Создаем слайдер
		new Swiper('.products-new__slider', {
			// Указываем класс нужного слайдера Pagination, Navigation или другие.
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 3, // ! сколько изначально выведено объектов !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			spaceBetween: 30, // ! расстояние между объектами !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			parallax: true,
			// autoHeight: true, //! закомментировал как в видео
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true, //! (если слайд 1 он добавит еще 2) смена слайдов по кругу
			//! автоматическая смена слайда //!!! Раскоментировать
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			//preloadImages: false,
			//lazy: true,

			// Эффекты
			// effect: 'fade',

			// Пагинация

			pagination: {
				// прописываю сюда класс из Html
				el: '.products-new__dotts',
				clickable: true,
				dynamicBullets: true,
			},

			// Скроллбар
			/*
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			// ! при разных разрешениях меняю количество слайдов ка экране
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
					// autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1330: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},

			// События
			on: {},
		})
	}

	//! Тут слайдера 1й для большой карточки товара 2й для миниатюр(Thumbs) (индивидуальной карточки продукта (для миниатюр внизу))
	//! их нужно объединить (в 1м - const thumbsSwiper = new Swiper(...) во 2м - в параметрах дописать - thumbs:{swiper:thumbsSwiper	},)
	// ! ГЛАВНОЕ НЕ ОБЪЕБАТЬСЯ С КЛАССАМИ !!!!!!!!!!!!!!!!
	if (document.querySelector('.thumbs-images')) {
		// Указываем класс нужного слайдера
		// Создаем слайдер
		const thumbsSwiper = new Swiper('.thumbs-images', {
			// Указываем класс нужного слайдера Pagination, Navigation или другие.
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay, Thumbs],
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 4, // ! сколько изначально выведено объектов !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			spaceBetween: 16, // ! расстояние между объектами !!! если в брейкпоинтах будет стоять другое число то тут не сработае
			parallax: true,
			// autoHeight: true, //! закомментировал как в видео
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true, //! (если слайд 1 он добавит еще 2) смена слайдов по кругу
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false,
			// },

			// thumbs:{
			// 	swiper:thumbsSwiper
			// },

			//preloadImages: false,
			//lazy: true,

			// Эффекты
			// effect: 'fade',

			// Пагинация

			// pagination: {
			// 	// прописываю сюда класс из Html
			// 	el: '.products-new__dotts',
			// 	clickable: true,
			// 	dynamicBullets: true,
			// },

			// Скроллбар
			/*
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
					},
					*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			// ! при разных разрешениях меняю количество слайдов ка экране
			breakpoints: {
				// 320: {//~a
				// 	slidesPerView: 1,
				// 	spaceBetween: 10,
				// 	// autoHeight: true,
				// },
				// 768: {
				// 	slidesPerView: 2,
				// 	spaceBetween: 16,
				// },
				992: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				1330: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
			},

			// События
			on: {},
		})
		new Swiper('.images-product__slider', {
			// Указываем класс нужного слайдера Pagination, Navigation или другие.
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1, // ! сколько изначально выведено объектов!!! если в брейкпоинтах будет стоять другое число то тут не сработает
			spaceBetween: 30, // ! расстояние между объектами !!! если в брейкпоинтах будет стоять другое число то тут не сработает
			// parallax: true,
			// autoHeight: true, //! закомментировал как в видео
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true, //! (если слайд 1 он добавит еще 2) смена слайдов по кругу
			//! автоматическая смена слайда //!!! Раскоментировать
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			thumbs: {
				swiper: thumbsSwiper,
			},
			//preloadImages: false,
			//lazy: true,

			// Эффекты
			// effect: 'fade',

			// Пагинация

			pagination: {
				// прописываю сюда класс из Html
				el: '.products-new__dotts',
				clickable: true,
				dynamicBullets: true,
			},

			// Скроллбар
			/*
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
					},
					*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			// // ! при разных разрешениях меняю количество слайдов ка экране
			// breakpoints: {
			// 	320: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 10,
			// 		// autoHeight: true,
			// 	},
			// 	768: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 20,
			// 	},
			// 	992: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 20,
			// 	},
			// 	1330: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 30,
			// 	},
			// },

			// События
			on: {},
		})
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders()

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index]
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			})
			sliderScroll.scrollbar.updateSize()
		}
	}
}

window.addEventListener('load', function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
})
