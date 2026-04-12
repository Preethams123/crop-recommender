// ============================================================
// RAITHA — Bilingual Engine (English / ಕನ್ನಡ)
// ============================================================

const LANG_KEY = "raitha_lang";

function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

function toggleLanguage() {
  const current = getCurrentLang();
  localStorage.setItem(LANG_KEY, current === "en" ? "kn" : "en");
  location.reload(); // Reload so all JS-rendered content re-renders in new language
}

function t(key) {
  const lang = getCurrentLang();
  return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) ? UI_STRINGS[lang][key] : (UI_STRINGS["en"][key] || key);
}

function cropName(crop) {
  if (getCurrentLang() === "kn" && crop.nameKn) return crop.nameKn;
  return crop.name;
}

function categoryName(cat) {
  const lang = getCurrentLang();
  return (CATEGORY_NAMES[lang] && CATEGORY_NAMES[lang][cat]) ? CATEGORY_NAMES[lang][cat] : cat;
}

function seasonName(season) {
  const lang = getCurrentLang();
  return (SEASON_NAMES[lang] && SEASON_NAMES[lang][season]) ? SEASON_NAMES[lang][season] : season;
}

// ─── UI STRINGS ──────────────────────────────────────────────
const UI_STRINGS = {
  en: {
    // App Brand
    app_name: "Raitha Bandhu",
    welcome_to: "WELCOME TO",
    splash_name: "RAITHA BANDHU",
    app_tagline: "Smart Crop System",

    // Stats
    stat_crops_tracked: "Crops Tracked",
    stat_categories: "Categories",
    stat_days: "Days of Data",
    smart_score_label: "Smart Score",
    crops_word: "crops",
    viewed_recently: "crops viewed recently",

    // Nav
    nav_home: "Home",
    nav_mandi: "Mandi Prices",
    nav_contact: "Contact",
    search_placeholder: "Search crops…",
    search_btn: "Search",

    // Notice
    notice_bar: "⚠️ All prices are in ₹ per quintal (100 kg) — Updated daily from major agricultural mandis",

    // Hero
    hero_title: "Grow with Precision. Earn with Confidence.",
    hero_sub: "Live mandi prices, crop demand trends, and smart recommendations to help you choose the right crop this season.",
    hero_btn_mandi: "📊 View Mandi Prices",
    hero_btn_best: "🏆 Best Crops",
    hero_crops_tracked: "Crops Tracked",
    hero_categories: "Categories",
    hero_days_data: "Days of Data",

    // Sections
    section_recent: "🕒 Recently Viewed Crops",
    section_recent_hint: "Search for a crop to see your history here",
    section_best: "🏆 Best Crops to Grow This Season",
    section_best_sub: "Ranked by profitability + demand + low risk",
    section_categories: "Browse by Category",
    section_categories_sub: "Tap a category to see all crops and prices",

    // Mandi Page
    mandi_page_title: "📊 Live Mandi Prices",
    mandi_page_sub: "Today's prices per quintal for all crops — compare, filter, and click any crop for full details",
    filter_search: "Search Crop",
    filter_category: "Category",
    filter_all_categories: "All Categories",
    filter_season: "Season",
    filter_all_seasons: "All Seasons",
    filter_sort: "Sort By",
    sort_price_high: "Price: High to Low",
    sort_price_low: "Price: Low to High",
    sort_name_az: "Name A to Z",
    sort_trending_up: "Rising Prices ↑",
    sort_trending_down: "Falling Prices ↓",
    sort_risk_low: "Lowest Risk First",
    summary_total: "Total Crops Listed",
    summary_rising: "Prices Rising ↑",
    summary_stable: "Stable Prices ≈",
    summary_falling: "Prices Falling ↓",
    summary_avg: "Avg Price / Quintal",
    show_all: "Show All",
    show_less: "Show Less ↑",
    crops: "Crops",
    live_price: "Live",
    past_price: "Past",
    demand: "Demand",
    risk: "Risk",
    low_risk: "Low Risk",
    medium_risk: "Medium Risk",
    high_risk: "High Risk",
    yearly_profit: "Yr",
    per_qtl: "/qtl",

    // Crop Detail
    smart_rec: "Smart Recommendation",
    analyzing: "Analyzing crop data…",
    risk_level: "Risk Level",
    yearly_profit_label: "Yearly Profit",
    demand_score: "Demand Score",
    smart_score: "Smart Score",
    price_trend_title: "📉 Price Trend (₹ per quintal)",
    last_30_days: "Last 30 Days",
    last_12_months: "12 Months",
    seed_demand_title: "📦 Seed Demand — Last 12 Months (Kg Sold)",
    growing_guide: "🌱 Crop Insights & Growing Guide",
    avg_demand: "📦 Avg Local Market Demand",
    better_alternatives: "🔄 Better Alternatives",
    same_season: "Same season crops with better scores",
    no_alternatives: "No same-season alternatives found.",
    risk_analyzer: "📊 Advanced Risk Analyzer",
    risk_analyzer_sub: "Data-driven market stability metrics",
    pvi_label: "Price Volatility Index (PVI)",
    weather_risk_label: "Season Weather Risk",
    market_sentiment: "Market Sentiment",
    season_label: "Season",
    harvest_label: "months to harvest",
    per_quintal: "per quintal (100 kg)",
    past_close: "Past close",
    ideal_soil: "Ideal Soil Type",
    water_need: "Water Need",
    row_spacing: "Row Spacing",
    ideal_temp: "Ideal Temp",
    prob: "% Probability",
    score_label: "/100 Score",
    highly_recommended: "HIGHLY RECOMMENDED",
    recommended: "RECOMMENDED",
    grow_with_care: "GROW WITH CARE",
    high_risk_reward: "HIGH RISK — HIGH REWARD",
    not_recommended: "NOT RECOMMENDED",
    analysis_score: "Analysis Score",
    ma_label: "Moving Avg",
    price_label: "Price",
    day_short: "Day",

    // Map/Contact
    serve_states: "We serve farmers across all states of India.",
    karnataka_states: "Karnataka | Maharashtra | Punjab | Uttar Pradesh | Madhya Pradesh | Gujarat | Rajasthan",
    empty_mandi: "No crops found. Try changing your filters.",
    live_prices_for: "Live prices for",

    // Recommendations
    rec_strong: "has strong market demand and favorable price trends. This is a very profitable option for your farm this season.",
    rec_steady: "has steady demand. A reliable crop requiring standard maintenance. Expect moderate but stable returns.",
    rec_fluctuating: "shows fluctuating prices. Ensure you have necessary risk mitigation before planting heavily.",
    rec_high_risk: "prices swing dramatically. Only grow this if you have cold storage options or a pre-arranged buyer contract.",
    rec_poor: "has poor market sentiment and dropping prices. Consider switching to one of the better alternatives shown below.",

    // Contact
    contact_title: "📞 Contact Us",
    contact_sub: "Need help? Our team is ready to assist farmers across India.",
    helpline_title: "Farmer Helpline",
    helpline_note: "Free • Mon–Sat, 8 AM – 6 PM",
    whatsapp_title: "WhatsApp Support",
    whatsapp_note: "Send crop name to get today's price",
    email_title: "Email",
    email_note: "Reply within 24 hours",
    kisan_title: "Kisan Call Centre",
    kisan_note: "Government of India • 24×7 toll-free",
    nearest_mandi: "Nearest Mandi",
    find_mandi: "enam.gov.in — Find your local mandi",

    // Footer
    footer_tagline: "Empowering farmers with real-time crop data, mandi prices, and smart recommendations to maximize earnings.",
    footer_quick_links: "Quick Links",
    footer_contact_details: "Contact Details",
    footer_copy: "© 2025 Raitha Bandhu — Smart Crop Decision System.",
    footer_note: "All prices in ₹/quintal (100 kg) • Data is for guidance only",
    footer_helpline: "📞 Helpline: 1800-123-4567",
    footer_whatsapp: "📱 WhatsApp: +91 98765 43210",
    footer_email: "✉️ help@raitha.in",
    // States Served
    states_title: "We serve farmers across all states of India.",
    states_list: "Karnataka | Maharashtra | Punjab | Uttar Pradesh | Madhya Pradesh | Gujarat | Rajasthan",

    // Active Season Widget
    active_season: "Active Season",
    indian_agri: "Indian Agriculture",
    live_weather: "Live Weather",
    central_india_weather: "Central India Weather",
    season_kharif: "Kharif (Monsoon)",
    season_rabi: "Rabi (Winter)",
    season_zaid: "Zaid (Summer)",
  },

  kn: {
    // App Brand
    app_name: "ರೈತ ಬಂಧು",
    welcome_to: "ಸ್ವಾಗತವಿದೆ",
    splash_name: "ರೈತ ಬಂಧು",
    app_tagline: "ಬುದ್ಧಿವಂತ ಬೆಳೆ ವ್ಯವಸ್ಥೆ",

    // Stats
    stat_crops_tracked: "ಬೆಳೆಗಳ ಮಾಹಿತಿ",
    stat_categories: "ವರ್ಗಗಳು",
    stat_days: "ದಿನಗಳ ಡೇಟಾ",
    smart_score_label: "ಸ್ಮಾರ್ಟ್ ಅಂಕ",
    crops_word: "ಬೆಳೆಗಳು",
    viewed_recently: "ಬೆಳೆಗಳು ಇತ್ತೀಚೆಗೆ ನೋಡಲಾಗಿದೆ",

    // Nav
    nav_home: "ಮನೆ",
    nav_mandi: "ಮಾರುಕಟ್ಟೆ ದರ",
    nav_contact: "ಸಂಪರ್ಕ",
    search_placeholder: "ಬೆಳೆ ಹುಡುಕಿ…",
    search_btn: "ಹುಡುಕಿ",
    app_tagline: "ಬುದ್ಧಿವಂತ ಬೆಳೆ ವ್ಯವಸ್ಥೆ",

    // Notice
    notice_bar: "⚠️ ಎಲ್ಲಾ ದರಗಳು ₹ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ) — ಪ್ರಮುಖ ಕೃಷಿ ಮಾರುಕಟ್ಟೆಗಳಿಂದ ಪ್ರತಿದಿನ ನವೀಕರಿಸಲಾಗುತ್ತದೆ",

    // Hero
    hero_title: "ನಿಖರವಾಗಿ ಬೆಳೆಯಿರಿ. ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಗಳಿಸಿರಿ.",
    hero_sub: "ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು, ಬೆಳೆ ಬೇಡಿಕೆ ಮಾಹಿತಿ, ಮತ್ತು ಈ ಋತುವಿನಲ್ಲಿ ಸರಿಯಾದ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಲು ಸ್ಮಾರ್ಟ್ ಸಲಹೆ.",
    hero_btn_mandi: "📊 ಮಾರುಕಟ್ಟೆ ದರ ನೋಡಿ",
    hero_btn_best: "🏆 ಉತ್ತಮ ಬೆಳೆಗಳು",
    hero_crops_tracked: "ಬೆಳೆಗಳ ಮಾಹಿತಿ",
    hero_categories: "ವರ್ಗಗಳು",
    hero_days_data: "ದಿನಗಳ ಡೇಟಾ",

    // Sections
    section_recent: "🕒 ಇತ್ತೀಚೆಗೆ ನೋಡಿದ ಬೆಳೆಗಳು",
    section_recent_hint: "ಇತಿಹಾಸ ನೋಡಲು ಬೆಳೆ ಹುಡುಕಿ",
    section_best: "🏆 ಈ ಋತುವಿನಲ್ಲಿ ಬೆಳೆಯಲು ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು",
    section_best_sub: "ಲಾಭ + ಬೇಡಿಕೆ + ಕಡಿಮೆ ಅಪಾಯ ಆಧಾರದಲ್ಲಿ ಶ್ರೇಣೀಕೃತ",
    section_categories: "ವರ್ಗದ ಮೂಲಕ ನೋಡಿ",
    section_categories_sub: "ಎಲ್ಲ ಬೆಳೆ ಮತ್ತು ದರ ನೋಡಲು ವರ್ಗ ಆಯ್ಕೆ ಮಾಡಿ",

    // Mandi Page
    mandi_page_title: "📊 ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು",
    mandi_page_sub: "ಎಲ್ಲ ಬೆಳೆಗಳ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಇಂದಿನ ದರ — ಹೋಲಿಸಿ, ಫಿಲ್ಟರ್ ಮಾಡಿ",
    filter_search: "ಬೆಳೆ ಹುಡುಕಿ",
    filter_category: "ವರ್ಗ",
    filter_all_categories: "ಎಲ್ಲ ವರ್ಗಗಳು",
    filter_season: "ಋತು",
    filter_all_seasons: "ಎಲ್ಲ ಋತುಗಳು",
    filter_sort: "ವಿಂಗಡಿಸಿ",
    sort_price_high: "ದರ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ",
    sort_price_low: "ದರ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು",
    sort_name_az: "ಹೆಸರು A ಯಿಂದ Z",
    sort_trending_up: "ಏರುತ್ತಿರುವ ದರ ↑",
    sort_trending_down: "ಇಳಿಯುತ್ತಿರುವ ದರ ↓",
    sort_risk_low: "ಕಡಿಮೆ ಅಪಾಯ ಮೊದಲು",
    summary_total: "ಒಟ್ಟು ಬೆಳೆಗಳು",
    summary_rising: "ದರ ಏರಿಕೆ ↑",
    summary_stable: "ಸ್ಥಿರ ದರ ≈",
    summary_falling: "ದರ ಇಳಿಕೆ ↓",
    summary_avg: "ಸರಾಸರಿ ದರ / ಕ್ವಿಂಟಾಲ್",
    show_all: "ಎಲ್ಲ ತೋರಿಸಿ",
    show_less: "ಕಡಿಮೆ ತೋರಿಸಿ ↑",
    crops: "ಬೆಳೆಗಳು",
    live_price: "ಇಂದು",
    past_price: "ನಿನ್ನೆ",
    demand: "ಬೇಡಿಕೆ",
    risk: "ಅಪಾಯ",
    low_risk: "ಕಡಿಮೆ ಅಪಾಯ",
    medium_risk: "ಮಧ್ಯಮ ಅಪಾಯ",
    high_risk: "ಹೆಚ್ಚು ಅಪಾಯ",
    yearly_profit: "ವಾರ್ಷಿಕ",
    per_qtl: "/ಕ್ವಿಂ",

    // Crop Detail
    smart_rec: "ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸು",
    analyzing: "ಬೆಳೆ ಮಾಹಿತಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…",
    risk_level: "ಅಪಾಯ ಮಟ್ಟ",
    yearly_profit_label: "ವಾರ್ಷಿಕ ಲಾಭ",
    demand_score: "ಬೇಡಿಕೆ ಅಂಕ",
    smart_score: "ಸ್ಮಾರ್ಟ್ ಅಂಕ",
    price_trend_title: "📉 ದರ ಪ್ರವೃತ್ತಿ (₹ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್)",
    last_30_days: "ಕಳೆದ 30 ದಿನ",
    last_12_months: "12 ತಿಂಗಳು",
    seed_demand_title: "📦 ಬೀಜ ಬೇಡಿಕೆ — ಕಳೆದ 12 ತಿಂಗಳು (ಕೆಜಿ)",
    growing_guide: "🌱 ಬೆಳೆ ಮಾಹಿತಿ & ಬೆಳೆಸುವ ಮಾರ್ಗದರ್ಶಿ",
    avg_demand: "📦 ಸರಾಸರಿ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ",
    better_alternatives: "🔄 ಉತ್ತಮ ಪರ್ಯಾಯಗಳು",
    same_season: "ಉತ್ತಮ ಅಂಕ ಹೊಂದಿರುವ ಅದೇ ಋತುವಿನ ಬೆಳೆಗಳು",
    no_alternatives: "ಅದೇ ಋತುವಿನ ಪರ್ಯಾಯಗಳು ಸಿಗಲಿಲ್ಲ.",
    risk_analyzer: "📊 ಮುಂದುವರಿದ ಅಪಾಯ ವಿಶ್ಲೇಷಕ",
    risk_analyzer_sub: "ಡೇಟಾ ಆಧಾರಿತ ಮಾರುಕಟ್ಟೆ ಸ್ಥಿರತೆ ಮಾಹಿತಿ",
    pvi_label: "ದರ ಚಂಚಲತೆ ಸೂಚ್ಯಂಕ (PVI)",
    weather_risk_label: "ಋತು ಹವಾಮಾನ ಅಪಾಯ",
    market_sentiment: "ಮಾರುಕಟ್ಟೆ ಭಾವನೆ",
    season_label: "ಋತು",
    harvest_label: "ತಿಂಗಳು ಕೊಯ್ಲು",
    per_quintal: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ)",
    past_close: "ಹಿಂದಿನ ದರ",
    ideal_soil: "ಸೂಕ್ತ ಮಣ್ಣಿನ ವಿಧ",
    water_need: "ನೀರಿನ ಅಗತ್ಯ",
    row_spacing: "ಸಾಲಿನ ಅಂತರ",
    ideal_temp: "ಸೂಕ್ತ ತಾಪಮಾನ",
    prob: "% ಸಂಭಾವ್ಯತೆ",
    score_label: "/100 ಅಂಕ",
    highly_recommended: "ಅತ್ಯಂತ ಶಿಫಾರಸು",
    recommended: "ಶಿಫಾರಸು",
    grow_with_care: "ಎಚ್ಚರಿಕೆಯಿಂದ ಬೆಳೆಸಿ",
    high_risk_reward: "ಹೆಚ್ಚು ಅಪಾಯ — ಹೆಚ್ಚು ಲಾಭ",
    not_recommended: "ಶಿಫಾರಸು ಮಾಡಲ್ಲ",
    analysis_score: "ವಿಶ್ಲೇಷಣೆ ಅಂಕ",
    ma_label: "ಸರಾ ಚಲನ",
    price_label: "ದರ",
    day_short: "ದಿನ",

    // Recommendations
    rec_strong: "ಪ್ರಬಲ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ ಮತ್ತು ಅನುಕೂಲಕರ ದರ ಪ್ರವೃತ್ತಿ ಹೊಂದಿದೆ. ಈ ಋತುವಿನಲ್ಲಿ ಇದು ಅತ್ಯಂತ ಲಾಭದಾಯಕ ಆಯ್ಕೆ.",
    rec_steady: "ಸ್ಥಿರ ಬೇಡಿಕೆ ಹೊಂದಿದೆ. ಸಾಧಾರಣ ಆದರೆ ಸ್ಥಿರ ಆದಾಯ ನಿರೀಕ್ಷಿಸಿ.",
    rec_fluctuating: "ಚಂಚಲ ದರ ತೋರಿಸುತ್ತದೆ. ಹೆಚ್ಚು ಬಿತ್ತನೆ ಮೊದಲು ಅಪಾಯ ತಗ್ಗಿಸುವ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
    rec_high_risk: "ದರ ತೀವ್ರ ಏರಿಳಿತ ಅನುಭವಿಸುತ್ತದೆ. ಶೀತಲ ಸಂಗ್ರಹ ಅಥವಾ ಖರೀದಿದಾರ ಒಪ್ಪಂದ ಇದ್ದರೆ ಮಾತ್ರ ಬೆಳೆಸಿ.",
    rec_poor: "ಕಳಪೆ ಮಾರುಕಟ್ಟೆ ಭಾವನೆ ಮತ್ತು ಇಳಿಯುತ್ತಿರುವ ದರ. ಕೆಳಗೆ ತೋರಿಸಿದ ಉತ್ತಮ ಪರ್ಯಾಯ ಪರಿಗಣಿಸಿ.",

    // Contact
    contact_title: "📞 ಸಂಪರ್ಕಿಸಿ",
    contact_sub: "ಸಹಾಯ ಬೇಕೇ? ಭಾರತಾದ್ಯಂತ ರೈತರಿಗೆ ನೆರವಾಗಲು ತಂಡ ಸಿದ್ಧವಾಗಿದೆ.",
    helpline_title: "ರೈತ ಸಹಾಯ ಹಸ್ತ",
    helpline_note: "ಉಚಿತ • ಸೋಮ–ಶನಿ, ಬೆಳಗ್ಗೆ 8 – ಸಂಜೆ 6",
    whatsapp_title: "ವಾಟ್ಸ್ಆಪ್ ಬೆಂಬಲ",
    whatsapp_note: "ಇಂದಿನ ದರ ಪಡೆಯಲು ಬೆಳೆ ಹೆಸರು ಕಳುಹಿಸಿ",
    email_title: "ಇಮೇಲ್",
    email_note: "24 ಗಂಟೆಯಲ್ಲಿ ಉತ್ತರ",
    kisan_title: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್",
    kisan_note: "ಭಾರತ ಸರ್ಕಾರ • 24×7 ಉಚಿತ",
    nearest_mandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ",
    find_mandi: "enam.gov.in — ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ",

    // Footer
    footer_tagline: "ನೇರ ಬೆಳೆ ಮಾಹಿತಿ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸಿನ ಮೂಲಕ ರೈತರಿಗೆ ಅಧಿಕಾರ ನೀಡುವುದು.",
    footer_quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    footer_contact_details: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    footer_copy: "© 2025 ರೈತ ಬಂಧು — ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ನಿರ್ಧಾರ ವ್ಯವಸ್ಥೆ.",
    footer_note: "ಎಲ್ಲ ದರ ₹/ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ) • ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ",
    footer_helpline: "📞 ಸಹಾಯವಾಣಿ: 1800-123-4567",
    footer_whatsapp: "📱 ವಾಟ್ಸ್ಆಪ್: +91 98765 43210",
    footer_email: "✉️ help@raitha.in",
    footer_kisan: "🚨 ಕಿಸಾನ್ ಕಾಲ್: 1551 (24×7)",
    // States Served
    states_title: "ನಾವು ಭಾರತದಾದ್ಯಂತ ರೈತರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತೇವೆ.",
    states_list: "ಕರ್ನಾಟಕ | ಮಹಾರಾಷ್ಟ್ರ | ಪಂಜಾಬ್ | ಉತ್ತರ ಪ್ರದೇಶ | ಮಧ್ಯಪ್ರದೇಶ | ಗುಜರಾತ್ | ರಾಜಸ್ಥಾನ",

    // Active Season Widget
    active_season: "ಸಕ್ರಿಯ ಋತು",
    indian_agri: "ಭಾರತೀಯ ಕೃಷಿ",
    live_weather: "ನೇರ ಹವಾಮಾನ",
    central_india_weather: "ಮಧ್ಯ ಭಾರತ ಹವಾಮಾನ",
    season_kharif: "ಮುಂಗಾರು (ಖರೀಫ್)",
    season_rabi: "ಹಿಂಗಾರು (ರಬಿ)",
    season_zaid: "ಬೇಸಿಗೆ (ಜಾಯಿದ್)",

    // Map/Contact
    serve_states: "ನಾವು ಭಾರತದ ಎಲ್ಲಾ ರಾಜ್ಯಗಳ ರೈತರಿಗೆ ಸೇವೆ ನೀಡುತ್ತೇವೆ.",
    karnataka_states: "ಕರ್ನಾಟಕ | ಮಹಾರಾಷ್ಟ್ರ | ಪಂಜಾಬ್ | ಉತ್ತರ ಪ್ರದೇಶ | ಮಧ್ಯಪ್ರದೇಶ | ಗುಜರಾತ್ | ರಾಜಸ್ಥಾನ",
    empty_mandi: "ಬೆಳೆಗಳು ಸಿಗಲಿಲ್ಲ. ಫಿಲ್ಟರ್ ಬದಲಿಸಿ ಪ್ರಯತ್ನಿಸಿ.",
    live_prices_for: "ನೇರ ದರಗಳು",
  }
};

