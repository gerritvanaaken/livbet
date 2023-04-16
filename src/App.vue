<script setup lang="ts">

import {ref, onMounted} from 'vue';
import BetSongs from './components/BetSongs.vue';
import BetPlayers from './components/BetPlayers.vue';
import BetReadme from './components/BetReadme.vue';

import type {SongData} from './@types/livbet';

/* ----------------------------- Songs */

const songdata = ref<SongData>({
	meta: {
		formatversion: '1',
		day: '1900-01-01',
		showtype: 'Grand Final',
		bettingLocked: false,
		finished: false
	},
	songs: []
});


const fetchSongs = async () => {
	//const songurl = 'songs.json';
	const songurl = 'https://esc.praegnanz.de/songs.json';

	const response = await fetch(songurl + '?v=' + Date.now());
	const data = await response.json();

	if (data.meta.bettingLocked) {
		data.songs.sort(function (a, b) {
			return b.points - a.points;
		});
	} else {
		data.songs.sort(function (a, b) {
			return a.order - b.order;
		});
	}
	songdata.value = data;
};

fetchSongs();

setInterval(() => {
	fetchSongs();
}, 3000);	

/* ----------------------------- Players */

const players = ref([]);

const storePlayers = () => {
	localStorage.setItem('players', JSON.stringify(players.value));
};

const deletePlayer = (index) => {
	players.value = players.value.filter((p, i) => i !== index);
	storePlayers();
};

const renamePlayer = (obj) => {
	players.value[obj.index].name = obj.name;
	storePlayers();
};

const changedRanking = (obj) => {
	players.value[obj.index].ranking = obj.ranking;
	storePlayers();
};

const addPlayer = () => {
	players.value.push({
		name: 'Player ' + (players.value.length + 1),
		ranking: []
	});
	storePlayers();
};

onMounted(() => {
	if (localStorage.getItem('players')) {
		players.value = JSON.parse(localStorage.getItem('players'));
	}
});

/* ----------------------------- Readme */

const readme = ref(false);
const toggleReadme = () => {
	readme.value = !readme.value;
};

</script>

<template>
	<div 
		id="app" 
		class="app"
	>
		<header class="app__header">
			<h1 class="app__headline">
				#livbet
			</h1>
			
			<div class="app__phases">
				<div 
					class="app__phase app__phase--1" 
					:class="{ 'app__phase--active': !songdata.meta.bettingLocked }"
				>
					Phase 1: <small class="app__phaseremark">Guessing</small>
				</div>

				<div 
					class="app__phase app__phase--2" 
					:class="{ 'app__phase--active': songdata.meta.bettingLocked }"
				>
					Phase 2: <small class="app__phaseremark">Resulting</small>
				</div>
			</div>

			<button 
				v-if="!songdata.meta.bettingLocked" 
				class="app__button app__button--add" 
				@click="addPlayer()"
			>
				Add New Player
			</button>
			
			<button 
				class="app__button app__button--readme" 
				@click="toggleReadme()"
			>
				How To / Legal
			</button>

			<div class="app__subline">
				The betting game for Liverpool 2023
			</div>
		</header>
		<div class="app__betarea">
			<BetSongs 
				:songs="songdata.songs" 
				:meta="songdata.meta" 
			/>
			<BetPlayers 
				:key="players.length"
				:players="players" 
				:songs="songdata.songs" 
				:meta="songdata.meta"
				@delete-player="deletePlayer"
				@rename-player="renamePlayer"
				@changed-ranking="changedRanking"
			/>
		</div>
		<transition name="fade">
			<BetReadme v-if="readme" />
		</transition>
	</div>
</template>

<style lang="scss">

@font-face {
	font-family: 'robotoslab';
	src: url('./assets/fonts/RobotoSlab-Thin-webfont.woff');
	font-weight: 100;
	font-style: normal;
}
@font-face {
	font-family: 'robotoslab';
	src: url('./assets/fonts/RobotoSlab-Light-webfont.woff');
	font-weight: 200;
	font-style: normal;
}
@font-face {
	font-family: 'robotoslab';
	src: url('./assets/fonts/RobotoSlab-Regular-webfont.woff');
	font-weight: 400;
	font-style: normal;
}
@font-face {
	font-family: 'robotoslab';
	src: url('./assets/fonts/RobotoSlab-Bold-webfont.woff');
	font-weight: 700;
	font-style: normal;
}

* {
	margin: 0;
	padding: 0;
	font-size: 1em;
	font-family: inherit;
	font-weight: normal;
	list-style: none;
}

body, html {
	overflow: hidden;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}

body {
	background: #346;
}

.app {
	font-family: 'robotoslab', sans-serif;
	display: flex;
	flex-direction: column;
	height: 100vh;
	&__header {
		padding: .5rem 1rem;
		background: rgba(0,0,0,0.5);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: calc(100% - 2rem);
	}
	&__headline {
		text-transform: uppercase;
		font-weight: 100;
		letter-spacing: .1em;
		font-size: 2rem;
	}
	&__subline {
		text-transform: uppercase;
		letter-spacing: .1em;
		@media only screen and (max-width: 900px) {
			display: none;
		}
	}
	&__phases {
		@media only screen and (max-width: 900px) {
			display: none;
		}
	}
	&__phase {
		line-height: 1.2;
		font-size: .7rem;
		letter-spacing: .06em;
		color: rgba(255,255,255,.5);
		&--active {
			color: #fff;
			text-indent: -1.38ch;
			&:before {
				content: "» ";
			}
		}
	}
	&__button {
		background: none;
		border: 1px solid #fff;
		border-radius: .3rem;
		color: #fff;
		font-weight: 200;
		padding: .2em 1em;
		cursor: pointer;
		outline: none;
		@media only screen and (max-width: 400px) {
			width: 3.2rem;
			overflow: hidden;
			white-space: nowrap;
		}
		&--add {
			&:before {
				content: '+';
				background: #fff;
				color: #333;
				text-align: center;
				width: 1em;
				line-height: 1;
				margin-right: .5em;
				border-radius: 50%;
				display: inline-block;
				@media only screen and (max-width: 400px) {
					margin-right: 3rem;
				}
			}
		}
		&:focus, &:hover {
			background: rgba(255,255,255,.2);
		}
	}
	&__betarea {
		height: 100%;
		display: flex;
		align-items: stretch;
	}

}

.scrollers {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 1rem;
	@media only screen and (max-width: 550px) {
		right: .5rem;
	}
	background: rgba(0,0,0,0.5);
	padding: .5rem;
	text-align: center;
	border-top-left-radius: .3rem;
	border-top-right-radius: .3rem;
	&__button {
		position: relative;
		-webkit-appearance: none;
		background: none;
		border: 1px solid #fff;
		display: inline-block;
		padding: .5rem;
		margin: 0 .2rem;
		color: #fff;
		border-radius: .2rem;
		line-height: 1;
		cursor: pointer;
		text-indent: -10em;
		overflow: hidden;
		width: 2.5rem;
		&--up {
			transform: rotate(180deg);
		}
		&:focus, &:hover {
			outline: none;
			background: rgba(255,255,255,.2);
		}
		&:before, &:after {
			content: '';
			width: .75rem;
			height: 1px;
			background: #fff;
			transform: rotate(45deg);
			position: absolute;
			top: 1rem;
			left: .55rem;
		}
		&:after {
			right: .55rem;
			left: auto;
			transform: rotate(-45deg);
		}
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
