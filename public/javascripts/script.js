document.addEventListener('DOMContentLoaded', () => {
    
    // Toast Logic
    const toast = document.getElementById('toast');
    if (toast) {
        let hideTimeout;
        let startTime;
        let timeRemaining = 3000; // 3 seconds

        // Function to run the timer
        const startTimer = () => {
            startTime = Date.now();
            hideTimeout = setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500); // Wait for fade out
            }, timeRemaining);
        };

        // Function to pause the timer
        const pauseTimer = () => {
            clearTimeout(hideTimeout);
            // Calculate how much time is left by subtracting elapsed time
            timeRemaining -= (Date.now() - startTime); 
        };
        // 1. Start the timer when page loads
        startTimer();

        // 2. Pause when mouse hovers over the toast
        toast.addEventListener('mouseenter', pauseTimer);

        // 3. Resume when mouse leaves the toast
        toast.addEventListener('mouseleave', startTimer);

        // 4. Click to dismiss immediately
        toast.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        });
    }

});