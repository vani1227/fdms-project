/*document.addEventListener("DOMContentLoaded", () => {
    fetchDepartments();
});

function fetchDepartments() {
    fetch("/api/hod/departments", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            const deptList = document.getElementById("departments");
            deptList.innerHTML = "";
            data.forEach(dept => {
                let li = document.createElement("li");
                li.textContent = dept.name;
                li.onclick = () => fetchFaculty(dept._id);
                deptList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching departments:", error));
}

function fetchFaculty(departmentId) {
    fetch(`/api/hod/faculty/${departmentId}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            const facultyList = document.getElementById("faculty");
            facultyList.innerHTML = "";
            data.forEach(fac => {
                let li = document.createElement("li");
                li.textContent = `${fac.name} - ${fac.designation}`;
                facultyList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching faculty:", error));
}

function logout() {
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
        .then(() => window.location.href = "login.html")
        .catch(error => console.error("Error logging out:", error));
}      */










   /* document.addEventListener("DOMContentLoaded", fetchDepartments);

function fetchDepartments() {
    fetch("/api/hod/departments", { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            const departmentSelect = document.getElementById("departmentSelect");
            departmentSelect.innerHTML = '<option value="">-- Select --</option>';
            
            data.forEach(dept => {
                let option = document.createElement("option");
                option.value = dept._id;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching departments:", error));
}

function fetchFaculty() {
    const departmentId = document.getElementById("departmentSelect").value;
    if (!departmentId) return;

    fetch(`/api/hod/hod1/${departmentId}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            const facultyTableBody = document.getElementById("facultyTableBody");
            facultyTableBody.innerHTML = "";

            if (data.length === 0) {
                facultyTableBody.innerHTML = "<tr><td colspan='3'>No faculty found</td></tr>";
                return;
            }

            data.forEach(faculty => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${faculty.name}</td>
                                 <td>${faculty.email}</td>
                                 <td>${faculty.designation}</td>`;
                facultyTableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching faculty:", error));
}

function logout() {
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
        .then(() => window.location.href = "login.html")
        .catch(error => console.error("Error logging out:", error));
}*/


document.addEventListener("DOMContentLoaded", () => {
    fetchHODProfile();

    // Attach event listeners to nav items
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            const section = e.target.textContent.trim();
            loadFacultyList(section);  // call on click
        });
    });
});

let hodDepartment = "";

// Fetch HOD's department
function fetchHODProfile() {
    fetch("/api/hod/profile", { credentials: "include" })
        .then(res => res.json())
        .then(profile => {
            hodDepartment = profile.department;
            document.getElementById("dept-name").textContent = hodDepartment;
        })
        .catch(err => {
            console.error("Error fetching HOD profile:", err);
            document.getElementById("dept-name").textContent = "Unknown";
        });
}

// Fetch faculty by HOD department
function loadFacultyList(sectionName) {
    const contentArea = document.getElementById("content-area");
    contentArea.innerHTML = `<h2>${sectionName}</h2><p>Loading faculty list...</p>`;

    fetch(`/api/hod/hod1/${hodDepartment}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            if (data.length === 0) {
                tableHTML += `<tr><td colspan="3">No faculty found</td></tr>`;
            } else {
                data.forEach(faculty => {
                    tableHTML += `
                        <tr>
                            <td>${faculty.name}</td>
                            <td>${faculty.email}</td>
                            <td>${faculty.designation}</td>
                        </tr>
                    `;
                });
            }

            tableHTML += `</tbody></table>`;
            contentArea.innerHTML = `<h2>${sectionName}</h2>${tableHTML}`;
        })
        .catch(error => {
            console.error("Error fetching faculty:", error);
            contentArea.innerHTML = `<h2>${sectionName}</h2><p>Error loading data.</p>`;
        });
}

// Logout function
function logout() {
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
        .then(() => window.location.href = "login.html")
        .catch(error => console.error("Error logging out:", error));
}
