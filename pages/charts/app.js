let inputOne = document.getElementById("name");
let inputTwo = document.getElementById("name2");
let btn = document.getElementById("btn");
let winner = document.getElementById("winner");
let style = document.createElement("style");
let container = document.getElementById("div");

checkbox.addEventListener("click", function () {
  changeColor();
});
function changeColor() {
  if (checkbox.checked == true) {
    document.body.style.background = "black";
    document.body.style.color = "white";

    sub.style.background = "black";
    sub.style.color = "white";
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";

    sub.style.background = "white";
    sub.style.color = "black";
  }
}
btn.onclick = function () {
  event.preventDefault();

  if (inputOne.value === "" || inputTwo.value === "") {
    alert("Enter valid usernames");
  } else if (inputOne.value === inputTwo.value) {
    alert("Enter different usernames");
  } else {
    const API_REPO_ONE = `https://api.github.com/users/${inputOne.value}/repos`;
    const API_REPO_TWO = `https://api.github.com/users/${inputTwo.value}/repos`;
    const API_REPO_ONE_AVATAR = `https://api.github.com/users/${inputOne.value}`;
    const API_REPO_TWO_AVATAR = `https://api.github.com/users/${inputTwo.value}`;

    fetch(API_REPO_ONE)
      .then((response) => {
        return response.json();
      })
      .then((dataOne) => {
        fetch(API_REPO_ONE_AVATAR)
          .then((response) => {
            return response.json();
          })
          .then((dataOneImage) => {
            let avatarOne = dataOneImage.avatar_url;
            fetch(API_REPO_TWO)
              .then((response) => {
                return response.json();
              })
              .then((dataTwo) => {
                fetch(API_REPO_TWO_AVATAR)
                  .then((response) => {
                    return response.json();
                  })
                  .then((dataTwoImage) => {
                    let avatarTwo = dataTwoImage.avatar_url;
                    if (dataOne.length >= dataTwo.length) {
                      container.innerHTML += `
                        <div class="row">
                          <div class="container1 d-flex flex-column col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xs-offset-0">
                            
                              <div class="winner">
                                <h1>winner</h1>
                                <div class="img1"><img src="${avatarOne}" alt="" style="border-radius: 50%; width: 200px; height: 100%;"></div>
                                <h3>@${inputOne.value}</h3>
                              </div>
                              <div class="loser">
                                <h1>loser</h1>
                                <div class="img2"><img src="${avatarTwo}" alt="" style="border-radius: 50%; width: 200px; height: 100%;"></div>
                                <h3>@${inputTwo.value}</h3>
                              </div>
                            
                          </div>
                        </div>
                      `;
                    } else if (dataTwo.length >= dataOne.length) {
                      container.innerHTML += `
                        <div class="row">
                          <div class="container2 d-flex flex-column col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xs-offset-0">
                            
                              <div class="winner">
                                <h1>winner</h1>
                                <div class="img3"><img src="${avatarTwo}" alt="" style="border-radius: 50%; width: 200px; height: 100%;"></div>
                                <h3>@${inputTwo.value}</h3>
                              </div>
                              <div class="loser">
                                <h1>loser</h1>
                                <div class="img4"><img src="${avatarOne}" alt="" style="border-radius: 50%; width: 200px; height: 100%;"></div>
                                <h3>@${inputOne.value}</h3>
                              </div>
                           
                          </div>
                        </div>
                      `;
                    } else {
                      container.innerHTML = `
                        <h1>It's a tie!</h1>
                      `;
                    }

                    style.innerHTML += `
                      .container1 {
                        display: flex;
                        flex-wrap: nowrap;
                         grid-template-columns: 1fr 1fr 1fr;
                         grid-template-rows: 1fr 1fr 1fr;
                         gap: 150px;
                      }
                      container2 {
                        display: flex;
                        flex-wrap: nowrap;
                         grid-template-columns: 1fr 1fr 1fr;
                         grid-template-rows: 1fr 1fr 1fr;
                         gap: 150px;
                      } 
                      .winner,
                      .loser {
                        text-align: center;
                        gap:100px
                      }                  
                    `;

                    document.head.appendChild(style);
                  });
              });
          });
      })
      .catch((error) => {
        document.write("", error);
      });
  }
};
