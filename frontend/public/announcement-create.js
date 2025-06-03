// Handle form submission to create a new announcement
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('announcement-form');

    // When the form is submitted, prevent the default behavior
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        createAnnouncement(title, content);
    });
});

// Function to create a new announcement
const createAnnouncement = (title, content) => {
    const announcement = {
        title: title,
        content: content
    };

    // Send POST request to the backend to create the announcement
    fetch('/api/announcements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcement)
    })
    .then(response => response.json())
    .then(result => {
        alert('Announcement created successfully!');
        document.getElementById('title').value = ''; // Clear title input
        document.getElementById('content').value = ''; // Clear content input
    })
    .catch(error => {
        console.error('Error creating announcement:', error);
        alert('Failed to create announcement');
    });
};
