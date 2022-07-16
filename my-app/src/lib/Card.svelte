<script>
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function reloadPosts() {
		dispatch('reload');
	}
    export let data;
    async function handleDelete(id) {
// console.log(id)
      // console.log(post);
    //   Default options are marked with *

      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.

        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
        if (response.ok) {
			reloadPosts()
		} else {
			throw new Error(await response.text());
		}
    }
    
</script>

{#each data.notes as {id, body}}
     <!-- content here -->
     <div class="card">
         <h3 class="card-header" >Note {id}</h3> 
         <button class="delete-button" on:click="{() => handleDelete(id)}">Delete</button>
         <p class="card-body">{body}</p>
     </div>
{/each}


<style>
    .card {
    display: grid;
    width: 300px;
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 1fr 1fr;
    background: #ccc;
    padding: 1rem;
    border-radius: 5px;
    min-height: 200px;
}

.card h3 {
    grid-column: 1;
    grid-row: 1;
    justify-self: flex-start;
    align-self: start;
    margin: 0;
    color:#333;
}

.card>button {
    grid-column: 2;
    grid-row: 1;
    height: fit-content;
    width: fit-content;
    justify-self: flex-end;
    align-self: start;
}

.card>button:hover {
    cursor: pointer;

}

.card p {
    grid-column: 1/-1;
    grid-row: 2;
    color:#333;
}
</style>
    