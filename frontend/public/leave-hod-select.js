





  /*document.addEventListener("DOMContentLoaded", () => {
    const departmentSelect = document.getElementById("hod-department");
    const facultyTableBody = document.querySelector("#facultyTable tbody");
  
    // Sample faculty data (can be replaced with API later)
    const facultyData = {
      cs: [
        { id: "f001", name: "Dr. A. Ramesh", email: "ramesh@univ.edu" },
        { id: "f002", name: "Dr. S. Priya", email: "priya@univ.edu" }
      ],
      bio: [
        { id: "f003", name: "Dr. V. Raj", email: "raj@univ.edu" },
        { id: "f004", name: "Dr. M. Neha", email: "neha@univ.edu" }
      ],
      phy: [
        { id: "f005", name: "Dr. P. Kiran", email: "kiran@univ.edu" },
        { id: "f006", name: "Dr. J. Sneha", email: "sneha@univ.edu" }
      ]
    };
  
    departmentSelect.addEventListener("change", () => {
      const selectedDept = departmentSelect.value;
      facultyTableBody.innerHTML = "";
  
      if (!selectedDept || !facultyData[selectedDept]) {
        facultyTableBody.innerHTML = `<tr><td colspan="3">No faculty found for this department.</td></tr>`;
        return;
      }
  
      const facultyList = facultyData[selectedDept];
  
      facultyList.forEach(faculty => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${faculty.name}</td>
          <td>${faculty.email}</td>
          <td>
            <button class="view-requests-btn" data-id="${faculty.id}" data-name="${faculty.name}">
              View Leave Requests
            </button>
          </td>
        `;
        // Example: When Leave Requests button is clicked, display the leave section
document.getElementById('leaveTab').addEventListener('click', function() {
    // Hide other sections if any
    document.getElementById('facultySection').style.display = 'none';
    document.getElementById('leaveSection').style.display = 'block';
    
    // You may want to fetch the leave requests at this point
    const facultyId = getSelectedFacultyId(); // Ensure you have this function to get faculty ID
    fetchLeaveRequests(facultyId);
  });
  
  // Function to fetch leave requests (you will need the facultyId for this)
  const fetchLeaveRequests = async (facultyId) => {
    try {
      const response = await fetch(`/api/leave-requests/${facultyId}`);
      const leaveRequests = await response.json();
  
      // Populate the leave requests table dynamically
      const leaveTable = document.getElementById('leaveTable').getElementsByTagName('tbody')[0];
      leaveTable.innerHTML = ''; // Clear existing rows
      
      leaveRequests.forEach(request => {
        const row = leaveTable.insertRow();
        row.innerHTML = `
          <td>${new Date(request.fromDate).toLocaleDateString()}</td>
          <td>${new Date(request.toDate).toLocaleDateString()}</td>
          <td>${request.reason}</td>
          <td>${request.status}</td>
          <td>
            ${request.status === 'Pending' ? 
              `<button class="approve-btn" data-id="${request._id}">Approve</button>
               <button class="reject-btn" data-id="${request._id}">Reject</button>`
              : ''}
          </td>
        `;
      });
  
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };
  
  // Function to handle Approve action
  document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('approve-btn')) {
      const leaveRequestId = event.target.getAttribute('data-id');
      approveLeaveRequest(leaveRequestId);
    }
  });
  
  // Function to handle Reject action
  document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('reject-btn')) {
      const leaveRequestId = event.target.getAttribute('data-id');
      rejectLeaveRequest(leaveRequestId);
    }
  });
  
  // Approve leave request function
  const approveLeaveRequest = async (leaveRequestId) => {
    try {
      const response = await fetch(`/api/leave-requests/${leaveRequestId}/approve`, { method: 'PUT' });
      const result = await response.json();
      alert(result.message);
      fetchLeaveRequests(getSelectedFacultyId()); // Refresh the leave requests
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };
  
  // Reject leave request function
  const rejectLeaveRequest = async (leaveRequestId) => {
    try {
      const response = await fetch(`/api/leave-requests/${leaveRequestId}/reject`, { method: 'PUT' });
      const result = await response.json();
      alert(result.message);
      fetchLeaveRequests(getSelectedFacultyId()); // Refresh the leave requests
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };
  
  // Dummy function to get the selected faculty ID
  // You need to implement a way to get the selected faculty ID based on the current context
  const getSelectedFacultyId = () => {
    return 'facultyId123'; // Return actual faculty ID
  };
  
        facultyTableBody.appendChild(row);
      });
    });
  });

  */
  




  // Example of HOD selection and populating the faculty list
document.getElementById('hod-department').addEventListener('change', function() {
    const department = this.value;
    const facultyListSection = document.getElementById('facultySection');

    
    // Clear previous faculty list
    const facultyTableBody = document.getElementById('facultyTable').getElementsByTagName('tbody')[0];
    facultyTableBody.innerHTML = ''; // Clear old rows
    
    if(department) {
        // Fetch faculty data based on selected department
        fetch(`/api/faculty/${department}`)
            .then(response => response.json())
            .then(facultyList => {
                facultyListSection.style.display = 'block';
                facultyList.forEach(faculty => {
                    const row = facultyTableBody.insertRow();
                    row.innerHTML = `
                        <td>${faculty.name}</td>
                        <td>${faculty.email}</td>
                        <td>
                            <button class="leave-req-btn" data-faculty-id="${faculty._id}">View Leave Requests</button>
                        </td>
                    `;
                });
            })
            .catch(error => {
                console.error('Error fetching faculty data:', error);
            });
    } else {
        facultyListSection.style.display = 'none';
    }
});
