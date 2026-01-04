//Appointment sumission
const appointmentForm = document.querySelector('#appointment-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = new FormData(appointmentForm);
        const response = await fetch(appointmentForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success Message
            appointmentForm.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: var(--sage-green);">Request Received.</h3>
                    <p>Thank you for reaching out. Please take a moment to pause and breathe; I will be in touch within 1-2 business days.</p>
                    <span style="font-size: 2rem;">🌿</span>
                </div>
            `;
        } else {
            // Error Message
            alert("Oops! There was a problem submitting your form. Please try again or email me directly.");
        }
    });
}