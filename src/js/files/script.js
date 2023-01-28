// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

document.addEventListener('click', documentActions)

// Автоматически добавляет классы-модификаторы (.sub-menu-catalog__block_число)
// Получаю все объекты .sub-menu-catalog__block
const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block')
// Проверяю если они есть
if (menuBlocks.length) {
	// Перебираю их
	menuBlocks.forEach((menuBlock) => {
		// Получаю количество вложенных объектов, в данном случае категорий
		const menuBlockItem = menuBlock.querySelectorAll('.sub-menu-catalog__category').length
		// console.log(menuBlockItem)
		// Добавляю блоку класс sub-menu-catalog__block_количествоОбъектов
		menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItem}`)
	})
}

//documentActions будет принимать ивент
function documentActions(e) {
	const targetElement = e.target // Принимается в константу нажатый объект (делегирование)
	// console.log(e.target) // ! Подсказка
	if (targetElement.closest('[data-parent]')) {
		// Тут получаю значение data-attribute -> parent  в константу subMenu
		const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null
		// Получаю элементы у которых подходящий data-attribute с нужным ID
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`)
		// Если получил subMenu -> добавляю класс _sub-menu-open
		console.log(subMenu)
		if (subMenu) {
			// targetElement тоже должен получать класс, потому что разделено на блоки, а нужно подсветить и ссылку и конкретный блок
			// Логика меню - при клике разворачивается пункт, при клике по другому пункту 1й закрывается открывается 2й
			const activeLink = document.querySelector('._sub-menu-active')
			const activeBlock = document.querySelector('._sub-menu-open')
			console.log(activeBlock)
			
			// если есть activeLink и он не равен targetElement, тогда принудительно удаляем _sub-menu-active
			if (activeLink && activeLink !== targetElement) {
				activeLink.classList.remove('_sub-menu-active')
				activeBlock.classList.remove('_sub-menu-open')
				document.documentElement.classList.remove('sub-menu-open')
			}
			// ^ ТУТ!!!--------------------------
			// if (activeBlock && activeBlock !== targetElement) {
			// 	activeLink.classList.remove('_sub-menu-active')
			// 	activeBlock.classList.remove('_sub-menu-open')
			// 	document.documentElement.classList.remove('sub-menu-open')
			// }

			document.documentElement.classList.toggle('sub-menu-open')
			targetElement.classList.toggle('_sub-menu-active')
			subMenu.classList.toggle('_sub-menu-open')
			// Проверка есть ли у нажатого элемента нужный класс (использовать метод contains)
			// if (targetElement.classList.contains('_sub-menu-active')) {(Просто пример)}
		} else {
			console.log('Нет такого подменю')
		}
		//Метод preventDefault () интерфейса Event сообщает User agent, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно.
		e.preventDefault()
	}

	//~a Отлавливаю клик на меню "Каталог товаров" и добавляю класс (catalog-open)-без точки. (отлавливаю БЭМ модификатор (можно и что то другое))
	if (targetElement.closest('.menu-top-header__link_catalog')) {
		document.documentElement.classList.add('catalog-open') //function.js 5, 14 строка
		e.preventDefault()
	}

	//~a обрабатываю кнопку "назад" бургер меню
	if (targetElement.closest('.menu-catalog__back')) {
		//~a при закрытии 1го уровня нужно закрывать и другие уровни
		document.documentElement.classList.remove('catalog-open')

		//~!!! с начала нужно проверить существует ли в блоке класс, а только лиш потом удалять у него класс
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('._sub-menu-active') : null
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('._sub-menu-open') : null
		e.preventDefault()
	}

	if (targetElement.closest('.sub-menu-catalog__back')) {
		document.documentElement.classList.remove('sub-menu-open')
		console.log(e.target) // ! Подсказка
		//~!!! с начала нужно проверить существует ли в блоке класс, а только лиш потом удалять у него класс
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('._sub-menu-active') : null
		// ^ TO-DO  нужны исправления -> после первого захода подменю "Каталог ножей" класс ._sub-menu-open не удаляется (фикс закомментирован выше)
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('._sub-menu-open') : 
		e.preventDefault()
	}
}
