<template>
	<div class="songs">
		<h2 class="songs__headline" v-if="!meta.bettingLocked">Participants: {{ meta.showtype }}</h2>
		<h2 class="songs__headline" v-if="meta.bettingLocked && !meta.finished">Voting in progress …</h2>
		<h2 class="songs__headline" v-if="meta.finished">Results: {{ meta.showtype }}</h2>
		<div class="songs__scroller">
			<draggable @change="log" v-bind="songs" handle=".song" @start="globalStoreCandidate" @end="globalRemoveCandidate" :sort="false" tag="ul" :group="{ name: 'songs', pull: 'clone', put: false }" animation="300" class="songs__list">
				<transition-group name="flip-list">
					<bet-song v-for="(song, index) in songs" :key="song.country" :index="index" :song="song" :locked="meta.bettingLocked" :finished="meta.finished"></bet-song>
			</transition-group>
			</draggable>
		</div>
		<div class="songs__scrollers scrollers">
			<button class="scrollers__button scrollers__button--up" @click="scrollUp">hoch</button>
			<button class="scrollers__button scrollers__button--down" @click="scrollDown">runter</button>
		</div>
	</div>
</template>

<script>
import Song from './Song.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import VueScrollTo from 'vue-scrollto';

export default {
	name: 'songs',
	components: {
		draggable: VueDraggableNext,
		'bet-song': Song
	},
	props: {
		songs: {
			type: Array
		},
		meta: {
			type: Object
		}

	},
	methods: {
		globalStoreCandidate(dragitem) {
			// global storage :-( maybe use vuex later, seems over-engineered, though
			this.$root.$data.draggingCountry = dragitem.clone.getElementsByClassName('song__countrycode')[0].innerText;
		},
		globalRemoveCandidate() {
			this.$root.$data.draggingCountry = '';
		},
		scrollUp() {
			var scroller = this.$el.getElementsByClassName('songs__scroller')[0];
			var firstsong = this.$el.getElementsByClassName('songs__song')[0];
			var offset = scroller.scrollTop;
			VueScrollTo.scrollTo(firstsong, 300, {
				container: scroller,
				offset: offset - 200
			});
		},
		scrollDown() {
			var scroller = this.$el.getElementsByClassName('songs__scroller')[0];
			var firstsong = this.$el.getElementsByClassName('songs__song')[0];
			var offset = scroller.scrollTop;
			VueScrollTo.scrollTo(firstsong, 300, {
				container: scroller,
				offset: offset + 200
			});
		},
		log(event) {
			console.log(event)
		},
	}
}
</script>

<style lang="scss">
.songs {
	position: relative;
	margin: 1rem 0 0rem 1rem;
	width: 320px;
	@media only screen and (max-width: 550px) {
		width: 45vw;
	}
	&__headline {
		color: #fff;
		font-weight: 700;
		white-space: nowrap;
		width: 100%;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}
	.flip-list-move {
		transition: transform .7s;
	}
	&__scroller {
		margin-top: .5rem;
		height: calc(100vh - 10rem);
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	&__list {
		margin-right: .5rem;
		@media only screen and (min-width: 550px) {
			margin-right: 1rem;
		}
	}
}

</style>
