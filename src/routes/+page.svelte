<script lang="ts">
	import { Heading, P, Img, Input, Button } from 'flowbite-svelte';
	// import BrainSolid from 'flowbite-svelte-icons/BrainSolid.svelte';
	// import LockSolid from 'flowbite-svelte-icons/LockSolid.svelte';
	// import FileChartBarSolid from 'flowbite-svelte-icons/FileChartBarSolid.svelte';
	import { t } from '$lib/translations';
	import Feature from '$lib/components/feature/index.svelte';
</script>

<div class="flex flex-col items-center justify-center min-h-screen w-full">
	<div class="max-w-[1400px]">
		<div class="flex flex-row">
			<div class="flex flex-col flex-1 justify-center">
				<Heading data-testid="home-heading" class="text-6xl" level={1}
					>{$t('common.pages.home.heading')}</Heading
				>
				<P data-testid="home-subheading" class="text-xl mt-6"
					>{$t('common.pages.home.subheading')}</P
				>
				<form class="flex flex-row items-end max-w-[450px]">
					<Input
						required
						type="email"
						data-testid="home-waitlist-input"
						class="text-sm mt-8"
						placeholder={$t('common.pages.home.waitlistInputPlaceholder')}
					/>
					<Button data-testid="home-waitlist-button" class="text-xs ml-4 h-10 min-w-[120px]"
						>{$t('common.pages.home.waitlistButton')}</Button
					>
				</form>
			</div>
			<Img data-testid="home-hero-image" src="/images/home-graphs-content.png" />
		</div>
		<div class="flex flex-row mt-8">
			<Feature
				class="flex-1 mr-8"
				key="1"
				heading={$t('common.pages.home.feature1Heading')}
				subheading={$t('common.pages.home.feature1Subheading')}
			>
				<!-- TODO: Fix icon positioning. -->
				<!-- <BrainSolid slot="icon" /> -->
			</Feature>
			<Feature
				class="flex-1 mr-8"
				key="2"
				heading={$t('common.pages.home.feature2Heading')}
				subheading={$t('common.pages.home.feature2Subheading')}
			>
				<!-- TODO: Fix icon positioning. -->
				<!-- <LockSolid slot="icon" /> -->
			</Feature>
			<Feature
				class="flex-1 mr-8"
				key="3"
				heading={$t('common.pages.home.feature3Heading')}
				subheading={$t('common.pages.home.feature3Subheading')}
			>
				<!-- TODO: Fix icon positioning. -->
				<!-- <FileChartBarSolid slot="icon" /> -->
			</Feature>
		</div>
	</div>
</div>
