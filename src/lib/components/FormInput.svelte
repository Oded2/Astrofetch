<script>
  export let value = "";
  export let type = "text";
  export let id = "";
  export let placeholder = "";
  export let min = 0;
  export let max = 999;
  export let rows = 10;
  export let cols = 30;
  export let required = false;
  export let error = false;
  let focus = false;
</script>

{#if type === "email"}
  <input
    minlength={min}
    {required}
    type="email"
    {id}
    {placeholder}
    class="input w-full max-w-xs"
    class:input-accent={((value.length == 0 && required) || focus) &&
      value.length <= max &&
      !error}
    class:input-error={value.length > max}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{:else if type === "password"}
  <input
    minlength={min}
    {required}
    type="password"
    {id}
    {placeholder}
    class="input w-full max-w-xs"
    class:input-accent={((value.length == 0 && required) || focus) &&
      value.length <= max &&
      !error}
    class:input-error={value.length > max || error}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{:else if type === "date"}
  <input
    {min}
    {max}
    {required}
    type="date"
    {id}
    {placeholder}
    class="input w-full max-w-xs"
    class:input-accent={((value === "" && required) || focus) &&
      value <= max &&
      !error}
    class:input-error={value < min || value > max || error}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{:else if type === "number"}
  <input
    {min}
    {required}
    type="number"
    {id}
    {placeholder}
    class="input w-full max-w-xs"
    class:input-accent={((value.length == 0 && required) || focus) &&
      value.length <= max &&
      !error}
    class:input-error={value > max}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{:else if type === "textarea"}
  <textarea
    minlength={min}
    {required}
    type="text"
    {id}
    {placeholder}
    class="textarea w-full resize-none text-base"
    {rows}
    {cols}
    class:textarea-accent={((value.length == 0 && required) || focus) &&
      value.length <= max &&
      !error}
    class:textarea-error={value.length > max}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{:else}
  <input
    minlength={min}
    {required}
    type="text"
    {id}
    {placeholder}
    class="input w-full max-w-xs"
    class:input-accent={((value.length == 0 && required) || focus) &&
      value.length <= max &&
      !error}
    class:input-error={value.length > max}
    bind:value
    on:focus={() => (focus = true)}
    on:blur={() => {
      focus = false;
      value = value.trim();
    }}
  />
{/if}
