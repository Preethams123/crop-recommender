// ─── CROP DETAIL PAGE ───────────────────────────────────────────

let priceChart = null;
let demandChart = null;
let currentCrop = null;
let showing30 = true;

document.addEventListener("DOMContentLoaded", () => {
  initSearch();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.querySelector(".detail-layout").innerHTML =
      `<div class="empty-state" style="margin:60px auto"><div class="empty-icon">❌</div><p>No crop selected. <a href="index.html" style="color:var(--green)">Go back to Home</a></p></div>`;
    return;
  }

  const crop = getCropById(id);
  if (!crop) {
    document.querySelector(".detail-layout").innerHTML =
      `<div class="empty-state" style="margin:60px auto"><div class="empty-icon">❌</div><p>Crop not found. <a href="index.html" style="color:var(--green)">Go back to Home</a></p></div>`;
    return;
  }

  currentCrop = crop;
  saveRecentCrop(crop.id);
  
  // Apply Background Image to Hero
  const heroEl = document.querySelector(".detail-hero");
  if(heroEl) {
    heroEl.style.backgroundImage = `url('${getCropImageUrl(crop.name)}')`;
  }

  renderCropDetail(crop);
  renderCharts(crop, true);
  renderCropInfo(crop);
  renderRecommendation(crop);
  renderAdvancedRisk(crop);
  renderAlternatives(crop);

  // Chart tab toggle
  document.getElementById("tab30").addEventListener("click", () => {
    if (showing30) return;
    showing30 = true;
    document.getElementById("tab30").classList.add("active");
    document.getElementById("tab12").classList.remove("active");
    renderCharts(crop, true);
  });

  document.getElementById("tab12").addEventListener("click", () => {
    if (!showing30) return;
    showing30 = false;
    document.getElementById("tab12").classList.add("active");
    document.getElementById("tab30").classList.remove("active");
    renderCharts(crop, false);
  });
});

// ─── CROP HERO ───────────────────────────────────────────────────

function renderCropDetail(crop) {
  const appName = t('app_name');
  document.title = `${cropName(crop)} — ${appName}`;
  const pt = document.getElementById("pageTitle");
  if (pt) pt.textContent = `${cropName(crop)} — ${appName}`;

  document.getElementById("cropIcon").innerHTML = categoryIcon(crop.category);
  document.getElementById("cropName").textContent = cropName(crop);
  document.getElementById("cropCat").textContent = `${categoryName(crop.category)}`;
  document.getElementById("cropSeason").textContent = `🌤 ${seasonName(crop.season)} ${t('season_label')}`;
  document.getElementById("cropHarvest").textContent = `⏱ ${crop.harvestTimeMonth} ${t('harvest_label')}`;

  const diff = crop.todayPrice - crop.yesterdayPrice;
  const pct = ((diff / crop.yesterdayPrice) * 100).toFixed(1);
  const trend = trendArrow(crop);

  const tDateObj = new Date();
  const yDateObj = new Date(tDateObj);
  yDateObj.setDate(yDateObj.getDate() - 1);
  const tStr = tDate(tDateObj);
  const yStr = tDate(yDateObj);

  document.getElementById("cropToday").innerHTML = `₹${crop.todayPrice.toLocaleString()}`;
  
  // Note: Finding elements related to the label. If there's a label "per quintal", we are fine keeping it.
  // The 'dh-yesterday' had text "Yesterday: ₹...", so we just change that text.
  const vsLabel = getCurrentLang() === 'kn' ? 'ಗೆ ಹೋಲಿಸಿದರೆ' : 'vs';
  document.getElementById("cropChange").innerHTML = `
    <span class="${trend.cls}">
      ${trend.arrow} ₹${Math.abs(diff).toLocaleString()} (${Math.abs(pct)}%) ${vsLabel} ${yStr}
    </span>
  `;
  document.getElementById("cropYesterday").textContent =
    `${t('past_close')} (${yStr}): ₹${crop.yesterdayPrice.toLocaleString()}`;

  // ── Metrics ─────────────────────────────────────────────────
  const risk    = calculateRisk(crop);
  const profit  = calculateProfit(crop);
  const score   = calculateScore(crop);

  // Risk
  const riskEl = document.getElementById("riskVal");
  riskEl.textContent = t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk');
  riskEl.className = `metric-val ${
    risk === "Low" ? "up" : risk === "High" ? "down" : ""
  }`;
  // Highlight card border
  const riskCard = document.getElementById("riskCard");
  if (risk === "Low")    riskCard.style.borderTop = "4px solid #4caf50";
  if (risk === "Medium") riskCard.style.borderTop = "4px solid #ff9800";
  if (risk === "High")   riskCard.style.borderTop = "4px solid #f44336";

  // Profit
  const profitEl = document.getElementById("profitVal");
  profitEl.textContent = `${profit >= 0 ? "+" : ""}${profit.toFixed(1)}%`;
  profitEl.className = `metric-val ${profit >= 0 ? "profit-pos" : "profit-neg"}`;

  // Demand
  document.getElementById("demandVal").textContent = `${crop.demandScore}/100`;

  // Score
  document.getElementById("scoreVal").textContent = `${Math.round(score)}`;

  // Seed bar
  const avgSeed = Math.round(crop.seedSold.reduce((a, b) => a + b, 0) / 12);
  const seedUnit = getCurrentLang() === "kn" ? "ಕೆಜಿ/ತಿಂಗಳು" : "Kg/month";
  document.getElementById("seedStat").textContent = `${avgSeed.toLocaleString()} ${seedUnit}`;
  const seedPct = Math.min(100, (avgSeed / 600) * 100);
  document.getElementById("seedBar").style.width = seedPct + "%";
}

