document.getElementById("aiBtn").addEventListener("click", async () => {
  const payload = {
    fuel: document.getElementById("fuel").value,
    minPrice: document.getElementById("minPrice").value,
    maxPrice: document.getElementById("maxPrice").value,
    usage: document.getElementById("usage").value,
    seats: document.getElementById("seats").value,
    condition: document.querySelector("input[name='condition']:checked")?.value || "",
    message: document.getElementById("aiMessage").value
  };

  const res = await fetch("/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  // Show AI text
  document.getElementById("recommendBox").innerText = data.text;

  // Show images
  const carImages = document.getElementById("carImages");
  carImages.innerHTML = "";

  data.images.forEach(url => {
    const div = document.createElement("div");
    div.className = "img-box";
    div.innerHTML = `<img src="${url}" />`;
    carImages.appendChild(div);
  });
});
