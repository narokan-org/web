<script lang="ts">
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { t } from '$lib/translations';

	export let placeholder: string = $t('common.components.tableSearch.placeholder');
	export let headings: string[] = [];
	export let items: { [key: string]: any }[] = [];

	let searchTerm = '';

	$: filteredItems = items.filter((item) =>
		Object.values(item).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<TableSearch {placeholder} bind:inputValue={searchTerm}>
	{#each headings as heading}
		<TableHeadCell>{heading}</TableHeadCell>
	{/each}
	<TableBody tableBodyClass="divide-y">
		{#each items as item}
			<TableBodyRow>
				{#each Object.values(item) as value}
					<TableBodyCell>{value}</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>