// ─── ADVANCED RISK ────────────────────────────────────────────────

function renderAdvancedRisk(crop) {
  const pviVal = Math.round(crop.priceStdDev || 0);
  const pviEl = document.getElementById("pviVal");
  pviEl.textContent = pviVal > 0 ? `±₹${pviVal.toLocaleString()} (PVI)` : "—";
  
  // Animate PVI Bar (Ratio to base price)
  const pviPct = Math.min(100, (pviVal / (crop.basePrice || 1000)) * 200);
  document.getElementById("pviBar").style.width = pviPct + "%";
  
  const wRisk = crop.weatherRisk || 0;
  const wRiskEl = document.getElementById("weatherRiskVal");
  const probLabel = getCurrentLang() === "kn" ? "% ಸಂಭಾವ್ಯತೆ" : "% Probability";
  wRiskEl.textContent = `${wRisk}${probLabel}`;
  document.getElementById("weatherRiskBar").style.width = wRisk + "%";

  const sent = crop.sentimentScore || 0;
  const sentEl = document.getElementById("sentimentVal");
  const scoreLabel = getCurrentLang() === "kn" ? "/100 ಅಂಕ" : "/100 Score";
  sentEl.textContent = `${sent}${scoreLabel}`;
  document.getElementById("sentimentBar").style.width = sent + "%";
}


// ─── CROP INSIGHTS ───────────────────────────────────────────────

