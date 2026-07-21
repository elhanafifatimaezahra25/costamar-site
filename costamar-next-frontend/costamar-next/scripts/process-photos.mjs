import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const SRC_DIR = "C:/Users/lenovo/Desktop";
const OUT_DIR = path.resolve("public/images");

fs.mkdirSync(OUT_DIR, { recursive: true });

const SRC = {
  P1: "WhatsApp Image 2026-.17.jpeg",
  P2: "WhatsApp Image 2026-07-2 at 00.10.16.jpeg",
  P3: "WhatsApp Image 2026-07-21 10.18.jpeg",
  P4: "WhatsApp Image 2026-07-21 at 00.10.01.jpeg",
  P5: "WhatsApp Image 2026-07-21 at 00.10.07.jpeg",
  P6: "WhatsApp Image 2026-07-21 at 00.10.15.jpeg",
  P7: "WhatsApp Image 2026-07-21 at 00.10.16.jpeg",
  P8: "WhatsApp Image 2026-07-21 at 00.10.17.jpeg",
  P9: "WhatsApp Image 2026-07-21 at 00.10.18.jpeg",
  P10: "WhatsApp Image 2026-07-21 at 00.10.22.jpeg",
  P11: "WhatsApp Image 2026-07-21 at 00.10.23.jpeg",
  P12: "WhatsApp Image 2026-07-21 at 00.10.24.jpeg",
};

// [outputName, sourceKey, width, height, gravity, opts]
const JOBS = [
  [
    "hero",
    "P11",
    2400,
    1350,
    "centre",
    { warmth: 1.0, lift: 1.06, crop: { top: 0, height: 610 } },
  ],
  [
    "hero-cta-bookend",
    "P11",
    2200,
    1238,
    "centre",
    { warmth: 1.15, lift: 1.0, crop: { top: 680, height: 600 } },
  ],
  ["intro-welcome", "P3", 1100, 1375, "north", { warmth: 1.05 }],
  ["signature-accueil", "P3", 1200, 1500, "south", { warmth: 1.05 }],
  ["signature-vapeur", "P11", 1200, 1500, "south", { warmth: 1.1 }],
  ["signature-gommage", "P12", 1200, 1500, "centre", {}],
  ["signature-massage", "P9", 1200, 1500, "centre", {}],
  ["treatment-visage", "P4", 1100, 1300, "centre", {}],
  ["treatment-pedicure", "P1", 1100, 1300, "south", {}],
  ["treatment-manucure", "P5", 1100, 1300, "centre", {}],
  ["treatment-coiffure-1", "P7", 1100, 1300, "centre", {}],
  ["treatment-lavage", "P8", 1100, 1300, "centre", {}],
  ["treatment-coiffure-2", "P2", 1100, 1300, "centre", {}],
  [
    "gallery-salon-wide",
    "P6",
    1000,
    1150,
    "centre",
    { crop: { top: 0, height: 480 } },
  ],
  ["gallery-corridor-chairs", "P2", 1000, 1150, "south", {}],
  ["gallery-tea-set", "P10", 1000, 1150, "centre", { warmth: 1.1 }],
  ["gallery-hammam-benches", "P12", 1000, 1150, "south", {}],
  ["gallery-pedicure-arches", "P1", 1000, 1150, "north", {}],
  ["gallery-salon-booths", "P7", 1000, 1150, "south", {}],
];

async function processOne([name, srcKey, w, h, gravity, opts]) {
  const srcPath = path.join(SRC_DIR, SRC[srcKey]);
  const outPath = path.join(OUT_DIR, `${name}.jpg`);
  const warmth = opts.warmth ?? 1.0;
  const lift = opts.lift ?? 1.0;

  let img = sharp(srcPath).rotate();

  if (opts.crop) {
    const meta = await sharp(srcPath).metadata();
    img = img.extract({
      left: 0,
      top: opts.crop.top,
      width: meta.width,
      height: opts.crop.height,
    });
  }

  img = img.resize(w, h, {
    fit: "cover",
    position: gravity,
  });

  // Cinematic grade: gentle contrast lift, warm-gold channel bias, richer
  // saturation, and unsharp-mask to counter softness from upscaling a
  // WhatsApp-compressed 590px-wide source.
  img = img
    .modulate({ saturation: 1.08, brightness: 1.02 * lift })
    .linear(
      [1.04 * warmth, 1.01, 0.98 / warmth],
      [-6 * warmth, -3, 2 / warmth]
    )
    .sharpen({ sigma: 1.1, m1: 1, m2: 0.6 })
    .jpeg({ quality: 92, mozjpeg: true });

  await img.toFile(outPath);
  console.log("wrote", outPath);
}

for (const job of JOBS) {
  await processOne(job);
}
console.log("done");
