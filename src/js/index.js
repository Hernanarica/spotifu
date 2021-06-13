window.addEventListener('DOMContentLoaded', () => {
	let list1 = document.querySelector('.playlist-list[aria-labelledby="region-1"] .playlist-list__container');
	let list2 = document.querySelector('.playlist-list[aria-labelledby="region-2"] .playlist-list__container');
	let list3 = document.querySelector('.playlist-list[aria-labelledby="region-3"] .playlist-list__container');
	let list4 = document.querySelector('.playlist-list[aria-labelledby="region-4"] .playlist-list__container');

	insertDataListB(list1);
	insertDataListA(list2);
	insertDataListA(list3);
	insertDataListA(list4);

	setTimeout(() => {
		let listAllB = document.querySelectorAll('.playlist-list .playlist-list__container > .playlist-b');
		listAllB.forEach(music => {
			getDataB(music);
		});

		let listAllA = document.querySelectorAll('.playlist-list .playlist-list__container > .playlist-a');
		listAllA.forEach(music => {
			getDataA(music);
		});
	}, 500);
});

function getDataA(element) {
	element.addEventListener('click', e => {
		console.log(e.currentTarget);
		let musicId      = parseInt(e.currentTarget.dataset.music);
		let $page        = document.querySelector('.page');
		let $page2       = document.querySelector('.page-2');
		let $page3       = document.querySelector('.page-3');
		let $page2Header = document.querySelector('.layout__main .page-2 .header');
		let $page2Title  = document.querySelector('.page-2__title');
		let tableBody    = document.querySelector('.table tbody');

		fetch('src/assets/API/spotify.json').then((res) => res.json()).then((data) => {
			let currentMusic = data.filter(item => item.id === musicId);

			// Insertamos la playlist en la tabla
			for (let i = 0; i < 10; i++) {
				insertDataTable(tableBody, currentMusic);
			}

			// Aplicamos la animación
			$page.classList.add('fade-out');

			setTimeout(() => {
				$page.style.display          = 'none';
				$page2Header.style.cssText   = 'backdrop-filter: blur(0);';
				$page2.style.backgroundImage = `url(src/assets/imgs/${ currentMusic[0].poster })`;
				$page2Title.innerText        = `${ currentMusic[0].artist }`;
				$page2.style.display         = 'block';

				$page2.classList.add('fade-in');
			}, 350);
		});
	});
}

function getDataB(element) {
	element.addEventListener('click', e => {
		let musicId      = parseInt(e.currentTarget.dataset.music);
		let $page        = document.querySelector('.page');
		let $page3       = document.querySelector('.page-3');
		let $page3Header = document.querySelector('.layout__main .page-3 .header');
		let $page3Title  = document.querySelector('.page-3__title');
		let tableBody    = document.querySelector('.page-3 .table tbody');

		fetch('src/assets/API/spotify.json').then((res) => res.json()).then((data) => {
			let currentMusic = data.filter(item => item.id === musicId);

			// Insertamos la playlist en la tabla
			for (let i = 0; i < 10; i++) {
				insertDataTable(tableBody, currentMusic);
			}

			// Aplicamos la animación
			$page.classList.add('fade-out');

			setTimeout(() => {
				$page.style.display          = 'none';
				$page3Header.style.cssText   = 'backdrop-filter: blur(0);';
				$page3.style.backgroundColor = '#000000';
				$page3Title.innerText        = `${ currentMusic[0].artist }`;
				$page3.style.display         = 'block';

				$page3.classList.add('fade-in');
			}, 350);
		});
	});
}

function insertDataListA(element) {
	fetch('src/assets/API/spotify.json').then((res) => res.json()).then((data) => {
		data.forEach(item => {
			element.innerHTML += `
				<div class="playlist-a" data-music="${ item.id }">
					<div class="playlist-a__cover">
						<img src="./src/assets/imgs/${ item.image }" alt="carátula de la playlist" width="150" height="150">
						<button class="btn-icon btn-icon--primary" aria-label="reproducir" title="reproducir">
							<i class="btn-icon__play" aria-hidden="true"></i>
						</button>
					</div>
					<h3 class="playlist-a__title">${ item.title }</h3>
					<h4 class="playlist-a__description">${ item.artist }</h4>
				</div>
			`;
		});
	});
}

function insertDataListB(element) {
	fetch('src/assets/API/spotify.json').then((res) => res.json()).then((data) => {
		data.forEach(item => {
			element.innerHTML += `	
				<div class="playlist-b" data-music="${ item.id }">
					<div class="playlist-b__cover">
						<img src="./src/assets/imgs/${ item.image }" alt="carátula de la playlist" width="76" height="76">
					</div>
					<div class="playlist-b__details">
						<h3 class="playlist-b__title">${ item.artist }</h3>
						<div class="playlist-b__control">
							<button class="btn-icon btn-icon--primary" aria-label="reproducir la lista de reproducción Naruto Openings & Endings"
							        title="reproducir la lista de reproducción Naruto Openings & Endings">
								<i class="btn-icon__play" aria-hidden="true"></i>
							</button>
						</div>
					</div>
				</div>
			`;
		});
	});
}

function insertDataTable(element, data) {
	data.forEach(item => {
		element.innerHTML += `
				<tr>
					<td><i class="btn-icon btn-icon__play link"></i></td>
					<td><i class="btn-icon btn-icon__heart link"></i></td>
					<td><a href="#" class="list__link link">${ item.title }</a></td>
					<td><a href="#" class="list__link link">${ item.artist }</a></td>
					<td><a href="#" class="list__link link">${ item.title }</a></td>
					<td>${ item.startDate }</td>
					<td>${ item.duration }</td>
				</tr>
			`;
	});
}
