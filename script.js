// Function to create the gallery
const createGallery = (data) => {
  const gallery = document.getElementById("gallery");

  // Group responses by URL
  const groupedData = data.data.reduce((acc, item) => {
    if (!acc[item.url]) {
      acc[item.url] = [];
    }
    acc[item.url].push(item.response.replace(/\\n/g, "<br>"));
    return acc;
  }, {});

  // Create gallery items
  for (const [url, responses] of Object.entries(groupedData)) {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    const img = document.createElement("img");
    img.src = url;
    galleryItem.appendChild(img);

    responses.forEach((response, index) => {
      const responseDiv = document.createElement("div");
      responseDiv.className = "response";
      responseDiv.innerHTML = response;
      galleryItem.appendChild(responseDiv);

      // Add an <hr> after each response except the last one
      if (index < responses.length - 1) {
        const hr = document.createElement("hr");
        hr.style.border = "0";
        hr.style.borderTop = "1px solid #ccc";
        hr.style.margin = "10px 0";
        galleryItem.appendChild(hr);
      }
    });

    gallery.appendChild(galleryItem);
  }
};
// Fetch data from the JSON file
fetch("result1.json")
  .then((response) => response.json())
  .then((data) => createGallery(data))
  .catch((error) => console.error("Error fetching data:", error));
