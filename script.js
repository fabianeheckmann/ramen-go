const apiUrl = "https://api.tech.redventures.com.br";

document.addEventListener("DOMContentLoaded", () => {
  loadBroths();
  loadProteins();
});

document.addEventListener("DOMContentLoaded", function () {
  const orderNowButton = document.getElementById("order-now-button");
  const contentContainer = document.getElementById("content-container");

  orderNowButton.addEventListener("click", function () {
    const containerPosition = contentContainer.offsetTop;

    window.scrollTo({
      top: containerPosition,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const saltButton = document.getElementById("salt-button");
  const shoyuButton = document.getElementById("shoyu-button");
  const misoButton = document.getElementById("miso-button");

  let selectedButton = null;
  let originalButtonImages = {};

  originalButtonImages[saltButton.id] = saltButton.querySelector("img").src;
  originalButtonImages[shoyuButton.id] = shoyuButton.querySelector("img").src;
  originalButtonImages[misoButton.id] = misoButton.querySelector("img").src;

  function resetButtonImage(button) {
    button.querySelector("img").src = originalButtonImages[button.id];
  }

  saltButton.addEventListener("click", function () {
    if (selectedButton !== saltButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      saltButton.querySelector("img").src = "./assets/Card-Salt-blue.png";
      selectedButton = saltButton;
    } else {
      resetButtonImage(saltButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });

  shoyuButton.addEventListener("click", function () {
    if (selectedButton !== shoyuButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      shoyuButton.querySelector("img").src = "./assets/Card-Shoyu-blue.png";
      selectedButton = shoyuButton;
    } else {
      resetButtonImage(shoyuButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });

  misoButton.addEventListener("click", function () {
    if (selectedButton !== misoButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      misoButton.querySelector("img").src = "./assets/Card-Miso-blue.png";
      selectedButton = misoButton;
    } else {
      resetButtonImage(misoButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const chesuButton = document.getElementById("chesu-button");
  const yasaiButton = document.getElementById("yasai-button");
  const karaagueButton = document.getElementById("karaague-button");

  let selectedButton = null;
  let originalButtonImages = {};

  originalButtonImages[chesuButton.id] = chesuButton.querySelector("img").src;
  originalButtonImages[yasaiButton.id] = yasaiButton.querySelector("img").src;
  originalButtonImages[karaagueButton.id] =
    karaagueButton.querySelector("img").src;

  function resetButtonImage(button) {
    button.querySelector("img").src = originalButtonImages[button.id];
  }

  chesuButton.addEventListener("click", function () {
    if (selectedButton !== chesuButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      chesuButton.querySelector("img").src = "./assets/Card-Chasu-blue.png";
      selectedButton = chesuButton;
    } else {
      resetButtonImage(chesuButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });

  yasaiButton.addEventListener("click", function () {
    if (selectedButton !== yasaiButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      yasaiButton.querySelector("img").src = "./assets/Card-Yasai-blue.png";
      selectedButton = yasaiButton;
    } else {
      resetButtonImage(yasaiButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });

  karaagueButton.addEventListener("click", function () {
    if (selectedButton !== karaagueButton) {
      if (selectedButton) {
        resetButtonImage(selectedButton);
      }
      karaagueButton.querySelector("img").src =
        "./assets/Card-Karaague-blue.png";
      selectedButton = karaagueButton;
    } else {
      resetButtonImage(karaagueButton);
      selectedButton = null;
    }
    console.log(
      selectedButton ? selectedButton.getAttribute("data-broth-id") : null
    );
  });
});

function loadBroths() {
  fetch(`${apiUrl}/broths`, {
    headers: {
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const brothSelect = document.getElementById("broth");
      data.forEach((broth) => {
        const option = document.createElement("option");
        option.value = broth.id;
        option.textContent = broth.name;
        brothSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar os caldos:", error));
}

function loadProteins() {
  fetch(`${apiUrl}/proteins`, {
    headers: {
      "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const proteinsDiv = document.getElementById("proteins");
      data.forEach((protein) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = protein.id;
        checkbox.name = "proteins";
        checkbox.value = protein.id;

        const label = document.createElement("label");
        label.htmlFor = protein.id;
        label.textContent = protein.name;

        proteinsDiv.appendChild(checkbox);
        proteinsDiv.appendChild(label);
        proteinsDiv.appendChild(document.createElement("br"));
      });
    })
    .catch((error) => console.error("Erro ao carregar as proteínas:", error));
}

function submitLamen() {
  const broth = document.getElementById("broth").value;
  const proteins = Array.from(
    document.querySelectorAll('input[name="proteins"]:checked')
  ).map((checkbox) => checkbox.value);

  if (!broth || proteins.length === 0) {
    document.getElementById("response").innerText =
      "Por favor, escolha pelo menos um caldo e uma proteína.";
    return;
  }

  const lamenData = {
    brothId: broth,
    proteinId: proteins[0], // Aqui estamos assumindo apenas uma proteína selecionada
  };

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
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById(
        "response"
      ).innerText = `Pedido realizado com sucesso! ID do pedido: ${data.orderId}`;
    })
    .catch((error) => {
      console.error("Erro ao realizar o pedido:", error);
      document.getElementById("response").innerText =
        "Erro ao realizar o pedido. Tente novamente.";
    });
}
