<script>
    export let header = "";
    export let checked = false;
    export let name =  "accordion"
	export let border = false;

</script>

<div class="collapse collapse-plus bg-gray-900 mb-1" class:border>
	<input type="radio" {name} {checked} />
	<div class="collapse-title text-xl font-medium">
		{header}
	</div>
	<div class="collapse-content">
		<slot />
	</div>
</div>
