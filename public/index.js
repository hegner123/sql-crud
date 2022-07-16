function loadNotes() {
  fetch("http://localhost:3000/api")
    .then((response) => response.json())
    .then((data) => displayCards(data.notes));

  function displayCards(notes) {
    // console.log(notes);
    notes.forEach((note) => {
      const postRoot = document.querySelector("#post-grid");
      const card = document.createElement("div");
      card.classList = "card";
      card.innerHTML = ` <h3 class="card-header">Note ${note.id}</h3> <button class="delete-button" data-id="${note.id}">Delete</button>
                                  <p class="card-body">${note.body}</p>`;
      postRoot.appendChild(card);
    });
    const formSubmit = document.querySelector(".create-post");

    if (formSubmit.getAttribute("listener") !== "true") {
      formSubmit.addEventListener("submit", submitForm);
      formSubmit.setAttribute("data-listener", "true");
    }

    async function submitForm(e) {
      e.preventDefault();
      const postBody = document.querySelector(".textarea");
      const data = JSON.stringify({ body: postBody.value });
      const response = await fetch(`/api/post`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data,
      });
      response.then(reloadNotes());
    }
    // }

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((buttons) => {
      buttons.addEventListener("click", deletePost);
    });

    async function deletePost(e) {
      const post = e.target.attributes["data-id"].value;
      // console.log(post);
      // Default options are marked with *

      const response = await fetch(`/api/${post}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.

        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      reloadNotes();
    }

    function reloadNotes() {
      const postRoot = document.querySelector("#post-grid");
      postRoot.innerHTML = "";
      loadNotes();
    }
  }
}

loadNotes();
