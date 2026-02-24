const appointmentForm = document.getElementById('appointment-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        const formData = new FormData(event.target);

        // 1. Honeypot Check (Spam Prevention)
        if (formData.get('_gotcha')) {
            console.log("Spam detected.");
            return; // Silently drop the submission
        }

        // 2. Link Detection (Block external URLs)
        const message = formData.get('message');
        const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
        
        if (urlPattern.test(message)) {
            alert("For security reasons, links/URLs are not allowed in the message field. Please remove them to continue.");
            return; 
        }

        // 3. Name Validation (Prevent junk entries like "12345")
        const name = formData.get('name');
        if (name.length < 2) {
            alert("Please enter a valid full name.");
            return;
        }

        // --- Visual feedback ---
        btn.innerHTML = "Sending...";
        btn.disabled = true;

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                window.location.replace("thank-you.html");
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            btn.innerHTML = "Submit Booking Request";
            btn.disabled = false;
            alert("Oops! There was a problem. Please try again or call us at 1-(345)-938-0140.");
        }
    });
}


