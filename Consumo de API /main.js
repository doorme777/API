const RANDOM_CAT =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";

const FAV_CAT =
  "https://api.thecatapi.com/v1/favourites&api_key=live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";

const spanError = document.getElementById("error");

async function randomCat() {
  const res = await fetch(RANDOM_CAT);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = `Hubo un ERROR tipo ${data.status}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  }
}

async function favCat() {
  const res = await fetch(FAV_CAT);
  const data = await res.json();
  console.log(data);
}

randomCat();
favCat();
