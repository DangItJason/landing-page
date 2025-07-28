function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeNavLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    activeNavLink.classList.add('active');
}

async function handleEmailSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = document.getElementById('email-input');
    const submitBtn = document.getElementById('submit-btn');
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email || !validateEmail(email)) {
        showFeedback('Please enter a valid email address', 'error');
        return;
    }
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    
    try {
        // Submit to email service (using a simple form service for now)
        const response = await submitToEmailService(email);
        
        if (response.success) {
            showFeedback('🎉 Welcome to the waitlist! Check your email for confirmation.', 'success');
            emailInput.value = '';
            
            // Optional: Hide form and show thank you message
            setTimeout(() => {
                form.style.display = 'none';
                const thankYou = document.createElement('div');
                thankYou.className = 'thank-you-message';
                thankYou.innerHTML = `
                    <h3>You're on the list! 🎉</h3>
                    <p>We'll keep you updated on our Q4 2025 launch and give you early access.</p>
                `;
                form.parentNode.appendChild(thankYou);
            }, 2000);
        } else {
            throw new Error(response.message || 'Failed to join waitlist');
        }
    } catch (error) {
        console.error('Email submission error:', error);
        showFeedback('Something went wrong. Please try again later.', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    
    // Insert after form
    const form = document.querySelector('.email-capture-form');
    form.parentNode.insertBefore(feedback, form.nextSibling);
    
    // Auto-remove success messages
    if (type === 'success') {
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 5000);
    }
}

async function submitToEmailService(email) {
    // Using Formspree as a simple email collection service
    // You can replace this with Mailchimp, ConvertKit, or other services
    
    try {
        const response = await fetch('https://formspree.io/f/xzzvgjzr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                source: 'EmiCare Waitlist',
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Formspree submission error:', error);
        return { success: false, message: 'Failed to submit to Formspree' };
    }
}

// Add smooth scroll behavior and enhance UX
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation for hero content
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
    
    // Add keyboard accessibility for the button
    const button = document.querySelector('.cta-button');
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTryEmi();
        }
    });
    
    // Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const container = document.querySelector('.container');
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        container.style.backgroundPosition = `${x}% ${y}%`;
    });
});