const appointmentForm = document.getElementById('appointment-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevents the page from refreshing immediately
        
        const btn = document.getElementById('submit-btn');
        btn.innerHTML = "Sending..."; // Visual feedback for the client
        btn.disabled = true;

        const formData = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Redirects specifically to the filename as you requested
                window.location.href = "thank-you.html";
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            btn.innerHTML = "Send Request";
            btn.disabled = false;
            alert("Oops! There was a problem. Please try again or call us at 1-(345)-938-0140.");
        }
    });
}
