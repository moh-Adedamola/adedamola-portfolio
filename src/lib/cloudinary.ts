// Cover images are uploaded at full size (~2 MB PNG). Cloudinary can resize
// and re-encode on the fly via URL transforms, so ask for a sized, auto-format
// (AVIF/WebP), auto-quality variant instead.

const UPLOAD = "/upload/";

// A transformation segment is comma-separated `key_value` params,
// e.g. "c_fill,w_400" or "f_auto". Version segments ("v1712345678") aren't.
const TRANSFORM_SEGMENT = /^[a-z]{1,3}_[^/]+$/;

export function cloudinaryUrl(url: string, width: number): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (parsed.hostname !== "res.cloudinary.com") return url;

  const i = url.indexOf(UPLOAD);
  if (i === -1) return url;

  const rest = url.slice(i + UPLOAD.length);
  const firstSegment = rest.split("/")[0];
  if (TRANSFORM_SEGMENT.test(firstSegment)) return url;

  return `${url.slice(0, i + UPLOAD.length)}f_auto,q_auto,w_${width}/${rest}`;
}
