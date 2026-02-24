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
                // 'manual' tells the browser: "Don't follow the form provider's redirect, let my JS handle it."
                redirect: 'manual', 
                headers: {
                    'Accept': 'application/json'
                }
            });

            // If the response is OK (200) or OPAQUE (the provider tried to redirect us)
            if (response.ok || response.type === 'opaqueredirect') {
                console.log("Submission successful. Navigating to thank-you page...");
                window.location.assign("thank-you.html");
            } else {
                // Read the error body if possible for better debugging
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Form submission failed');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            btn.innerHTML = "Submit Booking Request";
            btn.disabled = false;
            alert("Oops! There was a problem. Please try again or call us at 1-(345)-938-0140.");
        }
    });
}