function renderCropInfo(crop) {
  const textEl = document.getElementById("cropInfoText");
  const gridEl = document.getElementById("cropInfoGrid");
  
  if (!textEl || !gridEl) return;

  const isKn = getCurrentLang() === "kn";

  const seasonDescEn = {
    "Kharif": "the monsoon season, requiring excellent drainage to prevent waterlogging",
    "Rabi": "the dry winter season, relying on healthy irrigation reserves",
    "Summer": "the hot summer months, where strict soil moisture management is critical",
    "Winter": "the cool winter months, ideal for slow and robust maturation"
  };
  const seasonDescKn = {
    "Kharif": "ಮುಂಗಾರು ಋತು, ಉತ್ತಮ ಒಳಚರಂಡಿ ಅಗತ್ಯ",
    "Rabi": "ಹಿಂಗಾರು ಋತು, ನೀರಾವರಿ ಅಗತ್ಯ",
    "Summer": "ಬಿಸಿ ಬೇಸಿಗೆ, ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿರ್ವಹಣೆ ಅಗತ್ಯ",
    "Winter": "ತಂಪಾದ ಚಳಿಗಾಲ, ನಿಧಾನ ಮಾಗುವಿಕೆಗೆ ಸೂಕ್ತ"
  };

  if (isKn) {
    const desc = `${cropName(crop)} ಒಂದು ಹೆಚ್ಚು ಬೇಡಿಕೆಯ ${categoryName(crop.category).toLowerCase()} ಆಗಿದ್ದು, ${seasonDescKn[crop.season] || 'ಸ್ಥಳೀಯ ಋತು'}ದಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ. ಸಾಮಾನ್ಯವಾಗಿ ಕೊಯ್ಲಿಗೆ ಸರಿಸುಮಾರು ${crop.harvestTimeMonth} ತಿಂಗಳು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ನೆಡುವ ಮೊದಲು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`;
    textEl.textContent = desc;
  } else {
    const desc = `${crop.name} is a highly demanded ${crop.category.toLowerCase()} typically cultivated during ${seasonDescEn[crop.season] || 'the local season'}. It takes approximately ${crop.harvestTimeMonth} months to mature and yield for harvest. Farmers should ensure robust soil health before planting.`;
    textEl.textContent = desc;
  }

  const soilMapEn = {
    "Vegetable": "Sandy Loam", "Fruit": "Well-Drained Loamy",
    "Flower": "Rich Organic", "Grain": "Clay Loam",
    "Pulse": "Dry Sandy", "Oilseed": "Alluvial",
    "Cash Crop": "Deep Black Soil", "Spice": "Laterite", "Medicinal": "Well-Drained Sandy"
  };
  const soilMapKn = {
    "Vegetable": "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು", "Fruit": "ಉತ್ತಮ ಒಳಚರಂಡಿ",
    "Flower": "ಸಾವಯವ ಮಣ್ಣು", "Grain": "ಜೇಡಿ ಮಣ್ಣು",
    "Pulse": "ಒಣ ಮರಳು ಮಣ್ಣು", "Oilseed": "ಮೆಕ್ಕಲು ಮಣ್ಣು",
    "Cash Crop": "ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣು", "Spice": "ಲ್ಯಾಟರೈಟ್", "Medicinal": "ಒಳ್ಳೆ ಒಳಚರಂಡಿ ಮರಳು"
  };
  const waterMapEn = {
    "Kharif": "High (Rainfed)", "Rabi": "Moderate (Irrigate)", "Summer": "Very High", "Winter": "Low to Moderate"
  };
  const waterMapKn = {
    "Kharif": "ಹೆಚ್ಚು (ಮಳೆ ಆಧಾರಿತ)", "Rabi": "ಮಧ್ಯಮ (ನೀರಾವರಿ)", "Summer": "ಅತ್ಯಧಿಕ", "Winter": "ಕಡಿಮೆ ಇಂದ ಮಧ್ಯಮ"
  };

  const soil = isKn ? (soilMapKn[crop.category] || "ಸಾಮಾನ್ಯ ಮಣ್ಣು") : (soilMapEn[crop.category] || "Standard Loam");
  const water = isKn ? (waterMapKn[crop.season] || "ಮಧ್ಯಮ") : (waterMapEn[crop.season] || "Moderate");
  const spacing = (Math.floor(Math.random() * 3) + 2) * 10 + " cm";
  const temp = crop.season === "Winter" ? "15°C - 25°C" : "25°C - 35°C";

  const lSoil = t("ideal_soil");
  const lWater = t("water_need");
  const lSpacing = t("row_spacing");
  const lTemp = t("ideal_temp");

  gridEl.innerHTML = `
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lSoil}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${soil}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lWater}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${water}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lSpacing}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${spacing}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lTemp}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${temp}</div>
    </div>
  `;
}

// ─── CHARTS ──────────────────────────────────────────────────────

