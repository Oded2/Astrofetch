<script>
export let activeUrl = "";
export let href = "";
</script>

<li>
	<a class:text-accent={activeUrl === href} {href}><slot /></a>
</li>
