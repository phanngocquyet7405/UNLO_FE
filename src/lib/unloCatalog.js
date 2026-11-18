/**
 * UNLO Brandless M2C — Curated Direct-from-Factory Vietnamese Essentials Catalog
 * Every product links to a verified Factory Passport, 4-segment transparent pricing,
 * spec-by-spec comparison, 12-step QC log, size chart, and Smart Fit body reviews.
 */

export const UNLO_CATEGORIES = [
  {
    id: "cotton-basics",
    label: "Áo Thun & Dệt Kim",
    shortLabel: "Dệt Kim",
    enTag: "KNITWEAR",
    description: "Áo thun Supima Cotton 260 GSM & Polo Tencel sản xuất trực tiếp tại Xưởng Dệt Kim Số 04 Hưng Yên.",
    href: "/products?category=cotton-basics",
    image: "/assets/img/cat-ao-thun.jpg",
  },
  {
    id: "leather-goods",
    label: "Đồ Da Nguyên Tấm",
    shortLabel: "Đồ Da",
    enTag: "LEATHER",
    description: "Ví da, thắt lưng & túi công sở da bò Full-grain Ý từ Xưởng Đồ Da Số 02 Bình Dương.",
    href: "/products?category=leather-goods",
    image: "/assets/img/p-tote.jpg",
  },
  {
    id: "linen-tailoring",
    label: "Sơ Mi & Quần Linen",
    shortLabel: "Linen",
    enTag: "LINEN",
    description: "100% sợi lanh châu Âu 185 GSM may cuốn sườn French Seam tại Xưởng Số 07 Bắc Ninh.",
    href: "/products?category=linen-tailoring",
    image: "/assets/img/cat-so-mi.jpg",
  },
  {
    id: "ceramics-home",
    label: "Gốm Sứ & Gia Dụng",
    shortLabel: "Gốm Sứ",
    enTag: "HOME",
    description: "Cốc gốm và bộ bàn ăn men lì nung 1.280°C chuẩn an toàn thực phẩm LFGB từ Bát Tràng.",
    href: "/products?category=ceramics-home",
    image: "/assets/img/cat-dong-phuc.jpg",
  },
  {
    id: "canvas-accessories",
    label: "Túi & Phụ Kiện Xưởng",
    shortLabel: "Phụ Kiện",
    enTag: "CARRY",
    description: "Túi tote Canvas 16oz, bao da hộ chiếu và phụ kiện hằng ngày cắt bỏ mọi chi phí logo.",
    href: "/products?category=canvas-accessories",
    image: "/assets/img/cat-tui.jpg",
  },
];

export const UNLO_MATERIALS = [
  { value: "", label: "Tất Cả" },
  { value: "Supima Cotton", label: "Supima Cotton 260 GSM" },
  { value: "Da Bò Full-grain", label: "Da Bò Full-grain Ý" },
  { value: "100% European Linen", label: "European Linen 185 GSM" },
  { value: "Gốm Cao Lanh", label: "Gốm Sứ 1.280°C" },
  { value: "Canvas 16oz", label: "Canvas 16oz" },
];

