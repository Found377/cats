const createCard = (data, parent, arr) => {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", data.id);
  const age = document.createElement("div");
  age.className = "age";
  age.innerText = data.age || "no";

  const rate = document.createElement("div");
  rate.className = "rate";
  rate.innerHTML =
    "<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>";

  const pic = document.createElement("div");
  pic.className = "pic";
  pic.style.backgroundImage = `url(${
    data.img_link ||
    "https://e7.pngegg.com/pngimages/518/657/png-clipart-kitten-cat-drawing-cartoon-kitten-mammal-face.png"
  })`;

  const name = document.createElement("div");
  name.className = "name";
  name.innerText = data.name;

  card.append(pic, age, rate, name);
  card.addEventListener("click", function () {
    showPopup(arr, "card");
  });
  parent.append(card);
};

const showPopup = (list, type, content) => {
  let el = list.filter((el) => el.dataset.type === type)[0];
  el.classList.add("active");
  el.parentElement.classList.add("active");
};

const addCat = (e, api, popupList, store) => {
  e.preventDefault();
  let body = {}; // {name: "Vasya", id: 1, ...}
  for (let i = 0; i < e.target.elements.length; i++) {
    let el = e.target.elements[i];
    if (el.name) {
      if (el.type === "checkbox") {
        body[el.name] = el.checked;
      } else {
        body[el.name] = el.value;
      }
    }
  }
  // console.log(body);
  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.message);
      if (data.message === "ok") {
        // localStorage.setItem("cat", JSON.stringify(body));
        createCard(body, document.querySelector(".container"));
        store.push(body);
        localStorage.setItem("cats", JSON.stringify(store));
        e.target.reset();
        document.querySelector(".popup-wrapper").classList.remove("active");
      }
      // showPopup(popupList, "info", data.message);
    });
};
