const RANDOM_CAT =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";

const FAV_CAT =
  "https://api.thecatapi.com/v1/favourites?api_key=live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";

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
      btn3.onclick = () => saveFavouriteCat(data[3].id);
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

async function loadFavCat() {
  try {
    const res = await fetch(FAV_CAT);
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
    } else {
      data.forEach((michi) => {
        const section = document.getElementById("favCat");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const btnText = document.createTextNode("Sacar al michi de favoritos");

        img.src = michi.image.url;
        button.appendChild(btnText);
        article.appendChild(img);
        article.appendChild(button);
        section.appendChild(article);
      });
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

async function saveFavouriteCat() {
  try {
    const res = await fetch(FAV_CAT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: "bfa",
      }),
    });
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      console.log("Guardado con éxito.");
    }
  } catch (error) {
    spanError.innerHTML = "Hubo un error en la solicitud.";
  }
}

randomCat();
saveFavouriteCat();
loadFavCat();
