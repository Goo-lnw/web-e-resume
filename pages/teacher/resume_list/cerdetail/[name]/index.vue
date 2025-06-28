<template>
  <div
    ref="canvasWrapper"
    class="canvas-wrapper flex flex-col justify-center items-center text-white gap-4"
  >
    <canvas ref="certCanvas"></canvas>
    <button
      @click="downloadCertificate"
      class="mt-4 px-6 py-2 rounded bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold shadow-lg transition"
    >
      ดาวน์โหลด Certificate
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "cer",
});

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const certCanvas = ref("certCanvas");
const canvasWrapper = ref("canvasWrapper");
const route = useRoute();
const name = ref(decodeURIComponent(atob(route.params.name)));
const urls = ref(decodeURIComponent(atob(route.query.file)));

function generateAndUploadImage(imageSrc) {
  const canvas = certCanvas.value;
  const wrapper = canvasWrapper.value;
  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous"; // สำคัญถ้าโหลดไฟล์จาก domain อื่น
  img.src = imageSrc;

  // ข้อมูลเกี่ยวกับข้อความ
  let textX = 50;
  let textY = 50;
  const text = name.value.split("_").join("  ") || "Certificate Name";
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  img.onload = () => {
    const parentWidth = wrapper.clientWidth;
    const parentHeight = wrapper.clientHeight || window.innerHeight * 0.6;

    const desiredMaxWidth = parentWidth;
    const desiredMaxHeight = parentHeight;

    const scale = Math.min(
      desiredMaxWidth / img.width,
      desiredMaxHeight / img.height
    );

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // วาดข้อความ
      ctx.font = `${30 * scale}px Arial`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, textX * scale, textY * scale);
    };

    // คำนวณตำแหน่งเริ่มต้นของข้อความ (กึ่งกลาง)
    ctx.font = `${30 * scale}px Arial`;
    const metrics = ctx.measureText(text);
    textX = (img.width - metrics.width / scale) / 2;
    textY = img.height / 2;

    draw();

    const isInsideText = (mouseX, mouseY) => {
      ctx.font = `${30 * scale}px Arial`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = 30 * scale;

      const scaledTextX = textX * scale;
      const scaledTextY = textY * scale;

      return (
        mouseX >= scaledTextX &&
        mouseX <= scaledTextX + textWidth &&
        mouseY >= scaledTextY - textHeight &&
        mouseY <= scaledTextY
      );
    };

    // Event handlers
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isInsideText(x, y)) {
        isDragging = true;
        offsetX = x / scale - textX;
        offsetY = y / scale - textY;
        canvas.style.cursor = "grabbing";
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isDragging) {
        textY = y / scale - offsetY;

        // จำกัดไม่ให้ข้อความออกนอกขอบรูป
        const metrics = ctx.measureText(text);
        textX = Math.max(0, Math.min(textX, img.width - metrics.width / scale));
        textY = Math.max(30, Math.min(textY, img.height));

        draw();
      } else {
        canvas.style.cursor = isInsideText(x, y) ? "grab" : "default";
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = "default";
    };

    // ลบ event listeners เก่า
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mouseleave", handleMouseUp);

    // เพิ่ม event listeners ใหม่
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    // Touch events สำหรับมือถือ
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
      handleMouseDown(mouseEvent);
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
      handleMouseMove(mouseEvent);
    });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      handleMouseUp();
    });
  };
}

function downloadCertificate() {
  const canvas = certCanvas.value;
  if (!canvas) return;
  const link = document.createElement("a");
  const filename =
    (name.value ? name.value.replace(/_/g, " ") : "certificate") + ".png";
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

onMounted(() => {
  generateAndUploadImage(urls.value);
});
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 100%;
  min-height: 60vh;
  position: relative;
  border-radius: 1.5rem;
  padding: 2rem 0;
}
canvas {
  max-width: 100%;
  max-height: 70vh;
  cursor: grab;
  background-color: #222;
  border-radius: 1rem;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.15);
}
button {
  letter-spacing: 1px;
}
</style>
