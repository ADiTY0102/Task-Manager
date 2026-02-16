var btn = document.querySelector("#btn");
btn.addEventListener("click",()=>{
    alert("Request Submitted!!");    
})

document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    if (toast) {
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500); // Remove from DOM after fade out
        }, 3000);
    }
});