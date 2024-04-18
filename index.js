const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.querySelector(".load-more-btn");

let loadCount = 0;

async function fetchListOfProducts(getCurrentLoadCount) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${
        getCurrentLoadCount === 0 ? 0 : getCurrentLoadCount * 10
      }`
    );
    const result = await response.json();
    if (result && result.products) displayProducts(result.products);
  } catch (error) {
    
    console.log(error);
  }

  function displayProducts(products) {
    products.forEach((productItem) => {
      console.log(productItem);
      const card = document.createElement("div");
      const cover = document.createElement("div");
      const productImage = document.createElement("img");
      const productName = document.createElement("p");
      const productPrice = document.createElement("p");
      const productDes = document.createElement("p");

      productImage.src = productItem.thumbnail;
      productName.textContent = productItem.title;
      productPrice.textContent = `Price: ${productItem.price}`;
      productDes.textContent = productItem.description;

      card.classList.add("card");
      cover.classList.add("cover");
      productImage.classList.add("product-img");
      productName.classList.add("product-title");
      productPrice.classList.add("product-price");
      productDes.classList.add("product-des");

      card.appendChild(cover);
      cover.appendChild(productImage);
      card.appendChild(productName);
      card.appendChild(productPrice);
      card.appendChild(productDes);

      productsContainer.appendChild(card);
    });

    if (productsContainer.children.length === 100) {
      loadMoreBtn.setAttribute("disabled", "true");
    }
  }
}

fetchListOfProducts(loadCount);

loadMoreBtn.addEventListener("click", () => {
  fetchListOfProducts((loadCount += 1));
});
