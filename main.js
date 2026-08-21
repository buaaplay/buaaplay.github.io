(function () {
  /* ---------- i18n ---------- */
  var zh = {
    'nav-about': '关于',
    'nav-pubs': '论文',
    'nav-exp': '经历',
    'hero-kicker': '北京航空航天大学 · 硕士研究生',
    'hero-lede1': '我是北京航空航天大学人工智能学院 <a href="https://colalab.net" rel="noopener">CoLab 实验室</a>的硕士研究生，导师为刘偲教授。',
    'hero-lede2': '我的研究关注多模态模型如何<em>跟上不断展开的世界</em>：在连续视频流中持续维护并更新内部世界状态，在长时程视觉证据上进行不丢失视觉接地的推理。我为流式与长视频理解构建评测基准与推理智能体。',
    'news-title': '动态',
    'news-1': 'SVCBench 被 <strong>ECCV 2026</strong> 接收。',
    'news-2': 'OVO-S-Bench 与 TRACE 被 <strong>EMNLP 2026</strong> 主会接收。',
    'pubs-title': '论文',
    'pubs-note': '* 表示共同一作。',
    'svc-desc': '将"计数"重新定位为最小、确定性可验证的诊断探针，度量模型在视频播放过程中对世界状态的维护能力。406 个视频、1,000 条流式问答、4,576 个时间线查询点覆盖 8 类子任务，揭示当前多模态大模型在周期性事件计数等长时序状态维护任务上近乎失效。',
    'ovos-venue': 'EMNLP 2026',
    'ovos-desc': '约束模型在查询时刻仅能看到该时刻之前的视频前缀，沿"瞬时第一人称感知 → 时空情境追踪 → 空间模拟推理 → 全局拓扑建图"四个层级评测流式空间智能。全局拓扑建图是最大瓶颈，顶尖模型显著落后于人类。',
    'trace-venue': 'EMNLP 2026',
    'trace-desc': '一个让推理全程锚定在原始视频片段而非文本摘要上的长视频推理智能体。证据被组织为锚定的增长轨迹，轨迹协调器依据答案收敛性自适应决定何时停止，解决长时程推理"何时停止"的难题。同时发布证据覆盖审计基准 VES-Bench。',
    'link-project': '项目主页',
    'link-code': '代码',
    'exp-title': '经历',
    'exp-colab-when': '2025.09 - 至今',
    'exp-colab-name': '北京航空航天大学人工智能学院 <a href="https://colalab.net" rel="noopener">CoLab 实验室</a>',
    'exp-colab-role': '硕士研究生',
    'exp-shai-name': '上海人工智能实验室',
    'exp-role-intern': '算法研究实习生',
    'exp-mt-name': '美团',
    'exp-role-intern2': '算法研究实习生',
    'exp-bs-when': '2021.09 - 2025.07',
    'exp-bs-name': '北京航空航天大学',
    'exp-bs-role': '本科 · 自动化（模式识别方向）',
    'footer': '刘彭逸昂 · 北京航空航天大学人工智能学院 <a href="https://colalab.net" rel="noopener">CoLab 实验室</a>'
  };

  var enCache = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    enCache[el.getAttribute('data-i18n')] = el.innerHTML;
  });

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var html = lang === 'zh' ? zh[key] : enCache[key];
      if (html !== undefined) el.innerHTML = html;
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';
    document.body.classList.toggle('lang-zh', lang === 'zh');
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  var lang = (urlLang === 'zh' || urlLang === 'en') ? urlLang : (saved || 'en');
  if (lang === 'zh') applyLang('zh');

  var toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      lang = lang === 'zh' ? 'en' : 'zh';
      applyLang(lang);
    });
  }

  /* ---------- motion ---------- */
  function revealAll() {
    document.querySelectorAll('[data-anim]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    revealAll();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-anim]').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      }
    });
  });

  // Safety net: anything still hidden after load becomes visible.
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        }
      });
    }, 1200);
  });
})();
