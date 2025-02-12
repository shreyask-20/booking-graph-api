document.getElementById("bookingForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("date").value;

  const query = `
      mutation {
          addBooking(name: "${name}", email: "${email}", destination: "${destination}", date: "${date}") {
              id
              name
              email
              destination
              date
          }
      }
  `;

  await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
  });

  loadBookings();
});

async function loadBookings() {
  const query = `{ bookings { id name email destination date } }`;
  const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  const list = document.getElementById("bookingsList");
  list.innerHTML = "";
  data.bookings.forEach(booking => {
      list.innerHTML += `<li>${booking.name} - ${booking.destination} (${booking.date})</li>`;
  });
}

loadBookings();
