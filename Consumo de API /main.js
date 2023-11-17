const API_KEY =
  "live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";
const RANDOM_CAT = "https://api.thecatapi.com/v1/images/search?limit=3";
const FAV_CAT_URL = "https://api.thecatapi.com/v1/favourites";
const DELETE_CAT = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const UPLO_CAT = "https://api.thecatapi.com/v1/images/upload";
const spanError = document.getElementById("error");

async function randomCat() {
  try {
    const res = await fetch(RANDOM_CAT);
    const data = await res.json();

    console.log(data);

    if (res.status !== 200) {
      spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
    } else {
      const IMG_RANDOM = [
        {
          img: document.getElementById("img1"),
          btn: document.getElementById("btn1"),
        },
        {
          img: document.getElementById("img2"),
          btn: document.getElementById("btn2"),
        },
        {
          img: document.getElementById("img3"),
          btn: document.getElementById("btn3"),
        },
      ];

      IMG_RANDOM.forEach((elemento, index) => {
        elemento.img.src = data[index]?.url;
        elemento.btn.onclick = () => saveFavouriteCat(data[index]?.id);
      });
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

async function loadFavCat() {
  try {
    const res = await fetch(FAV_CAT_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
      return;
    }

    const section = document.getElementById("favCat");
    section.innerHTML = "";

    const renderFavCatCard = (michi) => {
      const article = document.createElement("article");

      // Parte de arriba de la card
      const div1 = document.createElement("div");
      const img = document.createElement("img");

      // Parte de abajo de la card
      const div2 = document.createElement("div");
      const button = document.createElement("button");
      const btnText = document.createTextNode("DELETE");

      div1.classList.add("wrapper");
      img.classList.add("banner-image");
      img.src = michi.image.url;
      div2.appendChild(img);

      div2.classList.add("button-wrapper");
      button.classList.add("btn", "fill", "delete");
      button.appendChild(btnText);
      button.onclick = () => deleteFavouriteCat(michi.id);
      div2.appendChild(button);

      article.classList.add("container");
      article.appendChild(div1);
      article.appendChild(div2);
      section.appendChild(article);
    };

    const data = await res.json();
    data.forEach(renderFavCatCard);
  } catch (error) {
    spanError.innerHTML = `Hubo un error en la solicitud. ${error}`;
  }
}

async function saveFavouriteCat(id) {
  try {
    const res = await fetch(FAV_CAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      loadFavCat();
      console.log("Guardado con éxito.");
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud." + error;
  }
}

async function deleteFavouriteCat(id) {
  const res = await fetch(DELETE_CAT(id), {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi eliminado de favoritos");
    loadFavCat();
  }
}

async function uploadPhotoCat() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  const res = await fetch(UPLO_CAT, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "x-api-key":
        "live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9",
    },
    body: formData,
  });
  const data = await res.json();
  console.log(data);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    previewImage();
  }
}

function previewImage() {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
}

function resetForm() {
  let form = document.getElementById("uploadingForm");

  form.reset();

  var previewImage = document.getElementById("preview");
  previewImage.src = "";
}

randomCat();
loadFavCat();
