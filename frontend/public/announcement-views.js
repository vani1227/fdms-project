document.addEventListener("DOMContentLoaded", () => {
    fetchAnnouncements();
  });
  
  function fetchAnnouncements() {
    fetch('/api/announcements') // Your backend route
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector("#announcementTable tbody");
        tbody.innerHTML = "";
  
        data.forEach(announcement => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
            <td>${announcement.title}</td>
            <td>${announcement.content}</td>
            <td>${new Date(announcement.date).toLocaleDateString()}</td>
          `;
  
          tbody.appendChild(row);
        });
      })
      .catch(err => console.error("Error loading announcements:", err));
  }
  