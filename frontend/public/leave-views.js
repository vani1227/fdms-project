/*document.addEventListener("DOMContentLoaded", () => {
    const facultyTableBody = document.querySelector("#facultyTable tbody");
    const leaveSection = document.getElementById("leaveSection");
    const leaveTableBody = document.querySelector("#leaveTable tbody");
    const selectedFacultyName = document.getElementById("selectedFacultyName");
  
    // Sample leave requests data (hardcoded for testing)
    const leaveRequestsData = {
      f001: [
        { id: "lr001", from: "2025-05-01", to: "2025-05-05", reason: "Conference", status: "Pending" },
        { id: "lr002", from: "2025-06-10", to: "2025-06-15", reason: "Vacation", status: "Pending" }
      ],
      f002: [
        { id: "lr003", from: "2025-07-01", to: "2025-07-10", reason: "Sick Leave", status: "Pending" }
      ],
      f003: [
        { id: "lr004", from: "2025-05-15", to: "2025-05-20", reason: "Medical Treatment", status: "Pending" }
      ]
    };
  
    // Event listener for faculty selection
    facultyTableBody.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("view-requests-btn")) {
        const facultyId = event.target.getAttribute("data-id");
        const facultyName = event.target.getAttribute("data-name");
  
        // Update UI
        selectedFacultyName.textContent = facultyName;
        leaveSection.style.display = "block"; // Show the leave requests section
  
        // Clear any previous leave requests
        leaveTableBody.innerHTML = "";
  
        // Get leave requests for the selected faculty
        const leaveRequests = leaveRequestsData[facultyId];
  
        if (!leaveRequests || leaveRequests.length === 0) {
          leaveTableBody.innerHTML = `<tr><td colspan="5">No leave requests found.</td></tr>`;
          return;
        }
  
        leaveRequests.forEach((leaveRequest) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${leaveRequest.from}</td>
            <td>${leaveRequest.to}</td>
            <td>${leaveRequest.reason}</td>
            <td>${leaveRequest.status}</td>
            <td>
              <button class="approve-btn" data-id="${leaveRequest.id}" data-faculty-id="${facultyId}">
                Approve
              </button>
            </td>
          `;
          leaveTableBody.appendChild(row);
        });
      }
    });
  
    // Event listener for approving leave
    leaveTableBody.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("approve-btn")) {
        const leaveId = event.target.getAttribute("data-id");
        const facultyId = event.target.getAttribute("data-faculty-id");
  
        // Simulate approval process (In real case, this should be done via an API)
        approveLeaveRequest(facultyId, leaveId);
        
        // Update UI: Change status to 'Approved'
        const leaveRow = event.target.closest("tr");
        leaveRow.querySelector("td:nth-child(4)").textContent = "Approved";
  
        // Change button text to "Approved"
        event.target.textContent = "Approved";
        event.target.disabled = true; // Disable the button after approval
      }
    });
  
    // Simulate leave approval process (you can later connect it to your backend API)
    function approveLeaveRequest(facultyId, leaveId) {
      console.log(`Leave ID ${leaveId} for Faculty ID ${facultyId} has been approved.`);
      // Here you can add logic to update the backend (send request to API)
      // For example:
      // fetch('/api/approve-leave', {
      //   method: 'POST',
      //   body: JSON.stringify({ leaveId, facultyId }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => response.json())
      //   .then(data => console.log(data));
    }
  });   */

  // Event listener for showing leave requests when "View Leave Requests" is clicked
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('leave-req-btn')) {
        const facultyId = event.target.getAttribute('data-faculty-id');
        const leaveSection = document.getElementById('leaveSection');
        const selectedFacultyName = document.getElementById('selectedFacultyName');
        selectedFacultyName.textContent = event.target.closest('tr').children[0].textContent; // Set faculty name
        leaveSection.style.display = 'block';
        
        // Fetch leave requests for the selected faculty
        fetchLeaveRequests(facultyId);
    }
});

// Function to fetch leave requests for a specific faculty
const fetchLeaveRequests = (facultyId) => {
    fetch(`/api/leave-requests/${facultyId}`)
        .then(response => response.json())
        .then(leaveRequests => {
            const leaveTableBody = document.getElementById('leaveTable').getElementsByTagName('tbody')[0];
            leaveTableBody.innerHTML = ''; // Clear previous leave requests

            leaveRequests.forEach(request => {
                const row = leaveTableBody.insertRow();
                row.innerHTML = `
                    <td>${new Date(request.fromDate).toLocaleDateString()}</td>
                    <td>${new Date(request.toDate).toLocaleDateString()}</td>
                    <td>${request.reason}</td>
                    <td>${request.status}</td>
                    <td>
                        ${request.status === 'Pending' ?
                            `<button class="approve-btn" data-request-id="${request._id}">Approve</button>` : ''}
                    </td>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching leave requests:', error);
        });
};

// Approve button functionality
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('approve-btn')) {
        const requestId = event.target.getAttribute('data-request-id');
        
        // Approve leave request by calling the API
        approveLeaveRequest(requestId);
    }
});

// Function to approve leave request
const approveLeaveRequest = (requestId) => {
    fetch(`/api/leave-requests/${requestId}/approve`, { method: 'PUT' })
        .then(response => response.json())
        .then(result => {
            alert(result.message); // Show message on approval
            fetchLeaveRequests(getSelectedFacultyId()); // Refresh the leave requests table
        })
        .catch(error => {
            console.error('Error approving leave request:', error);
        });
};

  






  