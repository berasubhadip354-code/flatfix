function toggleNav() {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
}

function choose(serviceName, icon) {
  const service = document.getElementById("service");

  if (service) {
    service.value = serviceName;
  }

  const booking = document.getElementById("book");

  if (booking) {
    booking.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  showToast(icon + " " + serviceName + " selected");
}

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function submitBooking(event) {
  event.preventDefault();

  const service = document.getElementById("service").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const details = document.getElementById("details").value.trim();

  if (!service || !name || !phone || !address || !date || !time) {
    alert("Please fill in all required fields.");
    return;
  }

  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const bookingId =
    "FF-" + Date.now().toString().slice(-6);

  const booking = {
    id: bookingId,
    service: service,
    name: name,
    phone: cleanPhone,
    address: address,
    date: date,
    time: time,
    details: details
  };

  const bookings =
    JSON.parse(localStorage.getItem("flatfixBookings") || "[]");

  bookings.push(booking);

  localStorage.setItem(
    "flatfixBookings",
    JSON.stringify(bookings)
  );

  document.getElementById("bookingForm").reset();

  alert(
    "Booking Confirmed! 🎉\n\n" +
    "Booking ID: " + bookingId + "\n" +
    "Service: " + service + "\n" +
    "Date: " + date + "\n" +
    "Time: " + time + "\n\n" +
    "Thank you, " + name + "!"
  );
}

document.addEventListener("DOMContentLoaded", function () {

  const dateInput = document.getElementById("date");

  if (dateInput) {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = yyyy + "-" + mm + "-" + dd;
  }

});
