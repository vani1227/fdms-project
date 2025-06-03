// Simulated reviews data (replace this with a backend API call)
const reviewData = [
    {
      name: "Dr. Ananya Roy",
      email: "ananya@univ.edu",
      feedback: "Excellent in research and teaching methodology.",
      rating: "5"
    },
    {
      name: "Mr. Ravi Kumar",
      email: "ravi.k@univ.edu",
      feedback: "Very punctual and dedicated to students.",
      rating: "4"
    }
  ];
  
  // Function to populate reviews table
  function populateReviewTable() {
    const reviewTableBody = document.querySelector("#existingReviewTable tbody");
    reviewTableBody.innerHTML = ""; // Clear existing rows
  
    reviewData.forEach(review => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${review.name}</td>
        <td>${review.email}</td>
        <td>${review.feedback}</td>
        <td>${review.rating} ⭐</td>
      `;
      reviewTableBody.appendChild(row);
    });
  }
  
  // Run on page load
  window.addEventListener("DOMContentLoaded", populateReviewTable);
  