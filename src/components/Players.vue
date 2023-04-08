<template>
	<section class="players">
		<bet-player v-for="(player, index) in players" :key="index" :player="player" :songs="songs" :meta="meta" @delete="deletePlayer(index)" player_prop.sync="player"></bet-player>
	</section>
</template>

<script>
import Player from './Player.vue';
export default {
	name: 'players',
	components: {
		'bet-player': Player
	},
	props: {
		players: {
			type: Array
		},
		songs: {
			type: Array
		},
		meta: {
			type: Object
		}
	},
	methods: {
		deletePlayer(index) {
			this.players.splice(index, 1);
		}
	}
}
</script>

<style lang="scss">
.players {
	border-left: 1px solid #aaa;
	margin: 0 0 0 .5rem;
	display: flex;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;

}

</style>
