<template>
	<li class="songs__song song" :class="{ 'song--locked': locked }">
		<div class="song__country">
			<img class="song__flag" v-bind:src="publicPath+'flags/' + song.country + '.svg'" width="30" height="20" :alt="'Flag of' + countrylabels[song.country]" :title="countrylabels[song.country]" />
			<span class="song__countrycode" :title="countrylabels[song.country]">{{ song.country }}</span>
		</div>
		<h3 class="song__title">{{ song.title }} <span class="song__points" v-if="locked">{{ song.points }}</span></h3>
		<div class="song__artist">{{ song.artist }}</div>
		<div class="song__rank" :class="{ 'song__rank--locked': locked }">{{ index + 1 }}</div>
		<button class="song__delete" v-if="!locked" @click="deleteSong" title="Remove song">&times;</button>
	</li>
</template>

<script>
export default {
	name: 'song',
	props: {
		finished: {
			type: Boolean
		},
		locked: {
			type: Boolean
		},
		song: {
			type: Object
		},
		index: {
			type: Number
		}
	},
	methods: {
		deleteSong() {
			this.$emit('delete');
		},
	},
	data () {
		return {
			publicPath: '/',
			countrylabels: {
				"ALB": "Albania",
				"AND": "Andorra",
				"ARM": "Armenia",
				"AUS": "Australia",
				"AUT": "Austria",
				"AZE": "Azerbaijan",
				"BEL": "Belgium",
				"BLR": "Belarus",
				"BOS": "Bosnia & Herzegovina",
				"BUL": "Bulgaria",
				"CRO": "Croatia",
				"CYP": "Cyprus",
				"CZE": "Czech Republic",
				"DNK": "Denmark",
				"ESP": "Spain",
				"EST": "Estonia",
				"FIN": "Finland",
				"FRA": "France",
				"GBR": "United Kingdom",
				"GEO": "Georgia",
				"DEU": "Germany",
				"GRC": "Greece",
				"HUN": "Hungary",
				"IRL": "Ireland",
				"ISL": "Iceland",
				"ISR": "Israel",
				"ITA": "Italia",
				"LET": "Latvia",
				"LTU": "Lithuania",
				"LUX": "Luxembourg",
				"MKD": "North Macedonia",
				"MLT": "Malta",
				"MNE": "Montenegro",
				"MDA": "Moldova",
				"MON": "Monaco",
				"MOR": "Morocco",
				"NLD": "The Netherlands",
				"NOR": "Norway",
				"POL": "Poland",
				"POR": "Portugal",
				"ROM": "Romania",
				"RUS": "Russia",
				"SVN": "Slovenia",
				"SMR": "San Marino",
				"SRB": "Serbia",
				"CHE": "Switzerland",
				"SVK": "Slovakia",
				"SWE": "Sweden",
				"TUR": "Turkey",
				"UKR": "Ukraine"
			}
		}
	},
}
</script>

<style lang="scss">

.song {
	position: relative;
	padding: .5rem;
	background: linear-gradient(135deg, rgba(255,255,255,.9) 0, rgba(255,255,255,.4) 100%);
	box-shadow: 0 0 1rem rgba(0,0,0,0.5);
	margin: 0 0 .5rem 0;
	border-radius: .2rem;
	cursor: e-move;
	cursor: e-resize;
	&:last-child {
		margin-bottom: 0;
	}
	&:focus, &:hover {
		background: linear-gradient(135deg, #fff 0, #aaa 100%);
	}
	&--locked {
		cursor: default!important;
		background: linear-gradient(135deg, rgba(255,255,255,.9) 0, rgba(255,255,255,.4) 100%)!important;
		pointer-events: none;

		& * {
			pointer-events: none;
			user-select: none;
		}
	}
	.player & {
		cursor: ns-resize;
	}
	.songs & .song__delete {
		display: none;
	}
	&__country {
		display: flex;
		flex-direction: column;
		float: right;
		margin: 0 0 0 .8rem;
		text-align: center;
		.player & {
			float: left;
			margin: 0 .8rem 0 0;
		}
	}
	&__flag {
		width: 36px;
		height: auto;
	}
	&__countrycode {
		&:before {
			content: '#';
		}
		display: block;
		margin-top: .1rem;
		font-size: .8rem;
		font-weight: bold;
	}
	&__title {
		font-weight: 200;
		
		text-overflow: ellipsis;
		overflow: hidden;
		width: calc(100% - 3.5rem);
		white-space: nowrap;
	}
	&__artist {
		text-overflow: ellipsis;
		overflow: hidden;
		width: calc(100% - 3.5rem);
		white-space: nowrap;
		font-weight: 400;
	}
	
	&__order {
		display: none;
	}
	&__points {
		background: rgba(0,0,0,0.3);
		color: #fff;
		font-size: .7rem;
		padding: .08em .5em;
		border-radius: 2em;
		position: relative;
		top: -.1em;
		margin-left: .2em;

		
		.player & {
			display: none;
		}
		
	}
	&__rank {
		font-weight: 100;
		position: absolute;
		top: .12rem;
		right: 3.5rem;
		letter-spacing: -.05em;
		z-index: 0;
		font-size: 3.2rem;
		line-height: 1;
		color: rgba(0,0,0,0.2);
		.player & {
			right: 1.6rem;
			&--locked {
				right: .7rem;
			}
		}

	}
	&__delete {
		background: none;
		border: none;
		font-weight: 100;
		position: absolute;
		right: .3rem;
		top: .3rem;
		line-height: .5;
		font-size: 1.7rem;
		cursor: pointer;
		outline: none;
		&:hover {
			font-weight: 400;
		}
	}
	&.sortable-ghost {
		background: none;
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
		& * {
			opacity: 0;
		}
	}



}

</style>
