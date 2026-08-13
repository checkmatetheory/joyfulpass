// Build-time QR-code generation. This module is server-only: it pulls in the
// Node `qrcode` library and is imported exclusively from Server Components, so
// no QR library is ever shipped to the browser. QR codes are baked into the
// static export per app, which means zero runtime cost and no network call to a
// third-party QR image service.

import QRCode from "qrcode";

/**
 * Encode `text` as a QR code and return it as a base64 `image/svg+xml` data URI,
 * ready to drop straight into an `<img src>`.
 *
 * The modules are near-black on a transparent background, so the same code reads
 * correctly whether it sits on a white panel (in the modal) or a tinted one —
 * we place it on a light panel for scanner contrast. Error-correction level "M"
 * keeps the code compact while tolerating a little smudging or screen glare.
 */
export async function qrDataUri(text: string): Promise<string> {
  const svg = await QRCode.toString(text, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0A0A0A", light: "#00000000" },
  });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
