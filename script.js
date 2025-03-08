function startAnimation() {
    const inputContainer = document.querySelector('.input-container');
    const light = document.getElementById('light');
    
    inputContainer.style.opacity = '0';
    inputContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        light.style.opacity = '1';
        light.style.width = '150vmax';
        light.style.height = '150vmax';
        
        setTimeout(() => {
            document.body.style.background = 'white';
            const readyText = document.getElementById('readyText');
            readyText.style.opacity = '1';
            readyText.style.filter = 'blur(0)';
        }, 1800);
    }, 500);
}

document.getElementById('readyText').addEventListener('click', () => {
    const readyText = document.getElementById('readyText');
    
    // Анимация исчезновения
    readyText.style.opacity = '0';
    readyText.style.filter = 'blur(10px)';
});

document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') startAnimation();
});