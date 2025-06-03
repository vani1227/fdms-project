// When the HOD department dropdown is changed
document.getElementById("review-hod-department").addEventListener("change", function () {
    const selectedDept = this.value;
    const facultyTableBody = document.querySelector("#reviewFacultyTable tbody");
    facultyTableBody.innerHTML = ""; // Clear previous results
  
    if (!selectedDept) return;
  
    // Simulated backend data (replace with fetch in real app)
    const facultyData = {
      cs: [
        { name: "Dr. Ananya Roy", email: "ananya@univ.edu" },
        { name: "Mr. Ravi Kumar", email: "ravi.k@univ.edu" }
      ],
      it: [
        { name: "Ms. Priya Sharma", email: "priya.sharma@univ.edu" },
        { name: "Mr. Arjun Patel", email: "arjun.p@univ.edu" }
      ],
      ece: [
        { name: "Dr. Rekha Mehta", email: "rekha.m@univ.edu" }
      ]
    };
  
    const facultyList = facultyData[selectedDept] || [];
  
    facultyList.forEach(faculty => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${faculty.name}</td>
        <td>${faculty.email}</td>
        <td>
          <button class="review-btn" data-name="${faculty.name}" data-email="${faculty.email}">
            Submit Review
          </button>
        </td>
      `;
      facultyTableBody.appendChild(row);
    });
  
    // Add click event to each review button
    document.querySelectorAll(".review-btn").forEach(button => {
      button.addEventListener("click", function () {
        const name = this.dataset.name;
        const email = this.dataset.email;
  
        // Auto-fill the review form with faculty info
        document.getElementById("facultyName").value = name;
        document.getElementById("facultyEmail").value = email;
        document.getElementById("reviewFormSection").style.display = "block";
  
        // Scroll to form
        document.getElementById("reviewFormSection").scrollIntoView({ behavior: "smooth" });
      });
    });
  });
  