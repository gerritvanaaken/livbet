<template>
	<article class="players__player player">

		<header class="player__header">
			<input class="player__name" v-model="player.name" />
			<div title="Completed X of Y participants" v-if="!meta.bettingLocked || this.player.ranking.length !== this.songs.length" class="player__complete" :class="{ 'player__complete--yes': (this.player.ranking.length === this.songs.length)}">{{ player.ranking.length }}/{{ songs.length }}</div>
			<div class="player__score" title="Player’s score. Maximum is 1.000" v-if="meta.bettingLocked">{{ score }}</div>
			<button v-if="!meta.bettingLocked" class="player__button player__button--import" @click="importSongs" title="Copy songlist">=</button>
			<button v-if="!meta.bettingLocked" class="player__button player__button--delete" @click="deletePlayer" title="Remove this player">&times;</button>
		</header>

		<div class="player__scroller">
			<draggable v-model="player.ranking" :group="{name: 'playerlist', put: checkForDuplicates, pull: false, revertClone: true}" animation="300" tag="ul" class="player__songlist">
				<transition-group name="flip-list">
					<bet-song v-for="(song, index) in player.ranking" :song="song" :key="song.country" :index="index" :locked="meta.bettingLocked" @delete="deleteSong(index)"></bet-song>
				</transition-group>
			</draggable>
		</div>
		<div class="player__scrollers scrollers">
			<button class="scrollers__button scrollers__button--up" @click="scrollUp">hoch</button>
			<button class="scrollers__button scrollers__button--down" @click="scrollDown">runter</button>
		</div>
	</article>
</template>

<script>
import Song from './Song.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import VueScrollTo from 'vue-scrollto';

export default {
	name: 'player',
	components: {
		draggable: VueDraggableNext,
		'bet-song': Song
	},
	props: {
		songs: {
			type: Array
		},
		player: {
			type: Object
		},
		meta: {
			type: Object
		}
		
	},
	data() {
		return {
			namechange: false
		}
	},
	methods: {
		toggleNameChange() {
			if (this.namechange) {
				this.namechange = false;
			} else {
				this.namechange = true;
			}
		},
		checkForDuplicates() {
			var draggingCountry = this.$root.$data.draggingCountry;
			var output = true;
			this.player.ranking.forEach(function(song){
				if (song.country === draggingCountry) {
					output = false;
				}
			});
			return output;
		},
		deletePlayer() {
			this.$emit('delete');
		},
		deleteSong(index) {
			this.player.ranking.splice(index, 1);
		},
		importSongs() {
			var mysongs = this.player.ranking;
			this.songs.forEach(function(original) {
				var importsong = true;
				mysongs.forEach(function(mysong) {
					if (original.country === mysong.country) {
						importsong = false;
					}
				});
				if (importsong) {
					mysongs.push(original);
				}
			});
		},
		scrollUp() {
			var scroller = this.$el.getElementsByClassName('player__scroller')[0];
			var firstsong = this.$el.getElementsByClassName('songs__song')[0];
			var offset = scroller.scrollTop;
			VueScrollTo.scrollTo(firstsong, 300, {
				container: scroller,
				offset: offset - 200
			});
		},
		scrollDown() {
			var scroller = this.$el.getElementsByClassName('player__scroller')[0];
			var firstsong = this.$el.getElementsByClassName('songs__song')[0];
			var offset = scroller.scrollTop;
			VueScrollTo.scrollTo(firstsong, 300, {
			container: scroller,
				offset: offset + 200
			});
		}
	},
	computed: {
		score() {
			if (this.player.ranking.length !== this.songs.length) {
				return 0;
			}
			var rankDiff = 0;
			var v = this;
			v.songs.forEach(function(song, i){
				v.player.ranking.forEach(function(songGuessed, j) {
					if (song.country === songGuessed.country) {
						rankDiff += Math.abs(i-j);
					}
				});
				
			});
			
			return 1000 - rankDiff;
		}
	}
}

</script>

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
