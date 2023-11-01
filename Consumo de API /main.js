const URL =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_u2vRDbfo33QRy7IYZfcAOqZC551LDVlSkZh1xA6gKFaJoPdI2m3bgtugBJoIRvg9";

async function newImage() {
  const res = await fetch(URL);
  const data = await res.json();
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

newImage();