const MONTH_NAMES = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  kn: ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆ", "ಅಕ್ಟೋ", "ನವೆ", "ಡಿಸೆ"]
};

const FULL_MONTH_NAMES = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  kn: ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"]
};

function tDate(date, isFull = false) {
  const lang = getCurrentLang();
  const months = isFull ? FULL_MONTH_NAMES[lang] : MONTH_NAMES[lang];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  if (lang === "kn") {
    return `${day} ${month}, ${year}`;
  }
  return `${day} ${month} ${year}`;
}

// ─── CATEGORY NAMES ──────────────────────────────────────────
const CATEGORY_NAMES = {
  en: {
    Vegetable: "Vegetable", Fruit: "Fruit", Flower: "Flower",
    Grain: "Grain", Pulse: "Pulse", Oilseed: "Oilseed",
    "Cash Crop": "Cash Crop", Spice: "Spice", Medicinal: "Medicinal"
  },
  kn: {
    Vegetable: "ತರಕಾರಿ", Fruit: "ಹಣ್ಣು", Flower: "ಹೂವು",
    Grain: "ಧಾನ್ಯ", Pulse: "ಬೇಳೆಕಾಳು", Oilseed: "ಎಣ್ಣೆ ಬೀಜ",
    "Cash Crop": "ನಗದು ಬೆಳೆ", Spice: "ಮಸಾಲೆ", Medicinal: "ಔಷಧೀಯ"
  }
};

