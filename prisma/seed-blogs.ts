import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding blogs...");

  // Create blog categories
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: "packaging-tips" },
      update: {},
      create: {
        name: "เคล็ดลับบรรจุภัณฑ์",
        nameEn: "Packaging Tips",
        slug: "packaging-tips",
        color: "#3B82F6",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "industry-news" },
      update: {},
      create: {
        name: "ข่าวอุตสาหกรรม",
        nameEn: "Industry News",
        slug: "industry-news",
        color: "#10B981",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "sustainability" },
      update: {},
      create: {
        name: "ความยั่งยืน",
        nameEn: "Sustainability",
        slug: "sustainability",
        color: "#059669",
      },
    }),
  ]);

  console.log("Categories created:", categories.length);

  // Create sample blogs
  const blogs = [
    {
      title: "5 เทรนด์บรรจุภัณฑ์ที่น่าจับตามองในปี 2025",
      titleEn: "5 Packaging Trends to Watch in 2025",
      slug: "packaging-trends-2025",
      excerpt: "ค้นพบเทรนด์บรรจุภัณฑ์ล่าสุดที่จะเปลี่ยนแปลงอุตสาหกรรมในปีนี้ ตั้งแต่วัสดุที่ยั่งยืนไปจนถึงการออกแบบที่เน้นความสะดวกสบาย",
      excerptEn: "Discover the latest packaging trends that will transform the industry this year, from sustainable materials to convenience-focused designs",
      coverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-15"),
      categoryId: categories[0].id,
      sections: [
        {
          order: 0,
          content: "<h2>1. บรรจุภัณฑ์ที่ยั่งยืน</h2><p>บรรจุภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อมยังคงเป็นเทรนด์หลักในปี 2025 ผู้บริโภคต้องการทางเลือกที่รับผิดชอบต่อสิ่งแวดล้อมมากขึ้น</p>",
          contentEn: "<h2>1. Sustainable Packaging</h2><p>Eco-friendly packaging continues to be a major trend in 2025. Consumers increasingly demand environmentally responsible options.</p>",
        },
        {
          order: 1,
          content: "<h2>2. บรรจุภัณฑ์อัจฉริยะ</h2><p>เทคโนโลยี QR codes และ NFC กำลังถูกนำมาใช้เพื่อเชื่อมต่อผู้บริโภคกับข้อมูลผลิตภัณฑ์</p>",
          contentEn: "<h2>2. Smart Packaging</h2><p>QR codes and NFC technology are being used to connect consumers with product information.</p>",
        },
        {
          order: 2,
          content: "<h2>3. การออกแบบมินิมัลลิสต์</h2><p>การออกแบบที่เรียบง่ายและสะอาดตากำลังได้รับความนิยม ช่วยลดการใช้วัสดุและต้นทุน</p>",
          contentEn: "<h2>3. Minimalist Design</h2><p>Simple and clean designs are gaining popularity, helping reduce material usage and costs.</p>",
        },
      ],
    },
    {
      title: "วิธีเลือกบรรจุภัณฑ์ที่เหมาะกับสินค้าของคุณ",
      titleEn: "How to Choose the Right Packaging for Your Product",
      slug: "choosing-right-packaging",
      excerpt: "คู่มือฉบับสมบูรณ์ในการเลือกบรรจุภัณฑ์ที่เหมาะสมกับแบรนด์และสินค้าของคุณ",
      excerptEn: "A complete guide to selecting packaging that fits your brand and product",
      coverImage: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-10"),
      categoryId: categories[0].id,
      sections: [
        {
          order: 0,
          content: "<h2>ทำความเข้าใจผลิตภัณฑ์ของคุณ</h2><p>ก่อนเลือกบรรจุภัณฑ์ คุณต้องเข้าใจลักษณะของผลิตภัณฑ์ ขนาด น้ำหนัก และความต้องการในการปกป้อง</p>",
          contentEn: "<h2>Understanding Your Product</h2><p>Before choosing packaging, you need to understand your product's characteristics, size, weight, and protection requirements.</p>",
        },
        {
          order: 1,
          content: "<h2>พิจารณากลุ่มเป้าหมาย</h2><p>บรรจุภัณฑ์ควรสะท้อนถึงแบรนด์และดึงดูดกลุ่มลูกค้าเป้าหมายของคุณ</p>",
          contentEn: "<h2>Consider Your Target Audience</h2><p>Packaging should reflect your brand and appeal to your target customers.</p>",
        },
      ],
    },
    {
      title: "บรรจุภัณฑ์รักษ์โลก: ทางเลือกที่ยั่งยืน",
      titleEn: "Eco-Friendly Packaging: Sustainable Options",
      slug: "eco-friendly-packaging",
      excerpt: "เรียนรู้เกี่ยวกับตัวเลือกบรรจุภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อมสำหรับธุรกิจของคุณ",
      excerptEn: "Learn about environmentally friendly packaging options for your business",
      coverImage: "https://images.unsplash.com/photo-1610557892470-55d9e80c0eb2?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-05"),
      categoryId: categories[2].id,
      sections: [
        {
          order: 0,
          content: "<h2>ทำไมต้องบรรจุภัณฑ์รักษ์โลก?</h2><p>ผู้บริโภคยุคใหม่ใส่ใจสิ่งแวดล้อมมากขึ้น การเลือกใช้บรรจุภัณฑ์ที่ยั่งยืนช่วยสร้างภาพลักษณ์ที่ดีให้แบรนด์</p>",
          contentEn: "<h2>Why Eco-Friendly Packaging?</h2><p>Modern consumers care more about the environment. Choosing sustainable packaging helps build a positive brand image.</p>",
        },
        {
          order: 1,
          content: "<h2>วัสดุทางเลือก</h2><p>กระดาษรีไซเคิล พลาสติกชีวภาพ และวัสดุจากพืชเป็นตัวเลือกที่ได้รับความนิยม</p>",
          contentEn: "<h2>Alternative Materials</h2><p>Recycled paper, bioplastics, and plant-based materials are popular options.</p>",
        },
      ],
    },
    {
      title: "ประโยชน์ของซองฟอยล์สำหรับบรรจุภัณฑ์อาหาร",
      titleEn: "Benefits of Foil Pouches for Food Packaging",
      slug: "foil-pouch-benefits",
      excerpt: "ซองฟอยล์เป็นทางเลือกยอดนิยมสำหรับบรรจุภัณฑ์อาหาร เรียนรู้ข้อดีและการใช้งานที่เหมาะสม",
      excerptEn: "Foil pouches are a popular choice for food packaging. Learn about their benefits and proper usage",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-20"),
      categoryId: categories[0].id,
      sections: [
        {
          order: 0,
          content: "<h2>ความทนทานและการป้องกัน</h2><p>ซองฟอยล์มีคุณสมบัติป้องกันความชื้น แสง และอากาศได้ดีเยี่ยม ช่วยรักษาความสดของผลิตภัณฑ์ได้นานขึ้น</p>",
          contentEn: "<h2>Durability and Protection</h2><p>Foil pouches have excellent moisture, light, and air barrier properties, helping to preserve product freshness longer.</p>",
        },
        {
          order: 1,
          content: "<h2>ความคุ้มค่า</h2><p>เมื่อเทียบกับบรรจุภัณฑ์แบบอื่น ซองฟอยล์มีต้นทุนที่ต่ำกว่าและสามารถพิมพ์ลายได้หลากหลาย</p>",
          contentEn: "<h2>Cost Effectiveness</h2><p>Compared to other packaging types, foil pouches have lower costs and can be printed with various designs.</p>",
        },
      ],
    },
    {
      title: "หลอดครีมสำหรับเครื่องสำอาง: คู่มือฉบับสมบูรณ์",
      titleEn: "Cosmetic Tubes: A Complete Guide",
      slug: "cosmetic-tubes-guide",
      excerpt: "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับหลอดครีมสำหรับผลิตภัณฑ์เครื่องสำอางและสกินแคร์",
      excerptEn: "Everything you need to know about tubes for cosmetic and skincare products",
      coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-18"),
      categoryId: categories[1].id,
      sections: [
        {
          order: 0,
          content: "<h2>ประเภทของหลอดครีม</h2><p>หลอดครีมมีหลายประเภท ได้แก่ หลอดบีบ หลอดปั๊ม และหลอดแอร์เลส แต่ละประเภทเหมาะกับผลิตภัณฑ์ที่แตกต่างกัน</p>",
          contentEn: "<h2>Types of Cosmetic Tubes</h2><p>There are several types of tubes including squeeze tubes, pump tubes, and airless tubes. Each type suits different products.</p>",
        },
        {
          order: 1,
          content: "<h2>การเลือกขนาดที่เหมาะสม</h2><p>ขนาดหลอดที่นิยมมีตั้งแต่ 15ml ถึง 200ml ขึ้นอยู่กับประเภทผลิตภัณฑ์และการใช้งาน</p>",
          contentEn: "<h2>Choosing the Right Size</h2><p>Popular tube sizes range from 15ml to 200ml, depending on product type and usage.</p>",
        },
      ],
    },
    {
      title: "กล่องกระดาษ: ทางเลือกยั่งยืนสำหรับธุรกิจ",
      titleEn: "Paper Boxes: Sustainable Choice for Business",
      slug: "paper-boxes-sustainable",
      excerpt: "กล่องกระดาษเป็นทางเลือกที่เป็นมิตรกับสิ่งแวดล้อมและสามารถปรับแต่งได้ตามความต้องการ",
      excerptEn: "Paper boxes are eco-friendly options that can be customized to meet your needs",
      coverImage: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&h=600&fit=crop",
      isPublished: true,
      publishedAt: new Date("2025-01-12"),
      categoryId: categories[2].id,
      sections: [
        {
          order: 0,
          content: "<h2>ข้อดีของกล่องกระดาษ</h2><p>กล่องกระดาษสามารถรีไซเคิลได้ 100% ย่อยสลายได้ตามธรรมชาติ และสามารถพิมพ์ลายได้คมชัด</p>",
          contentEn: "<h2>Benefits of Paper Boxes</h2><p>Paper boxes are 100% recyclable, biodegradable, and can be printed with sharp, clear designs.</p>",
        },
        {
          order: 1,
          content: "<h2>การเลือกความหนาที่เหมาะสม</h2><p>ความหนาของกระดาษมีผลต่อความแข็งแรงและการปกป้องสินค้า เลือกให้เหมาะกับน้ำหนักของผลิตภัณฑ์</p>",
          contentEn: "<h2>Choosing the Right Thickness</h2><p>Paper thickness affects durability and product protection. Choose based on your product weight.</p>",
        },
      ],
    },
  ];

  for (const blogData of blogs) {
    const { sections, ...blog } = blogData;

    const existingBlog = await prisma.blog.findUnique({
      where: { slug: blog.slug },
    });

    if (!existingBlog) {
      await prisma.blog.create({
        data: {
          ...blog,
          sections: {
            create: sections,
          },
        },
      });
      console.log(`Created blog: ${blog.slug}`);
    } else {
      console.log(`Blog already exists: ${blog.slug}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
