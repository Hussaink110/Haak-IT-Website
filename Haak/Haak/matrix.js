const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    resizeCanvas();
    drops = new Array(columns).fill(1);
});

// Characters to use in the Matrix rain
const chars = '01';

// Font size and columns
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);

// Array to track the y position of each column
let drops = new Array(columns).fill(1);

// Draw the Matrix rain
function draw() {
    // Set semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color and font
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate positions
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character with minimal glow
        ctx.shadowBlur = 2;
        ctx.shadowColor = '#0F0';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset drop to top of screen when it reaches bottom
        if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
}

// Animate at a lower frame rate
setInterval(draw, 50); 