function renderCharts(crop, show30) {
  renderPriceChart(crop, show30);
  renderDemandChart(crop);
}

// Helper to calculate simple moving average
function calculateSMA(data, windowSize) {
  let ma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      ma.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < windowSize; j++) {
        sum += data[i - j];
      }
      ma.push(sum / windowSize);
    }
  }
  return ma;
}

function renderPriceChart(crop, show30) {
  const ctx = document.getElementById("priceChart").getContext("2d");

  const isKn = getCurrentLang() === "kn";
  const labels = show30
    ? Array.from({ length: 30 }, (_, i) => isKn ? `ದಿನ ${i + 1}` : `Day ${i + 1}`)
    : (isKn
      ? ["ಜನ","ಫೆಬ್","ಮಾರ್","ಏಪ್ರಿ","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗ","ಸೆಪ್ಟೆ","ಅಕ್ಟೋ","ನವೆ","ಡಿಸೆ"]
      : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);

  const data = show30 ? crop.prices30Days : crop.prices;
  
  // Calculate Moving Average (3 day window for 30d, 2 month window for 12m)
  const maWindow = show30 ? 5 : 2; 
  const maData = calculateSMA(data, maWindow);

  const startPrice = data[0];
  const endPrice = data[data.length - 1];
  const isOverallUp = endPrice >= startPrice;
  
  // Create beautiful gradient based on overall trend
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  if (isOverallUp) {
    gradientFill.addColorStop(0, "rgba(76, 175, 80, 0.4)");
    gradientFill.addColorStop(1, "rgba(76, 175, 80, 0.0)");
  } else {
    gradientFill.addColorStop(0, "rgba(244, 67, 54, 0.4)");
    gradientFill.addColorStop(1, "rgba(244, 67, 54, 0.0)");
  }

  if (priceChart) priceChart.destroy();

  priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${show30 ? (isKn ? '5-ದಿನ ಸ.ಚ.ಸ' : '5-Day MA') : (isKn ? '2-ತಿಂಗಳ ಸ.ಚ.ಸ' : '2-Month MA')}`,
          data: maData,
          borderColor: "rgba(255, 255, 255, 0.4)", // White dashed for MA
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
          tension: 0.4
        },
        {
          label: `${cropName(crop)} (₹/${isKn ? 'ಕ್ವಿಂಟಾಲ್' : 'quintal'})`,
          data,
          segment: {
            borderColor: ctx => ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4caf50' : '#f44336'
          },
          backgroundColor: gradientFill,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: show30 ? 0 : 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#ffffff",
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: true, position: 'top', labels: { boxWidth: 10, usePointStyle: true } },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#ffffff",
          bodyColor: "#dddddd",
          callbacks: {
            label: ctx => {
               const maLabel = t('ma_label');
               const priceLabel = t('price_label');
               if (ctx.datasetIndex === 0) return `${maLabel}: ₹${ctx.raw ? ctx.raw.toFixed(0).toLocaleString() : '-'}`;
               return `${priceLabel}: ₹${ctx.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#f0f0f0", drawBorder: false },
          ticks: { color: "#666", font: { size: 12 }, maxTicksLimit: show30 ? 10 : 12 }
        },
        y: {
          grid: { color: "#f0f0f0", drawBorder: false },
          ticks: {
            color: "#666",
            font: { size: 12 },
            callback: v => "₹" + (v >= 1000 ? (v/1000).toFixed(1)+"k" : v)
          }
        }
      }
    }
  });
}

