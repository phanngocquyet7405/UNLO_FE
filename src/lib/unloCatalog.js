/**
 * UNLO Brandless M2C — Curated Direct-from-Factory Vietnamese Essentials Catalog
 * Every product links to a verified Factory Passport, 4-segment transparent pricing,
 * spec-by-spec comparison, 12-step QC log, size chart, and Smart Fit body reviews.
 */

export const UNLO_CATEGORIES = [
  {
    id: "cotton-basics",
    label: "Áo Thun & Dệt Kim",
    shortLabel: "Áo Thun",
    enTag: "KNITWEAR",
    description: "Áo thun Cotton Supima 260 GSM, Pima Heavyweight & Polo Tencel xuất xưởng KCN Phố Nối.",
    href: "/products?category=cotton-basics",
    image: "/assets/img/cat-ao-thun.jpg",
  },
  {
    id: "linen-tailoring",
    label: "Sơ Mi & Quần Linen",
    shortLabel: "Sơ Mi",
    enTag: "LINEN",
    description: "100% sợi lanh châu Âu 185 GSM may cuốn sườn French Seam & Sơ mi Oxford dệt nổi Bắc Ninh.",
    href: "/products?category=linen-tailoring",
    image: "/assets/img/cat-so-mi.jpg",
  },
  {
    id: "sweat-hoodie",
    label: "Áo Nỉ & Hoodie",
    shortLabel: "Nỉ & Hoodie",
    enTag: "FLEECE",
    description: "Áo nỉ French Terry 380 GSM & Heavyweight Hoodie 420 GSM đứng phom không xù lông.",
    href: "/products?category=sweat-hoodie",
    image: "/assets/img/cat-ao-ni.jpg",
  },
  {
    id: "pants-bottoms",
    label: "Quần Kaki & Quần Âu",
    shortLabel: "Quần",
    enTag: "TROUSERS",
    description: "Quần Chino cạp chun ẩn, Jogger nỉ French Terry & Quần âu xếp ly Relaxed chống nhăn.",
    href: "/products?category=pants-bottoms",
    image: "/assets/img/cat-quan.jpg",
  },
  {
    id: "wool-knitwear",
    label: "Đồ Len & Áo Khoác",
    shortLabel: "Đồ Len",
    enTag: "OUTERWEAR",
    description: "Áo len Merino 19.5 Micron, Cashmere Blend & Trench Coat chống thấm DWR xuất khẩu.",
    href: "/products?category=wool-knitwear",
    image: "/assets/img/cat-dong-phuc.jpg",
  },
  {
    id: "leather-goods",
    label: "Đồ Da Nguyên Tấm",
    shortLabel: "Đồ Da",
    enTag: "LEATHER",
    description: "Ví da bò Full-grain Ý, túi công sở laptop gia công thủ công tại Bình Dương.",
    href: "/products?category=leather-goods",
    image: "/assets/img/p-tote.jpg",
  },
  {
    id: "canvas-accessories",
    label: "Túi & Phụ Kiện Xưởng",
    shortLabel: "Phụ Kiện",
    enTag: "CARRY",
    description: "Túi tote Canvas 16oz hạng nặng quai da bò và phụ kiện vải mộc Nam Định.",
    href: "/products?category=canvas-accessories",
    image: "/assets/img/cat-tui.jpg",
  },
  {
    id: "ceramics-home",
    label: "Gốm Sứ & Gia Dụng",
    shortLabel: "Gốm Sứ",
    enTag: "HOME",
    description: "Bộ cốc gốm men lì nung 1.280°C chuẩn an toàn thực phẩm LFGB Bát Tràng.",
    href: "/products?category=ceramics-home",
    image: "/assets/img/tile-dong-phuc.jpg",
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
{
  "_id": "690000000000000000000109",
  "slug": "ao-thun-pima-cotton-heavyweight-280gsm",
  "name": "Áo Thun Pima Cotton Heavyweight 280 GSM — Form Suông Relaxed",
  "categorySlug": "cotton-basics",
  "categoryName": "Áo Thun & Dệt Kim",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Pima Cotton",
  "price": 265000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 184,
  "soldCount": 920,
  "stock": 195,
  "badge": {
    "label": "HEAVYWEIGHT 280 GSM",
    "tone": "indigo"
  },
  "hasFactoryVideo": true,
  "factoryVideoCaption": "Thử nghiệm độ phục hồi bo cổ & định lượng vải 280 GSM tại phòng lab xưởng",
  "descriptions": "Dòng áo thun định lượng cao 280 GSM dày dặn đứng phom, dệt từ sợi Pima Cotton Peru tuyển chọn. Bo cổ dệt rib đôi 2.5cm ép nhiệt phẳng, xử lý bề mặt cạo lông xơ vi mô chống xù và hạn chế bám bụi.",
  "images": [
    {
      "url": "/assets/img/p-tee-den.jpg"
    },
    {
      "url": "/assets/img/ed-tee-man.jpg"
    },
    {
      "url": "/assets/img/p-tee-nam.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Pima Cotton xơ dài nhập khẩu",
    "gsmWeight": 280,
    "origin": "Xưởng Dệt Kim Số 04 — KCN Phố Nối, Hưng Yên",
    "shrinkage": "Co rút ngang < 1.5%, dọc < 2% sau giặt nước 40°C",
    "dimensions": "Form Relaxed vai trễ nhẹ tôn dáng",
    "qcBatchCode": "LOT-PM26-092 · AQL 2.5 Passed"
  },
  "specComparison": [
    {
      "label": "Định lượng (GSM)",
      "unlo": "280 GSM dày dặn chống lộ",
      "retail": "180 GSM mỏng dễ dính người"
    },
    {
      "label": "Chất liệu sợi",
      "unlo": "Pima Cotton xơ siêu dài",
      "retail": "Cotton Carded sợi ngắn pha PE"
    },
    {
      "label": "Bo cổ áo",
      "unlo": "Rib 2.5cm pha Spandex chống dão",
      "retail": "Bo mỏng mau quăn mép"
    },
    {
      "label": "Mức giá M2C",
      "unlo": "265.000₫ (Trực tiếp xưởng)",
      "retail": "720.000₫ (Qua 4 khâu phân phối)"
    }
  ],
  "costBreakdown": {
    "nullPrice": 265000,
    "traditionalRetailPrice": 720000,
    "materialCost": 122000,
    "materialDesc": "Vải Pima Cotton 280 GSM dệt mật độ cao",
    "manufacturingCost": 52000,
    "manufacturingDesc": "May cuốn nách đôi & vắt sổ 4 chỉ tại xưởng Hưng Yên",
    "packagingShippingCost": 38000,
    "packagingShippingDesc": "Túi tự hủy sinh học & hộp carton chuẩn M2C",
    "platformQcCost": 53000,
    "platformQcDesc": "Kiểm tra độ đều GSM & độ co giãn bo cổ"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 60 kg",
      "chest": "104 cm",
      "length": "68 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m74",
      "weight": "61 – 70 kg",
      "chest": "110 cm",
      "length": "71 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "71 – 80 kg",
      "chest": "116 cm",
      "length": "73 cm"
    },
    {
      "size": "XL",
      "height": "1m79 – 1m88",
      "weight": "81 – 92 kg",
      "chest": "122 cm",
      "length": "76 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "innerLabelFee": 20000,
    "extraLeadDays": 2,
    "defaultHeadline": "U.N",
    "defaultSubline": "Thêu chỉ chìm ngực trái",
    "allowedThreadColors": [
      {
        "name": "Off White",
        "hex": "#F5F5F0"
      },
      {
        "name": "Charcoal",
        "hex": "#2A2A2A"
      },
      {
        "name": "Navy Indigo",
        "hex": "#15095D"
      }
    ]
  },
  "variants": [
    {
      "_id": "690000000000000000001901",
      "colorName": "Onyx Black",
      "colorHex": "#1C1C1E",
      "size": "S",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001902",
      "colorName": "Onyx Black",
      "colorHex": "#1C1C1E",
      "size": "M",
      "stock": 60,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001903",
      "colorName": "Onyx Black",
      "colorHex": "#1C1C1E",
      "size": "L",
      "stock": 55,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001904",
      "colorName": "Onyx Black",
      "colorHex": "#1C1C1E",
      "size": "XL",
      "stock": 45,
      "priceDelta": 0
    }
  ],
  "fitReviews": [
    {
      "id": "fr-109-1",
      "author": "Vũ Đình Trọng",
      "date": "12/11/2026",
      "rating": 5,
      "heightCm": 175,
      "weightKg": 72,
      "sizeBought": "L",
      "fitRating": "true_to_size",
      "comment": "Áo dày thật sự, mặc vào đứng phom che ngực mỡ cực tốt. Cổ áo chắc nịch, giặt máy không lo bai dão."
    }
  ],
  "makerQa": [
    {
      "id": "qa-109-1",
      "question": "Áo màu đen giặt nhiều lần có bị phai hay bạc màu không?",
      "asker": "Hoàng Long",
      "answer": "Xưởng sử dụng công nghệ nhuộm hoạt tính Reactive Dye đạt chuẩn cấp 4-5 kháng phai màu. Quý khách chỉ cần lộn trái áo và phơi bóng râm.",
      "responder": "Kỹ sư dệt may Nguyễn H. — Xưởng Số 04"
    }
  ]
},
{
  "_id": "690000000000000000000110",
  "slug": "ao-thun-compact-cotton-trang-tinh-khiet",
  "name": "Áo Thun Cotton Compact Trắng Tinh Khiết — Bo Cổ Chống Dão",
  "categorySlug": "cotton-basics",
  "categoryName": "Áo Thun & Dệt Kim",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Compact Cotton",
  "price": 215000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 342,
  "soldCount": 1680,
  "stock": 240,
  "badge": {
    "label": "DAILY ESSENTIAL",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Chiếc áo thun trắng hoàn hảo cho mọi ngày. Công nghệ dệt sợi kéo Compact giúp các sợi bông cuộn chặt vào lõi, bề mặt nhẵn mịn như lụa, hạn chế xù lông gấp 3 lần cotton thông thường.",
  "images": [
    {
      "url": "/assets/img/p-tee-trang.jpg"
    },
    {
      "url": "/assets/img/cut-tee-man.webp"
    },
    {
      "url": "/assets/img/ed-tee-man2.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Combed Compact Cotton 220 GSM",
    "gsmWeight": 220,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 2% sau 30 lần giặt",
    "dimensions": "Regular Fit tiêu chuẩn",
    "qcBatchCode": "LOT-CP26-088 · Kiểm tra độ đục quang học"
  },
  "specComparison": [
    {
      "label": "Độ mịn mặt vải",
      "unlo": "Sợi Compact nhẵn bóng",
      "retail": "Sợi thường xơ xù sau 3 lần giặt"
    },
    {
      "label": "Độ thấu quang",
      "unlo": "Không lộ núm ngực (220 GSM)",
      "retail": "Mỏng 150 GSM dễ lộ"
    },
    {
      "label": "Bo cổ",
      "unlo": "Rib dệt đúp 2cm may đè 2 kim",
      "retail": "Rib đơn 1 kim dễ rách chỉ"
    }
  ],
  "costBreakdown": {
    "nullPrice": 215000,
    "traditionalRetailPrice": 580000,
    "materialCost": 95000,
    "materialDesc": "Sợi Compact Cotton chải kỹ",
    "manufacturingCost": 45000,
    "manufacturingDesc": "Cắt may rập xuất khẩu Nhật",
    "packagingShippingCost": 35000,
    "packagingShippingDesc": "Bao bì tái chế & giao hàng",
    "platformQcCost": 40000,
    "platformQcDesc": "Kiểm tra độ đều màu trắng & tạp chất"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m58 – 1m66",
      "weight": "48 – 58 kg",
      "chest": "100 cm",
      "length": "66 cm"
    },
    {
      "size": "M",
      "height": "1m65 – 1m73",
      "weight": "59 – 68 kg",
      "chest": "106 cm",
      "length": "69 cm"
    },
    {
      "size": "L",
      "height": "1m72 – 1m79",
      "weight": "69 – 78 kg",
      "chest": "112 cm",
      "length": "72 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m86",
      "weight": "79 – 88 kg",
      "chest": "118 cm",
      "length": "74 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "innerLabelFee": 20000,
    "extraLeadDays": 2,
    "defaultHeadline": "T.M",
    "defaultSubline": "Thêu chỉ xám nhạt gấu áo",
    "allowedThreadColors": [
      {
        "name": "Silver Grey",
        "hex": "#B0B5C0"
      },
      {
        "name": "Navy",
        "hex": "#15095D"
      }
    ]
  },
  "variants": [
    {
      "_id": "690000000000000000001911",
      "colorName": "Pure White",
      "colorHex": "#FFFFFF",
      "size": "S",
      "stock": 50,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001912",
      "colorName": "Pure White",
      "colorHex": "#FFFFFF",
      "size": "M",
      "stock": 80,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001913",
      "colorName": "Pure White",
      "colorHex": "#FFFFFF",
      "size": "L",
      "stock": 70,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001914",
      "colorName": "Pure White",
      "colorHex": "#FFFFFF",
      "size": "XL",
      "stock": 40,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000111",
  "slug": "ao-thun-sun-bleached-sand-220gsm",
  "name": "Áo Thun Nhuộm Màu Cát Nắng Sun-Bleached Sand 220 GSM",
  "categorySlug": "cotton-basics",
  "categoryName": "Áo Thun & Dệt Kim",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Garment Dye",
  "price": 235000,
  "salePercent": 0,
  "rate": 4.8,
  "reviewCount": 96,
  "soldCount": 430,
  "stock": 120,
  "badge": {
    "label": "VINTAGE WASH",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Tông màu vàng cát nắng tự nhiên lấy cảm hứng từ bãi cát ven biển miền Trung. Quy trình nhuộm Garment Dye sau may hoàn thiện mang lại hiệu ứng bạc màu vintage độc bản tại các đường gân chỉ.",
  "images": [
    {
      "url": "/assets/img/ed-sun.jpg"
    },
    {
      "url": "/assets/img/ed-beige-tee.jpg"
    },
    {
      "url": "/assets/img/cut-sun.webp"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton Garment Dye 220 GSM",
    "gsmWeight": 220,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "Đã qua giặt sấy nhiệt cao tại xưởng (0% co ngót thêm)",
    "dimensions": "Boxy Relaxed Fit",
    "qcBatchCode": "LOT-SB26-031 · Đạt độ bền màu cấp 4"
  },
  "specComparison": [
    {
      "label": "Kỹ thuật nhuộm",
      "unlo": "Garment Dye sau may",
      "retail": "Nhuộm cuộn vải đại trà"
    },
    {
      "label": "Độ co ngót",
      "unlo": "0% (Đã co nhiệt tối đa tại xưởng)",
      "retail": "5% sau lần giặt đầu"
    }
  ],
  "costBreakdown": {
    "nullPrice": 235000,
    "traditionalRetailPrice": 620000,
    "materialCost": 105000,
    "materialDesc": "Vải bông mộc & thuốc nhuộm hữu cơ",
    "manufacturingCost": 50000,
    "manufacturingDesc": "May hoàn thiện & giặt wash stone",
    "packagingShippingCost": 38000,
    "packagingShippingDesc": "Bao bì tái chế & vận chuyển",
    "platformQcCost": 42000,
    "platformQcDesc": "Kiểm tra độ đều màu từng chiếc"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "50 – 60 kg",
      "chest": "104 cm",
      "length": "67 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m74",
      "weight": "61 – 70 kg",
      "chest": "110 cm",
      "length": "70 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "71 – 80 kg",
      "chest": "116 cm",
      "length": "72 cm"
    },
    {
      "size": "XL",
      "height": "1m79 – 1m87",
      "weight": "81 – 90 kg",
      "chest": "122 cm",
      "length": "75 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000001921",
      "colorName": "Sun Bleached",
      "colorHex": "#E6D7B9",
      "size": "S",
      "stock": 25,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001922",
      "colorName": "Sun Bleached",
      "colorHex": "#E6D7B9",
      "size": "M",
      "stock": 40,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001923",
      "colorName": "Sun Bleached",
      "colorHex": "#E6D7B9",
      "size": "L",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001924",
      "colorName": "Sun Bleached",
      "colorHex": "#E6D7B9",
      "size": "XL",
      "stock": 20,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000112",
  "slug": "ao-thun-be-toi-gian-soft-sand",
  "name": "Áo Thun Cổ Tròn Màu Be Tối Giản Soft Sand — Dệt Sợi Hữu Cơ",
  "categorySlug": "cotton-basics",
  "categoryName": "Áo Thun & Dệt Kim",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Supima Cotton",
  "price": 225000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 112,
  "soldCount": 540,
  "stock": 140,
  "badge": {
    "label": "NEW COLORWAY",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Tông màu be trung tính dịu mắt, dễ dàng phối cùng quần âu, quần kaki hay khoác sơ mi bên ngoài. Sợi Cotton Supima xử lý chải kỹ giúp áo mềm rủ tự nhiên mà không mất phom.",
  "images": [
    {
      "url": "/assets/img/ed-beige-tee2.jpg"
    },
    {
      "url": "/assets/img/cut-beige-tee.webp"
    },
    {
      "url": "/assets/img/ed-cream.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Supima Cotton sợi dài 240 GSM",
    "gsmWeight": 240,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 2% sau 40 lần giặt",
    "dimensions": "Regular Fit tôn dáng",
    "qcBatchCode": "LOT-BG26-042 · AQL 2.5"
  },
  "specComparison": [
    {
      "label": "Màu sắc",
      "unlo": "Tông be trầm thanh lịch",
      "retail": "Màu vàng chói dễ ố bẩn"
    },
    {
      "label": "Độ bền phom",
      "unlo": "Bo cổ đôi dệt mật độ cao",
      "retail": "Bo cổ đơn nhanh bai dão"
    }
  ],
  "costBreakdown": {
    "nullPrice": 225000,
    "traditionalRetailPrice": 590000,
    "materialCost": 100000,
    "materialDesc": "Sợi Cotton Supima nhuộm an toàn",
    "manufacturingCost": 48000,
    "manufacturingDesc": "Cắt may rập chuẩn",
    "packagingShippingCost": 37000,
    "packagingShippingDesc": "Bao bì thân thiện môi trường",
    "platformQcCost": 40000,
    "platformQcDesc": "Kiểm tra chất lượng hoàn thiện"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m58 – 1m66",
      "weight": "50 – 58 kg",
      "chest": "102 cm",
      "length": "67 cm"
    },
    {
      "size": "M",
      "height": "1m66 – 1m73",
      "weight": "59 – 68 kg",
      "chest": "108 cm",
      "length": "70 cm"
    },
    {
      "size": "L",
      "height": "1m72 – 1m79",
      "weight": "69 – 78 kg",
      "chest": "114 cm",
      "length": "72 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m86",
      "weight": "79 – 88 kg",
      "chest": "120 cm",
      "length": "75 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2
  },
  "variants": [
    {
      "_id": "690000000000000000001931",
      "colorName": "Soft Sand",
      "colorHex": "#D8CBB7",
      "size": "S",
      "stock": 30,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001932",
      "colorName": "Soft Sand",
      "colorHex": "#D8CBB7",
      "size": "M",
      "stock": 50,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001933",
      "colorName": "Soft Sand",
      "colorHex": "#D8CBB7",
      "size": "L",
      "stock": 40,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001934",
      "colorName": "Soft Sand",
      "colorHex": "#D8CBB7",
      "size": "XL",
      "stock": 20,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000113",
  "slug": "ao-so-mi-oxford-cotton-royal-80-2",
  "name": "Áo Sơ Mi Oxford Cotton Dệt Nổi Royal Oxford 80/2",
  "categorySlug": "linen-tailoring",
  "categoryName": "Sơ Mi & Quần Linen",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Oxford Cotton",
  "price": 385000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 215,
  "soldCount": 880,
  "stock": 160,
  "badge": {
    "label": "CLASSIC SHIRT",
    "tone": "indigo"
  },
  "hasFactoryVideo": true,
  "factoryVideoCaption": "Gia công cổ áo khuy cài giấu & may cuốn sườn tại Xưởng Bắc Ninh",
  "descriptions": "Vải Royal Oxford dệt kiểu giỏ rơm (basketweave) từ sợi đôi 80/2 tạo cấu trúc dệt nổi thoáng khí, đanh dày mà không thô ráp. Cổ bẻ Button-down có khuy gài giữ phom hoàn hảo kể cả khi không thắt cà vạt.",
  "images": [
    {
      "url": "/assets/img/p-oxford.jpg"
    },
    {
      "url": "/assets/img/j-nu-xanh.jpg"
    },
    {
      "url": "/assets/img/cat-so-mi.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Long-Staple Cotton sợi đôi 80/2",
    "gsmWeight": 175,
    "origin": "Xưởng Dệt May Linen Số 07 Bắc Ninh",
    "shrinkage": "< 1.5% sau giặt máy",
    "dimensions": "Form Regular Tailored chuẩn công sở & thường nhật",
    "qcBatchCode": "LOT-OX26-104 · Kiểm tra đường cuốn sườn"
  },
  "specComparison": [
    {
      "label": "Cấu trúc dệt",
      "unlo": "Dệt sợi đôi 80/2 mềm xốp",
      "retail": "Dệt sợi đơn mỏng dễ nhăn"
    },
    {
      "label": "Khuy áo",
      "unlo": "Khuy vỏ trai tự nhiên 4 lỗ đính chéo",
      "retail": "Khuy nhựa tái chế dễ vỡ"
    },
    {
      "label": "Kỹ thuật ráp thân",
      "unlo": "Cuốn sườn Pháp 5 mũi/cm giấu biên",
      "retail": "Vắt sổ lộ chỉ cọ da"
    }
  ],
  "costBreakdown": {
    "nullPrice": 385000,
    "traditionalRetailPrice": 890000,
    "materialCost": 160000,
    "materialDesc": "Vải Royal Oxford 80/2 & khuy vỏ trai",
    "manufacturingCost": 95000,
    "manufacturingDesc": "May cuốn sườn Pháp 21 công đoạn",
    "packagingShippingCost": 45000,
    "packagingShippingDesc": "Hộp giấy định hình bảo vệ cổ áo",
    "platformQcCost": 85000,
    "platformQcDesc": "Kiểm tra 100% kích thước cổ & tay áo"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 62 kg",
      "chest": "104 cm",
      "length": "72 cm"
    },
    {
      "size": "M",
      "height": "1m68 – 1m74",
      "weight": "63 – 71 kg",
      "chest": "110 cm",
      "length": "74 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "72 – 80 kg",
      "chest": "116 cm",
      "length": "76 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m88",
      "weight": "81 – 92 kg",
      "chest": "122 cm",
      "length": "78 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2,
    "defaultHeadline": "K.N",
    "defaultSubline": "Thêu monogram cổ tay áo",
    "allowedThreadColors": [
      {
        "name": "Navy Blue",
        "hex": "#15095D"
      },
      {
        "name": "Sky Blue",
        "hex": "#628ECB"
      }
    ]
  },
  "variants": [
    {
      "_id": "690000000000000000001941",
      "colorName": "Light Oxford Blue",
      "colorHex": "#C7D8E8",
      "size": "S",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001942",
      "colorName": "Light Oxford Blue",
      "colorHex": "#C7D8E8",
      "size": "M",
      "stock": 55,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001943",
      "colorName": "Light Oxford Blue",
      "colorHex": "#C7D8E8",
      "size": "L",
      "stock": 45,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001944",
      "colorName": "Light Oxford Blue",
      "colorHex": "#C7D8E8",
      "size": "XL",
      "stock": 25,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000114",
  "slug": "ao-so-mi-denim-wash-mem-indigo-6-5oz",
  "name": "Áo Sơ Mi Denim Wash Mềm Indigo Lightweight 6.5oz",
  "categorySlug": "linen-tailoring",
  "categoryName": "Sơ Mi & Quần Linen",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Chambray Denim",
  "price": 440000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 168,
  "soldCount": 620,
  "stock": 110,
  "badge": {
    "label": "INDIGO WASH",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Chất liệu Denim sợi bông 100% định lượng nhẹ 6.5oz, qua quy trình giặt enzyme sinh học làm mềm vải, tạo cảm giác êm ái trên da ngay từ lần mặc đầu tiên. Phù hợp mặc độc lập hoặc khoác ngoài áo thun trơn.",
  "images": [
    {
      "url": "/assets/img/p-so-mi-denim.jpg"
    },
    {
      "url": "/assets/img/p-chambray.jpg"
    },
    {
      "url": "/assets/img/j-ao-xanh.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton Denim 6.5oz",
    "gsmWeight": 210,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "< 1% (Đã wash mềm tại xưởng)",
    "dimensions": "Form Overshirt đa dụng",
    "qcBatchCode": "LOT-DN26-067 · Không tồn dư hóa chất wash"
  },
  "specComparison": [
    {
      "label": "Độ mềm vải",
      "unlo": "Enzyme wash mềm êm da",
      "retail": "Denim thô cứng dặm ngứa"
    },
    {
      "label": "Chỉ may",
      "unlo": "Chỉ đôi viền vàng đồng chịu lực",
      "retail": "Chỉ đơn dễ đứt đường may"
    }
  ],
  "costBreakdown": {
    "nullPrice": 440000,
    "traditionalRetailPrice": 980000,
    "materialCost": 190000,
    "materialDesc": "Vải Denim sợi bông tự nhiên & khuy mạ đồng",
    "manufacturingCost": 110000,
    "manufacturingDesc": "May chi tiết & công đoạn giặt làm mềm",
    "packagingShippingCost": 45000,
    "packagingShippingDesc": "Bao bì carton M2C",
    "platformQcCost": 95000,
    "platformQcDesc": "Kiểm tra độ đều màu wash"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 62 kg",
      "chest": "106 cm",
      "length": "71 cm"
    },
    {
      "size": "M",
      "height": "1m68 – 1m74",
      "weight": "63 – 72 kg",
      "chest": "112 cm",
      "length": "73 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "73 – 81 kg",
      "chest": "118 cm",
      "length": "75 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m88",
      "weight": "82 – 93 kg",
      "chest": "124 cm",
      "length": "78 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000001951",
      "colorName": "Light Indigo",
      "colorHex": "#4C6B8B",
      "size": "S",
      "stock": 20,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001952",
      "colorName": "Light Indigo",
      "colorHex": "#4C6B8B",
      "size": "M",
      "stock": 40,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001953",
      "colorName": "Light Indigo",
      "colorHex": "#4C6B8B",
      "size": "L",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001954",
      "colorName": "Light Indigo",
      "colorHex": "#4C6B8B",
      "size": "XL",
      "stock": 15,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000115",
  "slug": "ao-so-mi-chambray-xanh-khoi-keo-xuoc",
  "name": "Áo Sơ Mi Chambray Xanh Khói Sợi Kéo Xước — Cổ Trụ Tối Giản",
  "categorySlug": "linen-tailoring",
  "categoryName": "Sơ Mi & Quần Linen",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Chambray",
  "price": 395000,
  "salePercent": 0,
  "rate": 4.8,
  "reviewCount": 88,
  "soldCount": 390,
  "stock": 95,
  "badge": {
    "label": "BAND COLLAR",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Vải Chambray đan chéo sợi dọc màu chàm và sợi ngang màu trắng tạo ánh khói mộc mạc. Thiết kế cổ tàu (Band Collar) gọn gàng, phù hợp cho những ngày làm việc cần sự chỉn chu nhưng phóng khoáng.",
  "images": [
    {
      "url": "/assets/img/p-chambray.jpg"
    },
    {
      "url": "/assets/img/p-so-mi-denim.jpg"
    },
    {
      "url": "/assets/img/p-oxford.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton Chambray 160 GSM",
    "gsmWeight": 160,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "< 1.5%",
    "dimensions": "Form suông Regular",
    "qcBatchCode": "LOT-CH26-052 · Đạt tiêu chuẩn xuất khẩu EU"
  },
  "specComparison": [
    {
      "label": "Kiểu cổ áo",
      "unlo": "Cổ trụ ép mex mềm chống gãy",
      "retail": "Cổ cứng cấn cổ khó chịu"
    },
    {
      "label": "Chất liệu",
      "unlo": "Chambray 100% sợi tự nhiên",
      "retail": "Pha Poly gây bí nóng"
    }
  ],
  "costBreakdown": {
    "nullPrice": 395000,
    "traditionalRetailPrice": 850000,
    "materialCost": 165000,
    "materialDesc": "Vải dệt Chambray sợi đôi",
    "manufacturingCost": 98000,
    "manufacturingDesc": "May hoàn thiện tại Bắc Ninh",
    "packagingShippingCost": 42000,
    "packagingShippingDesc": "Đóng gói tiêu chuẩn",
    "platformQcCost": 90000,
    "platformQcDesc": "Kiểm tra từng mũi khâu nẹp cổ"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 60 kg",
      "chest": "104 cm",
      "length": "70 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m74",
      "weight": "61 – 70 kg",
      "chest": "110 cm",
      "length": "72 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "71 – 80 kg",
      "chest": "116 cm",
      "length": "75 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m86",
      "weight": "81 – 90 kg",
      "chest": "122 cm",
      "length": "77 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2
  },
  "variants": [
    {
      "_id": "690000000000000000001961",
      "colorName": "Smoky Indigo",
      "colorHex": "#5B758E",
      "size": "S",
      "stock": 20,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001962",
      "colorName": "Smoky Indigo",
      "colorHex": "#5B758E",
      "size": "M",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001963",
      "colorName": "Smoky Indigo",
      "colorHex": "#5B758E",
      "size": "L",
      "stock": 25,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001964",
      "colorName": "Smoky Indigo",
      "colorHex": "#5B758E",
      "size": "XL",
      "stock": 15,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000116",
  "slug": "ao-ni-sweatshirt-french-terry-380gsm",
  "name": "Áo Nỉ Chui Đầu Sweatshirt French Terry 380 GSM — Đứng Phom",
  "categorySlug": "sweat-hoodie",
  "categoryName": "Áo Nỉ & Hoodie",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "French Terry",
  "price": 380000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 270,
  "soldCount": 1150,
  "stock": 180,
  "badge": {
    "label": "WINTER ESSENTIAL",
    "tone": "indigo"
  },
  "hasFactoryVideo": true,
  "factoryVideoCaption": "Kiểm tra mặt dệt da cá vảy xích French Terry & bo gấu đàn hồi",
  "descriptions": "Vải nỉ chân cua French Terry mật độ cao 380 GSM, dệt từ sợi bông thiên nhiên dày dặn, cách nhiệt tốt mà vẫn thoáng khí. Bo cổ, gấu áo và cổ tay pha Spandex đàn hồi chống bai nhão qua nhiều mùa đông.",
  "images": [
    {
      "url": "/assets/img/p-sweat.jpg"
    },
    {
      "url": "/assets/img/cat-ao-ni.jpg"
    },
    {
      "url": "/assets/img/p-sweat-hong.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton French Terry 380 GSM",
    "gsmWeight": 380,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 2% sau giặt nước lạnh",
    "dimensions": "Form Relaxed vai drop thời thượng",
    "qcBatchCode": "LOT-FT26-118 · Đạt tiêu chuẩn kháng xù lông cấp 4"
  },
  "specComparison": [
    {
      "label": "Mặt trong áo",
      "unlo": "Da cá vảy xích không rụng lông",
      "retail": "Nỉ bông nhân tạo dễ rụng lông dính áo trong"
    },
    {
      "label": "Độ dày",
      "unlo": "380 GSM dày nặng giữ nhiệt",
      "retail": "260 GSM mỏng dính gió lạnh"
    },
    {
      "label": "Bo cổ & gấu",
      "unlo": "Rib dệt dày 5cm co giãn tốt",
      "retail": "Bo pha poly nhão sau 2 lần giặt"
    }
  ],
  "costBreakdown": {
    "nullPrice": 380000,
    "traditionalRetailPrice": 890000,
    "materialCost": 175000,
    "materialDesc": "Vải French Terry 380 GSM & sợi bo gấu",
    "manufacturingCost": 85000,
    "manufacturingDesc": "May ráp 4 kim 6 chỉ chịu lực cao",
    "packagingShippingCost": 45000,
    "packagingShippingDesc": "Bao bì bảo vệ sản phẩm dày",
    "platformQcCost": 75000,
    "platformQcDesc": "Kiểm tra đường may nách & vai áo"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 62 kg",
      "chest": "110 cm",
      "length": "68 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m74",
      "weight": "63 – 72 kg",
      "chest": "116 cm",
      "length": "70 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m81",
      "weight": "73 – 82 kg",
      "chest": "122 cm",
      "length": "73 cm"
    },
    {
      "size": "XL",
      "height": "1m79 – 1m89",
      "weight": "83 – 95 kg",
      "chest": "128 cm",
      "length": "76 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2,
    "defaultHeadline": "L.H",
    "defaultSubline": "Thêu chỉ trắng cổ tay trái",
    "allowedThreadColors": [
      {
        "name": "Off White",
        "hex": "#F5F5F0"
      },
      {
        "name": "Indigo",
        "hex": "#15095D"
      }
    ]
  },
  "variants": [
    {
      "_id": "690000000000000000001971",
      "colorName": "Heather Grey",
      "colorHex": "#A0A4A8",
      "size": "S",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001972",
      "colorName": "Heather Grey",
      "colorHex": "#A0A4A8",
      "size": "M",
      "stock": 65,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001973",
      "colorName": "Heather Grey",
      "colorHex": "#A0A4A8",
      "size": "L",
      "stock": 50,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001974",
      "colorName": "Heather Grey",
      "colorHex": "#A0A4A8",
      "size": "XL",
      "stock": 30,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000117",
  "slug": "ao-ni-sweatshirt-pastel-dusty-pink",
  "name": "Áo Nỉ Chui Đầu Pastel Dusty Pink — Xử Lý Chống Xù Lông",
  "categorySlug": "sweat-hoodie",
  "categoryName": "Áo Nỉ & Hoodie",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "French Terry",
  "price": 380000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 145,
  "soldCount": 560,
  "stock": 130,
  "badge": {
    "label": "PASTEL SERIES",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Tông màu hồng bụi phấn (Dusty Pink) ấm áp, tôn da và trẻ trung. Chất nỉ bông dệt 360 GSM mềm mịn, lót trong êm ái, thích hợp cho cả nam và nữ mặc đôi hoặc mặc phối layer mùa lạnh.",
  "images": [
    {
      "url": "/assets/img/p-sweat-hong.jpg"
    },
    {
      "url": "/assets/img/j-hong.jpg"
    },
    {
      "url": "/assets/img/p-sweat.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton French Terry 360 GSM",
    "gsmWeight": 360,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 2%",
    "dimensions": "Unisex Relaxed Fit",
    "qcBatchCode": "LOT-DP26-081 · Nhuộm chuẩn Eco-Tex"
  },
  "specComparison": [
    {
      "label": "Màu sắc",
      "unlo": "Hồng bụi thanh lịch không kén da",
      "retail": "Hồng dạ quang chói gắt"
    },
    {
      "label": "Mặt vải",
      "unlo": "Cạo lông xơ mịn chống vón cục",
      "retail": "Dễ vón cục sau 1 lần giặt"
    }
  ],
  "costBreakdown": {
    "nullPrice": 380000,
    "traditionalRetailPrice": 890000,
    "materialCost": 175000,
    "materialDesc": "Vải nỉ French Terry & thuốc nhuộm an toàn",
    "manufacturingCost": 85000,
    "manufacturingDesc": "May hoàn thiện tại Hưng Yên",
    "packagingShippingCost": 45000,
    "packagingShippingDesc": "Bao bì M2C tiêu chuẩn",
    "platformQcCost": 75000,
    "platformQcDesc": "Kiểm tra độ đều màu & bo tay"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m55 – 1m65",
      "weight": "45 – 55 kg",
      "chest": "106 cm",
      "length": "66 cm"
    },
    {
      "size": "M",
      "height": "1m63 – 1m72",
      "weight": "55 – 65 kg",
      "chest": "112 cm",
      "length": "69 cm"
    },
    {
      "size": "L",
      "height": "1m70 – 1m78",
      "weight": "65 – 76 kg",
      "chest": "118 cm",
      "length": "72 cm"
    },
    {
      "size": "XL",
      "height": "1m76 – 1m85",
      "weight": "76 – 88 kg",
      "chest": "124 cm",
      "length": "75 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2
  },
  "variants": [
    {
      "_id": "690000000000000000001981",
      "colorName": "Dusty Pink",
      "colorHex": "#D8A2A8",
      "size": "S",
      "stock": 25,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001982",
      "colorName": "Dusty Pink",
      "colorHex": "#D8A2A8",
      "size": "M",
      "stock": 45,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001983",
      "colorName": "Dusty Pink",
      "colorHex": "#D8A2A8",
      "size": "L",
      "stock": 40,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001984",
      "colorName": "Dusty Pink",
      "colorHex": "#D8A2A8",
      "size": "XL",
      "stock": 20,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000118",
  "slug": "ao-hoodie-heavyweight-fleece-420gsm",
  "name": "Áo Nỉ Có Mũ Heavyweight Hoodie 420 GSM — Túi Kangaroo Giấu Mũi",
  "categorySlug": "sweat-hoodie",
  "categoryName": "Áo Nỉ & Hoodie",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Cotton Fleece",
  "price": 460000,
  "salePercent": 0,
  "rate": 5,
  "reviewCount": 389,
  "soldCount": 1450,
  "stock": 210,
  "badge": {
    "label": "420 GSM HEAVYWEIGHT",
    "tone": "indigo"
  },
  "hasFactoryVideo": true,
  "factoryVideoCaption": "Mũ trùm 2 lớp đứng phom & túi Kangaroo may gia cố bar-tack",
  "descriptions": "Mẫu áo hoodie dày nhất của UNLO với định lượng 420 GSM giữ ấm vượt trội trong mùa đông miền Bắc. Mũ trùm may 2 lớp vải dày dặn giúp phom mũ luôn đứng tròn không bị xẹp lép, dây rút đúc đầu kim loại mờ không rỉ.",
  "images": [
    {
      "url": "/assets/img/p-hoodie.jpg"
    },
    {
      "url": "/assets/img/cat-hoodie.jpg"
    },
    {
      "url": "/assets/img/p-sweat.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton Heavyweight Fleece 420 GSM",
    "gsmWeight": 420,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 1.5% sau giặt máy",
    "dimensions": "Boxy Drop-shoulder Fit",
    "qcBatchCode": "LOT-HD26-210 · Khuy kim loại không chì"
  },
  "specComparison": [
    {
      "label": "Mũ trùm đầu",
      "unlo": "2 lớp vải dày 420 GSM đứng phom",
      "retail": "1 lớp mỏng xẹp lép méo mó"
    },
    {
      "label": "Góc túi Kangaroo",
      "unlo": "Đóng bọ Bar-tack 4 góc chống rách",
      "retail": "Chỉ may đơn dễ bục chỉ"
    },
    {
      "label": "Dây rút mũ",
      "unlo": "Dệt dẹt đúc đầu kim loại mờ",
      "retail": "Dây tròn bọc nhựa dễ vỡ"
    }
  ],
  "costBreakdown": {
    "nullPrice": 460000,
    "traditionalRetailPrice": 1150000,
    "materialCost": 220000,
    "materialDesc": "Vải Fleece 420 GSM & phụ kiện kim loại mờ",
    "manufacturingCost": 110000,
    "manufacturingDesc": "May ghép mũ 2 lớp & túi Kangaroo",
    "packagingShippingCost": 48000,
    "packagingShippingDesc": "Bao bì kích thước lớn",
    "platformQcCost": 82000,
    "platformQcDesc": "Kiểm tra độ cân đối mũ và túi"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 64 kg",
      "chest": "114 cm",
      "length": "68 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m75",
      "weight": "64 – 74 kg",
      "chest": "120 cm",
      "length": "71 cm"
    },
    {
      "size": "L",
      "height": "1m74 – 1m82",
      "weight": "74 – 84 kg",
      "chest": "126 cm",
      "length": "74 cm"
    },
    {
      "size": "XL",
      "height": "1m80 – 1m90",
      "weight": "85 – 98 kg",
      "chest": "132 cm",
      "length": "77 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": true,
    "allowMonogram": true,
    "maxMonogramChars": 4,
    "monogramFee": 35000,
    "extraLeadDays": 2,
    "defaultHeadline": "N.L",
    "defaultSubline": "Thêu chỉ xám mép mũ",
    "allowedThreadColors": [
      {
        "name": "Silver",
        "hex": "#B8B8B8"
      },
      {
        "name": "Navy",
        "hex": "#15095D"
      }
    ]
  },
  "variants": [
    {
      "_id": "690000000000000000001991",
      "colorName": "Onyx Black",
      "colorHex": "#1F1F1F",
      "size": "S",
      "stock": 40,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001992",
      "colorName": "Onyx Black",
      "colorHex": "#1F1F1F",
      "size": "M",
      "stock": 75,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001993",
      "colorName": "Onyx Black",
      "colorHex": "#1F1F1F",
      "size": "L",
      "stock": 60,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000001994",
      "colorName": "Onyx Black",
      "colorHex": "#1F1F1F",
      "size": "XL",
      "stock": 35,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000119",
  "slug": "quan-kaki-chino-cotton-twill-co-gian",
  "name": "Quần Kaki Chino Cotton Twill Co Giãn — Cạp Chun Ẩn Thoải Mái",
  "categorySlug": "pants-bottoms",
  "categoryName": "Quần Kaki & Quần Âu",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Cotton Twill",
  "price": 395000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 310,
  "soldCount": 1280,
  "stock": 190,
  "badge": {
    "label": "SMART CHINO",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Chiếc quần Chino đa dụng cho cả ngày dài làm việc và di chuyển. Vải Cotton Twill dệt chéo 260 GSM pha 3% Spandex co giãn 4 chiều. Thiết kế cạp chun ẩn bên hông co giãn thông minh mà vẫn giữ trọn vẻ lịch lãm bên ngoài.",
  "images": [
    {
      "url": "/assets/img/p-kaki.jpg"
    },
    {
      "url": "/assets/img/ed-pants.jpg"
    },
    {
      "url": "/assets/img/cat-quan.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "97% Cotton Twill, 3% Spandex 260 GSM",
    "gsmWeight": 260,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "< 1.5%",
    "dimensions": "Slim-Straight Fit tôn chân",
    "qcBatchCode": "LOT-CK26-145 · Khóa kéo YKK chính hãng"
  },
  "specComparison": [
    {
      "label": "Cạp quần",
      "unlo": "Chun ẩn 2 bên hông co giãn 4cm",
      "retail": "Cạp cứng bó chặt gây tức bụng"
    },
    {
      "label": "Khóa kéo",
      "unlo": "Khóa đồng YKK tự khóa đầu chốt",
      "retail": "Khóa kéo mỏng dễ trôi tụt"
    },
    {
      "label": "Túi quần",
      "unlo": "Lót vải mộc 100% cotton sâu 22cm",
      "retail": "Lót nylon mỏng dễ rách rơi đồ"
    }
  ],
  "costBreakdown": {
    "nullPrice": 395000,
    "traditionalRetailPrice": 850000,
    "materialCost": 170000,
    "materialDesc": "Vải Cotton Twill Spandex & khóa YKK",
    "manufacturingCost": 98000,
    "manufacturingDesc": "May chi tiết cạp chun ẩn & túi sau viền",
    "packagingShippingCost": 45000,
    "packagingShippingDesc": "Đóng gói phẳng chống nhăn",
    "platformQcCost": 82000,
    "platformQcDesc": "Kiểm tra độ co giãn và đường may đáy"
  },
  "sizeChart": [
    {
      "size": "29",
      "height": "1m60 – 1m68",
      "weight": "50 – 58 kg",
      "waist": "76 cm",
      "length": "96 cm"
    },
    {
      "size": "30",
      "height": "1m65 – 1m72",
      "weight": "58 – 65 kg",
      "waist": "80 cm",
      "length": "98 cm"
    },
    {
      "size": "31",
      "height": "1m70 – 1m76",
      "weight": "65 – 72 kg",
      "waist": "84 cm",
      "length": "100 cm"
    },
    {
      "size": "32",
      "height": "1m74 – 1m80",
      "weight": "72 – 78 kg",
      "waist": "88 cm",
      "length": "102 cm"
    },
    {
      "size": "34",
      "height": "1m78 – 1m86",
      "weight": "79 – 88 kg",
      "waist": "94 cm",
      "length": "104 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002001",
      "colorName": "Khaki Beige",
      "colorHex": "#C5B396",
      "size": "30",
      "stock": 45,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002002",
      "colorName": "Khaki Beige",
      "colorHex": "#C5B396",
      "size": "31",
      "stock": 55,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002003",
      "colorName": "Khaki Beige",
      "colorHex": "#C5B396",
      "size": "32",
      "stock": 50,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002004",
      "colorName": "Khaki Beige",
      "colorHex": "#C5B396",
      "size": "34",
      "stock": 40,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000120",
  "slug": "quan-jogger-ni-french-terry-the-thao",
  "name": "Quần Jogger Nỉ French Terry Thể Thao — Gấu Bo Bản Rộng",
  "categorySlug": "pants-bottoms",
  "categoryName": "Quần Kaki & Quần Âu",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "French Terry",
  "price": 360000,
  "salePercent": 0,
  "rate": 4.8,
  "reviewCount": 198,
  "soldCount": 840,
  "stock": 145,
  "badge": {
    "label": "ACTIVE JOGGER",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Quần jogger nỉ thể thao dệt từ sợi bông French Terry 340 GSM thoáng khí. Cạp chun bản rộng 4.5cm kèm dây rút luồn trong chống cọ xát, 2 túi khóa kéo ẩn bên hông an toàn khi đựng điện thoại chìa khóa lúc chạy bộ.",
  "images": [
    {
      "url": "/assets/img/p-jogger.jpg"
    },
    {
      "url": "/assets/img/p-kaki.jpg"
    },
    {
      "url": "/assets/img/cat-quan.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton French Terry 340 GSM",
    "gsmWeight": 340,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 1.5%",
    "dimensions": "Athletic Tapered Fit",
    "qcBatchCode": "LOT-JG26-094 · Khóa kéo túi ẩn mượt mà"
  },
  "specComparison": [
    {
      "label": "Túi quần",
      "unlo": "2 túi khóa kéo ẩn an toàn",
      "retail": "Túi mở dễ rơi đồ khi ngồi"
    },
    {
      "label": "Gấu bo chân",
      "unlo": "Bo rib 5cm ôm vừa vặn mắt cá",
      "retail": "Bo chun lỏng lẻo nhanh tuột"
    }
  ],
  "costBreakdown": {
    "nullPrice": 360000,
    "traditionalRetailPrice": 780000,
    "materialCost": 155000,
    "materialDesc": "Vải French Terry 340 GSM & dây chun",
    "manufacturingCost": 88000,
    "manufacturingDesc": "May túi khóa ẩn & gấu bo",
    "packagingShippingCost": 42000,
    "packagingShippingDesc": "Bao bì M2C tiêu chuẩn",
    "platformQcCost": 75000,
    "platformQcDesc": "Kiểm tra độ đàn hồi cạp chun"
  },
  "sizeChart": [
    {
      "size": "M",
      "height": "1m65 – 1m73",
      "weight": "58 – 66 kg",
      "waist": "76 – 82 cm",
      "length": "95 cm"
    },
    {
      "size": "L",
      "height": "1m72 – 1m78",
      "weight": "67 – 76 kg",
      "waist": "82 – 88 cm",
      "length": "98 cm"
    },
    {
      "size": "XL",
      "height": "1m77 – 1m86",
      "weight": "77 – 88 kg",
      "waist": "88 – 96 cm",
      "length": "101 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002011",
      "colorName": "Dark Charcoal",
      "colorHex": "#303236",
      "size": "M",
      "stock": 50,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002012",
      "colorName": "Dark Charcoal",
      "colorHex": "#303236",
      "size": "L",
      "stock": 60,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002013",
      "colorName": "Dark Charcoal",
      "colorHex": "#303236",
      "size": "XL",
      "stock": 35,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000121",
  "slug": "quan-au-xep-ly-relaxed-trousers",
  "name": "Quần Âu Xếp Ly Relaxed Trousers — Dệt Chéo Chống Nhăn",
  "categorySlug": "pants-bottoms",
  "categoryName": "Quần Kaki & Quần Âu",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Poly Rayon Twill",
  "price": 480000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 176,
  "soldCount": 690,
  "stock": 125,
  "badge": {
    "label": "PLEATED TAILORING",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Thiết kế 1 ly trước (Single Pleat) tạo độ rủ thanh thoát và không gian thoải mái cho phần hông và đùi. Vải pha sợi Viscose tự nhiên và Rayon dệt chéo chống nhăn tuyệt đối, giữ nếp ly sắc nét sau cả ngày ngồi văn phòng.",
  "images": [
    {
      "url": "/assets/img/ed-pants.jpg"
    },
    {
      "url": "/assets/img/p-kaki.jpg"
    },
    {
      "url": "/assets/img/ed-dark.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "68% Polyester, 28% Rayon Viscose, 4% Spandex",
    "gsmWeight": 280,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "0% (Chống nhăn & giữ ly vĩnh viễn)",
    "dimensions": "Relaxed Straight Trousers",
    "qcBatchCode": "LOT-TR26-077 · Ép nhiệt ly máy tự động"
  },
  "specComparison": [
    {
      "label": "Độ giữ ly",
      "unlo": "Ép nhiệt chân không chống mất ly",
      "retail": "Ly là tay nhanh mất nếp"
    },
    {
      "label": "Độ thoải mái",
      "unlo": "Ly trước mở rộng cử động hông",
      "retail": "Ống bó chẽn khó ngồi xổm"
    }
  ],
  "costBreakdown": {
    "nullPrice": 480000,
    "traditionalRetailPrice": 1050000,
    "materialCost": 200000,
    "materialDesc": "Vải Rayon dệt chéo cao cấp",
    "manufacturingCost": 120000,
    "manufacturingDesc": "May hoàn thiện & ép ly định hình",
    "packagingShippingCost": 50000,
    "packagingShippingDesc": "Đóng móc treo & bao nilon bảo vệ",
    "platformQcCost": 110000,
    "platformQcDesc": "Kiểm tra độ thẳng nếp ly 2 ống"
  },
  "sizeChart": [
    {
      "size": "S (29-30)",
      "height": "1m62 – 1m70",
      "weight": "52 – 62 kg",
      "waist": "78 cm",
      "length": "98 cm"
    },
    {
      "size": "M (31-32)",
      "height": "1m69 – 1m76",
      "weight": "63 – 72 kg",
      "waist": "84 cm",
      "length": "101 cm"
    },
    {
      "size": "L (33-34)",
      "height": "1m75 – 1m83",
      "weight": "73 – 84 kg",
      "waist": "90 cm",
      "length": "104 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002021",
      "colorName": "Deep Charcoal",
      "colorHex": "#2C2D30",
      "size": "S",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002022",
      "colorName": "Deep Charcoal",
      "colorHex": "#2C2D30",
      "size": "M",
      "stock": 55,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002023",
      "colorName": "Deep Charcoal",
      "colorHex": "#2C2D30",
      "size": "L",
      "stock": 35,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000122",
  "slug": "ao-len-merino-sieu-min-19-5-micron-dark-navy",
  "name": "Áo Len Merino Siêu Mịn 19.5 Micron Cổ Tròn — Dark Navy",
  "categorySlug": "wool-knitwear",
  "categoryName": "Đồ Len & Áo Khoác",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Merino Wool",
  "price": 560000,
  "salePercent": 0,
  "rate": 5,
  "reviewCount": 224,
  "soldCount": 780,
  "stock": 90,
  "badge": {
    "label": "19.5 MICRON WOOL",
    "tone": "indigo"
  },
  "hasFactoryVideo": true,
  "factoryVideoCaption": "Dệt vi tính 14 Gauge nguyên khối không đường may nối sườn",
  "descriptions": "Sợi len cừu Merino tinh khiết độ mảnh 19.5 Micron mềm êm tuyệt đối, không gây châm chích kể cả khi mặc tiếp xúc trực tiếp với làn da nhạy cảm. Công nghệ dệt dệt kim 14 Gauge tạo bề mặt mịn mượt và điều hòa thân nhiệt thông minh.",
  "images": [
    {
      "url": "/assets/img/ed-dark.jpg"
    },
    {
      "url": "/assets/img/x-ke-len.jpg"
    },
    {
      "url": "/assets/img/ed-cream.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Extra-Fine Merino Wool 19.5 Micron",
    "gsmWeight": 230,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên (Nhập sợi Úc chứng nhận Woolmark)",
    "shrinkage": "Xử lý Total Easy Care chống co rút khi giặt",
    "dimensions": "Regular Tailored Fit",
    "qcBatchCode": "LOT-MW26-019 · Chứng nhận Woolmark Blend Test"
  },
  "specComparison": [
    {
      "label": "Độ mảnh sợi",
      "unlo": "19.5 Micron (Mềm êm không ngứa)",
      "retail": "24 Micron dễ dặm ngứa da"
    },
    {
      "label": "Công nghệ dệt",
      "unlo": "Dệt kim 14 Gauge nguyên khối",
      "retail": "May ráp biên lộ cộm đường chỉ"
    }
  ],
  "costBreakdown": {
    "nullPrice": 560000,
    "traditionalRetailPrice": 1450000,
    "materialCost": 260000,
    "materialDesc": "Sợi Merino Wool Úc nguyên bản",
    "manufacturingCost": 135000,
    "manufacturingDesc": "Dệt vi tính 14 Gauge công nghệ Đức",
    "packagingShippingCost": 55000,
    "packagingShippingDesc": "Túi vải không dệt & hộp carton",
    "platformQcCost": 110000,
    "platformQcDesc": "Kiểm tra độ đều sợi quang học"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "50 – 60 kg",
      "chest": "100 cm",
      "length": "66 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m74",
      "weight": "61 – 70 kg",
      "chest": "106 cm",
      "length": "68 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m80",
      "weight": "71 – 80 kg",
      "chest": "112 cm",
      "length": "71 cm"
    },
    {
      "size": "XL",
      "height": "1m78 – 1m86",
      "weight": "81 – 90 kg",
      "chest": "118 cm",
      "length": "73 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002031",
      "colorName": "Dark Navy",
      "colorHex": "#121A28",
      "size": "S",
      "stock": 20,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002032",
      "colorName": "Dark Navy",
      "colorHex": "#121A28",
      "size": "M",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002033",
      "colorName": "Dark Navy",
      "colorHex": "#121A28",
      "size": "L",
      "stock": 25,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002034",
      "colorName": "Dark Navy",
      "colorHex": "#121A28",
      "size": "XL",
      "stock": 10,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000123",
  "slug": "ao-len-cashmere-blend-mau-kem-oat-cream",
  "name": "Áo Len Dệt Sợi Cashmere Blend Màu Kem Oat Cream — Cổ Tròn Mềm Rủ",
  "categorySlug": "wool-knitwear",
  "categoryName": "Đồ Len & Áo Khoác",
  "factorySlug": "xuong-det-kim-so-04-hung-yen",
  "creatorName": "Xưởng Dệt Kim Số 04 · Hưng Yên",
  "materialTag": "Cashmere Blend",
  "price": 620000,
  "salePercent": 0,
  "rate": 5,
  "reviewCount": 156,
  "soldCount": 470,
  "stock": 80,
  "badge": {
    "label": "LUXURY CASHMERE",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Sự kết hợp tinh túy giữa 15% lông dê Cashmere Mông Cổ và 85% Merino Wool siêu mịn tạo nên một chiếc áo ấm áp tựa mây trời. Tông màu Oat Cream sáng nhẹ, mang lại vẻ ngoài thanh lịch đậm chất Quiet Luxury.",
  "images": [
    {
      "url": "/assets/img/ed-cream.jpg"
    },
    {
      "url": "/assets/img/cut-cream.webp"
    },
    {
      "url": "/assets/img/x-ke-len.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "15% Cashmere, 85% Merino Wool",
    "gsmWeight": 240,
    "origin": "Xưởng Dệt Kim Số 04 Hưng Yên",
    "shrinkage": "< 1.5%",
    "dimensions": "Classic Fit chuẩn mực",
    "qcBatchCode": "LOT-CS26-008 · Kiểm tra độ mịn vi mô"
  },
  "specComparison": [
    {
      "label": "Chất liệu",
      "unlo": "15% Cashmere tự nhiên + 85% Merino",
      "retail": "100% sợi Acrylic nhân tạo"
    },
    {
      "label": "Cảm giác chạm",
      "unlo": "Ấm ngay sau 3 giây chạm da",
      "retail": "Lạnh buốt và bí mồ hôi"
    }
  ],
  "costBreakdown": {
    "nullPrice": 620000,
    "traditionalRetailPrice": 1650000,
    "materialCost": 290000,
    "materialDesc": "Sợi Cashmere & Merino tự nhiên",
    "manufacturingCost": 150000,
    "manufacturingDesc": "Dệt kim kỹ thuật cao",
    "packagingShippingCost": 60000,
    "packagingShippingDesc": "Hộp quà tặng & giấy lụa",
    "platformQcCost": 120000,
    "platformQcDesc": "Kiểm tra độ đều sợi"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m58 – 1m66",
      "weight": "48 – 58 kg",
      "chest": "98 cm",
      "length": "64 cm"
    },
    {
      "size": "M",
      "height": "1m65 – 1m72",
      "weight": "58 – 68 kg",
      "chest": "104 cm",
      "length": "67 cm"
    },
    {
      "size": "L",
      "height": "1m71 – 1m78",
      "weight": "68 – 78 kg",
      "chest": "110 cm",
      "length": "70 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002041",
      "colorName": "Oat Cream",
      "colorHex": "#EAE5DB",
      "size": "S",
      "stock": 20,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002042",
      "colorName": "Oat Cream",
      "colorHex": "#EAE5DB",
      "size": "M",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002043",
      "colorName": "Oat Cream",
      "colorHex": "#EAE5DB",
      "size": "L",
      "stock": 25,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000124",
  "slug": "ao-khoac-trench-coat-dang-dai-toi-gian",
  "name": "Áo Khoác Trench Coat Dáng Dài Tối Giản — Chống Thấm Nước DWR",
  "categorySlug": "wool-knitwear",
  "categoryName": "Đồ Len & Áo Khoác",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Technical Cotton",
  "price": 890000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 84,
  "soldCount": 310,
  "stock": 65,
  "badge": {
    "label": "WATERPROOF COAT",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Chiếc áo khoác Trench Coat tinh tế được giản lược toàn bộ các chi tiết cầu vai và nắp súng rườm rà. Bề mặt vải Cotton pha sợi kỹ thuật xử lý phủ chống thấm DWR sinh học, chống mưa phùn và gió rét hiệu quả.",
  "images": [
    {
      "url": "/assets/img/ed-trench.jpg"
    },
    {
      "url": "/assets/img/ed-dark.jpg"
    },
    {
      "url": "/assets/img/x-tho-may.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "65% Cotton, 35% Technical Nylon phủ DWR",
    "gsmWeight": 310,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "0%",
    "dimensions": "Dáng dài qua gối sang trọng",
    "qcBatchCode": "LOT-TC26-004 · Thử nghiệm xịt nước trượt lá sen"
  },
  "specComparison": [
    {
      "label": "Khả năng chống nước",
      "unlo": "Phủ DWR nước trượt bề mặt",
      "retail": "Thấm ướt sũng khi gặp mưa nhẹ"
    },
    {
      "label": "Lớp lót",
      "unlo": "Lót trong Viscose trơn mượt không dính",
      "retail": "Lót nilon gây tĩnh điện bí rít"
    }
  ],
  "costBreakdown": {
    "nullPrice": 890000,
    "traditionalRetailPrice": 2200000,
    "materialCost": 410000,
    "materialDesc": "Vải Technical Cotton & lớp lót Viscose",
    "manufacturingCost": 240000,
    "manufacturingDesc": "May áo khoác 2 lớp 48 công đoạn",
    "packagingShippingCost": 70000,
    "packagingShippingDesc": "Túi bọc vest chống bụi & móc gỗ",
    "platformQcCost": 170000,
    "platformQcDesc": "Kiểm tra 100% đường may chống ngấm"
  },
  "sizeChart": [
    {
      "size": "M",
      "height": "1m65 – 1m74",
      "weight": "55 – 68 kg",
      "chest": "116 cm",
      "length": "105 cm"
    },
    {
      "size": "L",
      "height": "1m72 – 1m82",
      "weight": "69 – 82 kg",
      "chest": "122 cm",
      "length": "108 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002051",
      "colorName": "Khaki Tan",
      "colorHex": "#B8A282",
      "size": "M",
      "stock": 35,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002052",
      "colorName": "Khaki Tan",
      "colorHex": "#B8A282",
      "size": "L",
      "stock": 30,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
},
{
  "_id": "690000000000000000000125",
  "slug": "ao-khoac-denim-jacket-selvedge-khuy-kim-loai",
  "name": "Áo Khoác Denim Jacket Khuy Kim Loại Mờ — Chỉ May Gia Cường Vàng Đồng",
  "categorySlug": "wool-knitwear",
  "categoryName": "Đồ Len & Áo Khoác",
  "factorySlug": "xuong-det-may-linen-so-07-bac-ninh",
  "creatorName": "Xưởng Dệt May Linen Số 07 · Bắc Ninh",
  "materialTag": "Selvedge Denim",
  "price": 580000,
  "salePercent": 0,
  "rate": 4.9,
  "reviewCount": 164,
  "soldCount": 520,
  "stock": 95,
  "badge": {
    "label": "SELVEDGE DENIM",
    "tone": "indigo"
  },
  "hasFactoryVideo": false,
  "factoryVideoCaption": "",
  "descriptions": "Vải Denim 12oz bền bỉ với đường dệt biên (Selvedge) chuẩn mực. Khuy cài kim loại dập mờ không logo lòe loẹt, đường may chập đè chỉ vàng hổ phách gia cường toàn bộ các điểm chịu lực nách và túi áo.",
  "images": [
    {
      "url": "/assets/img/j-ao-xanh.jpg"
    },
    {
      "url": "/assets/img/p-so-mi-denim.jpg"
    },
    {
      "url": "/assets/img/j-chat-lieu.jpg"
    }
  ],
  "specs": {
    "fabricComposition": "100% Cotton Selvedge Denim 12oz",
    "gsmWeight": 340,
    "origin": "Xưởng Dệt May Số 07 Bắc Ninh",
    "shrinkage": "< 1%",
    "dimensions": "Boxy Trucker Fit",
    "qcBatchCode": "LOT-DJ26-055 · Khuy tán đồng không rỉ"
  },
  "specComparison": [
    {
      "label": "Độ dày denim",
      "unlo": "12oz dày dặn lên phom đứng",
      "retail": "8oz mỏng ọp ẹp"
    },
    {
      "label": "Khuy áo",
      "unlo": "Khuy đồng đặc tán chân chịu lực",
      "retail": "Khuy sắt mỏng dễ bung bật"
    }
  ],
  "costBreakdown": {
    "nullPrice": 580000,
    "traditionalRetailPrice": 1350000,
    "materialCost": 260000,
    "materialDesc": "Vải Selvedge Denim & khuy tán đồng",
    "manufacturingCost": 140000,
    "manufacturingDesc": "May hoàn thiện & rửa wash rũ hồ",
    "packagingShippingCost": 60000,
    "packagingShippingDesc": "Đóng gói tiêu chuẩn M2C",
    "platformQcCost": 120000,
    "platformQcDesc": "Kiểm tra từng khuy bấm và đường chỉ đôi"
  },
  "sizeChart": [
    {
      "size": "S",
      "height": "1m60 – 1m68",
      "weight": "52 – 62 kg",
      "chest": "106 cm",
      "length": "63 cm"
    },
    {
      "size": "M",
      "height": "1m67 – 1m75",
      "weight": "63 – 72 kg",
      "chest": "112 cm",
      "length": "65 cm"
    },
    {
      "size": "L",
      "height": "1m73 – 1m82",
      "weight": "73 – 83 kg",
      "chest": "118 cm",
      "length": "68 cm"
    }
  ],
  "personalizationConfig": {
    "enabled": false
  },
  "variants": [
    {
      "_id": "690000000000000000002061",
      "colorName": "Deep Indigo",
      "colorHex": "#2E4765",
      "size": "S",
      "stock": 25,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002062",
      "colorName": "Deep Indigo",
      "colorHex": "#2E4765",
      "size": "M",
      "stock": 45,
      "priceDelta": 0
    },
    {
      "_id": "690000000000000000002063",
      "colorName": "Deep Indigo",
      "colorHex": "#2E4765",
      "size": "L",
      "stock": 25,
      "priceDelta": 0
    }
  ],
  "fitReviews": [],
  "makerQa": []
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
