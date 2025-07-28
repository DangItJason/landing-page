function handleTryEmi() {
    // Add visual feedback
    const button = document.querySelector('.cta-button');
    const originalText = button.textContent;
    
    // Button press animation
    button.style.transform = 'translateY(1px)';
    button.textContent = 'Loading...';
    
    setTimeout(() => {
        button.style.transform = '';
        button.textContent = originalText;
        
        // For now, show an alert - in production this would redirect to signup/onboarding
        alert('Welcome to EmiCare! Redirecting to onboarding...');
        
        // In production, this would be:
        // window.location.href = '/onboarding';
        // or
        // window.open('https://emicare.com/signup', '_blank');
    }, 500);
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