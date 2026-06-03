import { writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const BRANDS_DIR = path.join(PUBLIC_DIR, "images", "brands");
const OUTPUT_FILE = path.join(process.cwd(), "lib", "image-manifest.json");

async function walk(dir, fileList = []) {
  const files = await readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      await walk(filePath, fileList);
    } else {
      // Store path relative to public directory with leading slash
      const relativePath = "/" + path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
      fileList.push(relativePath);
    }
  }
  return fileList;
}

async function main() {
  try {
    console.log("Generating image manifest...");
    const allImages = await walk(BRANDS_DIR);
    
    // Convert to a Set for O(1) lookup in a Map-like structure
    // but JSON doesn't support Set, so we'll use an object as a hash map
    const manifest = {};
    for (const img of allImages) {
      manifest[img] = 1;
    }

    await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2), "utf-8");
    console.log(`Successfully generated manifest with ${allImages.length} images to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Failed to generate image manifest:", error);
    process.exit(1);
  }
}

main();
