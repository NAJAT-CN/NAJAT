document.getElementById('artistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input, textarea');
    const artistData = {};
    inputs.forEach(input => {
        if (input.type === 'file') {
            artistData[input.accept.includes('video') ? 'video' : 'image'] = input.files[0]?.name || "placeholder";
        } else {
            artistData[input.placeholder] = input.value;
        }
    });

    const submissions = JSON.parse(localStorage.getItem('artists')) || [];
    submissions.push(artistData);
    localStorage.setItem('artists', JSON.stringify(submissions));
    alert("Submission received!");
    this.reset();
});

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password === "najat123") {
        document.getElementById('adminPanel').classList.remove('hidden');
        loadSubmissions();
    } else {
        alert("Incorrect password!");
    }
});

function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('artists')) || [];
    const container = document.getElementById('submissionsContainer');
    container.innerHTML = '';
    submissions.forEach((artist, index) => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.margin = '10px 0';
        div.style.padding = '10px';
        div.innerHTML = `
            <strong>Name:</strong> ${artist['Full Name'] || ''}<br>
            <strong>Email:</strong> ${artist['Email'] || ''}<br>
            <strong>About:</strong> ${artist['Tell us about yourself'] || ''}<br>
            <strong>Photo:</strong> <br><img src="https://via.placeholder.com/150" alt="Artist Image"><br>
            <strong>Video:</strong> <br><video width="200" controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>
        `;
        container.appendChild(div);
    });
}