export const UNLO_PRODUCTS = [
  {
    _id: "690000000000000000000101",
    slug: "ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi",
    name: "Áo Thun Cotton Supima 260 GSM — Dệt Kim Nguyên Khối",
    categorySlug: "cotton-basics",
    categoryName: "Áo Thun & Dệt Kim",
    factorySlug: "xuong-det-kim-so-04-hung-yen",
    creatorName: "Xưởng Dệt Kim Số 04 · Hưng Yên",
    materialTag: "Supima Cotton",
    price: 245000,
    salePercent: 0,
    rate: 4.9,
    reviewCount: 312,
    soldCount: 1420,
    stock: 280,
    badge: { label: "M2C BESTSELLER", tone: "indigo" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: Dệt kim & kiểm định bo cổ tại KCN Phố Nối, Hưng Yên",
    descriptions:
      "Áo thun dệt kim mật độ cao 260 GSM từ 100% sợi Cotton dài nhập khẩu, xử lý giặt enzyme chống co rút dưới 2% sau 50 lần giặt. Bo cổ dệt rib đôi dày 2.2cm giữ phom bền bỉ, không logo phô trương.",
    images: [
      {
        url: "/assets/img/p-tee-250.jpg",
      },
      {
        url: "/assets/img/p-tee-trang.jpg",
      },
      {
        url: "/assets/img/p-tee-xam.jpg",
      },
    ],
    specs: {
      fabricComposition: "100% Cotton sợi dài (Long-staple Supima Cotton)",
      gsmWeight: 260,
      origin: "Xưởng Dệt Kim Số 04 — KCN Phố Nối, Hưng Yên",
      shrinkage: "Giặt enzyme chống co rút < 2% sau 50 lần giặt",
      dimensions: "Form Regular chuẩn vóc dáng Việt (S – XL)",
      qcBatchCode: "LOT-HY26-1104 · Vượt qua 12/12 bước QC AQL 2.5",
    },
    specComparison: [
      { label: "Thành phần sợi", unlo: "100% Supima sợi dài (≥35mm)", retail: "Cotton pha Polyester / sợi ngắn" },
      { label: "Định lượng vải (GSM)", unlo: "260 GSM dày dặn đứng phom", retail: "160–180 GSM dễ mỏng chảy" },
      { label: "Xử lý chống co rút", unlo: "Giặt Enzyme (< 2% sau 50 lần)", retail: "Thường co 5–8% sau 3 lần giặt" },
      { label: "Bo cổ & Mật độ may", unlo: "Rib đôi 2.2cm · 14 mũi/inch", retail: "Rib đơn dễ bai dão cổ áo" },
    ],
    costBreakdown: {
      nullPrice: 245000,
      traditionalRetailPrice: 690000,
      materialCost: 110000,
      materialDesc: "Vải Cotton sợi dài nhập khẩu, chỉ may chuẩn xuất khẩu",
      manufacturingCost: 49000,
      manufacturingDesc: "Cắt rập Laser & may hoàn thiện tại xưởng đối tác Hưng Yên",
      packagingShippingCost: 37000,
      packagingShippingDesc: "Bao bì giấy tái chế & vận chuyển tiêu chuẩn",
      platformQcCost: 49000,
      platformQcDesc: "Kiểm định QC 12 bước tại xưởng & vận hành hệ thống",
    },
    sizeChart: [
      { size: "S", height: "1m58 – 1m67", weight: "50 – 59 kg", chest: "102 cm", length: "67 cm" },
      { size: "M", height: "1m66 – 1m73", weight: "60 – 68 kg", chest: "108 cm", length: "70 cm" },
      { size: "L", height: "1m72 – 1m79", weight: "69 – 77 kg", chest: "114 cm", length: "72 cm" },
      { size: "XL", height: "1m78 – 1m86", weight: "78 – 88 kg", chest: "120 cm", length: "75 cm" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 35000,
      innerLabelFee: 20000,
      extraLeadDays: 2,
      defaultHeadline: "M.A",
      defaultSubline: "Thêu chỉ tonal cổ tay trái",
      allowedThreadColors: [
        { name: "Midnight Indigo", hex: "#15095D" },
        { name: "Milky Ivory", hex: "#FCFDF1" },
        { name: "Periwinkle", hex: "#8D8DC7" },
        { name: "Planetary Blue", hex: "#334EAB" },
      ],
    },
    variants: [
      { _id: "690000000000000000001101", colorName: "Galaxy Navy", colorHex: "#15095D", size: "S", stock: 45, priceDelta: 0 },
      { _id: "690000000000000000001102", colorName: "Galaxy Navy", colorHex: "#15095D", size: "M", stock: 68, priceDelta: 0 },
      { _id: "690000000000000000001103", colorName: "Galaxy Navy", colorHex: "#15095D", size: "L", stock: 54, priceDelta: 0 },
      { _id: "690000000000000000001104", colorName: "Galaxy Navy", colorHex: "#15095D", size: "XL", stock: 30, priceDelta: 0 },
      { _id: "690000000000000000001105", colorName: "Milky Ivory", colorHex: "#FCFDF1", size: "M", stock: 52, priceDelta: 0 },
      { _id: "690000000000000000001106", colorName: "Milky Ivory", colorHex: "#FCFDF1", size: "L", stock: 48, priceDelta: 0 },
      { _id: "690000000000000000001107", colorName: "Periwinkle Mist", colorHex: "#9EA1D2", size: "M", stock: 35, priceDelta: 0 },
      { _id: "690000000000000000001108", colorName: "Periwinkle Mist", colorHex: "#9EA1D2", size: "L", stock: 28, priceDelta: 0 },
    ],
    fitReviews: [
      {
        id: "fr-1",
        author: "Trần Quốc Bảo",
        date: "15/11/2026",
        rating: 5,
        heightCm: 172,
        weightKg: 68,
        sizeBought: "L",
        fitRating: "true_to_size",
        comment: "Cao 1m72 nặng 68kg mặc size L rộng vai vừa đẹp, vải 260 GSM dày dặn cầm rất đầm tay, giặt máy 6 lần cổ áo vẫn phẳng lì không bai.",
      },
      {
        id: "fr-2",
        author: "Nguyễn Minh Khôi",
        date: "11/11/2026",
        rating: 5,
        heightCm: 168,
        weightKg: 62,
        sizeBought: "M",
        fitRating: "true_to_size",
        comment: "Mình 1m68 62kg mặc M rất gọn người. Đọc bảng bóc tách giá thấy minh bạch nên mua thử combo 3 màu, chất vải ngang áo 700k ngoài mall.",
      },
      {
        id: "fr-3",
        author: "Lê Hoàng Nam",
        date: "04/11/2026",
        rating: 5,
        heightCm: 179,
        weightKg: 81,
        sizeBought: "XL",
        fitRating: "runs_large",
        comment: "1m79 81kg mặc XL hơi thoải mái phần bụng, ai thích ôm gọn có thể lấy L. Màu Galaxy Navy ngoài đời sang hơn ảnh.",
      },
    ],
    makerQa: [
      {
        id: "qa-1",
        question: "Áo 260 GSM mặc mùa hè ở Sài Gòn có bị nóng bí không ạ?",
        asker: "Hữu Nghĩa",
        answer: "Chào bạn, vải dùng 100% Cotton sợi dài tự nhiên dệt mắt thoáng khí (không pha poly) nên thấm hút mồ hôi rất nhanh. Độ dày 260 GSM giúp đứng phom và không lộ khuyết điểm nhưng vẫn thoáng mát khi mặc cả ngày.",
        responder: "Chị Phạm Thị Minh H. — Quản đốc Xưởng Dệt Kim Số 04",
      },
      {
        id: "qa-2",
        question: "Có cần giặt tay hay cho máy giặt sấy bình thường được không?",
        asker: "Thanh Tâm",
        answer: "Vải đã qua bước giặt enzyme chống co rút tại xưởng (< 2%). Bạn có thể giặt máy chế độ thường, lộn trái áo khi phơi để màu Midnight Navy bền sắc lâu nhất.",
        responder: "Chị Phạm Thị Minh H. — Quản đốc Xưởng Dệt Kim Số 04",
      },
    ],
  },
  {
    _id: "690000000000000000000102",
    slug: "vi-da-bo-full-grain-y-son-canh-4-lop",
    name: "Ví Da Bò Nguyên Tấm Full-Grain Ý — Sơn Cạnh 4 Lớp",
    categorySlug: "leather-goods",
    categoryName: "Đồ Da Nguyên Tấm",
    factorySlug: "xuong-che-tac-do-da-so-02-binh-duong",
    creatorName: "Xưởng Đồ Da Số 02 · Bình Dương",
    materialTag: "Da Bò Full-grain",
    price: 590000,
    salePercent: 0,
    rate: 5.0,
    reviewCount: 248,
    soldCount: 890,
    stock: 150,
    badge: { label: "TIẾT KIỆM 68%", tone: "dark" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: Lạng mép da & sơn cạnh 4 lớp thủ công tại Bình Dương",
    descriptions:
      "Chế tác từ da bò nguyên tấm Full-grain nhập khẩu Ý đạt chuẩn LWG Gold, độ dày 1.7mm. Khâu hoàn thiện trên máy Juki chuyên dụng Nhật Bản, sơn cạnh 4 lớp chống nứt và hỗ trợ dập chìm tên viết tắt kín đáo không logo.",
    images: [
      {
        url: "/assets/img/p-tote.jpg",
      },
      {
        url: "/assets/img/cut-beige-tee.webp",
      },
    ],
    specs: {
      fabricComposition: "100% Da bò nguyên tấm Full-grain Ý (chuẩn LWG Gold)",
      gsmWeight: 170,
      origin: "Xưởng Chế Tác Đồ Da Số 02 — Thuận An, Bình Dương",
      shrinkage: "Sơn cạnh 4 lớp thủ công · Bảo hành đường chỉ trọn đời",
      dimensions: "11.5 × 9.2 × 1.5 cm · 8 ngăn thẻ + 2 ngăn tiền",
      qcBatchCode: "LOT-BD26-0812 · Kiểm định kéo chỉ & gập 10.000 lần",
    },
    specComparison: [
      { label: "Chất lượng lớp da", unlo: "Full-grain nguyên tấm (lớp trên cùng)", retail: "Da tách lớp phủ nhựa PU (Split/Genuine)" },
      { label: "Độ dày & Cảm giác", unlo: "1.7mm càng dùng càng bóng Patina", retail: "1.0mm dễ bong tróc sau 1 năm" },
      { label: "Xử lý mép cạnh", unlo: "Lạng mỏng & sơn cạnh 4 lớp thủ công", retail: "Sơn 1 lớp mỏng dễ nứt cạnh" },
      { label: "Giá bán lẻ tham chiếu", unlo: "590.000đ trực tiếp tại xưởng", retail: "1.850.000đ – 4.200.000đ có logo" },
    ],
    costBreakdown: {
      nullPrice: 590000,
      traditionalRetailPrice: 1850000,
      materialCost: 265000,
      materialDesc: "Da bò Full-grain Ý đạt chuẩn LWG + lót vải dệt chống RFID",
      manufacturingCost: 130000,
      manufacturingDesc: "Cắt Laser, lạng mép, sơn cạnh 4 lớp & may Juki tại Bình Dương",
      packagingShippingCost: 77000,
      packagingShippingDesc: "Hộp giấy cứng tái chế, túi vải chống ẩm & vận chuyển",
      platformQcCost: 118000,
      platformQcDesc: "Kiểm định QC Lab từng chiếc & bảo hành trọn đời",
    },
    sizeChart: [
      { size: "Ví Ngang", height: "9.2 cm", weight: "92 gram", chest: "11.5 cm (rộng)", length: "8 ngăn thẻ" },
      { size: "Ví Đứng", height: "11.2 cm", weight: "96 gram", chest: "9.4 cm (rộng)", length: "8 ngăn thẻ" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 45000,
      innerLabelFee: 25000,
      extraLeadDays: 2,
      defaultHeadline: "N.V.H",
      defaultSubline: "Dập chìm mù không màu mặt trong",
      allowedThreadColors: [
        { name: "Dập Chìm Mù", hex: "#15095D" },
        { name: "Ép Bạc Mờ", hex: "#DCE0E7" },
        { name: "Ép Kem Ivory", hex: "#FCFDF1" },
      ],
    },
    variants: [
      { _id: "690000000000000000001201", colorName: "Midnight Navy", colorHex: "#0B2056", size: "Ví Ngang", stock: 65, priceDelta: 0 },
      { _id: "690000000000000000001202", colorName: "Midnight Navy", colorHex: "#0B2056", size: "Ví Đứng", stock: 45, priceDelta: 0 },
      { _id: "690000000000000000001203", colorName: "Deep Indigo", colorHex: "#1F0C85", size: "Ví Ngang", stock: 40, priceDelta: 20000 },
    ],
    fitReviews: [
      {
        id: "fr-201",
        author: "Đặng Minh Quân",
        date: "14/11/2026",
        rating: 5,
        heightCm: 175,
        weightKg: 70,
        sizeBought: "Ví Ngang",
        fitRating: "true_to_size",
        comment: "Mùi da bò thật thơm nhẹ, sơn cạnh 4 lớp cầm rất mịn tay không bị cấn. Mình dập tên viết tắt mặt trong cực kỳ tinh tế.",
      },
      {
        id: "fr-202",
        author: "Vũ Thành Long",
        date: "06/11/2026",
        rating: 5,
        heightCm: 170,
        weightKg: 65,
        sizeBought: "Ví Đứng",
        fitRating: "true_to_size",
        comment: "Đút vừa CCCD và thẻ ngân hàng gọn gàng trong túi quần trước. So với ví 2 triệu mình mua trước đây thì đường chỉ xưởng Bình Dương còn đều hơn.",
      },
    ],
    makerQa: [
      {
        id: "qa-201",
        question: "Da Full-grain có chống nước nhẹ nếu vô tình dính mưa không anh?",
        asker: "Minh Trí",
        answer: "Da đã được phủ lớp sáp dưỡng mỏng tự nhiên nên trượt giọt nước nhẹ. Nếu dính mưa bạn chỉ cần dùng khăn khô mềm thấm nhẹ và để khô tự nhiên ở nơi thoáng mát, tránh máy sấy.",
        responder: "Anh Nguyễn Văn H. — Quản đốc Xưởng Đồ Da Số 02",
      },
    ],
  },
  {
    _id: "690000000000000000000103",
    slug: "so-mi-european-linen-185gsm-may-cuon-suon",
    name: "Áo Sơ Mi 100% European Linen 185 GSM — May Cuốn Sườn",
    categorySlug: "linen-tailoring",
    categoryName: "Sơ Mi & Quần Linen",
    factorySlug: "xuong-det-may-linen-so-07-bac-ninh",
    creatorName: "Xưởng Linen Số 07 · Bắc Ninh",
    materialTag: "100% European Linen",
    price: 495000,
    salePercent: 0,
    rate: 4.9,
    reviewCount: 184,
    soldCount: 640,
    stock: 190,
    badge: { label: "EUROPEAN FLAX", tone: "periwinkle" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: May cuốn sườn French Seam & đính nút vỏ trai tại VSIP Bắc Ninh",
    descriptions:
      "Dệt từ 100% sợi lanh châu Âu định lượng 185 GSM đã xử lý giặt mềm Stone-wash. Hoàn thiện bằng kỹ thuật may cuốn sườn giấu mép French Seam và nút vỏ trai tự nhiên, thoáng mát vượt trội trong khí hậu nhiệt đới.",
    images: [
      {
        url: "/assets/img/p-chambray.jpg",
      },
      {
        url: "/assets/img/p-oxford.jpg",
      },
      {
        url: "/assets/img/p-so-mi-denim.jpg",
      },
    ],
    specs: {
      fabricComposition: "100% European Flax Linen (Sợi lanh châu Âu)",
      gsmWeight: 185,
      origin: "Xưởng Dệt May Linen Số 07 — KCN VSIP, Bắc Ninh",
      shrinkage: "Giặt mềm Stone-wash · Nút vỏ trai tự nhiên",
      dimensions: "Form Relaxed Smart-Casual (S – XL)",
      qcBatchCode: "LOT-BN26-0922 · Đạt chuẩn 12/12 bước QC xuất Pháp",
    },
    specComparison: [
      { label: "Nguồn gốc sợi lanh", unlo: "100% European Flax® chứng nhận", retail: "Linen pha Rayon / sợi thô dễ rát" },
      { label: "Kỹ thuật đường may", unlo: "Cuốn sườn French Seam sạch mặt trái", retail: "Vắt sổ thường dễ xơ chỉ" },
      { label: "Phụ liệu nút áo", unlo: "Nút vỏ trai tự nhiên ánh xà cừ", retail: "Nút nhựa công nghiệp" },
      { label: "Giá tham chiếu mall", unlo: "495.000đ trực tiếp từ xưởng", retail: "1.390.000đ – 1.650.000đ" },
    ],
    costBreakdown: {
      nullPrice: 495000,
      traditionalRetailPrice: 1390000,
      materialCost: 225000,
      materialDesc: "Vải Linen châu Âu 185 GSM + nút vỏ trai thật",
      manufacturingCost: 105000,
      manufacturingDesc: "May cuốn sườn thủ công & giặt mềm tại VSIP Bắc Ninh",
      packagingShippingCost: 66000,
      packagingShippingDesc: "Hộp giấy kraft, ủi hơi định phom & giao hàng",
      platformQcCost: 99000,
      platformQcDesc: "Kiểm định QC đo sai số ±0.5cm & bảo chứng đổi trả",
    },
    sizeChart: [
      { size: "S", height: "1m58 – 1m67", weight: "50 – 59 kg", chest: "106 cm", length: "70 cm" },
      { size: "M", height: "1m66 – 1m73", weight: "60 – 68 kg", chest: "112 cm", length: "72 cm" },
      { size: "L", height: "1m72 – 1m80", weight: "69 – 78 kg", chest: "118 cm", length: "74 cm" },
      { size: "XL", height: "1m78 – 1m86", weight: "79 – 88 kg", chest: "124 cm", length: "76 cm" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 45000,
      innerLabelFee: 25000,
      extraLeadDays: 2,
      defaultHeadline: "H.N",
      defaultSubline: "Thêu cổ tay trái kín đáo",
      allowedThreadColors: [
        { name: "Midnight Indigo", hex: "#15095D" },
        { name: "Sailing Blue", hex: "#5775B8" },
        { name: "Milky Ivory", hex: "#FCFDF1" },
      ],
    },
    variants: [
      { _id: "690000000000000000001301", colorName: "Sky Linen", colorHex: "#C2D9F0", size: "M", stock: 50, priceDelta: 0 },
      { _id: "690000000000000000001302", colorName: "Sky Linen", colorHex: "#C2D9F0", size: "L", stock: 45, priceDelta: 0 },
      { _id: "690000000000000000001303", colorName: "Milky Ivory", colorHex: "#FCFDF1", size: "M", stock: 55, priceDelta: 0 },
      { _id: "690000000000000000001304", colorName: "Deep Sea", colorHex: "#183563", size: "L", stock: 40, priceDelta: 0 },
    ],
    fitReviews: [
      {
        id: "fr-301",
        author: "Phạm Anh Tuấn",
        date: "12/11/2026",
        rating: 5,
        heightCm: 174,
        weightKg: 70,
        sizeBought: "L",
        fitRating: "true_to_size",
        comment: "1m74 70kg mặc L rất thoáng và lịch sự. Mặt trong áo may cuốn sườn phẳng phiu không cộm chỉ, mặc cả ngày đi làm cực mát.",
      },
    ],
    makerQa: [
      {
        id: "qa-301",
        question: "Vải 100% Linen này có dễ bị nhăn quá không ạ?",
        asker: "Ngọc Linh",
        answer: "Sợi lanh tự nhiên có độ gợn sóng đặc trưng tạo vẻ thanh lịch, nhưng định lượng 185 GSM kết hợp giặt mềm Stone-wash tại xưởng giúp áo đứng phom và không bị nhàu nát như linen mỏng 120 GSM.",
        responder: "Anh Trần Quốc D. — Xưởng Dệt May Linen Số 07",
      },
    ],
  },
  {
    _id: "690000000000000000000104",
    slug: "bo-4-coc-gom-men-li-1280c-bat-trang",
    name: "Bộ 4 Cốc Gốm Men Lì Nung 1.280°C — Chuẩn An Toàn LFGB",
    categorySlug: "ceramics-home",
    categoryName: "Gốm Sứ & Gia Dụng",
    factorySlug: "xuong-gom-su-gia-dung-so-09-bat-trang",
    creatorName: "Xưởng Gốm Số 09 · Bát Tràng",
    materialTag: "Gốm Cao Lanh",
    price: 340000,
    salePercent: 0,
    rate: 4.9,
    reviewCount: 142,
    soldCount: 510,
    stock: 120,
    badge: { label: "0% CHÌ · LFGB", tone: "indigo" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: Tráng men khoáng & ra lò 1.280°C tại Bát Tràng",
    descriptions:
      "Bộ 4 cốc gốm cao lanh khử sắt nung ở 1.280°C giúp xương đất đanh chắc, men khoáng lì chống bám ố trà cà phê và đạt chuẩn an toàn thực phẩm LFGB châu Âu (không chì, không cadmium).",
    images: [
      {
        url: "/assets/img/p-hoodie.jpg",
      },
      {
        url: "/assets/img/p-sweat.jpg",
      },
    ],
    specs: {
      fabricComposition: "Gốm cao lanh tinh khiết + Men khoáng lì không chì",
      gsmWeight: 350,
      origin: "Xưởng Gốm & Gia Dụng Số 09 — Bát Tràng, Hà Nội",
      shrinkage: "An toàn lò vi sóng & máy rửa chén · Chịu sốc nhiệt",
      dimensions: "Dung tích 350ml/cốc · Bộ 4 chiếc xếp chồng gọn",
      qcBatchCode: "LOT-BT26-0411 · Kiểm định không chì LFGB & test va đập",
    },
    specComparison: [
      { label: "Nhiệt độ nung", unlo: "1.280°C kết khối hoàn toàn", retail: "Nung thấp < 1.050°C dễ sứt mẻ" },
      { label: "Độ an toàn lớp men", unlo: "Đạt chuẩn LFGB (0% chì & Cadmium)", retail: "Không có chứng nhận kiểm định men" },
      { label: "Chống ố & Rửa máy", unlo: "An toàn 100% máy rửa chén", retail: "Dễ bám vết trà/cà phê sau 2 tháng" },
    ],
    costBreakdown: {
      nullPrice: 340000,
      traditionalRetailPrice: 780000,
      materialCost: 145000,
      materialDesc: "Đất cao lanh lọc từ tính & men khoáng tự nhiên",
      manufacturingCost: 75000,
      manufacturingDesc: "Tạo hình, tráng men & chi phí gas nung lò 1.280°C",
      packagingShippingCost: 52000,
      packagingShippingDesc: "Thùng carton tổ ong chống vỡ 5 lớp & giao hàng",
      platformQcCost: 68000,
      platformQcDesc: "Kiểm định âm thanh, độ phẳng đáy & bảo hành vỡ 1 đổi 1",
    },
    sizeChart: [
      { size: "Bộ 4 Cốc 350ml", height: "9.5 cm", weight: "310 g/cốc", chest: "8.2 cm (miệng)", length: "4 chiếc" },
      { size: "Bộ 6 Cốc 350ml", height: "9.5 cm", weight: "310 g/cốc", chest: "8.2 cm (miệng)", length: "6 chiếc" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 40000,
      innerLabelFee: 20000,
      extraLeadDays: 3,
      defaultHeadline: "UNLO",
      defaultSubline: "Khắc laser đáy cốc kín đáo",
      allowedThreadColors: [
        { name: "Galaxy Navy", hex: "#0B2056" },
        { name: "Milky Ivory", hex: "#FCFDF1" },
      ],
    },
    variants: [
      { _id: "690000000000000000001401", colorName: "Milky Matte", colorHex: "#FCFDF1", size: "Bộ 4 Cốc", stock: 70, priceDelta: 0 },
      { _id: "690000000000000000001402", colorName: "Planetary Glaze", colorHex: "#334EAB", size: "Bộ 4 Cốc", stock: 50, priceDelta: 20000 },
    ],
    fitReviews: [
      {
        id: "fr-401",
        author: "Hoàng Yến Nhi",
        date: "10/11/2026",
        rating: 5,
        heightCm: 162,
        weightKg: 52,
        sizeBought: "Bộ 4 Cốc",
        fitRating: "true_to_size",
        comment: "Đóng hộp tổ ong cực kỳ chắc chắn không sứt mẻ một vết. Men lì màu kem Milky rất thanh lịch, rửa máy rửa bát hằng ngày vẫn như mới.",
      },
    ],
    makerQa: [
      {
        id: "qa-401",
        question: "Nếu vận chuyển về tỉnh lỡ bị vỡ 1 chiếc thì xử lý sao ạ?",
        asker: "Thu Hà",
        answer: "Bạn chỉ cần chụp ảnh khi mở hộp, UNLO và xưởng sẽ gửi bù miễn phí chiếc mới ngay trong 24 giờ mà không cần gửi trả hàng vỡ.",
        responder: "Nghệ nhân Lê Quang T. — Xưởng Gốm Số 09",
      },
    ],
  },
  {
    _id: "690000000000000000000105",
    slug: "tui-cong-so-da-bo-full-grain-ykk-excella",
    name: "Túi Công Sở Laptop 15\" Da Bò Full-Grain — Khóa YKK Excella",
    categorySlug: "leather-goods",
    categoryName: "Đồ Da Nguyên Tấm",
    factorySlug: "xuong-che-tac-do-da-so-02-binh-duong",
    creatorName: "Xưởng Đồ Da Số 02 · Bình Dương",
    materialTag: "Da Bò Full-grain",
    price: 1690000,
    salePercent: 0,
    rate: 5.0,
    reviewCount: 118,
    soldCount: 315,
    stock: 60,
    badge: { label: "YKK EXCELLA", tone: "dark" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: Test kéo quai tải trọng 15kg & khóa YKK tại Bình Dương",
    descriptions:
      "Túi công sở đựng vừa laptop 15.6 inch chế tác từ da bò nguyên tấm Ý dày 1.8mm kết hợp khóa kéo kim loại YKK Excella Nhật Bản (test đóng mở 10.000 lần). Ngăn chống sốc đệm nỉ lông cừu và dây đeo vai có thể tháo rời.",
    images: [
      {
        url: "/assets/img/p-tote.jpg",
      },
      {
        url: "/assets/img/p-jogger.jpg",
      },
    ],
    specs: {
      fabricComposition: "100% Da bò Full-grain Ý 1.8mm + Khóa kéo YKK Excella",
      gsmWeight: 180,
      origin: "Xưởng Chế Tác Đồ Da Số 02 — Thuận An, Bình Dương",
      shrinkage: "Tải trọng quai test 15kg · Bảo hành đường chỉ trọn đời",
      dimensions: "39 × 28 × 8 cm · Vừa laptop 13–15.6 inch",
      qcBatchCode: "LOT-BD26-1029 · Đạt 12/12 bước QC xuất Đức",
    },
    specComparison: [
      { label: "Chất liệu da", unlo: "Da bò Full-grain Ý dày 1.8mm", retail: "Da tổng hợp hoặc da ép vụn" },
      { label: "Khóa kéo & Khoen móc", unlo: "YKK Excella đúc nguyên khối Nhật", retail: "Khóa hợp kim thường dễ kẹt răng" },
      { label: "Giá thương hiệu mall", unlo: "1.690.000đ trực tiếp tại xưởng", retail: "5.400.000đ – 7.900.000đ" },
    ],
    costBreakdown: {
      nullPrice: 1690000,
      traditionalRetailPrice: 5400000,
      materialCost: 780000,
      materialDesc: "Da bò nguyên tấm Ý + khóa YKK Excella + lót chống sốc",
      manufacturingCost: 355000,
      manufacturingDesc: "Cắt Laser, sơn cạnh 4 lớp & ráp phom thủ công tại xưởng",
      packagingShippingCost: 215000,
      packagingShippingDesc: "Hộp cứng bảo quản, túi dust-bag cotton & giao hỏa tốc",
      platformQcCost: 340000,
      platformQcDesc: "Kiểm định QC tải trọng quai & bảo hành trọn đời",
    },
    sizeChart: [
      { size: "14–15.6 inch", height: "28 cm", weight: "1.05 kg", chest: "39 cm (ngang)", length: "8 cm (đáy)" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 55000,
      innerLabelFee: 25000,
      extraLeadDays: 2,
      defaultHeadline: "T.Q.A",
      defaultSubline: "Dập chìm thẻ da tag tên",
      allowedThreadColors: [
        { name: "Dập Chìm Mù", hex: "#15095D" },
        { name: "Ép Bạc Mờ", hex: "#DCE0E7" },
      ],
    },
    variants: [
      { _id: "690000000000000000001501", colorName: "Galaxy Navy", colorHex: "#0B2056", size: "15.6 inch", stock: 35, priceDelta: 0 },
      { _id: "690000000000000000001502", colorName: "Deep Sea", colorHex: "#183563", size: "15.6 inch", stock: 25, priceDelta: 0 },
    ],
    fitReviews: [
      {
        id: "fr-501",
        author: "Bùi Đức Mạnh",
        date: "16/11/2026",
        rating: 5,
        heightCm: 176,
        weightKg: 74,
        sizeBought: "15.6 inch",
        fitRating: "true_to_size",
        comment: "Khóa YKK kéo cực mượt, da dày đứng phom không bị đổ khi đặt trên bàn họp. Giá dưới 1.7 triệu cho da Full-grain thật sự quá hời.",
      },
    ],
    makerQa: [],
  },
  {
    _id: "690000000000000000000106",
    slug: "ao-polo-tencel-pique-230gsm-thoang-mat",
    name: "Áo Polo Tencel Piqué 230 GSM — Mát Lạnh Kháng Khuẩn",
    categorySlug: "cotton-basics",
    categoryName: "Áo Thun & Dệt Kim",
    factorySlug: "xuong-det-kim-so-04-hung-yen",
    creatorName: "Xưởng Dệt Kim Số 04 · Hưng Yên",
    materialTag: "Supima Cotton",
    price: 345000,
    salePercent: 10,
    rate: 4.8,
    reviewCount: 156,
    soldCount: 520,
    stock: 210,
    badge: { label: "SALE -10%", tone: "indigo" },
    hasFactoryVideo: true,
    factoryVideoCaption: "Video 10s thực tế: Dệt mắt cá sấu Tencel Piqué tại Hưng Yên",
    descriptions:
      "Kết hợp 65% sợi gỗ sồi Tencel™ và 35% Cotton sợi dài tạo bề mặt mắt cá sấu (Piqué) mát lạnh khi chạm da, hạn chế nhăn nhàu và đứng cổ áo suốt 10 giờ làm việc.",
    images: [
      {
        url: "/assets/img/p-oxford.jpg",
      },
      {
        url: "/assets/img/p-tee-den.jpg",
      },
    ],
    specs: {
      fabricComposition: "65% Tencel™ Lyocell + 35% Supima Cotton (230 GSM)",
      gsmWeight: 230,
      origin: "Xưởng Dệt Kim Số 04 — KCN Phố Nối, Hưng Yên",
      shrinkage: "Chống xù lông, giữ màu bền sau 50 lần giặt",
      dimensions: "Form Smart-Fit (S – XL)",
      qcBatchCode: "LOT-HY26-1112 · Đạt chuẩn OEKO-TEX 100",
    },
    specComparison: [
      { label: "Chất sợi", unlo: "65% Tencel™ gỗ sồi + 35% Supima", retail: "Cotton pha Poly nóng bí" },
      { label: "Bo cổ áo Polo", unlo: "Dệt định hình chống cuộn mép", retail: "Dễ cong vênh sau 5 lần giặt" },
    ],
    costBreakdown: {
      nullPrice: 310500,
      traditionalRetailPrice: 890000,
      materialCost: 140000,
      materialDesc: "Sợi Tencel™ Lenzing Áo kết hợp Cotton dài",
      manufacturingCost: 65000,
      manufacturingDesc: "Dệt Piqué & may cổ định hình tại Hưng Yên",
      packagingShippingCost: 44000,
      packagingShippingDesc: "Bao bì tái chế & vận chuyển",
      platformQcCost: 61500,
      platformQcDesc: "Kiểm định QC & vận hành nền tảng",
    },
    sizeChart: [
      { size: "S", height: "1m58 – 1m67", weight: "52 – 60 kg", chest: "98 cm", length: "67 cm" },
      { size: "M", height: "1m66 – 1m74", weight: "61 – 69 kg", chest: "104 cm", length: "70 cm" },
      { size: "L", height: "1m73 – 1m80", weight: "70 – 79 kg", chest: "110 cm", length: "72 cm" },
      { size: "XL", height: "1m78 – 1m86", weight: "80 – 89 kg", chest: "116 cm", length: "74 cm" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 35000,
      innerLabelFee: 20000,
      extraLeadDays: 2,
      defaultHeadline: "P.T",
      defaultSubline: "Thêu chỉ tonal gấu áo",
      allowedThreadColors: [
        { name: "Midnight Indigo", hex: "#15095D" },
        { name: "Milky Ivory", hex: "#FCFDF1" },
      ],
    },
    variants: [
      { _id: "690000000000000000001601", colorName: "Dive Blue", colorHex: "#2B467C", size: "M", stock: 60, priceDelta: 0 },
      { _id: "690000000000000000001602", colorName: "Dive Blue", colorHex: "#2B467C", size: "L", stock: 55, priceDelta: 0 },
      { _id: "690000000000000000001603", colorName: "Milky Ivory", colorHex: "#FCFDF1", size: "M", stock: 50, priceDelta: 0 },
      { _id: "690000000000000000001604", colorName: "Galaxy Navy", colorHex: "#0B2056", size: "XL", stock: 45, priceDelta: 0 },
    ],
    fitReviews: [
      {
        id: "fr-601",
        author: "Nguyễn Văn Thành",
        date: "09/11/2026",
        rating: 5,
        heightCm: 171,
        weightKg: 66,
        sizeBought: "M",
        fitRating: "true_to_size",
        comment: "1m71 66kg mặc M vừa in, chất vải Tencel sờ mát rượi và rất ít nhăn.",
      },
    ],
    makerQa: [],
  },
  {
    _id: "690000000000000000000107",
    slug: "tui-tote-canvas-16oz-quai-da-bo-that",
    name: "Túi Tote Canvas 16oz Hạng Nặng — Quai Da Bò Full-Grain",
    categorySlug: "canvas-accessories",
    categoryName: "Túi & Phụ Kiện Xưởng",
    factorySlug: "xuong-che-tac-do-da-so-02-binh-duong",
    creatorName: "Xưởng Đồ Da Số 02 · Bình Dương",
    materialTag: "Canvas 16oz",
    price: 385000,
    salePercent: 0,
    rate: 4.9,
    reviewCount: 97,
    soldCount: 380,
    stock: 140,
    badge: { label: "CANVAS 16OZ", tone: "periwinkle" },
    hasFactoryVideo: false,
    descriptions:
      "Thân túi dệt từ vải bố Cotton 16oz (450 GSM) tự đứng phom kết hợp quai cầm da bò Full-grain Ý tán đinh đồng chắc chắn. Có ngăn đựng laptop 14 inch và ngăn khóa kéo YKK bên trong.",
    images: [
      {
        url: "/assets/img/p-tote.jpg",
      },
      {
        url: "/assets/img/p-kaki.jpg",
      },
    ],
    specs: {
      fabricComposition: "100% Cotton Canvas 16oz + Quai da bò Full-grain",
      gsmWeight: 450,
      origin: "Xưởng Chế Tác Đồ Da Số 02 — Thuận An, Bình Dương",
      shrinkage: "Đáy mở 12cm · Tán đinh đồng chịu lực 12kg",
      dimensions: "38 × 40 × 12 cm",
      qcBatchCode: "LOT-BD26-1102 · Kiểm định tải trọng & đường may",
    },
    specComparison: [
      { label: "Độ dày vải Canvas", unlo: "16oz (450 GSM) tự đứng dáng", retail: "8–10oz mềm oặt, dễ sờn đáy" },
      { label: "Quai xách", unlo: "Da bò nguyên tấm tán đinh đồng", retail: "Dây vải mỏng dễ đứt quai" },
    ],
    costBreakdown: {
      nullPrice: 385000,
      traditionalRetailPrice: 920000,
      materialCost: 170000,
      materialDesc: "Vải Canvas 16oz nguyên mộc + quai da bò Ý + đinh đồng",
      manufacturingCost: 82000,
      manufacturingDesc: "Cắt may & tán đinh thủ công tại Bình Dương",
      packagingShippingCost: 56000,
      packagingShippingDesc: "Túi giấy tái chế & vận chuyển",
      platformQcCost: 77000,
      platformQcDesc: "Kiểm định QC & bảo hành đường may",
    },
    sizeChart: [
      { size: "One Size", height: "40 cm", weight: "520 g", chest: "38 cm (ngang)", length: "12 cm (đáy)" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 35000,
      innerLabelFee: 20000,
      extraLeadDays: 2,
      defaultHeadline: "L.C",
      defaultSubline: "Thêu kín đáo góc túi",
      allowedThreadColors: [
        { name: "Midnight Indigo", hex: "#15095D" },
        { name: "Royal Iris", hex: "#443EB1" },
      ],
    },
    variants: [
      { _id: "690000000000000000001701", colorName: "Milky Canvas", colorHex: "#FCFDF1", size: "One Size", stock: 85, priceDelta: 0 },
      { _id: "690000000000000000001702", colorName: "Galaxy Indigo", colorHex: "#15095D", size: "One Size", stock: 55, priceDelta: 15000 },
    ],
    fitReviews: [],
    makerQa: [],
  },
  {
    _id: "690000000000000000000108",
    slug: "quan-dai-linen-185gsm-ong-suong-tuy-chinh-chieu-dai",
    name: "Quần Dài European Linen 185 GSM — Tùy Chọn Độ Dài Ống",
    categorySlug: "linen-tailoring",
    categoryName: "Sơ Mi & Quần Linen",
    factorySlug: "xuong-det-may-linen-so-07-bac-ninh",
    creatorName: "Xưởng Linen Số 07 · Bắc Ninh",
    materialTag: "100% European Linen",
    price: 520000,
    salePercent: 0,
    rate: 4.9,
    reviewCount: 112,
    soldCount: 340,
    stock: 130,
    badge: { label: "CUSTOM LENGTH", tone: "periwinkle" },
    hasFactoryVideo: false,
    descriptions:
      "Quần ống suông từ 100% sợi lanh châu Âu 185 GSM, cạp bán chun ẩn tinh tế. Tận dụng lợi thế xưởng trực tiếp cho phép chọn sẵn độ dài ống (Tiêu chuẩn / Ngắn -4cm / Dài +4cm) không cần mang đi sửa.",
    images: [
      {
        url: "/assets/img/p-kaki.jpg",
      },
      {
        url: "/assets/img/p-jogger.jpg",
      },
    ],
    specs: {
      fabricComposition: "100% European Flax Linen (185 GSM)",
      gsmWeight: 185,
      origin: "Xưởng Dệt May Linen Số 07 — KCN VSIP, Bắc Ninh",
      shrinkage: "Tùy chỉnh độ dài ống ngay tại xưởng · Khóa kéo YKK",
      dimensions: "Ống suông thoải mái (S – XL)",
      qcBatchCode: "LOT-BN26-1018 · Đạt 12/12 bước QC",
    },
    specComparison: [
      { label: "Tùy chỉnh chiều dài ống", unlo: "Chọn sẵn tại xưởng miễn phí", retail: "Chỉ 1 độ dài phải tốn tiền cắt gấu" },
      { label: "Khóa kéo & Cạp quần", unlo: "Khóa YKK + cạp bán chun ẩn", retail: "Khóa thường, dễ cấn bụng" },
    ],
    costBreakdown: {
      nullPrice: 520000,
      traditionalRetailPrice: 1450000,
      materialCost: 235000,
      materialDesc: "Vải Linen châu Âu 185 GSM + khóa kéo YKK",
      manufacturingCost: 110000,
      manufacturingDesc: "May đo ống theo chiều cao khách tại VSIP Bắc Ninh",
      packagingShippingCost: 71000,
      packagingShippingDesc: "Đóng hộp phẳng & giao hàng toàn quốc",
      platformQcCost: 104000,
      platformQcDesc: "Kiểm định QC & hỗ trợ đổi size 30 ngày",
    },
    sizeChart: [
      { size: "S", height: "1m58 – 1m67", weight: "50 – 59 kg", chest: "74–78 cm (eo)", length: "96 cm" },
      { size: "M", height: "1m66 – 1m74", weight: "60 – 69 kg", chest: "79–83 cm (eo)", length: "99 cm" },
      { size: "L", height: "1m73 – 1m80", weight: "70 – 79 kg", chest: "84–88 cm (eo)", length: "102 cm" },
    ],
    personalizationConfig: {
      enabled: true,
      allowMonogram: true,
      maxMonogramChars: 5,
      monogramFee: 0,
      innerLabelFee: 20000,
      extraLeadDays: 2,
      defaultHeadline: "STD",
      defaultSubline: "Ghi chú độ dài ống (-4cm / +4cm)",
      allowedThreadColors: [{ name: "Midnight Indigo", hex: "#15095D" }],
    },
    variants: [
      { _id: "690000000000000000001801", colorName: "Milky Ivory", colorHex: "#FCFDF1", size: "M", stock: 50, priceDelta: 0 },
      { _id: "690000000000000000001802", colorName: "Galaxy Navy", colorHex: "#15095D", size: "L", stock: 45, priceDelta: 0 },
      { _id: "690000000000000000001803", colorName: "Cloud Mist", colorHex: "#DCE0E7", size: "S", stock: 35, priceDelta: 0 },
    ],
    fitReviews: [],
    makerQa: [],
  },
];

export function findUnloProductBySlugOrId(slugOrId) {
  if (!slugOrId) return null;
  const raw = String(slugOrId).trim().toLowerCase();
  return (
    UNLO_PRODUCTS.find((p) => {
      const id = p._id.toLowerCase();
      const canonical = `${p.slug}-${id}`.toLowerCase();
      return raw === id || raw === p.slug.toLowerCase() || raw === canonical || raw.endsWith(`-${id}`);
    }) || null
  );
}

export function getProductsByFactorySlug(factorySlug) {
  if (!factorySlug) return [];
  const key = String(factorySlug).trim().toLowerCase();
  return UNLO_PRODUCTS.filter((p) => (p.factorySlug || "").toLowerCase() === key);
}

export function filterUnloProducts({
  keyword = "",
  category = "",
  material = "",
  factory = "",
  size = "",
  personalizable = false,
  sort = "newest",
} = {}) {
  let list = [...UNLO_PRODUCTS];

  if (category) {
    const cat = String(category).toLowerCase();
    list = list.filter(
      (p) =>
        p.categorySlug.toLowerCase() === cat ||
        p.categoryName.toLowerCase().includes(cat),
    );
  }

  if (factory) {
    const fac = String(factory).toLowerCase();
    list = list.filter((p) => (p.factorySlug || "").toLowerCase() === fac);
  }

  if (material) {
    const mat = String(material).toLowerCase();
    list = list.filter(
      (p) =>
        p.materialTag.toLowerCase().includes(mat) ||
        (p.specs?.fabricComposition || "").toLowerCase().includes(mat),
    );
  }

  if (size) {
    const sizes = String(size)
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (sizes.length > 0) {
      list = list.filter((p) =>
        (p.variants || []).some((v) =>
          sizes.some((s) => (v.size || "").toLowerCase().includes(s)),
        ),
      );
    }
  }

  if (personalizable) {
    list = list.filter((p) => p.personalizationConfig?.enabled);
  }

  if (keyword.trim()) {
    const q = keyword.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.materialTag.toLowerCase().includes(q) ||
        p.descriptions.toLowerCase().includes(q) ||
        p.creatorName.toLowerCase().includes(q),
    );
  }

  if (sort === "price_asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "bestselling") {
    list.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
  }

  return list;
}