function renderDemandChart(crop) {
  const ctx = document.getElementById("demandChart").getContext("2d");
  const isKn = getCurrentLang() === "kn";
  const months = isKn ? MONTH_NAMES.kn : MONTH_NAMES.en;

  if (demandChart) demandChart.destroy();

  demandChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [{
        label: isKn ? "ಮಾರಾಟವಾದ ಬೀಜ (ಕೆಜಿ)" : "Kg of Seed Sold",
        data: crop.seedSold,
        backgroundColor: "rgba(46,125,50,0.65)",
        borderColor: "#2e7d32",
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#ffffff",
          bodyColor: "#dddddd",
          callbacks: {
            label: ctx => `${ctx.raw.toLocaleString()} ${isKn ? 'ಕೆಜಿ ಸ್ಥಳೀಯವಾಗಿ ಮಾರಾಟವಾಗಿದೆ' : 'Kg sold locally'}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#666", font: { size: 12 } }
        },
        y: {
          grid: { color: "#f0f0f0", drawBorder: false },
          ticks: { color: "#666", font: { size: 12 } }
        }
      }
    }
  });
}

// ─── RECOMMENDATION ──────────────────────────────────────────────

function renderRecommendation(crop) {
  const risk   = calculateRisk(crop);
  const profit = calculateProfit(crop);
  const score  = calculateScore(crop);

  const recBox      = document.getElementById("recBox");
  const recIcon     = document.getElementById("recIcon");
  const recText     = document.getElementById("recText");
  const recDecision = document.getElementById("recDecision");

  let icon, text, decision, decisionClass;

  if (risk === "High") {
    icon = "⚠️";
    decisionClass = "rec-risk";
    decision = t('high_risk_reward');
    text = `${cropName(crop)} ${t('rec_high_risk')}`;
  } else if (Math.round(score) > 130) {
    icon = "✅";
    decisionClass = "rec-go";
    decision = t('highly_recommended');
    text = `${cropName(crop)} ${t('rec_strong')}`;
  } else if (Math.round(score) > 100) {
    icon = "👍";
    decisionClass = "rec-go";
    decision = t('recommended');
    text = `${cropName(crop)} ${t('rec_steady')}`;
  } else if (Math.round(score) > 75) {
    icon = "⚡";
    decisionClass = "rec-caution";
    decision = t('grow_with_care');
    text = `${cropName(crop)} ${t('rec_fluctuating')} (PVI: ±₹${Math.round(crop.priceStdDev)})`;
  } else {
    icon = "❌";
    decisionClass = "rec-risk";
    decision = t('not_recommended');
    text = `${cropName(crop)} ${t('rec_poor')}`;
  }

  recIcon.textContent = icon;
  recText.textContent = text;
  recBox.className = "rec-box " + decisionClass;

  recDecision.innerHTML = `
    <span class="rec-badge">${decision}</span>
    <span class="rec-score">${t('analysis_score')}: ${Math.round(score)}</span>
  `;
}

// ─── ALTERNATIVES ─────────────────────────────────────────────────

function renderAlternatives(crop) {
  const list = document.getElementById("altList");
  if (!list) return;

  const alts = getAlternatives(crop);

  if (alts.length === 0) {
    list.innerHTML = `<p style="color:#777;font-size:14px">${t('no_alternatives')}</p>`;
    return;
  }

  list.innerHTML = "";

  alts.forEach((alt, i) => {
    const risk  = calculateRisk(alt);
    const trend = trendArrow(alt);

    const div = document.createElement("div");
    div.className = "alt-item";
    div.setAttribute("data-id", alt.id);

    div.innerHTML = `
      <div class="alt-rank">#${i + 1}</div>
      <div class="alt-icon">${categoryIcon(alt.category)}</div>
      <div class="alt-info">
        <div class="alt-name">${cropName(alt)}</div>
        <div class="alt-cat">${categoryName(alt.category)} · ${seasonName(alt.season)}</div>
      </div>
      <div class="alt-right">
        <div class="alt-price">₹${alt.todayPrice.toLocaleString()}</div>
        <div class="alt-price-unit">${t('per_qtl')}</div>
        <div class="alt-trend ${trend.cls}">${trend.arrow}</div>
        <span class="risk-badge ${riskClass(risk)}" style="font-size:11px">${t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk')}</span>
      </div>
    `;

    div.addEventListener("click", () => {
      saveRecentCrop(alt.id);
      window.location.href = `crop.html?id=${alt.id}`;
    });

    list.appendChild(div);
  });
}