// Show the form
function showForm() {
  document.getElementById("detailsForm").style.display = "block";
  openTab(null, 'personal'); // Default open tab
}

// Hide the form
function hideForm() {
  document.getElementById("detailsForm").style.display = "none";
}

// Switch tabs (Personal, Professional, Education)
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  if (evt) evt.currentTarget.classList.add("active");
  document.getElementById(tabName).style.display = "block";
}
function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const ageInput = document.getElementById("age");

  if (dobInput) {
    const dob = new Date(dobInput);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    ageInput.value = age;
  }
}


// Step-by-step navigation in Education
function goToNextStep(stepNumber) {
  const steps = document.querySelectorAll(".education-section");
  const circles = document.querySelectorAll(".step-circle");

  steps.forEach(step => step.style.display = "none");
  document.getElementById(`step${stepNumber}`).style.display = "block";

  circles.forEach(circle => circle.classList.remove("active"));
  document.querySelector(`[data-step="step${stepNumber}"]`).classList.add("active");
}

// Toggle PG fields in PhD step
function togglePgInPhd(value) {
  const pgFields = document.getElementById("phdPgFields");
  pgFields.style.display = value === "yes" ? "block" : "none";
}
let storedExperiences = [];

    // Add experience input form and hide the previous one if any
    function addExperience() {
      // Hide all previous input blocks
      document.querySelectorAll(".experience-input").forEach(div => div.style.display = "none");

      const container = document.getElementById("experienceList");
      const div = document.createElement("div");
      div.className = "experience-input";
      div.innerHTML = `
        <label>Field: 
          <select required>
            <option value="">Select Field</option>
            <option value="IT">IT</option>
            <option value="Teaching">Teaching</option>
          </select>
        </label>
        <label>Organization: <input type="text" required /></label>
        <label>City: <input type="text" required /></label>
        <label>State: <input type="text" required /></label>
        <label>Start Date: <input type="date" required onchange="calculateTotalExperience()" /></label>
        <label>End Date: <input type="date" required onchange="calculateTotalExperience()" /></label>
        <button type="button" onclick="this.parentElement.remove(); calculateTotalExperience();">Remove</button>
      `;
      container.appendChild(div);
    }

    // Save the entered experience and move to summary view
    function storeExperience() {
      const inputBlocks = document.querySelectorAll(".experience-input");
      inputBlocks.forEach(exp => {
        const field = exp.children[0].children[0].value;
        const organization = exp.children[1].children[0].value;
        const city = exp.children[2].children[0].value;
        const state = exp.children[3].children[0].value;
        const startDate = exp.children[4].children[0].value;
        const endDate = exp.children[5].children[0].value;

        if (field && organization && city && state && startDate && endDate) {
          storedExperiences.push({ field, organization, city, state, startDate, endDate });

          // Move to summary view
          exp.innerHTML = `
            <p><strong>${field}</strong> at ${organization}, ${city}, ${state}  
            (${startDate} to ${endDate})</p>
          `;
          exp.classList.remove("experience-input");
          exp.classList.add("experience-saved");
        }
      });

      calculateTotalExperience();
    }

    // Calculate total experience in different formats
    function calculateTotalExperience() {
      let itDays = 0;
      let teachingDays = 0;

      [...storedExperiences, ...document.querySelectorAll("#experienceList div")].forEach(exp => {
        const field = exp.field || exp.children[0].children[0].value;
        const startDate = new Date(exp.startDate || exp.children[4].children[0].value);
        const endDate = new Date(exp.endDate || exp.children[5].children[0].value);

        if (!isNaN(startDate) && !isNaN(endDate) && endDate > startDate) {
          const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (field === "IT") {
            itDays += days;
          } else if (field === "Teaching") {
            teachingDays += days;
          }
        }
      });

      function formatExperience(days) {
        const unit = document.getElementById("experienceUnit").value;
        if (unit === "d") {
          return `${Math.floor(days)} Days`;
        } else if (unit === "md") {
          const months = Math.floor(days / 30);
          const d = Math.floor(days % 30);
          return `${months} Months ${d} Days`;
        } else {
          const years = Math.floor(days / 365);
          const months = Math.floor((days % 365) / 30);
          return `${years} Years ${months} Months`;
        }
      }

      document.getElementById("itExperience").textContent = formatExperience(itDays);
      document.getElementById("teachingExperience").textContent = formatExperience(teachingDays);
      document.getElementById("totalExperience").textContent = formatExperience(itDays + teachingDays);
    }

    // Clear all experiences
    function clearExperiences() {
      document.getElementById("experienceList").innerHTML = "";
      storedExperiences = [];
      calculateTotalExperience();
    }
function showStep(stepNumber) {
  const steps = document.querySelectorAll(".education-section");
  const circles = document.querySelectorAll(".step-circle");

  // Hide all education sections
  steps.forEach(section => section.style.display = "none");

  // Show the selected step
  const currentStep = document.getElementById(`step${stepNumber}`);
  if (currentStep) currentStep.style.display = "block";

  // Update active circles
  circles.forEach(circle => {
    const stepIndex = parseInt(circle.getAttribute("data-step").replace("step", ""));
    if (stepIndex === stepNumber) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
}
function goToPreviousStep(stepNumber) {
  // Hide all sections
  const steps = document.querySelectorAll(".education-section");
  steps.forEach((step) => step.style.display = "none");

  // Show the previous section
  document.getElementById(`step${stepNumber}`).style.display = "block";

  // Update step circles
  document.querySelectorAll(".step-circle").forEach((circle) => {
    circle.classList.remove("active");
  });
  document.querySelector(`.step-circle[data-step="step${stepNumber}"]`).classList.add("active");
}

// Submit form
function submitForm(event) {
  event.preventDefault();
  alert("Form submitted successfully!");
}
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  const tabButtons = document.getElementsByClassName("tab-button");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");

  // Toggle buttons based on tab
  const nextSaveButton = document.getElementById("nextSaveButton");
  const submitButton = document.getElementById("submitButton");

  if (tabName === "education") {
    nextSaveButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextSaveButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function goToNextTab() {
  const tabs = ["personal", "professional", "education"];
  for (let i = 0; i < tabs.length - 1; i++) {
    if (document.getElementById(tabs[i]).style.display === "block") {
      document.querySelector(`button[onclick*="${tabs[i + 1]}"]`).click();
      break;
    }
  }
}

function goToNextStep(nextStep) {
  const currentStep = nextStep - 1;

  // Hide current section
  document.getElementById(`step${currentStep}`).style.display = "none";

  // Show next section
  document.getElementById(`step${nextStep}`).style.display = "block";

  // Update step circles
  const stepCircles = document.getElementsByClassName("step-circle");
  for (let i = 0; i < stepCircles.length; i++) {
    stepCircles[i].classList.remove("active");
  }

  document.querySelector(`.step-circle[data-step="step${currentStep}"]`).classList.add("completed");
  document.querySelector(`.step-circle[data-step="step${nextStep}"]`).classList.add("active");
}

function goToPreviousStep(prevStep) {
  const nextStep = prevStep + 1;

  // Hide next section
  document.getElementById(`step${nextStep}`).style.display = "none";

  // Show previous section
  document.getElementById(`step${prevStep}`).style.display = "block";

  // Update step circles
  const stepCircles = document.getElementsByClassName("step-circle");
  for (let i = 0; i < stepCircles.length; i++) {
    stepCircles[i].classList.remove("active");
  }

  document.querySelector(`.step-circle[data-step="step${nextStep}"]`).classList.remove("active");
  document.querySelector(`.step-circle[data-step="step${prevStep}"]`).classList.add("active");
}   




