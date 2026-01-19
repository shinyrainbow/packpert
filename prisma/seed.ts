import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("12345!!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "packpert" },
    update: {},
    create: {
      email: "packpert",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  console.log("Admin user created:", admin.email);

  // Create sample products
  const products = [
    {
      name: "Stand Up Foil Pouch",
      nameTh: "ซองฟอยล์ตั้งได้",
      description: "High barrier stand up pouch with zipper closure, perfect for food and snacks packaging.",
      descriptionTh: "ซองฟอยล์ตั้งได้พร้อมซิปล็อค เหมาะสำหรับบรรจุอาหารและขนม",
      category: "foilPouch",
      image: "/images/products/foil-pouch-1.jpg",
    },
    {
      name: "Flat Bottom Pouch",
      nameTh: "ซองก้นแบน",
      description: "Premium flat bottom pouch for coffee and tea packaging with valve option.",
      descriptionTh: "ซองก้นแบนคุณภาพสูงสำหรับบรรจุกาแฟและชา พร้อมวาล์วระบายอากาศ",
      category: "foilPouch",
      image: "/images/products/foil-pouch-2.jpg",
    },
    {
      name: "Cosmetic Squeeze Tube",
      nameTh: "หลอดบีบเครื่องสำอาง",
      description: "Soft squeeze tube for lotions, creams, and cosmetic products.",
      descriptionTh: "หลอดบีบนุ่มสำหรับโลชั่น ครีม และผลิตภัณฑ์เครื่องสำอาง",
      category: "cosmeticTube",
      image: "/images/products/tube-1.jpg",
    },
    {
      name: "Airless Pump Tube",
      nameTh: "หลอดปั๊มสุญญากาศ",
      description: "Airless pump tube for serums and high-end cosmetic products.",
      descriptionTh: "หลอดปั๊มสุญญากาศสำหรับเซรั่มและผลิตภัณฑ์เครื่องสำอางระดับพรีเมียม",
      category: "cosmeticTube",
      image: "/images/products/tube-2.jpg",
    },
    {
      name: "Rigid Gift Box",
      nameTh: "กล่องของขวัญแข็ง",
      description: "Luxury rigid box with magnetic closure for premium products.",
      descriptionTh: "กล่องแข็งหรูหราพร้อมแม่เหล็กปิด สำหรับสินค้าพรีเมียม",
      category: "paperBox",
      image: "/images/products/box-1.jpg",
    },
    {
      name: "Folding Carton Box",
      nameTh: "กล่องพับกระดาษ",
      description: "Eco-friendly folding carton box for retail packaging.",
      descriptionTh: "กล่องพับกระดาษเป็นมิตรกับสิ่งแวดล้อม สำหรับบรรจุภัณฑ์ขายปลีก",
      category: "paperBox",
      image: "/images/products/box-2.jpg",
    },
    {
      name: "PET Plastic Bottle",
      nameTh: "ขวดพลาสติก PET",
      description: "Clear PET bottle for beverages and personal care products.",
      descriptionTh: "ขวดพลาสติก PET ใสสำหรับเครื่องดื่มและผลิตภัณฑ์ดูแลร่างกาย",
      category: "plasticBottle",
      image: "/images/products/bottle-1.jpg",
    },
    {
      name: "HDPE Bottle",
      nameTh: "ขวด HDPE",
      description: "Durable HDPE bottle for household and industrial products.",
      descriptionTh: "ขวด HDPE ทนทานสำหรับผลิตภัณฑ์ในครัวเรือนและอุตสาหกรรม",
      category: "plasticBottle",
      image: "/images/products/bottle-2.jpg",
    },
    {
      name: "Product Label",
      nameTh: "ฉลากสินค้า",
      description: "High-quality printed labels with various finishes.",
      descriptionTh: "ฉลากพิมพ์คุณภาพสูงพร้อมการเคลือบหลากหลายแบบ",
      category: "label",
      image: "/images/products/label-1.jpg",
    },
    {
      name: "Holographic Sticker",
      nameTh: "สติกเกอร์โฮโลแกรม",
      description: "Security holographic stickers for brand protection.",
      descriptionTh: "สติกเกอร์โฮโลแกรมเพื่อป้องกันสินค้าปลอมแปลง",
      category: "label",
      image: "/images/products/label-2.jpg",
    },
    {
      name: "Custom Display Box",
      nameTh: "กล่องแสดงสินค้าสั่งทำ",
      description: "Custom designed display boxes for retail environments.",
      descriptionTh: "กล่องแสดงสินค้าออกแบบพิเศษสำหรับร้านค้าปลีก",
      category: "customBox",
      image: "/images/products/custom-1.jpg",
    },
    {
      name: "Mailer Box",
      nameTh: "กล่องไปรษณีย์",
      description: "E-commerce ready mailer boxes with custom printing.",
      descriptionTh: "กล่องไปรษณีย์สำหรับอีคอมเมิร์ซพร้อมพิมพ์ลายตามต้องการ",
      category: "customBox",
      image: "/images/products/custom-2.jpg",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    });
  }

  console.log("Products seeded:", products.length);

  // Create sample portfolio items
  const portfolios = [
    {
      title: "Luxury Cosmetic Line",
      titleTh: "ไลน์เครื่องสำอางหรูหรา",
      description: "Complete packaging solution for a premium skincare brand including boxes, tubes, and labels.",
      descriptionTh: "โซลูชันบรรจุภัณฑ์ครบวงจรสำหรับแบรนด์สกินแคร์พรีเมียม รวมกล่อง หลอด และฉลาก",
      image: "/images/portfolio/portfolio-1.jpg",
      client: "Beauty Co.",
    },
    {
      title: "Organic Coffee Packaging",
      titleTh: "บรรจุภัณฑ์กาแฟออร์แกนิก",
      description: "Eco-friendly coffee packaging with resealable pouches and sustainable materials.",
      descriptionTh: "บรรจุภัณฑ์กาแฟเป็นมิตรกับสิ่งแวดล้อม พร้อมซองปิดผนึกซ้ำได้และวัสดุยั่งยืน",
      image: "/images/portfolio/portfolio-2.jpg",
      client: "Green Bean Roasters",
    },
    {
      title: "Snack Brand Redesign",
      titleTh: "รีดีไซน์แบรนด์ขนม",
      description: "Complete brand packaging redesign for a popular snack company.",
      descriptionTh: "รีดีไซน์บรรจุภัณฑ์แบรนด์ทั้งหมดสำหรับบริษัทขนมชื่อดัง",
      image: "/images/portfolio/portfolio-3.jpg",
      client: "Yummy Snacks Ltd.",
    },
    {
      title: "Premium Tea Collection",
      titleTh: "คอลเลกชันชาพรีเมียม",
      description: "Elegant gift box packaging for a luxury tea collection.",
      descriptionTh: "บรรจุภัณฑ์กล่องของขวัญหรูหราสำหรับคอลเลกชันชาพรีเมียม",
      image: "/images/portfolio/portfolio-4.jpg",
      client: "Royal Tea House",
    },
    {
      title: "Health Supplement Line",
      titleTh: "ไลน์ผลิตภัณฑ์เสริมอาหาร",
      description: "Professional packaging for a health supplement brand with multiple product lines.",
      descriptionTh: "บรรจุภัณฑ์มืออาชีพสำหรับแบรนด์ผลิตภัณฑ์เสริมอาหารหลายสายผลิตภัณฑ์",
      image: "/images/portfolio/portfolio-5.jpg",
      client: "VitaLife",
    },
    {
      title: "Artisan Chocolate Box",
      titleTh: "กล่องช็อกโกแลตอาร์ติซาน",
      description: "Luxurious chocolate packaging with gold foil and embossing.",
      descriptionTh: "บรรจุภัณฑ์ช็อกโกแลตหรูหราพร้อมฟอยล์ทองและการปั๊มนูน",
      image: "/images/portfolio/portfolio-6.jpg",
      client: "Choco Artisan",
    },
  ];

  for (const portfolio of portfolios) {
    await prisma.portfolio.upsert({
      where: { id: portfolio.title.toLowerCase().replace(/\s+/g, "-") },
      update: portfolio,
      create: {
        id: portfolio.title.toLowerCase().replace(/\s+/g, "-"),
        ...portfolio,
      },
    });
  }

  console.log("Portfolio items seeded:", portfolios.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
