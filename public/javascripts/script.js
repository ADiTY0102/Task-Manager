document.addEventListener('DOMContentLoaded', () => {

    const toast = document.getElementById('toast');
    if (!toast) return;

    let timeout;
    const duration = 3000;

    const hideToast = () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 400);
    };

    const startTimer = () => {
        timeout = setTimeout(hideToast, duration);
    };

    const stopTimer = () => {
        clearTimeout(timeout);
    };

    // Start auto close
    startTimer();

    // Pause on hover
    toast.addEventListener('mouseenter', stopTimer);
    toast.addEventListener('mouseleave', startTimer);

    // Click to close instantly
    toast.addEventListener('click', hideToast);
});
