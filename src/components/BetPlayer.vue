<script setup lang="ts">

import {ref, computed, watch} from 'vue';
import BetSong from './BetSong.vue';
import draggable from 'zhyswan-vuedraggable';
import VueScrollTo from 'vue-scrollto';

import type {Player, Song, MetaData} from '../@types/livbet';

const emit = defineEmits(['deletePlayer', 'renamePlayer', 'changedRanking']);

const props = defineProps<{
	player: Player,
	songs: Song[],
	meta: MetaData,
	order: number
}>();

/* ----------------------------- Player */

const playerName = ref(props.player.name);

const deletePlayer = () => {
	emit('deletePlayer', props.order);
};

const renamePlayer = () => {
	emit('renamePlayer', {index: props.order, name: playerName.value});
};

/* ----------------------------- Ranking */

const ranking = ref<Song[]>(props.player.ranking);

const deleteSong = (country: string) => {
	ranking.value = ranking.value.filter(s => s.country !== country);
};

watch(() => ranking.value, () => {
	emit('changedRanking', {index: props.order, ranking: ranking.value});
});

const checkForDuplicates = (_from: object, _to: object, songEl: HTMLLIElement) => {
	return ranking.value.filter((s) => {
		const draggingCountry: HTMLSpanElement | null = songEl.querySelector('.song__countrycode');
		if (!draggingCountry) return false;
		if (s.country === draggingCountry.innerHTML) return true;
	}).length === 0;
};

const importSongs = () => {
	props.songs.forEach((original) => {
		let importsong = true;
		ranking.value.forEach((mysong) => {
			if (original.country === mysong.country) {
				importsong = false;
			}
		});
		if (importsong) {
			ranking.value.push(original);
		}
	});
	ranking.value = [...ranking.value];
};

const el = ref<HTMLElement | null>(null); // DOM element

const scrollUp = () => {
	const scroller = el.value?.getElementsByClassName('player__scroller')[0];
	const firstsong = el.value?.getElementsByClassName('songs__song')[0];
	const offset = scroller?.scrollTop;
	VueScrollTo.scrollTo(firstsong, 300, {
		container: scroller,
		offset: offset ? offset - 200 : -200
	});
};

const scrollDown = () => {
	const scroller = el.value?.getElementsByClassName('player__scroller')[0];
	const firstsong = el.value?.getElementsByClassName('songs__song')[0];
	const offset = scroller?.scrollTop;
	VueScrollTo.scrollTo(firstsong, 300, {
		container: scroller,
		offset: offset ? offset + 200 : 200
	});
};

const score = computed(() => {
	if (props.player.ranking.length !== props.songs.length) {
		return 0;
	}
	let rankDiff = 0;
	props.songs.forEach((song, i) => {
		props.player.ranking.forEach((songGuessed, j) => {
			if (song.country === songGuessed.country) {
				rankDiff += Math.abs(i - j);
			}
		});
	});
	return 1000 - rankDiff;
});

</script>

<template>
	<article 
		class="players__player player" 
		ref="el"
	>
		<header class="player__header">
			<input 
				class="player__name" 
				v-model="playerName"
				@change="renamePlayer"
			>

			<div 
				title="Completed X of Y participants" 
				v-if="!meta.bettingLocked || ranking.length !== songs.length" 
				class="player__complete" 
				:class="{ 'player__complete--yes': (ranking.length === songs.length)}"
			>
				{{ player.ranking.length }}/{{ songs.length }}
			</div>

			<div 
				class="player__score" 
				title="Player’s score. Maximum is 1.000" 
				v-if="meta.bettingLocked"
			>
				{{ score }}
			</div>

			<button 
				v-if="!meta.bettingLocked" 
				class="player__button player__button--import" 
				@click="importSongs" 
				title="Copy songlist"
			>
				=
			</button>

			<button 
				v-if="!meta.bettingLocked" 
				class="player__button player__button--delete" 
				@click="deletePlayer" 
				title="Remove this player"
			>
				&times;
			</button>
		</header>

		<div class="player__scroller">
			<draggable 
				v-model="ranking"
				:group="{name: 'playerlist', put: checkForDuplicates, pull: false, revertClone: true}" 
				animation="300" 
				tag="ul" 
				class="player__songlist"
				item-key="country"
			>
				<template #item="{element, index}">
					<li>
						<BetSong
							:finished="false"
							:index="index"
							:song="element" 
							:locked="meta.bettingLocked" 
							@delete="deleteSong(element.country)"
						/>
					</li>
				</template>
			</draggable>
		</div>
		<div class="player__scrollers scrollers">
			<button 
				class="scrollers__button scrollers__button--up" 
				@click="scrollUp"
			>
				hoch
			</button>
			<button 
				class="scrollers__button scrollers__button--down" 
				@click="scrollDown"
			>
				runter
			</button>
		</div>
	</article>
</template>

<style lang="scss">

.player {
	width: 250px;
	min-width: 250px;
	@media only screen and (max-width: 550px) {
		width: 45vw;
		min-width: 45vw;
	}
	transition: all .4s;
	padding: 1rem 0 0 1rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: stretch;
	position: relative;
	
	&__header {
		position: relative;
		display: flex;
		width: calc(100% - 1rem);
		justify-content: flex-end;
	}
	&__button {
		background: #fff;
		border: none;
		display: block;
		width: 1em;
		line-height: .95;
		color: #333;
		border-radius: 50%;
		font-weight: 100;
		font-size: 1.5rem;
		cursor: pointer;
		outline: none;
		margin-left: .4rem;
		&:hover, &:focus {
			background: rgba(255,255,255,.8);
		}
	}
	&__complete {
		background: rgba(255,255,255,.1);
		color: #fff;
		font-size: .9rem;
		padding: .08em .5em;
		border-radius: 2em;
		cursor: help;
		&--yes {
			background: #0c0;
		}

	}
	&__score {
		background: #c09;
		color: #fff;
		font-size: .9rem;
		padding: .08em .5em;
		border-radius: 2em;
		cursor: help;
		margin-left: .3rem;
	}
	&__name {
		font-weight: 700;
		color: #fff;
		outline: none;
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		line-height: 1;
		width: calc(100% - 8rem);
		position: absolute;
		left: 0;
		cursor: pointer;
		&:focus {
			cursor: text;
			box-shadow: inset 0 0 0 1px rgba(255,255,255,.5);
			padding-left: .5em;
		}

	}
	&__scroller {
		margin-top: .5rem;
		height: calc(100vh - 10rem);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: stretch;
	}
	&__songlist {
		background: rgba(255,255,255,.15);
		border-radius: .2rem;
		height: 100%;
		position: relative;
		margin-right: .5rem;
		@media only screen and (min-width: 550px) {
			margin-right: 1rem;
		}
		&:empty:after {
			content: "Drag songs here!";
			display: block;
			position: absolute;
			top: 20vh;
			left: 20%;
			right: 20%;
			color: rgba(255,255,255,.5);
			font-weight: 100;
			font-size: 2rem;
			text-align: center;

		}
	}
	&__scrollers {
		left: 1rem;
	}

}

</style>
