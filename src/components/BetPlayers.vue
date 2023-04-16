<script setup lang="ts">

import BetPlayer from './BetPlayer.vue';

import type {Player, Song, MetaData} from '../@types/livbet';

const emit = defineEmits(['deletePlayer', 'renamePlayer', 'changedRanking']);

defineProps<{
	players: Player[],
	songs: Song[],
	meta: MetaData
}>();

const renamePlayer = (obj: {index: number, name: string}) => {
	emit('renamePlayer', obj);
};

const deletePlayer = (index: number) => {
	emit('deletePlayer', index);
};

const changedRanking = (obj: {index: number, name: string}) => {
	emit('changedRanking', obj);
};

</script>

<template>
	<section class="players">
		<BetPlayer 
			v-for="(player, index) in players" 
			:key="index" 
			:player="player" 
			:songs="songs" 
			:meta="meta" 
			:order="index"
			@delete-player="deletePlayer" 
			@rename-player="renamePlayer"
			@changed-ranking="changedRanking"
		/>
	</section>
</template>

<style lang="scss">
.players {
	border-left: 1px solid #aaa;
	margin: 0 0 0 .5rem;
	display: flex;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
}

</style>
