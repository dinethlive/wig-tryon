let video = document.getElementById("video");
let uploadedImage = document.getElementById("uploadedImage");
let overlayCanvas = document.getElementById("overlayCanvas");
let ctx = overlayCanvas.getContext("2d");
let currentWig = "assets/wigs/wig1.png";
let isWebcamMode = true;
let wigImage = new Image();
wigImage.src = currentWig;

// MediaPipe setup
const faceMesh = new FaceMesh({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
faceMesh.onResults(onResults);

// Webcam setup
let camera;
function startCamera() {
  camera = new Camera(video, {
    onFrame: async () => {
      await faceMesh.send({ image: video });
    },
    width: 640,
    height: 640,
  });
  camera.start();
}

function onResults(results) {
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0)
    return;

  const landmarks = results.multiFaceLandmarks[0];

  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];
  const topHead = landmarks[10];
  const chin = landmarks[152];
  const noseTip = landmarks[1];

  // Calculate bounding box in canvas coordinates
  const leftX = leftCheek.x * overlayCanvas.width;
  const rightX = rightCheek.x * overlayCanvas.width;
  const centerX = (leftX + rightX) / 2;
  const topY = topHead.y * overlayCanvas.height;
  const chinY = chin.y * overlayCanvas.height;
  const faceWidth = (rightX - leftX) * 1.8; // scale up for natural wig spread
  const faceHeight = (chinY - topY) * 2.2; // full hair length scaling

  const wigX = centerX - faceWidth / 2;
  const wigY = topY - faceHeight * 0.15; // lift wig slightly above forehead

  // Draw wig
  ctx.drawImage(wigImage, wigX, wigY, faceWidth, faceHeight);
}

// Wig switcher
document.querySelectorAll(".wig-btn").forEach((button) => {
  button.addEventListener("click", () => {
    currentWig = `assets/wigs/${button.dataset.wig}`;
    wigImage.src = currentWig;
  });
});

// Mode switcher
document.getElementById("webcamModeBtn").addEventListener("click", () => {
  isWebcamMode = true;
  document.getElementById("uploadInput").style.display = "none";
  uploadedImage.style.display = "none";
  video.style.display = "block";
  document.getElementById("webcamModeBtn").classList.add("active");
  document.getElementById("uploadModeBtn").classList.remove("active");
  startCamera();
});

document.getElementById("uploadModeBtn").addEventListener("click", () => {
  isWebcamMode = false;
  document.getElementById("uploadInput").click();
  document.getElementById("webcamModeBtn").classList.remove("active");
  document.getElementById("uploadModeBtn").classList.add("active");
  video.style.display = "none";
  if (camera) camera.stop();
});

// Handle image upload
document
  .getElementById("uploadInput")
  .addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function (e) {
      uploadedImage.src = e.target.result;
      uploadedImage.onload = async () => {
        overlayCanvas.width = uploadedImage.width;
        overlayCanvas.height = uploadedImage.height;
        uploadedImage.style.display = "block";

        await faceMesh.send({ image: uploadedImage });
      };
    };
    reader.readAsDataURL(file);
  });

// Screenshot
document.getElementById("screenshotBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "wig-tryon.png";
  link.href = overlayCanvas.toDataURL("image/png");
  link.click();
});

// Init
overlayCanvas.width = 640;
overlayCanvas.height = 640;
wigImage.onload = () => {
  if (isWebcamMode) {
    startCamera();
  }
};
