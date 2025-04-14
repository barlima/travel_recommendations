const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");

function searchCondition() {
  const input = document.getElementById("conditionInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const key = Object.keys(data).find((key) =>
        key.toLowerCase().includes(input.toLowerCase())
      );

      const locations = data[key];

      if (locations && locations.length > 0) {
        locations.forEach((location) => {
          resultDiv.innerHTML += `<div class="location-card">
          <img src="${location.imageUrl}" alt="hjh">
          <h2>${location.name}</h2>
          <p>${location.description}</p>
          <button class="btn-visit">Visit</button>
          </div>`;
        });
      } else {
        resultDiv.innerHTML = "Location not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}
btnSearch.addEventListener("click", searchCondition);

function resetCondition() {
  const input = document.getElementById("conditionInput");
  input.value = "";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}

btnReset.addEventListener("click", resetCondition);

document.addEventListener("DOMContentLoaded", () => {
  // Handle contact form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          contactForm.reset();
        } else {
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  }

  // Handle search functionality
  const searchButton = document.getElementById("btnSearch");
  const resetButton = document.getElementById("btnReset");
  const searchInput = document.getElementById("conditionInput");

  if (searchButton && resetButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Implement search functionality here
        console.log("Searching for:", searchTerm);
      }
    });

    resetButton.addEventListener("click", () => {
      searchInput.value = "";
    });
  }
});
