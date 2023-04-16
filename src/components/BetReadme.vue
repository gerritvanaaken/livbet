<template>
	<div class="readme">
		<section class="readme__section">
			<h2>What is #livbet about?</h2>
			<p>Watch the Eurovision Song Contest with your friends and guess the ranking of the Grand Final in Liverpool. This little website helps you sorting your guesses and automatically calculates your matching score. Who’s going to win?</p>
			<h3>Recommended setup</h3>
			<p>#livbet is not a real online game, so your friends should be in the same room (party time!) and use the same device, maybe an iPad or a lightweight notebook. You should be at least two players. There’s no real limit on the number of players, but more than six or seven players at one device will be difficult to handle.</p>
			<p>I recommend to let each player rearrange his or her ranking list after each song performance and – of course – during the showact before the phone voting stops.</p>

			<h3>The two phases</h3>

			<ul>
				<li><strong>Phase 1</strong> starts while the artists do their performances on the Eurovision stage. In this phase you can add new players, change their names, drag songs from the participants list to the guessing lists and drag the songs around, so they match your guessed order. Everything can be changed and rearranged, until the official result are being announced.</li>

				<li><strong>Phase 2</strong> begins exactly when the first votes from the first country are being broadcasted. The game is then locked and you can watch how the participiants list updates itself dynamically as the votes rush in country by country (In fact, I will be personally live-transferring the given points to the #livbet web server). Your score will automatically get updated, too, so you can see immediately how good your guessing was!</li>
			</ul>

			<h3>And then what?</h3>

			<p>That’s about it. I made this just for fun! Hope it helps ESC enthusiasts to simplify their “betting experience”. Have a great Eurovision party!</p>
		</section>

		<section class="readme__section">
			<h2>Imprint</h2>

			<p>This website is a non-commercial hobby project by Gerrit van Aaken, Eichhornstraße 5, 97070 Würzburg, Germany</p>

			<ul>
				<li><a href="mailto:gerrit@praegnanz.de">gerrit@praegnanz.de</a></li>
				<li><a href="https://praegnanz.de">My Blog</a></li>
				<li><a href="https://github.com/gerritvanaaken/livbet/issues">#livbet on github</a></li>
			</ul>

			<h3>Privacy/Cookie information</h3>

			<p>I do not collect personal information about the visitors of this website. All connections are encrypted via SSL. The Apache server logfiles (written by All Inkl Webhosting) do not contain IP addresses at all.</p>

			<p>This websites does not make use of Cookies.</p>
		</section>
	</div>
</template>

<style lang="scss">
.readme {
	display: flex;
	background: rgba(255,255,255,0.95);
	position: absolute;
	top: 3.5rem;
	bottom: 0;
	left: 0;
	right: 0;
	line-height: 1.5;
	&__section {
		flex: 1;
		padding: 1rem 2rem 3rem;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	h2 {
		font-size: 2rem;
		margin-bottom: .5em;
	}
	h3 {
		font-size: 1.2rem;
		margin: 1em 0;
		font-weight: bold;
	}
	p {
		margin-bottom: 1em;
		max-width: 50em;
	}
	li {
		max-width: 50em;
		list-style: disc outside;
		margin-left: 1.3em;
	}
	strong {
		font-weight: bold;
	}

	a {
		color: #346;
	}
}

</style>
