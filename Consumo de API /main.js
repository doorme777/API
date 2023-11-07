const RANDOM_CAT = "https://api.thecatapi.com/v1/images/search?limit=3";
const FAV_CAT = "https://api.thecatapi.com/v1/favourites";
const DELETE_CAT = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const UPLO_CAT = "https://api.thecatapi.com/v1/images/upload";
const spanError = document.getElementById("error");

async function randomCat() {
  try {
    const res = await fetch(RANDOM_CAT);
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
    } else {
      const img1 = document.getElementById("img1");
      const img2 = document.getElementById("img2");
      const img3 = document.getElementById("img3");
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      const btn3 = document.getElementById("btn3");

      img1.src = data[0].url;
      img2.src = data[1].url;
      img3.src = data[2].url;

      btn1.onclick = () => saveFavouriteCat(data[0].id);
      btn2.onclick = () => saveFavouriteCat(data[1].id);
      btn3.onclick = () => saveFavouriteCat(data[2].id);
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

async function loadFavCat() {
  try {
    const res = await fetch(FAV_CAT, {
      headers: {
        "x-api-key":
          "live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9",
      },
    });
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
    } else {
      const section = document.getElementById("favCat");
      section.innerHTML = "";
      data.forEach((michi) => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const btnText = document.createTextNode("Borrar gato :(");

        img.src = michi.image.url;
        button.appendChild(btnText);
        button.onclick = () => deleteFavouriteCat(michi.id);
        article.appendChild(img);
        article.appendChild(button);
        section.appendChild(article);
      });
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

async function saveFavouriteCat(id) {
  try {
    const res = await fetch(FAV_CAT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9",
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
      "x-api-key":
        "live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9",
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

randomCat();
loadFavCat();
