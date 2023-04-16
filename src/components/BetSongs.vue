<script setup lang="ts">

import {ref, inject, watch} from 'vue';
import BetSong from './BetSong.vue';
import draggable from 'vuedraggable';
import VueScrollTo from 'vue-scrollto';

const rootEl = ref(null);
const globalData = inject('globalData');

const props = defineProps({
	songs: {
		default: () => [],
		type: Array
	},
	meta: {
		default: () => {},
		type: Object
	}
});

const drag = ref(false);

const mysongs = ref(props.songs<Array>);

watch(() => props.songs, () => {
	mysongs.value = props.songs;
});

const globalStoreCandidate = (dragitem) => {
	drag.value = true;
	globalData.draggingCountry = dragitem.clone.getElementsByClassName('song__countrycode')[0].innerText;
};

const globalRemoveCandidate = () => {
	drag.value = false;
	globalData.draggingCountry = '';
};

const scrollUp = () => {
	const scroller = rootEl.value.getElementsByClassName('songs__scroller')[0];
	const firstsong = rootEl.value.getElementsByClassName('songs__song')[0];
	const offset = scroller.scrollTop;
	VueScrollTo.scrollTo(firstsong, 300, {
		container: scroller,
		offset: offset - 200
	});
};

const scrollDown = () => {
	const scroller = rootEl.value.getElementsByClassName('songs__scroller')[0];
	const firstsong = rootEl.value.getElementsByClassName('songs__song')[0];
	const offset = scroller.scrollTop;
	VueScrollTo.scrollTo(firstsong, 300, {
		container: scroller,
		offset: offset + 200
	});
};

const changeSongs = () => {
	console.log('changed');
};

</script>

<template>
	<div 
		class="songs" 
		ref="rootEl"
	>
		<h2 
			class="songs__headline" 
			v-if="!meta.bettingLocked"
		>
			Participants: {{ meta.showtype }}
		</h2>

		<h2 
			class="songs__headline" 
			v-if="meta.bettingLocked && !meta.finished"
		>
			Voting in progress …
		</h2>

		<h2 
			class="songs__headline" 
			v-if="meta.finished"
		>
			Results: {{ meta.showtype }}
		</h2>

		<div class="songs__scroller">
			<draggable 
				@update="changeSongs"
				v-model="mysongs" 
				@start="globalStoreCandidate" 
				@end="globalRemoveCandidate" 
				:sort="false" 
				tag="ul" 
				:group="{ name: 'songs', pull: 'clone', put: false }"
				animation="300" 
				class="songs__list"
				:component-data="{
					tag: 'ul',
					type: 'transition-group',
					name: 'flip-list'
				}"
				item-key="country"
			>
				<template #item="{element, index}">
					<BetSong 
						:index="index"
						:song="element" 
						:locked="meta.bettingLocked" 
						:finished="meta.finished"
					/>
				</template>
			</draggable>
		</div>
		<div class="songs__scrollers scrollers">
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
	</div>
</template>

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
