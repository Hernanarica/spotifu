window.addEventListener('DOMContentLoaded', () => {
	let list2 = document.querySelector('.playlist-list[aria-labelledby="region-2"] .playlist-list__container');
	let list3 = document.querySelector('.playlist-list[aria-labelledby="region-3"] .playlist-list__container');
	let list4 = document.querySelector('.playlist-list[aria-labelledby="region-4"] .playlist-list__container');

	insertData(list2);
	insertData(list3);
	insertData(list4);

	setTimeout(() => {
		let listAll = document.querySelectorAll('.playlist-list .playlist-list__container > .playlist-a');
		listAll.forEach(music => {
			getData(music);
		});
	}, 500);
});

function getData(element) {
	element.addEventListener('click', e => {
		let musicId       = parseInt(e.currentTarget.dataset.music);
		let pagePrinciple = document.querySelector('.page-block__one');
		let pageSecondary = document.querySelector('.page-block__two');

		fetch('src/assets/API/spotify.json').then((res) => res.json()).then((data) => {
			let currentMusic = data.filter(item => item.id === musicId);
			console.log(currentMusic);
			pagePrinciple.classList.add('fade-out');
			setTimeout(() => {
				pagePrinciple.style.display = 'none';
				pageSecondary.style.display = 'block';
				pageSecondary.classList.add('fade-in');
			}, 350);
		});
	});
}

function insertData(element) {
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
