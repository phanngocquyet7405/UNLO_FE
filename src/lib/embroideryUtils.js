/**
 * embroideryUtils.js
 * Tiện ích xử lý hiệu ứng thêu vi tính và tách nền logo tự động
 */

/**
 * Xóa nền trắng/đơn sắc từ file ảnh (JPG/PNG) bằng HTML Canvas phía client
 * Giúp logo khi đưa lên áo không bị viền hộp trắng vuông vức, tạo cảm giác thêu thật trên vải
 */
export async function autoRemoveBackground(dataUrl, tolerance = 32) {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(dataUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const len = data.length;

        // Lấy mẫu màu ở 4 góc để xác định màu nền chủ đạo
        const corners = [
          0, // Top-left
          (canvas.width - 1) * 4, // Top-right
          ((canvas.height - 1) * canvas.width) * 4, // Bottom-left
          ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4, // Bottom-right
        ];

        let bgR = 0;
        let bgG = 0;
        let bgB = 0;
        let sampleCount = 0;

        corners.forEach((idx) => {
          if (idx < len - 4) {
            bgR += data[idx];
            bgG += data[idx + 1];
            bgB += data[idx + 2];
            sampleCount++;
          }
        });

        bgR = Math.round(bgR / sampleCount);
        bgG = Math.round(bgG / sampleCount);
        bgB = Math.round(bgB / sampleCount);

        // Chỉ xóa nếu nền là màu sáng (trắng / xám nhạt r,g,b > 220) hoặc rất tối
        const isLightBg = bgR > 215 && bgG > 215 && bgB > 215;
        const isDarkBg = bgR < 25 && bgG < 25 && bgB < 25;

        if (!isLightBg && !isDarkBg) {
          // Không phải nền đơn sắc rõ rệt, giữ nguyên ảnh gốc
          resolve(dataUrl);
          return;
        }

        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.max(
            Math.abs(r - bgR),
            Math.abs(g - bgG),
            Math.abs(b - bgB)
          );

          if (diff <= tolerance) {
            data[i + 3] = 0; // Đặt alpha = 0 (trong suốt hoàn toàn)
          } else if (diff <= tolerance + 15) {
            // Feather mềm biên viền thêu
            const alphaRatio = (diff - tolerance) / 15;
            data[i + 3] = Math.round(data[i + 3] * alphaRatio);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        console.warn("Lỗi xử lý tách nền logo:", err);
        resolve(dataUrl);
      }
    };

    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Danh sách Preset Logo thêu mẫu chuẩn xưởng UNLO
 */
export const EMBROIDERY_SAMPLE_LOGOS = [
  {
    id: "unlo_crest",
    label: "Huy hiệu Xưởng UNLO",
    description: "Con dấu thêu chữ lồng phong cách M2C Atelier",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" stroke="currentColor" stroke-width="4" stroke-dasharray="2 3"/>
      <circle cx="60" cy="60" r="46" stroke="currentColor" stroke-width="2"/>
      <path d="M42 42V68C42 77.941 50.059 86 60 86C69.941 86 78 77.941 78 68V42" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <path d="M48 42V66C48 72.627 53.373 78 60 78C66.627 78 72 72.627 72 66V42" stroke="currentColor" stroke-width="2"/>
      <circle cx="60" cy="30" r="4" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "mountain_minimal",
    label: "Đỉnh Núi Tối Giản",
    description: "Đường thêu chỉ viền đôi biểu tượng thiên nhiên",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 90L50 40L72 75L85 55L105 90H20Z" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="85" cy="35" r="7" stroke="currentColor" stroke-width="3"/>
      <line x1="15" y1="98" x2="105" y2="98" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "compass_rose",
    label: "La Bàn Thám Hiểm",
    description: "Biểu tượng thêu vi tính sắc sảo 8 góc",
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="3"/>
      <path d="M60 16L67 53L104 60L67 67L60 104L53 67L16 60L53 53L60 16Z" fill="currentColor"/>
      <circle cx="60" cy="60" r="5" fill="#FCFDF1"/>
    </svg>`,
  },
];
