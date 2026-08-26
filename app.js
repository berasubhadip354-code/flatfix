function toggleNav() {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
}


/* ==============================
   GITHUB LOGIN
   ============================== */

async function loginWithGitHub() {
  try {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/flatfix/"
      }
    });

    if (error) {
      alert("GitHub Login Error: " + error.message);
    }

  } catch (error) {
    console.error(error);
    alert("Login failed. Please try again.");
  }
}


/* ==============================
   LOGOUT
   ============================== */

async function logout() {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      alert("Logout failed: " + error.message);
      return;
    }

    updateLoginButton();

  } catch (error) {
    console.error(error);
  }
}


/* ==============================
   CHECK LOGIN
   ============================== */

async function updateLoginButton() {

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userBox = document.getElementById("userBox");

  if (!loginBtn || !logoutBtn) return;

  const { data } = await supabaseClient.auth.getSession();

  if (data.session) {

    const user = data.session.user;

    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";

    if (userBox) {

      const name =
        user.user_metadata?.user_name ||
        user.user_metadata?.preferred_username ||
        user.email ||
        "GitHub User";

      userBox.textContent = "Logged in as " + name;
      userBox.style.display = "block";
    }

  } else {

    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";

    if (userBox) {
      userBox.style.display = "none";
    }
  }
}


/* ==============================
   SERVICE SELECT
   ============================== */

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


/* ==============================
   TOAST
   ============================== */

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


/* ==============================
   BOOKING
   ============================== */

function submitBooking(event) {

  event.preventDefault();

  const service =
    document.getElementById("service").value;

  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const address =
    document.getElementById("address").value.trim();

  const date =
    document.getElementById("date").value;

  const time =
    document.getElementById("time").value;

  const details =
    document.getElementById("details").value.trim();


  if (
    !service ||
    !name ||
    !phone ||
    !address ||
    !date ||
    !time
  ) {

    alert("Please fill in all required fields.");

    return;
  }


  const cleanPhone =
    phone.replace(/\D/g, "");


  if (cleanPhone.length !== 10) {

    alert(
      "Please enter a valid 10-digit phone number."
    );

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

    details: details,

    createdAt: new Date().toISOString()

  };


  const bookings =
    JSON.parse(
      localStorage.getItem("flatfixBookings") || "[]"
    );


  bookings.push(booking);


  localStorage.setItem(
    "flatfixBookings",
    JSON.stringify(bookings)
  );


  document
    .getElementById("bookingForm")
    .reset();


  alert(
    "Booking Confirmed! 🎉\n\n" +

    "Booking ID: " +
    bookingId +

    "\nService: " +
    service +

    "\nDate: " +
    date +

    "\nTime: " +
    time +

    "\n\nThank you, " +
    name +
    "!"
  );
}


/* ==============================
   DATE
   ============================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const dateInput =
      document.getElementById("date");

    if (dateInput) {

      const today = new Date();

      const yyyy =
        today.getFullYear();

      const mm =
        String(
          today.getMonth() + 1
        ).padStart(2, "0");

      const dd =
        String(
          today.getDate()
        ).padStart(2, "0");

      dateInput.min =
        yyyy + "-" + mm + "-" + dd;
    }


    /* Check GitHub login */

    updateLoginButton();

  }
);
