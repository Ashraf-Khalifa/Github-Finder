let input = document.getElementById("input");
let btn = document.getElementById("btn");
let repo = document.getElementById("repo");
let sidebar = document.getElementById("sidebar");
let checkbox = document.getElementById("checkbox");
let cont = document.getElementById("cont");
btn.onclick = function () {
  getRepos();
};
checkbox.addEventListener("click", function () {
  changeColor();
});
function changeColor() {
  if (checkbox.checked == true) {
    document.body.style.background = "black";
    document.body.style.color = "white";
    cont.style.background = "black";
    sidebar.style.background = "black";
    sidebar.style.color = "white";
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";
    cont.style.background = "white";
    sidebar.style.background = "white";
    sidebar.style.color = "black";
  }
}
function getRepos() {
  if (input.value === "") {
    alert("Please enter a username");
  } else {
    event.preventDefault();
    // let token = "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";

    fetch(`https://api.github.com/users/${input.value}`
    // , {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    // }
    )
      .then((response) => response.json())
      .then((response) => {
        sidebar.innerHTML = `
           <div class="  col-lg-2 col-md-3" id="sidebar"><br><br><br><br><br>
             <img class="img" src="${response.avatar_url}" width="200" height="200">
            <h3 class="name" >${response.login}</h3>
            <button type="button" style="width: 200px; height: 30px; margin: 20px; border-radius: 5px;">Edit profile</button>
           </div>
         `;

        changeColor();
      })
   
    fetch(`https://api.github.com/users/${input.value}/repos`
    // , {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
    )
      .then((response) => response.json())
      .then((repositories) => {
        repo.innerHTML = "";
        for (let i of repositories) {
          let newRepo = document.createElement("div");
          newRepo.className = "col-lg-6 grid-margin stretch-card";
          newRepo.innerHTML = `
            <div class="card">
              <div class="card-body" style="background-color: #ffffff; padding: 1.25rem;">
                <h5>${i.name}</h5> <br><br>
                <p><img src="pages/charts/Location_dot_black.svg.png" width="20px" height="20px"> ${i.language}</p>
              </div>
            </div>
          `;
          changeColor();
          repo.appendChild(newRepo);
        }
        changeColor();
      })
        .catch((error) => {
          document.write("", error);
        });
      
  }
}