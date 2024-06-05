const apiUrl = "https://api.tech.redventures.com.br";

let originalButtonImages = {};

document.addEventListener("DOMContentLoaded", () => {
  loadBroths();
  loadProteins();
  setupOrderNowButton();
  setupOrderButton();
  const clearButton = document.getElementById("clear-button");
  if (clearButton) {
    clearButton.addEventListener("click", clearSelections);
  }
});

function setupOrderNowButton() {
  const orderNowButton = document.getElementById("order-now-button");
  const contentContainer = document.getElementById("content-container");

  if (orderNowButton && contentContainer) {
    orderNowButton.addEventListener("click", function () {
      const containerPosition = contentContainer.offsetTop;

      window.scrollTo({
        top: containerPosition,
        behavior: "smooth",
      });
    });
  }
}

function setupOrderButton() {
  const placeOrderButton = document.querySelector(".button-place");
  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", submitLamen);
  }
}

function loadBroths() {
  fetch(`${apiUrl}/broths`, {
    headers: {
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const brothButtonsContainer = document.getElementById("broth-buttons");
      if (!brothButtonsContainer) return;

      let selectedButton = null;

      data.forEach((broth) => {
        const button = document.createElement("button");
        button.className = "button-options";
        button.id = `${broth.name.toLowerCase()}-button`;
        button.setAttribute("data-broth-id", broth.id);

        const img = document.createElement("img");
        img.src = `./assets/Card-${broth.name}.png`;
        img.alt = broth.name;

        button.appendChild(img);
        brothButtonsContainer.appendChild(button);

        originalButtonImages[button.id] = img.src;

        button.addEventListener("click", function () {
          if (selectedButton !== button) {
            if (selectedButton) {
              resetButtonImage(selectedButton);
            }
            img.src = `./assets/Card-${broth.name}-blue.png`;
            selectedButton = button;
          } else {
            resetButtonImage(button);
            selectedButton = null;
          }
          console.log(
            selectedButton ? selectedButton.getAttribute("data-broth-id") : null
          );
        });
      });

      function resetButtonImage(button) {
        button.querySelector("img").src = originalButtonImages[button.id];
      }
    })
    .catch((error) => console.error("error loading data:", error));
}

function loadProteins() {
  fetch(`${apiUrl}/proteins`, {
    headers: {
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const proteinsButtonsContainer =
        document.getElementById("proteins-buttons");
      if (!proteinsButtonsContainer) return;

      let selectedButton = null;

      data.forEach((protein) => {
        const button = document.createElement("button");
        button.className = "button-options";
        button.id = `${protein.name.toLowerCase()}-button`;
        button.setAttribute("data-protein-id", protein.id);

        const img = document.createElement("img");
        img.src = `./assets/Card-${protein.name}.png`;
        img.alt = protein.name;

        button.appendChild(img);
        proteinsButtonsContainer.appendChild(button);

        originalButtonImages[button.id] = img.src;

        button.addEventListener("click", function () {
          if (selectedButton !== button) {
            if (selectedButton) {
              resetButtonImage(selectedButton);
            }
            img.src = `./assets/Card-${protein.name}-blue.png`;
            selectedButton = button;
          } else {
            resetButtonImage(button);
            selectedButton = null;
          }
          console.log(
            selectedButton
              ? selectedButton.getAttribute("data-protein-id")
              : null
          );
        });
      });

      function resetButtonImage(button) {
        button.querySelector("img").src = originalButtonImages[button.id];
      }
    })
    .catch((error) => console.error("error loading data:", error));
}

function resetButtonImage(button) {
  button.querySelector("img").src = originalButtonImages[button.id];
}

function clearSelections() {
  const selectedBrothButton = document.querySelector(
    "#broth-buttons .button-options img[src*='blue']"
  );
  if (selectedBrothButton) {
    resetButtonImage(selectedBrothButton.parentElement);
  }

  const selectedProteinButton = document.querySelector(
    "#proteins-buttons .button-options img[src*='blue']"
  );
  if (selectedProteinButton) {
    resetButtonImage(selectedProteinButton.parentElement);
  }

  const orderDetailsContainer = document.getElementById(
    "order-details-container"
  );
  orderDetailsContainer.innerHTML = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function submitLamen() {
  const selectedBrothButton = document.querySelector(
    "#broth-buttons .button-options img[src*='blue']"
  );
  const brothId = selectedBrothButton
    ? selectedBrothButton.parentElement.getAttribute("data-broth-id")
    : null;
  const selectedProteinButton = document.querySelector(
    "#proteins-buttons .button-options img[src*='blue']"
  );
  const proteinId = selectedProteinButton
    ? selectedProteinButton.parentElement.getAttribute("data-protein-id")
    : null;

  if (!brothId && !proteinId) {
    document.getElementById("response").innerText = alert(
      "please choose only one type of broth and only one type of protein."
    );
    return;
  }
  if (!brothId) {
    document.getElementById("response").innerText = alert(
      "Please, choose at least one type of broth."
    );
    return;
  }
  if (!proteinId) {
    document.getElementById("response").innerText = alert(
      "Please, choose at least one type of protein."
    );
    return;
  }

  const lamenData = {
    brothId: brothId,
    proteinId: proteinId,
  };

  console.log("Enviando dados:", JSON.stringify(lamenData));

  fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
    },
    body: JSON.stringify(lamenData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("orderData", JSON.stringify(data));
      window.location.href = "success.html";
    })
    .catch((error) => {
      console.error(error);
    });
}
