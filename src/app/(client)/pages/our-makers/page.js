"use client";

import Link from "next/link";
import Layout from "../layout-page";
import {
  Heart,
  Leaf,
  Package,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Tạo ra từ tình yêu",
    desc: "Mỗi sản phẩm được chúng tôi tuyển chọn kỹ lưỡng, đảm bảo mang đến trải nghiệm thực sự ý nghĩa cho người nhận.",
  },
  {
    icon: Leaf,
    title: "Bền vững & có trách nhiệm",
    desc: "Ưu tiên các nhà sản xuất thân thiện với môi trường, sử dụng nguyên liệu tự nhiên và bao bì tái chế được.",
  },
  {
    icon: Users,
    title: "Hỗ trợ cộng đồng",
    desc: "Kết nối trực tiếp với các làng nghề truyền thống, giúp nghệ nhân Việt có thu nhập bền vững.",
  },
  {
    icon: Package,
    title: "Trải nghiệm mở hộp",
    desc: "Thiết kế bao bì công phu, từng chi tiết nhỏ đều tạo nên sự ngạc nhiên và thích thú.",
  },
];

export default function OurMakersPage() {
  return (
    <Layout>
      <title>Nhà sản xuất & Đối tác – UNLO M2C</title>
      <meta
        name="description"
        content="Câu chuyện của UNLO – nơi kết nối trực tiếp với 4 xưởng may OEM và những nghệ nhân thủ công Việt Nam."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-card/60 border-b border-border py-16 sm:py-24">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
            Câu chuyện của chúng tôi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight tracking-tight mb-6">
            Giá trị thực từ
            <br />
            <em className="text-primary not-italic font-serif">đôi tay người thợ</em>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            UNLO ra đời từ niềm tin rằng giá trị của một chiếc áo không nằm ở cái tên trên nhãn mác, mà được tạo nên từ chất lượng thực chất, sự tận tâm của người thợ may và sự minh bạch tại xưởng.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link
              href="/products"
              className="min-h-11 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary-hover px-7 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
            >
              <span>Khám phá sản phẩm M2C</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/factories"
              className="min-h-11 inline-flex items-center justify-center gap-2 text-foreground border border-border bg-card px-7 py-3 rounded-xl font-semibold text-sm hover:border-primary hover:text-primary transition-colors shadow-xs"
            >
              <span>Hồ sơ 4 nhà máy</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
              Triết lý
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Những nguyên tắc định hướng mọi quyết định của chúng tôi, từ việc
              chọn lựa nhà sản xuất đến cách đóng gói từng chiếc hộp.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary/40 shadow-xs"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 text-center shadow-md">
          <div className="flex justify-center gap-1 mb-6 text-primary-foreground/90">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-current text-primary-foreground"
              />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4 leading-tight">
            Trải nghiệm hàng thiết yếu trực tiếp từ xưởng?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Khám phá toàn bộ danh mục sản phẩm cơ bản chuẩn xuất khẩu không gắn mác với mức giá minh bạch tại xưởng.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="min-h-11 inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/factories"
              className="min-h-11 inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Hồ sơ 4 nhà máy đối tác
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
