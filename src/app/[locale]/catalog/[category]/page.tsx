import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import CatalogTabs from "@/components/CatalogTabs";

interface Props {
  params: Promise<{ category: string }>;
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
  images?: string[]; // For categories without subfolders
}

const categoryBanners: Record<string, string> = {
  stickTube: "/product-catalog/2Stick tube.png",
  creamTube: "/product-catalog/1creamTube.png",
  jar: "/product-catalog/4Jar.png",
  bottle: "/product-catalog/3Bottle.png",
  serumBottle: "/product-catalog/5Serum bottle.png",
  lip: "/product-catalog/6Lip.png",
  cosmetics: "/product-catalog/7Cosmetics.png",
};

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

export default async function CategoryDetailPage({ params }: Props) {
  const { category } = await params;
  const locale = await getLocale();
  const t = await getTranslations("catalog");
  const tcommon = await getTranslations("common");
  const th = await getTranslations("home");

  const data = categoryData[category];

  // Fetch latest published blogs
  let blogs: Array<{
    id: string;
    title: string;
    titleEn: string | null;
    slug: string;
    excerpt: string | null;
    excerptEn: string | null;
    publishedAt: Date | null;
    sections: Array<{ imageUrl: string | null }>;
  }> = [];

  try {
    blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        excerpt: true,
        excerptEn: true,
        publishedAt: true,
        sections: {
          orderBy: { order: "asc" },
          take: 1,
          select: { imageUrl: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  const getLocalizedTitle = (blog: (typeof blogs)[0]) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedExcerpt = (blog: (typeof blogs)[0]) => {
    if (locale === "en") {
      return blog.excerptEn || "";
    }
    return blog.excerpt;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!data) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 -mt-20 pt-28">
          <div className="container-custom">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          </div>
        </section>
        <section className="section-padding bg-white min-h-[60vh]">
          <div className="container-custom text-center py-12">
            <p className="text-muted mb-6">Category not found.</p>
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative text-white h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden -mt-20">
        <img
          src={categoryBanners[category]}
          alt={t(`${category}Alt`)}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              {t(`${category}H1`)}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {th("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {th("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-headline Section */}
      <section className="bg-secondary py-6">
        <div className="container-custom px-8 md:px-12 lg:px-16">
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            {t(`${category}Subheadline`)}
          </p>
        </div>
      </section>

      {/* Back link + Images Grid */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          {/* Render tabs for categories with subfolders, or direct grid for categories without */}
          {data.hasSubfolders && data.subfolders ? (
            <CatalogTabs
              tabs={data.subfolders}
              lineUrl={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
              locale={locale}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images?.map((imagePath: string) => {
                const filename = imagePath.split("/").pop() || "";
                const altText = filename.replace(/\.[^/.]+$/, "");
                return (
                  <a
                    key={imagePath}
                    href={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
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

          {/* View All Products PDF Button */}
          <div className="text-center mt-10">
            <a
              href="/Packpert Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t("viewAllProducts")}
            </a>
          </div>
        </div>
      </section>

      {/* Production Steps Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("productionStepsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex flex-col items-center text-center">
                <img
                  src={`/icons/ขั้นตอนผลิต${num}.png`}
                  alt={t(`prodStep${num}`)}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-3"
                />
                <p className="text-sm font-medium text-gray-700">{t(`prodStep${num}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("articlesTitle")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("articlesDesc")}
            </p>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/${locale}/blog/${blog.slug}`}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                    {blog.sections[0]?.imageUrl ? (
                      <img
                        src={blog.sections[0].imageUrl}
                        alt={getLocalizedTitle(blog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {blog.publishedAt && (
                      <p className="text-xs text-muted mb-2">{formatDate(blog.publishedAt)}</p>
                    )}
                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {getLocalizedTitle(blog)}
                    </h3>
                    {getLocalizedExcerpt(blog) && (
                      <p className="text-muted text-sm line-clamp-2">
                        {getLocalizedExcerpt(blog)}
                      </p>
                    )}
                    <span className="mt-4 inline-block text-primary font-medium text-sm group-hover:underline">
                      {tcommon("readMore")} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted">{locale === "th" ? "ยังไม่มีบทความ" : "No articles yet"}</p>
            </div>
          )}
          {blogs.length > 0 && (
            <div className="text-center mt-8">
              <Link href={`/${locale}/blog`} className="btn-primary">
                {tcommon("viewAll")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Catalogs Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("otherCatalogs")}
            </h2>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { image: "1creamtube.png", key: "creamTube", value: "creamTube" },
              { image: "2stick.png", key: "stickTube", value: "stickTube" },
              { image: "3bottle.png", key: "bottle", value: "bottle" },
              { image: "4cosmetic.png", key: "cosmetics", value: "cosmetics" },
              { image: "5jar.png", key: "jar", value: "jar" },
              { image: "6serum.png", key: "serumBottle", value: "serumBottle" },
              { image: "7lip.png", key: "lip", value: "lip" },
            ]
              .filter((item) => item.value !== category)
              .map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}/catalog/${item.value}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={`/other-catalog/${item.image}`}
                      alt={t(item.key)}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {t(item.key)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