// ─── SEASON NAMES ─────────────────────────────────────────────
const SEASON_NAMES = {
  en: { Kharif: "Kharif", Rabi: "Rabi", Summer: "Summer", Winter: "Winter", Monsoon: "Monsoon", Zaid: "Zaid" },
  kn: { Kharif: "ಮುಂಗಾರು", Rabi: "ಹಿಂಗಾರು", Summer: "ಬೇಸಿಗೆ", Winter: "ಚಳಿಗಾಲ", Monsoon: "ಮಾನ್ಸೂನ್", Zaid: "ಜಾಯಿದ್" }
};

// ─── CROP NAME MAP ─────────────────────────────────────────────
const CROP_KANNADA_NAMES = {
  "veg-01": "ಟೊಮ್ಯಾಟೊ", "veg-02": "ಈರುಳ್ಳಿ", "veg-03": "ಆಲೂಗಡ್ಡೆ",
  "veg-04": "ಬದನೆ", "veg-05": "ಎಲೆಕೋಸು", "veg-06": "ಕ್ಯಾರೆಟ್",
  "veg-07": "ಹೂಕೋಸು", "veg-08": "ಪಾಲಕ್", "veg-09": "ಬಟಾಣಿ",
  "veg-10": "ಮೆಣಸಿನಕಾಯಿ", "veg-11": "ಕ್ಯಾಪ್ಸಿಕಂ", "veg-12": "ಸೌತೆಕಾಯಿ",
  "veg-13": "ಹಾಗಲಕಾಯಿ", "veg-14": "ಸೋರೆಕಾಯಿ", "veg-15": "ಕುಂಬಳಕಾಯಿ",
  "veg-16": "ಹೀರೆಕಾಯಿ", "veg-17": "ನುಗ್ಗೆ", "veg-18": "ಬೆಳ್ಳುಳ್ಳಿ",
  "veg-19": "ಶುಂಠಿ", "veg-20": "ಅರಿಶಿನ", "veg-21": "ಮೆಂತ್ಯ",
  "veg-22": "ಕೊತ್ತಂಬರಿ",
  "frt-01": "ಮಾವು", "frt-02": "ಬಾಳೆ", "frt-03": "ಪಪ್ಪಾಯ",
  "frt-04": "ಸೀಬೆ", "frt-05": "ದಾಳಿಂಬೆ", "frt-06": "ಕಲ್ಲಂಗಡಿ",
  "frt-07": "ಖರ್ಬೂಜ", "frt-08": "ದ್ರಾಕ್ಷಿ", "frt-09": "ಕಿತ್ತಳೆ",
  "frt-10": "ನಿಂಬೆ", "frt-11": "ಅನಾನಸ್", "frt-12": "ತೆಂಗು",
  "frt-13": "ಹಲಸು",
  "flw-01": "ಗುಲಾಬಿ", "flw-02": "ಚೆಂಡು ಹೂ", "flw-03": "ಮಲ್ಲಿಗೆ",
  "flw-04": "ತಾವರೆ", "flw-05": "ಸುಗಂಧರಾಜ", "flw-06": "ಶಿಲಿಭೃಂಗ",
  "grn-01": "ಅಕ್ಕಿ", "grn-02": "ಗೋಧಿ", "grn-03": "ಜೋಳ",
  "grn-04": "ಬಾರ್ಲಿ",
  "pls-01": "ಕಡಲೆ", "pls-02": "ಮಸೂರ", "pls-03": "ತೊಗರಿ",
  "med-01": "ಅಲೋವೆರ", "med-02": "ಅಶ್ವಗಂಧ", "med-03": "ತುಳಸಿ",
  "med-04": "ನಿಂಬೆ ಹುಲ್ಲು", "med-05": "ಪುದೀನ",
  "oil-01": "ಕಡಲೆಕಾಯಿ", "oil-02": "ಸಾಸಿವೆ",
  "spc-01": "ಜೀರಿಗೆ", "spc-04": "ಏಲಕ್ಕಿ", "spc-05": "ಕಾಳುಮೆಣಸು",
  "spc-06": "ಲವಂಗ", "spc-07": "ಕುಂಕುಮ ಕೇಸರಿ",
  "csh-01": "ಕಬ್ಬು", "csh-02": "ಹತ್ತಿ", "csh-03": "ಸೆಣಬು"
};

// ─── APPLY LANGUAGE TO PAGE ────────────────────────────────────
function applyLanguage() {
  const lang = getCurrentLang();

  // Update lang toggle button
  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.textContent = lang === "en" ? "ಕನ್ನಡ" : "English";
    btn.title = lang === "en" ? "Switch to Kannada" : "ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಿಸಿ";
  }

  // Swap header brand name
  document.querySelectorAll(".brand-name").forEach(el => {
    el.textContent = t("app_name");
  });

  // Swap splash titles
  const splashTitles = document.querySelectorAll(".splash-title");
  if (splashTitles.length >= 2) {
    splashTitles[0].textContent = t("welcome_to");
    splashTitles[1].textContent = t("splash_name");
  } else if (splashTitles.length === 1) {
    splashTitles[0].textContent = t("splash_name");
  }

  // Apply data-i18n text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.textContent = val;
  });

  // Apply data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(key);
    if (val) el.placeholder = val;
  });

  // Apply data-i18n-html
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    const val = t(key);
    if (val) el.innerHTML = val;
  });
}

// Auto apply on load
document.addEventListener("DOMContentLoaded", applyLanguage);
