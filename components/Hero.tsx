import Image from "next/image";
import Link from "next/link";
import TemplateSlider from "./TemplateSlider";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-16 gap-12">
      {/* KIRI */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-c6a274">
          Abadikan momen berharga Anda dengan mudah
        </h1>
        <p className="mt-4 text-black text-lg">
          Dapatkan kemudahan sekarang juga. Hubungi admin kami segera dan
          nikmati layanan praktis!
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="#"
            className="bg-c6a274 text-white py-3 px-6 rounded-md shadow hover:opacity-90 transition"
          >
            Dapatkan Produk
          </Link>
          <Link
            href="#"
            className="border border-gray-400 py-3 px-6 rounded-md hover:bg-gray-100 transition"
          >
            Hubungi Sekarang
          </Link>
        </div>
      </div>

      {/* KANAN */}
      <div className="relative w-[300px] h-[600px] mx-auto hidden lg:block">
        {/* Ini slider image-mu dari Supabase */}
        <div className="absolute z-10 top-[30px] left-[25px] w-[250px] h-[476px] overflow-hidden rounded-[28px]">
          <TemplateSlider />
        </div>

        {/* Ini mockup HP kamu */}
        <Image
          src="/display-hp.png" // dari folder /public
          alt="Display HP"
          width={300}
          height={600}
          className="relative z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}
