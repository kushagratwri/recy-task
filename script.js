const timer = document.getElementById("timer");
const preview = document.getElementById("preview");
const canvas = document.getElementById("attendanceGraph");
const ctx = canvas.getContext("2d");

let points = [
    [85, 100],
    [80, 110],
    [40, -50],
    [25, -80],
    [5, -100]
];

// Sort points by y-value in ascending order
points.sort((a, b) => a[1] - b[1]);

let centerX = canvas.width*0.3;
let centerY = canvas.height / 2;
let scale = 2;

function drawAxes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "#ff0000";
    ctx.font = "32px Arial";
    ctx.fillText("Attendance", canvas.width - 120, centerY - 10);
    ctx.fillText("Chap Gya", centerX + 10, 20);
    ctx.fillText("Chud Gya", centerX + 10, canvas.height - 10);
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
}

function animateGraph() {
    let i = 0;
    function step() {
        if (i < points.length) {
            const [x, y] = points[i];
            const scaledX = centerX + x * scale;
            const scaledY = centerY - y * scale;
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(scaledX, scaledY);
            } else {
                ctx.lineTo(scaledX, scaledY);
            }
            ctx.strokeStyle = "#ff0000";
            ctx.stroke();
            drawCircle(scaledX, scaledY);
            i++;
            requestAnimationFrame(step);
        }
    }
    step();
}

window.onload = () => {
    drawAxes();
    animateGraph();
    showPopup();
};

function updateCountdown() {
    const newYear = new Date("Jan 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = newYear - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

setInterval(updateCountdown, 1000);

preview.onclick = () => alert("Happy New Year");

function showPopup() {
    const popup = document.createElement("div");
    popup.id = "popup";
    document.body.appendChild(popup);

    const img = document.createElement("img");
    img.src = "deadpool.jpg";
    img.style.width = "100%";
    img.style.height = "auto";
    popup.appendChild(img);

    const message = document.createElement("h1");
    message.textContent = "Ahh, look my life is boring, do you still want to see this webpage??";
    popup.appendChild(message);

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.onclick = () => {
        popup.style.display = "none";
        document.querySelector(".container").style.display = "flex";
    };
    popup.appendChild(yesButton);

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.onclick = () => {
        message.textContent = "Womp womp brother, try again please";
    };
    popup.appendChild(noButton);

    popup.style.display = "block";
    document.querySelector(".container").style.display = "none";
}
