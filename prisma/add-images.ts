import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Modern packaging images from Unsplash
const productImages: Record<string, string> = {
  foilPouch: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
  cosmeticTube: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
  paperBox: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=600&fit=crop",
  plasticBottle: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
  label: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&h=600&fit=crop",
  customBox: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=600&fit=crop",
};

// Additional product-specific images
const specificProductImages: Record<string, string> = {
  "Stand Up Foil Pouch": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
  "Flat Bottom Pouch": "https://images.unsplash.com/photo-1610557892470-55d9e80c0eb2?w=600&h=600&fit=crop",
  "Cosmetic Squeeze Tube": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
  "Airless Pump Tube": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
  "Rigid Gift Box": "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=600&fit=crop",
  "Folding Carton Box": "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=600&fit=crop",
  "PET Plastic Bottle": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
  "HDPE Bottle": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
  "Product Label": "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&h=600&fit=crop",
  "Holographic Sticker": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
  "Custom Display Box": "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=600&fit=crop",
  "Mailer Box": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=600&fit=crop",
};

// Portfolio images
const portfolioImages: Record<string, string> = {
  "Luxury Cosmetic Line": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
  "Organic Coffee Packaging": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
  "Snack Brand Redesign": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
  "Premium Tea Collection": "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&h=600&fit=crop",
  "Health Supplement Line": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
  "Artisan Chocolate Box": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&h=600&fit=crop",
};

async function main() {
  console.log("Updating product images...");

  const products = await prisma.product.findMany();
  for (const product of products) {
    const image = specificProductImages[product.name] || productImages[product.category] || null;
    if (image) {
      await prisma.product.update({
        where: { id: product.id },
        data: { image },
      });
      console.log(`Updated product: ${product.name}`);
    }
  }

  console.log("\nUpdating portfolio images...");

  const portfolios = await prisma.portfolio.findMany();
  for (const portfolio of portfolios) {
    const image = portfolioImages[portfolio.title] || null;
    if (image) {
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { image },
      });
      console.log(`Updated portfolio: ${portfolio.title}`);
    }
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => {
    pool.end();
  });
