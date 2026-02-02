import { FileText, ArrowLeft, Home, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import CatalogTabs from "@/components/CatalogTabs";

interface BlogSection {
  id: string;
  order: number;
  imageUrl: string | null;
  imagePosition: string;
  content: string | null;
  contentEn: string | null;
}

interface Blog {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  excerpt: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  catalogType: string | null;
  sections: BlogSection[];
}

interface SubfolderData {
  name: string;
  nameTh: string;
  nameEn: string;
  images: string[];
}

interface CategoryData {
  folder: string;
  hasSubfolders: boolean;
  subfolders?: SubfolderData[];
  images?: string[];
}

const categoryLineUrls: Record<string, string> = {
  creamTube: "https://lin.ee/n9h5cHB",
  stickTube: "https://lin.ee/izvk1yr",
  bottle: "https://lin.ee/VlwOT7X",
  jar: "https://lin.ee/z6zl8GV",
  serumBottle: "https://lin.ee/GhuPtHq",
  lip: "https://lin.ee/aA2U9au",
  cosmetics: "https://lin.ee/hjAy4CO",
};

const categoryData: Record<string, CategoryData> = {
  creamTube: {
    folder: "cream tube",
    hasSubfolders: true,
    subfolders: [
      {
        name: "หลอดกลม - Round Tube",
        nameTh: "หลอดกลม",
        nameEn: "Round Tube",
        images: [
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดผลิตภัณฑ์สกินแคร์สีดำเงา ทรงเรียวยาว พร้อมหัวกดแบบปั๊มสีดำ (Pump Tube) บนพื้นหลังสีขาวสะอาด.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/บรรจุภัณฑ์หลอดบีบสีขาว ผิวสัมผัสกึ่งเงา ปิดด้วยฝาครอบพลาสติกใสทรงกระบอก หัวลูกกลิ้งสีเงิน.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดบีบสีขาวขนาดเล็ก 2 หลอด หลอดหนึ่งเป็นหัวสำหรับนวดครีม และอีกหลอดเป็นหัวลูกกลิ้งโลหะ (Roller Ball) สำหรับทารอบดวงตา.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดสกินแคร์สีขาวมินิมอล มาพร้อมกับฝาปิดโลหะสีเงินเงาวาว ทรงกระบอกตั้งตรง.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดบรรจุภัณฑ์สีขาว ผิวแมตต์ ดีไซน์ปลายหลอดกว้างและเฉียงเล็กน้อย พร้อมฝาปิดแบบเกลียวสีขาวเข้าชุดกัน.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดบีบสีขาวทรงเรียวยาว ปากหลอดมีลักษณะเป็นดรอปเปอร์ ปิดด้วยฝาเกลียวพลาสติกใส.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดผลิตภัณฑ์สีขาว 2 หลอด วางสลับทิศทางกัน โดดเด่นด้วยฝาปิดทรงกรวยแหลมดูทันสมัย.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/หลอดบีบสีดำสนิท ผิวมันวาว ทรงมาตรฐานขนาดกะทัดรัด พร้อมฝาปิดแบบหมุนสีดำ.png",
        ],
      },
      {
        name: "หลอดรี - Oval Tube",
        nameTh: "หลอดรี",
        nameEn: "Oval Tube",
        images: [
          "/catalogs/cream tube/หลอดรี - Oval Tube/ขวดบรรจุภัณฑ์พลาสติกสีขาวทรงไข่ (oval_egg shape) ด้านบนโค้งมน ฐานล่างกว้าง แยกชิ้นฝาล่าง มีรอยคาดรอบขวด เหมาะสำหรับเครื่องสำอางและสกินแคร์.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/หลอดบีบพลาสติกสีดำทรงเรียว (tapered squeeze tube) ไหล่หลอดมนเล็กน้อย ปากหลอดอยู่ด้านล่างพร้อมฝาเปิด-ปิด (flip-top cap) เหมาะสำหรับครีม เจล และโฟมล้างหน้า.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/หลอดบีบสีขาวทรงสี่เหลี่ยมมน (rounded rectangle tube) ช่วงบนกว้างแล้วค่อย ๆ เรียวลง ฐานเป็นฝาเปิด-ปิดด้านล่าง (flip-top) ตั้งได้ หัวลูกกลิ้ง เหมาะสำหรับครีมกันแดดและสกินแคร์.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/ขวดบรรจุภัณฑ์สีขาวทรงแคปซูลมุมมน (rounded capsule body) ด้านบนโค้งมน ฐานล่างเป็นฝากสีเงินเมทัลลิกทรงครึ่งวงกลม ดูพรีเมียม เหมาะกับสกินแคร์และผลิตภัณฑ์ดูแลผิว.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/หลอดบีบสีขาวทรงกรวยตัด (trapezoid tube) ช่วงบนกว้างและเรียวลงมาด้านล่าง มีปากหลอดทรงกระบอกยื่นออก (nozzle_neck) สำหรับใส่ฝาเกลียว เหมาะสำหรับครีมและโลชั่น.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/หลอดบีบสีขาวขนาดเล็กทรงเรียว (slim squeeze tube) ไหล่หลอดมนเล็กน้อย ฐานเป็นฝาทรงโดมโค้งมนในตัว ตั้งได้ เหมาะสำหรับครีมซองทดลอง เจล หรือแฮนด์ครีม.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/ชุดหลอดบรรจุภัณฑ์สีเงิน พร้อมฝาเกลียวมีห่วง เหมาะสำหรับเซรั่ม ครีม และผลิตภัณฑ์สกินแคร์พรีเมียม.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/หลอดบีบพลาสติกสีขาวทรงรี (oval squeeze tube) ตัวหลอดสูง เรียวเล็กน้อยด้านบน ปิดปลายบนแบบซีล (crimped seal) ฐานเป็นฝาทรงกระบอกหนา ตั้งได้ เหมาะสำหรับครีมและโฟมล้างหน้า.png",
        ],
      },
    ],
  },
  stickTube: {
    folder: "Stick Tube",
    hasSubfolders: false,
    images: [
      "/catalogs/Stick Tube/แท่งสติ๊กสีดำทรงกระบอกเรียว (slim cylindrical tube) ด้านหนึ่งเป็นหัวฟองน้ำคุชชั่น อีกด้านเป็นหัวแปรงแต่งหน้า พร้อมฝาครอบใส แพ็กเกจจิ้งแบบ 2-in-1 สำหรับรองพื้นและสกินแคร์.png",
      "/catalogs/Stick Tube/แท่งสติ๊กสีน้ำเงินทรงกระบอก (cylindrical stick packaging) ระบบหมุนดันจากด้านล่าง ฝาครอบแยกชิ้น เหมาะสำหรับบาล์ม ครีมแท่ง และสกินแคร์แบบสติ๊ก.png",
      "/catalogs/Stick Tube/แท่งสติ๊ก 2 หัวทรงกระบอกใส (clear cylindrical jar) แยกชิ้นฝาบนและฝาล่าง โครงสร้าง 3 ส่วน เหมาะสำหรับครีมบำรุงผิวและผลิตภัณฑ์สกินแคร์พรีเมียม.png",
      "/catalogs/Stick Tube/แท่งสติ๊กสีขาวทรงสี่เหลี่ยมมน (rounded rectangular stick) ด้านบนเป็นหัวแปรง พร้อมฝาครอบ แพ็กเกจจิ้งสำหรับรองพื้น คุชชั่น และผลิตภัณฑ์เมคอัพ.png",
      "/catalogs/Stick Tube/แท่งสติ๊กทรงสี่เหลี่ยมมนสีขาว (rounded square stick packaging) มีระบบหมุนดันจากด้านล่าง เหมาะสำหรับครีมแท่ง และสกินแคร์แบบสติ๊ก.png",
      "/catalogs/Stick Tube/แท่งสติ๊กพลาสติกสีขาวทรงสี่เหลี่ยมมน ฐานสีส้ม ระบบหมุนดันจากฐาน พร้อมฝาครอบ เหมาะสำหรับบาล์ม สกินแคร์ และเครื่องสำอางแบบแท่ง.png",
      "/catalogs/Stick Tube/แท่งลิปสติกทรงกระบอก (cylindrical stick packaging) หลายสีพาสเทล ตัวแท่งแยกเป็นสองส่วน ฝาครอบทรงกระบอกผิวเรียบ ระบบหมุนดันจากด้านล่าง เหมาะสำหรับบาล์ม ครีมแท่ง และสกินแคร์แบบสติ๊ก.png",
      "/catalogs/Stick Tube/หลอดบรรจุภัณฑ์ทรงปากกาสีใส (pen-style cosmetic tube) ตัวหลอดโปร่งใสทรงกระบอกเรียวยาว ฝาดำทั้งสองด้าน แยกฝาครอบ ปลายหลอดออกแบบสำหรับหัวแปรงหรือหัวลูกกลิ้ง เหมาะสำหรับเซรั่ม ออยล์ และผลิตภัณฑ์แต้มเฉพาะจุด.png",
    ],
  },
  bottle: {
    folder: "Bottle",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Pump bottle - ขวดปั๊ม",
        nameTh: "ขวดปั๊ม",
        nameEn: "Pump Bottle",
        images: [
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดสเปรย์พลาสติกใสทรงกระบอกฐานมน สีฟ้าอ่อนกึ่งโปร่งแสง พร้อมหัวสเปรย์สีขาวและฝาครอบใส ท่อดูดของเหลวมองเห็นภายใน เหมาะสำหรับสกินแคร์.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดปั๊มพลาสติกทรงสี่เหลี่ยมมุมโค้ง สีชาใส (amber) พร้อมหัวปั๊มสีขาว ทรงสูงเรียบ ผนังขวดโปร่งแสงเห็นของเหลวด้านใน เหมาะสำหรับสบู่เหลวหรือโลชั่น.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดโฟมปั๊มพลาสติกสีชาใส ทรงกระบอกตรง ฐานมน พร้อมหัวโฟมสีดำและฝาครอบใส ภายในมีท่อดูดและกลไกสร้างโฟม เหมาะสำหรับโฟมล้างหน้า.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดปั๊มโลชั่นทรงกระบอกสีดำเงา พร้อมคอปั๊มโลหะสีเงินและหัวปั๊มสีดำ รูปทรงเพรียวสูง ให้ลุคพรีเมียม เหมาะสำหรับสกินแคร์ระดับพรีเมียม.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดสเปรย์พลาสติกทรงกระบอกสีดำด้าน ขนาด 30 มิลลิลิตร พร้อมหัวสเปรย์ซ่อนในตัว ดีไซน์มินิมอล.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดปั๊มพลาสติกสีขาวทรงแอปเปิ้ล 2 ขวด พร้อมหัวปั๊มสีดำวางด้านข้าง รูปทรงมนโค้งจับถนัดมือ เหมาะสำหรับเซรั่มหรือโลชั่น.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดปั๊มพลาสติกสีขาวทรงกลมป้อม ฐานกว้าง ตัวขวดโค้งมน พร้อมหัวปั๊มสีขาว ดีไซน์เรียบ สะอาด เหมาะสำหรับครีมบำรุงหรือสบู่ล้างมือ.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/ขวดปั๊มพลาสติกสีขาวทรงกระบอกสูง ฐานมน พร้อมหัวปั๊มสีขาว ทรงเพรียวเรียบ เหมาะสำหรับแชมพู เจลอาบน้ำ หรือโลชั่น.png",
        ],
      },
      {
        name: "Press bottle - ขวดฝากด",
        nameTh: "ขวดฝากด",
        nameEn: "Press Bottle",
        images: [
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกสูง ผิวกึ่งโปร่งแสงสีขาวน้ำนม ไหล่ขวดโค้งมน คอขวดสั้นแบบตรง ปิดด้วยฝากดสีขาว ผิวเรียบ เหมาะสำหรับบรรจุโทนเนอร์หรือโลชั่น.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกสูง ผิวโปร่งแสงสีขาวใส ไหล่ขวดโค้งมน คอขวดสั้น ปิดด้วยฝากดสีดำทรงกลม ผิวเงา ให้ลุคเรียบ มินิมอล.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอก ไหล่ขวดตัดตรงเล็กน้อย ตัวขวดโปร่งใสสีใส ปิดด้วยฝาเกลียวสีดำทรงเตี้ย ผิวเงา เหมาะสำหรับครีมหรือเจล.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกเตี้ย ไหล่ขวดตัดตรง ตัวขวดโปร่งแสงสีอำพัน (amber) ปิดด้วยฝาเกลียวสีดำทรงกลม ผิวเงา เหมาะสำหรับผลิตภัณฑ์ที่ต้องป้องกันแสง.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกเตี้ย ไหล่ขวดตัดตรง ตัวขวดโปร่งแสงสีเขียวอมเหลือง (olive green) ปิดด้วยฝาเกลียวสีดำ ผิวเงา ให้ลุคธรรมชาติ สายออร์แกนิก.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกสูง ผิวทึบสีขาว ไหล่ขวดโค้งมน คอขวดสั้น ปิดด้วยฝากดทรงกระบอกสีทองเงา ให้ภาพลักษณ์พรีเมียม เหมาะกับสกินแคร์.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกสูง ผิวทึบสีดำ ไหล่ขวดโค้งมน คอขวดสั้น ปิดด้วยฝากดทรงกระบอกสีทองเงา ลุคหรูหรา โมเดิร์น เหมาะกับแบรนด์พรีเมียม.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/ขวดพลาสติกทรงกระบอกสูง ผิวโปร่งแสงสีอำพัน ไหล่ขวดโค้งมน คอขวดสั้น ปิดด้วยฝากดสีดำทรงสูง ผิวเงา เหมาะสำหรับโลชั่น น้ำมัน หรือแฮร์แคร์.png",
        ],
      },
      {
        name: "Airless bottle - ขวดสูญญากาศ",
        nameTh: "ขวดสูญญากาศ",
        nameEn: "Airless Bottle",
        images: [
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/หลอดบรรจุภัณฑ์เครื่องสำอางทรงปากกา (pen-style cosmetic tube) ตัวหลอดทรงกระบอกเรียวยาว สีเขียวมิ้นต์ ฝาครอบใส ภายในเป็นหัวลูกกลิ้งโลหะ 3 ลูก (triple metal roller head) เหมาะสำหรับอายเซรั่ม เจลลดบวม และผลิตภัณฑ์นวดรอบดวงตา.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดบรรจุภัณฑ์ทรงเหลี่ยมผืนผ้าขอบมน (rectangular cosmetic bottle) ตัวขวดใสผิวเรียบ ฝาสีดำทรงเหลี่ยม ระบบหัวปั๊มคู่ (dual pump dispenser) เหมาะสำหรับสกินแคร์สูตรสองส่วนหรือเซรั่มแบบ dual chamber.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดพลาสติกทรงกระบอกขอบมนหลายขนาด หัวปั๊มกด (pump dispenser) 2 หัว สีฟ้า–เขียวพาสเทล พร้อมฝาครอบใส ตัวขวดผิวกึ่งโปร่งแสง เหมาะสำหรับโลชั่น เซรั่ม และสกินแคร์รายวัน.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/หลอดบรรจุภัณฑ์ทรงกระบอกสีเหลืองพาสเทล ระบบกดแบบ airless pump ตัวหลอดผิวเรียบไม่มีหลอดดูดภายใน ช่วยควบคุมปริมาณและลดการปนเปื้อน เหมาะสำหรับครีม เซรั่ม และสกินแคร์พรีเมียม.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดสเปรย์ทรงกระบอกแบบ airless สีเทา–ขาว ดีไซน์สองโทน หัวพ่นแบบ fine mist ไม่มีหลอดดูดภายใน เหมาะสำหรับเซรั่ม สกินแคร์สูตรบาง และผลิตภัณฑ์เวชสำอาง.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดบรรจุภัณฑ์พลาสติกทรงกระบอกใส ระบบปั๊มสุญญากาศ (airless pump bottle) ภายในเป็นแกนดันครีมจากด้านล่าง เหมาะสำหรับเซรั่ม ครีมบำรุง และผลิตภัณฑ์ที่ต้องการความสะอาดสูง.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดบรรจุภัณฑ์ทรงกระบอกสูงสีฟ้าใส ฝาครอบใส ระบบหัวสเปรย์แบบ fine mist ภายในมีหลอดดูดตรง เหมาะสำหรับโทนเนอร์ สเปรย์น้ำแร่ และสกินแคร์สูตรน้ำ.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/ขวดบรรจุภัณฑ์เครื่องสำอางทรงกระบอกเรียวยาว (slim cylindrical cosmetic bottle) ระบบปั๊มสุญญากาศแบบ airless ตัวขวดพลาสติกกึ่งโปร่งแสงสีขาวน้ำนม ภายในเป็นแกนดันครีมจากด้านล่าง ไม่มีหลอดดูด ช่วยลดการปนเปื้อน.png",
        ],
      },
    ],
  },
  jar: {
    folder: "Jar",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Cream jar กระปุกครีม",
        nameTh: "กระปุกครีม",
        nameEn: "Cream Jar",
        images: [
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมอะคริลิกทรงหัวใจ ฝาสีชมพู และฝาสีดำ ตัวกระปุกเป็นสีใส.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมอะคริลิกสีทองใส พร้อมฝาเกลียว เปิดฝาเห็นแผ่นปิดสีขาวด้านใน.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมอะคริลิกทรงกลม ฝาเงินเงา ตัวกระปุกใสสีฟ้า ดีไซน์พรีเมียม.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมพลาสติกสีชมพูอ่อน แบบแยกชิ้น ฝา ตัวกระปุก และแผ่นรอง.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกแก้วสีเขียวมะกอก 3 ขนาด พร้อมฝาสีดำ วางเรียงขนาด.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกทรงกระบอก สีพาสเทล ฟ้า ดำ ขาว และชมพู.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกพลาสติกทรงสี่เหลี่ยม สีชมพู เทา และขาว พร้อมฝาปิด.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมอะคริลิกใส ฝาสีขาว ทรงกลม ดีไซน์เรียบมินิมอล.png",
        ],
      },
      {
        name: "Toner pad jar กระปุกโทนเนอร์แพด",
        nameTh: "กระปุกโทนเนอร์แพด",
        nameEn: "Toner Pad Jar",
        images: [
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกครีมสีเหลืองแบบฝาเปิด พร้อมถ้วยด้านในสีขาว ถอดแยกชิ้นได้ พร้อมที่ตัก.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกโทนเนอร์แพดสีชมพูแบบฝาเปิด พร้อมที่คีบ.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกครีมทรงสี่เหลี่ยมสีม่วง ฝาเปิด พร้อมไม้พายสำหรับตักครีมด้านใน.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกครีมทรงกลมสีม่วงอ่อน ฝาเปิดครึ่ง มีที่ตักวางนอนอยู่ด้านใน.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกโทนเนอร์แพดทรงสี่เหลี่ยมสีชมพู พร้อมที่คีบ.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/กระปุกครีมพลาสติกใสแบบสองช่อง เปิดฝาโชว์พื้นที่ใส่เนื้อครีม.png",
        ],
      },
    ],
  },
  serumBottle: {
    folder: "Serum Bottle",
    hasSubfolders: false,
    images: [
      "/catalogs/Serum Bottle/ขวดเซรั่มทรงกระบอก สีพาสเทล 5 สี เรียงกันบนพื้นหลังสีขาว มีช่องแสดงระดับของเหลว.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วสีม่วงเข้ม 2 ขนาด พร้อมฝาดรอปเปอร์สีดำ.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วใส 2 ขนาด ฝาโลหะสีเงินและสีทอง ดีไซน์เรียบหรู.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วใสทรงสูง ฝาโลหะสีทอง พร้อมหลอดหยดสีขาว.png",
      "/catalogs/Serum Bottle/ขวดเซรั่มทรงเหลี่ยมใส ดีไซน์คริสตัล หัวปั๊มสีเงิน.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์พลาสติกสีขาวขนาดเล็ก พร้อมฝาสีพาสเทลหลายสี เรียงเป็นแถวบนพื้นหลังสีขาว.png",
      "/catalogs/Serum Bottle/ขวดเซรั่มทรงกลมแก้วใส 2 ขนาด ฝาสีเงินและสีทอง ดีไซน์พรีเมียม.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วสีชมพูอ่อน 2 ขนาด พร้อมฝาสีโรสโกลด์.png",
    ],
  },
  lip: {
    folder: "Lip",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Lip Gloss ลิปกลอส",
        nameTh: "ลิปกลอส",
        nameEn: "Lip Gloss",
        images: [
          "/catalogs/Lip/Lip Gloss ลิปกลอส/ลิปกลอสเปล่า สีดำ ทรงกระบอก แยกชิ้นฝา แปรง และขวด เหมาะสำหรับแบรนด์เครื่องสำอางค์.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/ขวดลิปกลอสเปล่า สีชมพู ทรงกระบอก พร้อมแปรงทาลิป แพ็กเกจเครื่องสำอางแบบมินิมอล.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/บรรจุภัณฑ์ลิปกลอสทรงเหลี่ยม ฝาลายศิลป์ แยกขวดและหัวแปรง สำหรับลิควิดลิปพรีเมียม.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/ขวดลิปกลอสเปล่าหลายสี หลายโทน จัดเรียงเป็นแถว สำหรับเลือกสีแพ็กเกจแบรนด์เครื่องสำอางค์.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/ขวดลิปกลอสใส 2 หัว ฝาดำ พร้อมหัวแปรงทาลิป แพ็กเกจเครื่องสำอางแบบเรียบหรู.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/แพ็กเกจลิปกลอสทรงเหลี่ยม ฝาสีชมพู ดำ และขาว ตัวขวดใส แยกชิ้นสำหรับบรรจุลิควิดลิป.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/ขวดลิปกลอสเปล่าทรงหัวใจ สีชมพู แพ็กเกจเครื่องสำอางดีไซน์น่ารัก เหมาะกับแบรนด์วัยรุ่น.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/แพ็กเกจลิปกลอสทรงแคปซูล สีดำใส พร้อมแปรงทาลิป ดีไซน์ทันสมัย.png",
        ],
      },
      {
        name: "Lipstick ลิปสติก",
        nameTh: "ลิปสติก",
        nameEn: "Lipstick",
        images: [
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงสี่เหลี่ยมผิวมัน สีดำตัดเงิน ฝาถอดวางด้านข้าง เห็นแกนลิปด้านใน.png",
          "/catalogs/Lip/Lipstick ลิปสติก/ลิปสติกทรงสี่เหลี่ยม สีขาวตัดชมพูโรสโกลด์ และสีดำตัดชมพูโรสโกลด์ ฝาทรงสี่เหลี่ยม ผิวเรียบ.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงสี่เหลี่ยมลายโมเสกสีพาสเทล กรอบสีทอง หนึ่งแท่งเปิดเห็นแกนลิป อีกแท่งปิดฝา.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แพ็กเกจลิปสติกทรงสี่เหลี่ยมผิวเงา ไล่สีเขียวถึงทอง หนึ่งแท่งเปิดเห็นแกนลิปสีทอง อีกแท่งปิดฝา.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงหกเหลี่ยมมุมตัด สีเทาอ่อน ดีไซน์มินิมอล.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แพ็กเกจลิปสติกทรงกระบอกสีน้ำเงินเข้ม คาดแถบสีเงิน หนึ่งแท่งเปิดเห็นแกนลิป อีกแท่งปิดฝา และฝาวางด้านข้าง.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงกระบอกผิวเงา ไล่สีชมพูถึงขาว.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงกระบอกสีทอง ผิวโลหะลายแกะสลัก ตัวแท่งเป็นสีดำ ฝาถอดวางข้าง เห็นแท่งลิปด้านใน.png",
        ],
      },
    ],
  },
  cosmetics: {
    folder: "Powder case",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Powder case ตลับแป้ง",
        nameTh: "ตลับแป้ง",
        nameEn: "Powder Case",
        images: [
          "/catalogs/Powder case/Powder case ตลับแป้ง/ตลับแป้งทรงกลมสีดำเงา ฐานใส มาพร้อมหัวฟองน้ำทรงกลมสำหรับแตะผลิตภัณฑ์ และฝาปิดทรงลูกบอลด้านบน เหมาะสำหรับรองพื้น คุชชั่น ครีม.png",
          "/catalogs/Powder case/Powder case ตลับแป้ง/กระปุกเครื่องสำอางทรงกระบอกเตี้ย สีดำ ฐานใส ออกแบบพร้อมหัวฟองน้ำกลมเนื้อนุ่มสำหรับกดและเกลี่ยเนื้อผลิตภัณฑ์ ตัวกระปุกแยกชิ้นได้ ช่วยควบคุมปริมาณการใช้งาน เหมาะกับรองพื้น คุชชั่น.png",
          "/catalogs/Powder case/Powder case ตลับแป้ง/กระปุกบรรจุภัณฑ์เครื่องสำอางทรงกระบอกเตี้ย สีโรสโกลด์ผิวเงา ฐานใส พร้อมหัวฟองน้ำกลมด้านบน ดีไซน์พรีเมียม เหมาะสำหรับผลิตภัณฑ์รองพื้น คุชชั่น.png",
        ],
      },
      {
        name: "Cushion case ตลับคุชชั่น",
        nameTh: "ตลับคุชชั่น",
        nameEn: "Cushion Case",
        images: [
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/ตลับเครื่องสำอางทรงสี่เหลี่ยมมุมมน (rounded square cosmetic compact) พลาสติกใสและสีชมพูใส ฝาพับแบบใส ดีไซน์โปร่ง เหมาะสำหรับบรรจุคุชชั่น แป้ง หรือผลิตภัณฑ์แต่งหน้าขนาดพกพา.png",
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/ตลับคุชชั่นเครื่องสำอางทรงกลม (round cushion compact) สีดำเงา ฝาด้านในสีแดงแบบมีบานพับ โครงสร้างแยกชิ้น ประกอบด้วยฝา ตัวตลับ และวงแหวนล็อก เหมาะสำหรับบรรจุคุชชั่น รองพื้น หรือแป้งน้ำ.png",
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/ตลับคุชชั่นทรงกลมสีครีมขอบโรสโกลด์ (round cushion compact with mesh filter) ภายในมีฟองน้ำควบคุมปริมาณและพัฟแต่งหน้า ฝาด้านในมีกระจกสะท้อน ดีไซน์พรีเมียม เหมาะสำหรับคุชชั่นและรองพื้นระดับไฮเอนด์.png",
        ],
      },
    ],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const locale = await getLocale();

  // Fetch blog directly from database
  let blog: Blog | null = null;
  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        excerpt: true,
        excerptEn: true,
        coverImage: true,
        isPublished: true,
        publishedAt: true,
        catalogType: true,
        sections: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            order: true,
            imageUrl: true,
            imagePosition: true,
            content: true,
            contentEn: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  // Return 404 if blog not found or not published
  if (!blog || !blog.isPublished) {
    notFound();
  }

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedContent = (section: BlogSection) => {
    if (locale === "en") {
      return section.contentEn || "";
    }
    return section.content;
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-primary -mt-20">
        <div className="container mx-auto px-2">
          <div className="max-w-3xl">
            <p className="text-accent text-xs uppercase tracking-widest mb-3">BLOG & NEWS</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-gray-300">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-500 hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${locale}/blog`} className="text-gray-500 hover:text-primary transition-colors">
              {t("blog")}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary truncate max-w-[200px]">{getLocalizedTitle(blog)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <div>
              <article>
                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {getLocalizedTitle(blog)}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#C9A227] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#111928]" />
                      </div>
                      <span>{t("author")}</span>
                    </div>
                    {blog.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#C9A227]" />
                        <span>{formatDateTime(blog.publishedAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Share Buttons */}
                  <div className="pb-6 border-b border-white/10">
                    <ShareButtons title={getLocalizedTitle(blog)} shareLabel={t("share")} />
                  </div>
                </header>

                {/* Article Content Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  {/* Article Sections */}
                  <div className="space-y-8">
                    {blog.sections.map((section, index) => (
                      <div key={section.id}>
                        {/* Section with Image - Side by Side Layout */}
                        {section.imageUrl ? (
                          <div
                            className={`flex flex-col ${
                              section.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
                            } gap-6 items-start`}
                          >
                            {/* Section Image */}
                            <div className="w-full md:w-1/2 shrink-0">
                              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                  src={section.imageUrl}
                                  alt={`Section ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            {/* Section Content */}
                            {getLocalizedContent(section) && (
                              <div className="w-full md:w-1/2">
                                <div
                                  className="blog-content"
                                  dangerouslySetInnerHTML={{
                                    __html: getLocalizedContent(section)?.replace(/\n/g, "<br />") || "",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Section without Image - Full Width Content */
                          getLocalizedContent(section) && (
                            <div
                              className="blog-content"
                              dangerouslySetInnerHTML={{
                                __html: getLocalizedContent(section)?.replace(/\n/g, "<br />") || "",
                              }}
                            />
                          )
                        )}
                      </div>
                    ))}

                    {/* No sections message */}
                    {blog.sections.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>This blog post has no content yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Share */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <ShareButtons
                      title={getLocalizedTitle(blog)}
                      shareLabel={t("shareArticle")}
                      size="sm"
                    />
                    <Link
                      href={`/${locale}/blog`}
                      className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("backToBlog")}
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related Catalog Section */}
      {blog.catalogType && categoryData[blog.catalogType] && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-2">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                {locale === "th" ? "สินค้าที่เกี่ยวข้อง" : "Related Products"}
              </h2>

              {categoryData[blog.catalogType].hasSubfolders && categoryData[blog.catalogType].subfolders ? (
                <CatalogTabs
                  tabs={categoryData[blog.catalogType].subfolders!}
                  lineUrl={categoryLineUrls[blog.catalogType] || "https://lin.ee/n9Tx1PK"}
                  locale={locale}
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoryData[blog.catalogType].images?.map((imagePath: string) => {
                    const filename = imagePath.split("/").pop() || "";
                    const altText = filename.replace(/\.[^/.]+$/, "");
                    return (
                      <a
                        key={imagePath}
                        href={categoryLineUrls[blog.catalogType!] || "https://lin.ee/n9Tx1PK"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
                      >
                        <Image
                          src={imagePath}
                          alt={altText}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Link to full catalog */}
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/catalog/${blog.catalogType}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {locale === "th" ? "ดูแคตตาล็อกทั้งหมด" : "View Full Catalog"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
