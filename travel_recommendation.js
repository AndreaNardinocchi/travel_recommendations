const btnSearch = document.getElementById("btnSearch");
const travelDests = [];

function searchTravelDest() {
  const input = document
    .getElementById("travelDestInput")
    .value.toLowerCase()
    .trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let found = false;
      const keyword = input;

      if (["beach", "beaches"].includes(keyword)) {
        resultDiv.innerHTML += `<h2 style="text-align: center; font-size: 195%">Beaches</h2>`;
        const cardsWrapper = document.createElement("div");
        cardsWrapper.className = "cards-container";

        data.beaches.forEach((beach) => {
          cardsWrapper.innerHTML += `
            <div class="card">
              <h3>${beach.name}</h3>
              <img src="${beach.imageUrl}" alt="${beach.name}">
              <p>${beach.description}</p>
               <button class="destButton">Find out more</button>
            </div>
          `;
        });

        resultDiv.appendChild(cardsWrapper);
        found = true;
      } else if (["temple", "temples"].includes(keyword)) {
        resultDiv.innerHTML += `<h2 style="text-align: center; font-size: 195%">Temples</h2>`;
        const cardsWrapper = document.createElement("div");
        cardsWrapper.className = "cards-container";

        data.temples.forEach((temple) => {
          cardsWrapper.innerHTML += `
            <div class="card">
              <h3>${temple.name}</h3>
              <img src="${temple.imageUrl}" alt="${temple.name}">
              <p>${temple.description}</p>
              <button class="destButton">Find out more</button>
            </div>
          `;
        });

        resultDiv.appendChild(cardsWrapper);
        found = true;
      } else {
        const country = data.countries.find(
          (item) => item.name.toLowerCase() === keyword
        );

        if (country) {
          resultDiv.innerHTML += `<h2 style="text-align: center; font-size: 195%">${country.name}</h2>`;
          const cardsWrapper = document.createElement("div");
          cardsWrapper.className = "cards-container";

          country.cities.forEach((city) => {
            let timeZone = "";
            const cityName = country.cities[0].name.toLowerCase(); // Get first city name

            switch (cityName) {
              case "rio de janeiro, brazil":
                timeZone = "America/Sao_Paulo"; // Rio
                break;
              case "são paulo, brazil":
                timeZone = "America/Sao_Paulo"; // Same
                break;
              case "tokyo, japan":
                timeZone = "Asia/Tokyo";
                break;
              case "kyoto, japan":
                timeZone = "Asia/Tokyo";
                break;
              case "sydney, australia":
                timeZone = "Australia/Sydney";
                break;
              case "melbourne, australia":
                timeZone = "Australia/Melbourne";
                break;
              default:
                timeZone = "UTC";
            }

            const options = {
              timeZone,
              hour12: true,
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };

            const cityTime = new Date().toLocaleTimeString("en-US", options);
            console.log(`Current time in ${country.name}:`, cityTime); // ✅ now this will run

            cardsWrapper.innerHTML += `
              <div class="card">
                <h3>${city.name} | ${cityTime}</h3>
                <img src="${city.imageUrl}" alt="${city.name}">
                <p>${city.description}</p>
                <button class="destButton">Find out more</button>
              </div>
            `;
          });

          resultDiv.appendChild(cardsWrapper);
          found = true;
        } else {
          resultDiv.innerHTML = "Destination not found.";
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

btnSearch.addEventListener("click", searchTravelDest);

function clearDest() {
  document.getElementById("btnReset").addEventListener("click", function () {
    document.getElementById("travelDestInput").value = "";
    document.getElementById("result").innerHTML = "";
  });
}

clearDest();
