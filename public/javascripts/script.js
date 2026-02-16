document.addEventListener('DOMContentLoaded', () => {
    
    // Toast Logic
    const toast = document.getElementById('toast');
    if (toast) {
        let hideTimeout;
        let startTime;
        let timeRemaining = 3000; // 3 seconds

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
        startTimer();

        toast.addEventListener('mouseenter', pauseTimer);

        toast.addEventListener('mouseleave', startTimer);

        toast.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        });
    }

});