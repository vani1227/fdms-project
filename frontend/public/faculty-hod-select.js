// Sample data for faculty members (this can be replaced with data from a backend API)
const facultyData = {
    cs: [
        {
            id: 1,
            name: "Dr. Alice Johnson",
            role: "Professor",
            email: "alice.johnson@university.com",
            phone: "+1234567890",
            profilePic: "images/faculty1.jpg" // Example image path
        },
        {
            id: 2,
            name: "Dr. Bob Smith",
            role: "Associate Professor",
            email: "bob.smith@university.com",
            phone: "+1234567891",
            profilePic: "images/faculty2.jpg"
        }
    ],
    bio: [
        {
            id: 3,
            name: "Dr. Carol White",
            role: "Lecturer",
            email: "carol.white@university.com",
            phone: "+1234567892",
            profilePic: "images/faculty3.jpg"
        },
        {
            id: 4,
            name: "Dr. David Green",
            role: "Assistant Professor",
            email: "david.green@university.com",
            phone: "+1234567893",
            profilePic: "images/faculty4.jpg"
        }
    ],
    phy: [
        {
            id: 5,
            name: "Dr. Eva Brown",
            role: "Professor",
            email: "eva.brown@university.com",
            phone: "+1234567894",
            profilePic: "images/faculty5.jpg"
        }
    ]
};

// Event listener for loading faculty based on department selection
function loadFaculty() {
    const department = document.getElementById('hod-department').value;
    const facultyTableBody = document.querySelector('#faculty-table tbody');
    
    // Clear previous faculty rows
    facultyTableBody.innerHTML = '';

    if (department && facultyData[department]) {
        // Loop through the faculty data for the selected department and create rows
        facultyData[department].forEach(faculty => {
            const facultyRow = document.createElement('tr');
            
            facultyRow.innerHTML = `
                <td><a href="#" onclick="openFacultyModal(${faculty.id})">${faculty.name}</a></td>
                <td>${faculty.role}</td>
                <td>${faculty.email}</td>
                <td>${faculty.phone}</td>
            `;
            
            // Append faculty row to the table body
            facultyTableBody.appendChild(facultyRow);
        });
    } else {
        // If no department is selected or no faculty data is found, show a message
        facultyTableBody.innerHTML = '<tr><td colspan="4">No faculty available for the selected department.</td></tr>';
    }
}

// Function to open the faculty details modal
function openFacultyModal(facultyId) {
    const department = document.getElementById('hod-department').value;
    const faculty = facultyData[department].find(fac => fac.id === facultyId);

    document.getElementById('faculty-name').innerText = faculty.name;
    document.getElementById('faculty-role').innerText = faculty.role;
    document.getElementById('faculty-email').innerText = faculty.email;
    document.getElementById('faculty-phone').innerText = faculty.phone;
    document.getElementById('faculty-profile-pic').src = faculty.profilePic;

    // Display the modal
    const modal = document.getElementById('faculty-modal');
    modal.style.display = 'block';
}

// Event listener to close the modal
document.querySelector('.close-btn').addEventListener('click', () => {
    const modal = document.getElementById('faculty-modal');
    modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('faculty-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
