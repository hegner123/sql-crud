<script>
  import Card from './lib/Card.svelte'

  export let textAreaValue
  export let promise

  async function fetchData (){
    const postRes = await fetch('/api',{mode: 'cors',})
    
    if (postRes.ok) {
			return postRes.json();
		} else {
			throw new Error(await postRes.text());
		}
	}

  $:promise = fetchData()

  async function handleSubmit() {
  
    const formattedData = JSON.stringify({ body: textAreaValue });
    const response = await fetch(`/api/post`, {
      method: "POST", 
      referrerPolicy: "no-referrer", 
      body: formattedData,
    });

    if (response.ok) {
      textAreaValue = ""
      handleReload()
    } else {
      throw new Error(await response.text());
    }
    
  }

  function handleReload() {
		promise = fetchData()
	}
</script>


    <header>
        <h1>SQL Crud</h1>
    </header>
    <main class="main-content">

        <form on:submit|preventDefault={handleSubmit} name="post-form" class="create-post" data-listener="false">
            <label for="post-body">New Post Body</label>
            <textarea name="post-body" id="post-body" cols="30" rows="10" class="textarea" bind:value={textAreaValue}></textarea>
            <input type="submit" value="Submit">
        </form>

        <div id="post-grid" class="post-grid">

          {#await promise}
            <p>Waiting</p>
          {:then promise} 
             <Card on:reload={handleReload} data={promise}/>
          {/await}

		     

        </div>
    </main>
    <footer>
   <p>©MLH 2022</p>
    </footer>




<style>
* {
    box-sizing: border-box;
}

.main-content{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: space-between;
  min-height: 75vh;
}

header>*,
main>*,
footer>* {
    padding-left: 1rem;
    padding-right: 1rem;
}

main form {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 1rem;
    grid-column: 1/-1;
    justify-self: center;
}

label {
  text-align: left;
}


.post-grid {
    grid-column:1/-1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 1.75rem;
    gap: 2rem;
}


</style>
