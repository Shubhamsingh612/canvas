
    const canvas = document.getElementById("signatureCanvas");
    const ctx = canvas.getContext("2d");

    let drawing = false;

    function startPosition(e) {
      drawing = true;
      draw(e); // start line immediately
    }

    function endPosition() {
      drawing = false;
      ctx.beginPath(); // reset path so lines don’t connect
    }

    function draw(e) {
      if (!drawing) return;

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";

      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Mouse events
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    // Touch events (for mobile)
    canvas.addEventListener("touchstart", (e) => startPosition(e.touches[0]));
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault(); // stop scrolling while drawing
      draw(e.touches[0]);
    });
