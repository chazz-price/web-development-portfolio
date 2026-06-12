const SUPABASE_URL = "[YOUR_SUPABASE_PROJECT_URL]";
const SUPABASE_ANON_KEY = "[YOUR_SUPABASE_ANON_PUBLIC_KEY]";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");

  const bookingRequest = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    service: document.getElementById("service").value,

    vehicle_year: document.getElementById("vehicleYear").value.trim(),
    vehicle_make: document.getElementById("vehicleMake").value.trim(),
    vehicle_model: document.getElementById("vehicleModel").value.trim(),
    preferred_date: document.getElementById("preferredDate").value || null,
    preferred_time: document.getElementById("preferredTime").value.trim(),
    mobile_service_requested: document.getElementById("mobileServiceRequested").checked,
    address: document.getElementById("address").value.trim(),

    message: document.getElementById("message").value.trim()
  };

  if (
    !bookingRequest.name ||
    !bookingRequest.phone ||
    !bookingRequest.email ||
    !bookingRequest.service
  ) {
    formMessage.textContent = "Please complete all required fields.";
    formMessage.style.color = "#f87171";
    return;
  }

  formMessage.textContent = "";
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  const { error } = await supabaseClient
    .from("[YOUR_TABLE_NAME]")
    .insert([bookingRequest]);

  if (error) {
    console.error("Database insert error:", error);

    formMessage.textContent = "Something went wrong. Please call or text us instead.";
    formMessage.style.color = "#f87171";

    submitButton.disabled = false;
    submitButton.textContent = "Request Appointment";

    return;
  }

  formMessage.textContent =
    "Thank you! Your request has been received. We will contact you shortly.";
  formMessage.style.color = "#67e8f9";

  form.reset();

  submitButton.disabled = false;
  submitButton.textContent = "Request Appointment";
});
