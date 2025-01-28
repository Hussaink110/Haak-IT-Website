document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        // Add input event listeners for floating labels
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                formMessage.innerHTML = `
                    <div class="error">
                        <i class="fas fa-exclamation-circle"></i>
                        Please fill in all fields.
                    </div>
                `;
                formMessage.style.display = 'block';
                return;
            }

            // Show success message
            formMessage.innerHTML = `
                <div class="success">
                    <i class="fas fa-check-circle"></i>
                    Thank you for your message! We'll get back to you soon.
                </div>
            `;
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Remove has-value class from all inputs
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
}); 