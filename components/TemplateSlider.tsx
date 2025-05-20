"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

const images = [
  "https://swzyyzqrjteojovegnhw.supabase.co/storage/v1/object/sign/template-photostrips/example-photostrip.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc0MzFiODUyLWI0MDItNGEyMC04MDRhLTA4MmMxYmU5ZDI5YiJ9.eyJ1cmwiOiJ0ZW1wbGF0ZS1waG90b3N0cmlwcy9leGFtcGxlLXBob3Rvc3RyaXAuanBnIiwiaWF0IjoxNzQ3MzAwOTU5LCJleHAiOjE3NDc5MDU3NTl9.tMo_68ZPUlb3njQgAuasJ4SugYkm09Ay7m4gwyiblKk",
  "https://swzyyzqrjteojovegnhw.supabase.co/storage/v1/object/sign/template-photostrips/example-photostrip(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc0MzFiODUyLWI0MDItNGEyMC04MDRhLTA4MmMxYmU5ZDI5YiJ9.eyJ1cmwiOiJ0ZW1wbGF0ZS1waG90b3N0cmlwcy9leGFtcGxlLXBob3Rvc3RyaXAoMSkuanBnIiwiaWF0IjoxNzQ3MzAxMDE4LCJleHAiOjE3NDc5MDU4MTh9.BLo0cTjG329YRdrqVut2_Lnqy0Ni8yAsTQdLuyRmkJc",
  "https://swzyyzqrjteojovegnhw.supabase.co/storage/v1/object/sign/template-photostrips/example-photostrip(2).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc0MzFiODUyLWI0MDItNGEyMC04MDRhLTA4MmMxYmU5ZDI5YiJ9.eyJ1cmwiOiJ0ZW1wbGF0ZS1waG90b3N0cmlwcy9leGFtcGxlLXBob3Rvc3RyaXAoMikuanBnIiwiaWF0IjoxNzQ3MzAxMDM4LCJleHAiOjE3NDc5MDU4Mzh9.pvVHSJ1uiSzKOILz4vFqwA0TGFOK0lPpxMF-CJZDysI",
];

export default function TemplateSlider() {
  return (
    <div className="w-[200px] h-[400px] mx-auto">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        effect="fade"
        className="h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Template ${index + 1}`}
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
