// Créer une interface admin pour afficher les données des utilisateurs
// Faite un appel à l'api pour récupérer les données des utilisateurs
// https://randomuser.me/api/?nat=fr&results=50
// Afficher les données dans l'order alphabétique
// réaliser un filtre de recherche par nom d'utilisateur

fetchUsers();


function fetchUsers() {
  fetch('https://randomuser.me/api/?nat=fr&results=50')
      .then(response => response.json())
      .then(data => {
          displayUsers(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
}

function displayUsers(users) {
  const userTableBody = document.querySelector('tbody');

  users.sort((a, b) => a.name.last.localeCompare(b.name.last));

  users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <img src="${user.picture.thumbnail}" alt="Profile Picture" width="30" height="30" style="border-radius: 50%; margin-right: 10px;">
                ${user.name.first} ${user.name.last}
          <td>${user.email}</td>
          <td>${user.phone}</td>
      `;
      userTableBody.appendChild(row);
  });
}

//==================================================\\

document.querySelector('#searchInput').addEventListener('input', function() {
    
  const searchTerm = this.value.toLowerCase(); 
  const userRows = document.querySelectorAll('tbody tr'); // Get all rows from the table
  
  
  userRows.forEach(row => {
      const userName = row.querySelector('td').textContent.toLowerCase(); // Get the name (first <td>)
      const userEmail = row.querySelectorAll('td')[1].textContent.toLowerCase(); // Get the email (second <td>)

      // Check if the search term matches the name or email
      if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
          row.style.display = ''; // Show the row if it matches
      } else {
          row.style.display = 'none'; // Hide the row if it doesn't match
      }
  });
});