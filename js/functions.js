// Формируем блок main, добавляя карточки с информацией с севера

const createCard = (data, parent, arr) => {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", data.id);

  const age = document.createElement("div"); // возраст цифрой
  age.className = "age";
  age.innerText = data.age || "no";

  const rate = document.createElement("div"); // рейтинг звёздочками
  rate.className = "rate";
  for (let i = 0; i < data.rate; i++) {
    let rateStar = document.createElement("span");
    rateStar.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"/></svg>';
    rateStar.classList.add("rate__star");
    rate.append(rateStar);
  }

  const pic = document.createElement("div"); // фото кота
  pic.className = "pic";
  pic.style.backgroundImage = `url(${
    data.img_link ||
    "https://e7.pngegg.com/pngimages/518/657/png-clipart-kitten-cat-drawing-cartoon-kitten-mammal-face.png"
  })`;

  const name = document.createElement("div"); // кличка кота
  name.className = "name";
  name.innerText = data.name;

  card.append(pic, age, rate, name); // показываем кота в попапе (не могу придумать, мало нейронных связей в мозгу ='( )
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
  // функционал кнопки "Добавить" из навигации
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
  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ok") {
        createCard(body, document.querySelector(".container"));
        store.push(body);
        localStorage.setItem("cats", JSON.stringify(store));
        e.target.reset();
        document.querySelector(".popup-wrapper").classList.remove("active");
      }
    });
};
