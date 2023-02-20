// Подключение из node_modules
import * as noUiSlider from 'nouislider'

// Подключение стилей из scss/base/forms/range.scss
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	//! Дописанный код как в видео
	const rangeItems = document.querySelectorAll('[data-range]')
	if (rangeItems) {
		rangeItems.forEach((rangeItems) => {
			const fromValue = rangeItems.querySelector('[data-range-from]')
			const toValue = rangeItems.querySelector('[data-range-to]')
			const item = rangeItems.querySelector('[data-range-item]')
			//! UI слайдер
			// !!! преобразовать строку в число -> Number(то что нужно преобразовать)
			console.log(Math.round(Number(fromValue.value)))
			// console.dir(item)
			console.dir(rangeItems)
			noUiSlider.create(item, {
				start: [Number(fromValue.value),Number(toValue.value)], // [0,200000]
				connect: true, //! [true false] было
				tooltips: [true, true], //! активация подсказок. Скопировал с сайта (range)
				// step:1,
				format: {//!!! округляет в тултипе значение до целого значения!!!
					to: function ( value ) {
						const aw = value;
						return Math.round(aw);
					},
					from: function ( value ) {
						return value;
					}
				},
				range: {
					min: [Number(fromValue.dataset.rangeFrom)],
					max: [Number(toValue.dataset.rangeTo)],
					// min: [fromValue.value],
					// max: [toValue.value],
				},
			})
			// ! привязка значений к ползунку (скопировано с сайта и доработано)
			//! так в видео окна с диапазоном работают неправильно
			// console.dir(item) 
			// item.noUiSlider.on('update', function (values, handle) {
			// 	fromValue.value = values[handle]
			// 	toValue.value = values[handle]
			// })
			// ! переписал сам что бы работали 2 окна с диапазоном правильно
			// ! переписать что бы округляло значения!!!!
			item.noUiSlider.on('update', function (values, handle,unencoded) {
				if (handle) {
					toValue.value = Math.round(values[handle]);
				} else {
					fromValue.value = Math.round(values[handle]);
				}
		},);
		})
	}
	//!======================
	// const priceSlider = document.querySelector('#range')
	// if (priceSlider) {
	// 	let textFrom = priceSlider.getAttribute('data-from')
	// 	let textTo = priceSlider.getAttribute('data-to')
	// 	noUiSlider.create(priceSlider, {
	// 		start: 0, // [0,200000]
	// 		connect: [true, false],
	// 		range: {
	// 			min: [0],
	// 			max: [200000],
	// 		},
	// 	})
	// 	/*
	// 	const priceStart = document.getElementById('price-start');
	// 	const priceEnd = document.getElementById('price-end');
	// 	priceStart.addEventListener('change', setPriceValues);
	// 	priceEnd.addEventListener('change', setPriceValues);
	// 	*/
	// 	function setPriceValues() {
	// 		let priceStartValue
	// 		let priceEndValue
	// 		if (priceStart.value != '') {
	// 			priceStartValue = priceStart.value
	// 		}
	// 		if (priceEnd.value != '') {
	// 			priceEndValue = priceEnd.value
	// 		}
	// 		priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	// 	}
	// }
}
rangeInit()
