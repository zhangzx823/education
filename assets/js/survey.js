/**
 * 2026高考志愿智能匹配系统 - 核心脚本 v2.0
 * 包含：知识模块、问卷交互、匹配算法、图表生成、统计功能
 */

// ==================== 数据定义 ====================

// 城市数据库
const CITIES = {
    beijing: { name: '北京', tier: 'mega', region: 'north', industries: ['tech', 'finance', 'media', 'education'], 
               jobScore: 95, salaryScore: 95, costScore: 30, hukouScore: 25, climateScore: 50, cultureScore: 95 },
    shanghai: { name: '上海', tier: 'mega', region: 'east', industries: ['finance', 'tech', 'trade', 'biotech'],
               jobScore: 95, salaryScore: 95, costScore: 30, hukouScore: 40, climateScore: 55, cultureScore: 90 },
    guangzhou: { name: '广州', tier: 'mega', region: 'south', industries: ['trade', 'tech', 'manufacturing'],
               jobScore: 85, salaryScore: 80, costScore: 45, hukouScore: 50, climateScore: 60, cultureScore: 80 },
    shenzhen: { name: '深圳', tier: 'mega', region: 'south', industries: ['tech', 'finance', 'hardware'],
               jobScore: 92, salaryScore: 92, costScore: 28, hukouScore: 60, climateScore: 65, cultureScore: 70 },
    hangzhou: { name: '杭州', tier: 'large', region: 'east', industries: ['tech', 'ecommerce', 'finance'],
               jobScore: 85, salaryScore: 82, costScore: 50, hukouScore: 65, climateScore: 70, cultureScore: 88 },
    nanjing: { name: '南京', tier: 'large', region: 'east', industries: ['education', 'tech', 'manufacturing'],
               jobScore: 75, salaryScore: 72, costScore: 60, hukouScore: 70, climateScore: 55, cultureScore: 90 },
    wuhan: { name: '武汉', tier: 'large', region: 'central', industries: ['education', 'tech', 'manufacturing'],
               jobScore: 72, salaryScore: 65, costScore: 70, hukouScore: 75, climateScore: 45, cultureScore: 80 },
    chengdu: { name: '成都', tier: 'large', region: 'west', industries: ['tech', 'gaming', 'biotech'],
               jobScore: 78, salaryScore: 68, costScore: 65, hukouScore: 80, climateScore: 70, cultureScore: 88 },
    xian: { name: '西安', tier: 'large', region: 'west', industries: ['aerospace', 'education', 'tech'],
               jobScore: 65, salaryScore: 58, costScore: 75, hukouScore: 82, climateScore: 55, cultureScore: 92 },
    chongqing: { name: '重庆', tier: 'large', region: 'west', industries: ['manufacturing', 'auto', 'tech'],
               jobScore: 68, salaryScore: 60, costScore: 72, hukouScore: 85, climateScore: 50, cultureScore: 78 },
    suzhou: { name: '苏州', tier: 'large', region: 'east', industries: ['manufacturing', 'biotech', 'chip'],
               jobScore: 80, salaryScore: 78, costScore: 55, hukouScore: 68, climateScore: 68, cultureScore: 85 },
    tianjin: { name: '天津', tier: 'large', region: 'north', industries: ['manufacturing', 'port', 'aerospace'],
               jobScore: 65, salaryScore: 62, costScore: 60, hukouScore: 72, climateScore: 50, cultureScore: 75 },
    changsha: { name: '长沙', tier: 'medium', region: 'central', industries: ['media', 'manufacturing'],
               jobScore: 62, salaryScore: 55, costScore: 78, hukouScore: 88, climateScore: 52, cultureScore: 75 },
    zhengzhou: { name: '郑州', tier: 'medium', region: 'central', industries: ['logistics', 'manufacturing'],
               jobScore: 58, salaryScore: 52, costScore: 80, hukouScore: 88, climateScore: 55, cultureScore: 65 },
    qingdao: { name: '青岛', tier: 'medium', region: 'east', industries: ['port', 'manufacturing', 'tourism'],
               jobScore: 62, salaryScore: 58, costScore: 65, hukouScore: 75, climateScore: 80, cultureScore: 72 },
    hefei: { name: '合肥', tier: 'medium', region: 'east', industries: ['tech', 'chip', 'manufacturing'],
               jobScore: 65, salaryScore: 58, costScore: 75, hukouScore: 85, climateScore: 55, cultureScore: 65 },
    xiamen: { name: '厦门', tier: 'medium', region: 'south', industries: ['tourism', 'tech', 'trade'],
               jobScore: 60, salaryScore: 62, costScore: 50, hukouScore: 55, climateScore: 90, cultureScore: 80 },
    dalian: { name: '大连', tier: 'medium', region: 'north', industries: ['software', 'port', 'tourism'],
               jobScore: 55, salaryScore: 52, costScore: 65, hukouScore: 72, climateScore: 78, cultureScore: 68 },
    ningbo: { name: '宁波', tier: 'medium', region: 'east', industries: ['port', 'manufacturing', 'trade'],
               jobScore: 68, salaryScore: 70, costScore: 58, hukouScore: 70, climateScore: 72, cultureScore: 65 },
    dongguan: { name: '东莞', tier: 'medium', region: 'south', industries: ['manufacturing', 'hardware'],
               jobScore: 70, salaryScore: 68, costScore: 60, hukouScore: 82, climateScore: 60, cultureScore: 55 }
};

// 专业数据库
const MAJORS = {
    cs: { name: '计算机科学与技术', category: '工学', traits: ['analytical', 'practical'], 
          interests: ['tech'], subjects: ['math', 'physics'], industries: ['ai', 'chip', 'fintech'], heat: 5 },
    software: { name: '软件工程', category: '工学', traits: ['analytical', 'practical'], 
          interests: ['tech'], subjects: ['math'], industries: ['ai', 'fintech'], heat: 5 },
    ai: { name: '人工智能', category: '工学', traits: ['analytical', 'research'], 
          interests: ['tech'], subjects: ['math', 'physics'], industries: ['ai', 'robot'], heat: 5 },
    ee: { name: '电子信息工程', category: '工学', traits: ['analytical', 'practical'], 
          interests: ['tech', 'engineering'], subjects: ['math', 'physics'], industries: ['chip', 'ev'], heat: 4 },
    automation: { name: '自动化', category: '工学', traits: ['analytical', 'practical'], 
          interests: ['tech', 'engineering'], subjects: ['math', 'physics'], industries: ['robot', 'ev'], heat: 4 },
    me: { name: '机械工程', category: '工学', traits: ['practical', 'organized'], 
          interests: ['engineering'], subjects: ['math', 'physics'], industries: ['robot', 'ev'], heat: 3 },
    vehicle: { name: '车辆工程', category: '工学', traits: ['practical', 'analytical'], 
          interests: ['engineering'], subjects: ['physics', 'math'], industries: ['ev'], heat: 4 },
    materials: { name: '材料科学与工程', category: '工学', traits: ['research', 'practical'], 
          interests: ['nature', 'engineering'], subjects: ['physics', 'chemistry'], industries: ['chip', 'new_energy'], heat: 3 },
    electrical: { name: '电气工程及其自动化', category: '工学', traits: ['practical', 'analytical'], 
          interests: ['engineering'], subjects: ['physics', 'math'], industries: ['new_energy'], heat: 4 },
    biomedical_eng: { name: '生物医学工程', category: '工学', traits: ['research', 'caring'], 
          interests: ['medicine', 'tech'], subjects: ['biology', 'physics'], industries: ['biotech', 'healthcare'], heat: 3 },
    aerospace: { name: '航空航天工程', category: '工学', traits: ['analytical', 'research'], 
          interests: ['engineering'], subjects: ['math', 'physics'], industries: ['aerospace'], heat: 4 },
    civil: { name: '土木工程', category: '工学', traits: ['practical', 'organized'], 
          interests: ['engineering'], subjects: ['math', 'physics'], industries: [], heat: 2 },
    architecture: { name: '建筑学', category: '工学', traits: ['creative', 'practical'], 
          interests: ['art', 'engineering'], subjects: ['math'], industries: [], heat: 2 },
    
    math: { name: '数学与应用数学', category: '理学', traits: ['analytical', 'research'], 
          interests: ['tech'], subjects: ['math'], industries: ['ai', 'fintech'], heat: 3 },
    physics: { name: '物理学', category: '理学', traits: ['analytical', 'research'], 
          interests: ['nature'], subjects: ['physics', 'math'], industries: ['chip', 'new_energy'], heat: 3 },
    chemistry: { name: '化学', category: '理学', traits: ['research', 'practical'], 
          interests: ['nature'], subjects: ['chemistry'], industries: ['biotech', 'new_energy'], heat: 2 },
    biology: { name: '生物科学', category: '理学', traits: ['research', 'caring'], 
          interests: ['nature', 'medicine'], subjects: ['biology', 'chemistry'], industries: ['biotech'], heat: 3 },
    statistics: { name: '统计学', category: '理学', traits: ['analytical', 'organized'], 
          interests: ['tech', 'finance'], subjects: ['math'], industries: ['ai', 'fintech'], heat: 4 },
    
    clinical: { name: '临床医学', category: '医学', traits: ['caring', 'research', 'organized'], 
          interests: ['medicine'], subjects: ['biology', 'chemistry'], industries: ['healthcare'], heat: 4 },
    stomatology: { name: '口腔医学', category: '医学', traits: ['caring', 'practical'], 
          interests: ['medicine'], subjects: ['biology'], industries: ['healthcare'], heat: 4 },
    pharmacy: { name: '药学', category: '医学', traits: ['research', 'organized'], 
          interests: ['medicine', 'nature'], subjects: ['chemistry', 'biology'], industries: ['biotech'], heat: 3 },
    nursing: { name: '护理学', category: '医学', traits: ['caring', 'social'], 
          interests: ['medicine'], subjects: ['biology'], industries: ['healthcare'], heat: 3 },
    
    economics: { name: '经济学', category: '经济学', traits: ['analytical', 'social'], 
          interests: ['finance'], subjects: ['math'], industries: ['fintech'], heat: 3 },
    finance: { name: '金融学', category: '经济学', traits: ['analytical', 'leadership'], 
          interests: ['finance'], subjects: ['math'], industries: ['fintech'], heat: 3 },
    accounting: { name: '会计学', category: '管理学', traits: ['organized', 'analytical'], 
          interests: ['finance'], subjects: ['math'], industries: ['fintech'], heat: 2 },
    business: { name: '工商管理', category: '管理学', traits: ['leadership', 'social'], 
          interests: ['finance'], subjects: ['math'], industries: [], heat: 2 },
    
    law: { name: '法学', category: '法学', traits: ['analytical', 'social'], 
          interests: ['law'], subjects: ['chinese', 'politics'], industries: [], heat: 2 },
    
    chinese_lit: { name: '汉语言文学', category: '文学', traits: ['creative', 'research'], 
          interests: ['language'], subjects: ['chinese'], industries: ['digital'], heat: 2 },
    journalism: { name: '新闻学', category: '文学', traits: ['social', 'creative'], 
          interests: ['media'], subjects: ['chinese'], industries: ['digital'], heat: 2 },
    english: { name: '英语', category: '文学', traits: ['social', 'organized'], 
          interests: ['language'], subjects: ['english'], industries: [], heat: 2 },
    
    education: { name: '教育学', category: '教育学', traits: ['caring', 'social'], 
          interests: ['education'], subjects: ['chinese'], industries: [], heat: 3 },
    psychology: { name: '心理学', category: '教育学', traits: ['caring', 'research'], 
          interests: ['education', 'medicine'], subjects: ['biology'], industries: ['healthcare'], heat: 3 },
    
    visual_design: { name: '视觉传达设计', category: '艺术学', traits: ['creative', 'practical'], 
          interests: ['art'], subjects: ['chinese'], industries: ['digital'], heat: 3 },
    digital_media: { name: '数字媒体艺术', category: '艺术学', traits: ['creative', 'practical'], 
          interests: ['art', 'tech'], subjects: ['chinese'], industries: ['digital'], heat: 4 }
};

// ==================== 应用状态 ====================
const SurveyApp = {
    currentSection: 1,
    totalSections: 6,
    responses: {},
    stats: { total: 0, complete: 0, today: 0, byRegion: {}, byScore: {}, byDate: [], byMajor: {} },
    
    init() {
        this.bindEvents();
        this.loadStats();
        this.initKnowledgeModule();
        this.generateSurveySections();
    },
    
    bindEvents() {
        const form = document.getElementById('survey-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="radio"], input[type="checkbox"], select')) {
                this.saveResponse(e.target);
                this.removeError(e.target);
            }
        });
    },
    
    saveResponse(input) {
        if (input.type === 'checkbox') {
            const checked = document.querySelectorAll(`input[name="${input.name}"]:checked`);
            this.responses[input.name] = Array.from(checked).map(c => c.value);
        } else {
            this.responses[input.name] = input.value;
        }
    },
    
    removeError(input) {
        const card = input.closest('.question-card');
        if (card) card.classList.remove('error');
    },
    
    loadStats() {
        const saved = localStorage.getItem('survey_stats_2026');
        if (saved) {
            try {
                this.stats = JSON.parse(saved);
            } catch (e) {}
        }
    },
    
    saveStats() {
        localStorage.setItem('survey_stats_2026', JSON.stringify(this.stats));
    },
    
    recordSubmission() {
        this.stats.total++;
        this.stats.complete++;
        
        const today = new Date().toISOString().split('T')[0];
        const lastDate = this.stats.byDate[this.stats.byDate.length - 1];
        if (lastDate && lastDate.date === today) {
            lastDate.count++;
        } else {
            this.stats.byDate.push({ date: today, count: 1 });
        }
        this.stats.today = (lastDate && lastDate.date === today) ? lastDate.count : 1;
        
        const region = this.responses.province || 'unknown';
        this.stats.byRegion[region] = (this.stats.byRegion[region] || 0) + 1;
        
        const score = this.responses.score_level || 'unknown';
        this.stats.byScore[score] = (this.stats.byScore[score] || 0) + 1;
        
        this.saveStats();
    },
    
    handleSubmit(e) {
        e.preventDefault();
        if (!validateSection(this.totalSections)) {
            showValidationError();
            return;
        }
        
        const formData = new FormData(e.target);
        formData.forEach((value, key) => {
            if (!this.responses[key]) this.responses[key] = value;
        });
        
        this.recordSubmission();
        showAnalyzingPage();
        
        setTimeout(() => {
            generateReport(this.responses);
        }, 4000);
    },
    
    initKnowledgeModule() {
        document.querySelectorAll('.know-tab').forEach(tab => {
            tab.addEventListener('click', () => switchKnowledgeTab(tab.dataset.tab));
        });
        
        // 绘制产业趋势图
        setTimeout(() => {
            if (document.getElementById('industry-trend-chart')) {
                drawIndustryTrendChart();
            }
        }, 500);
    },
    
    generateSurveySections() {
        // 问卷第2-6部分在HTML中已定义，这里补充动态内容
    }
};

// ==================== 知识模块 ====================
function switchKnowledgeTab(tabId) {
    document.querySelectorAll('.know-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.know-tab[data-tab="${tabId}"]`).classList.add('active');
    
    document.querySelectorAll('.knowledge-content').forEach(c => c.style.display = 'none');
    document.getElementById(`tab-${tabId}`).style.display = 'block';
    
    document.querySelectorAll('.read-dot').forEach(d => {
        if (d.dataset.tab === tabId) d.classList.add('active');
    });
    
    // 绘制图表
    if (tabId === 'industry') {
        setTimeout(drawIndustryTrendChart, 100);
    }
}

function drawIndustryTrendChart() {
    const canvas = document.getElementById('industry-trend-chart');
    if (!canvas || canvas.chart) return;
    
    const ctx = canvas.getContext('2d');
    canvas.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2022', '2024', '2026', '2028', '2030'],
            datasets: [
                { label: '人工智能', data: [100, 180, 320, 500, 750, 1100], borderColor: '#7c3aed', tension: 0.3, fill: false },
                { label: '新能源', data: [150, 250, 400, 600, 850, 1200], borderColor: '#10b981', tension: 0.3, fill: false },
                { label: '芯片半导体', data: [80, 140, 250, 400, 600, 900], borderColor: '#ef4444', tension: 0.3, fill: false },
                { label: '生物医药', data: [120, 180, 280, 400, 550, 750], borderColor: '#06b6d4', tension: 0.3, fill: false },
                { label: '传统制造', data: [500, 520, 530, 540, 550, 560], borderColor: '#9ca3af', tension: 0.3, fill: false }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: '各产业人才需求指数（2020年=100）' },
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: '需求指数' } }
            }
        }
    });
}

// ==================== 页面控制 ====================
function startLearning() {
    document.getElementById('intro-section').style.display = 'none';
    document.getElementById('knowledge-section').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(drawIndustryTrendChart, 300);
}

function startSurveySection() {
    document.getElementById('knowledge-section').style.display = 'none';
    document.getElementById('progress-wrapper').style.display = 'block';
    document.getElementById('survey-main').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProgress(1);
}

function startSurvey() {
    startLearning();
}

function nextSection(current) {
    if (!validateSection(current)) {
        showValidationError();
        return;
    }
    
    document.getElementById(`section-${current}`).style.display = 'none';
    const next = current + 1;
    const nextEl = document.getElementById(`section-${next}`);
    if (nextEl) {
        nextEl.style.display = 'block';
        SurveyApp.currentSection = next;
        updateProgress(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevSection(current) {
    document.getElementById(`section-${current}`).style.display = 'none';
    const prev = current - 1;
    document.getElementById(`section-${prev}`).style.display = 'block';
    SurveyApp.currentSection = prev;
    updateProgress(prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(section) {
    const progress = (section / SurveyApp.totalSections) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `第 ${section} 部分 / 共 ${SurveyApp.totalSections} 部分`;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
    
    document.querySelectorAll('.progress-steps .step').forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (i + 1 < section) step.classList.add('completed');
        else if (i + 1 === section) step.classList.add('active');
    });
}

function validateSection(section) {
    const sectionEl = document.getElementById(`section-${section}`);
    if (!sectionEl) return true;
    
    const cards = sectionEl.querySelectorAll('.question-card');
    let isValid = true;
    
    cards.forEach(card => {
        const radios = card.querySelectorAll('input[type="radio"]');
        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        const selects = card.querySelectorAll('select');
        
        if (radios.length > 0) {
            const name = radios[0].name;
            if (!card.querySelector(`input[name="${name}"]:checked`)) {
                card.classList.add('error');
                isValid = false;
            } else {
                card.classList.remove('error');
            }
        }
        
        if (checkboxes.length > 0) {
            const name = checkboxes[0].name;
            if (card.querySelectorAll(`input[name="${name}"]:checked`).length === 0) {
                card.classList.add('error');
                isValid = false;
            } else {
                card.classList.remove('error');
            }
        }
        
        selects.forEach(select => {
            if (!select.value) {
                card.classList.add('error');
                isValid = false;
            } else {
                card.classList.remove('error');
            }
        });
    });
    
    return isValid;
}

function showValidationError() {
    const errorCard = document.querySelector('.question-card.error');
    if (errorCard) {
        errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorCard.style.animation = 'shake 0.5s ease';
        setTimeout(() => { errorCard.style.animation = ''; }, 500);
    }
    showToast('请完成所有必填项后继续');
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// ==================== 分析页面 ====================
function showAnalyzingPage() {
    document.getElementById('survey-main').style.display = 'none';
    document.getElementById('progress-wrapper').style.display = 'none';
    document.getElementById('analyzing-section').style.display = 'block';
    
    const steps = ['a-step-1', 'a-step-2', 'a-step-3', 'a-step-4', 'a-step-5'];
    const texts = ['分析个人特质画像', '计算城市匹配度', '匹配专业方向', '生成职业建议', '绘制可视化图表'];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            document.getElementById(steps[i]).classList.remove('active');
            document.getElementById(steps[i]).classList.add('done');
            document.getElementById(steps[i]).textContent = `✓ ${texts[i]}`;
            i++;
            if (i < steps.length) {
                document.getElementById(steps[i]).classList.add('active');
                document.getElementById('analyzing-text').textContent = texts[i];
            }
        } else {
            clearInterval(interval);
        }
    }, 700);
}

// ==================== 匹配算法 ====================
function calculateCityMatch(responses) {
    const scores = {};
    const factors = responses.city_factor || [];
    const citySize = responses.city_size;
    const income = responses.family_income;
    const settle = responses.settle_plan;
    const location = responses.city_location;
    
    Object.entries(CITIES).forEach(([key, city]) => {
        let score = 50;
        
        // 城市规模匹配
        if (citySize === 'mega' && city.tier === 'mega') score += 15;
        else if (citySize === 'large' && (city.tier === 'large' || city.tier === 'mega')) score += 12;
        else if (citySize === 'medium' && city.tier !== 'mega') score += 10;
        else if (citySize === 'any') score += 8;
        
        // 因素权重
        if (factors.includes('job')) score += city.jobScore * 0.3;
        if (factors.includes('salary')) score += city.salaryScore * 0.25;
        if (factors.includes('cost')) score += city.costScore * 0.2;
        if (factors.includes('hukou')) score += city.hukouScore * 0.15;
        if (factors.includes('climate')) score += city.climateScore * 0.1;
        if (factors.includes('culture')) score += city.cultureScore * 0.1;
        
        // 经济条件
        if (income === 'low' && city.costScore < 50) score -= 15;
        if (income === 'high' && city.tier === 'mega') score += 10;
        
        // 地理偏好
        if (location === 'coastal' && ['east', 'south'].includes(city.region)) score += 10;
        
        // 发展意向
        if (settle === 'tier1' && city.tier === 'mega') score += 12;
        
        scores[key] = Math.min(99, Math.max(50, Math.round(score)));
    });
    
    return Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key, score]) => ({ key, ...CITIES[key], score }));
}

function calculateMajorMatch(responses) {
    const scores = {};
    const personality = responses.personality || [];
    const interests = responses.interest || [];
    const strongSubjects = responses.strong_subject || [];
    const futureIndustry = responses.future_industry || [];
    const subject = responses.subject || '';
    const furtherStudy = responses.further_study;
    const careerDir = responses.career_dir;
    
    const canScience = ['phy_chem_bio', 'phy_chem_x', 'phy_x_x', 'old_science'].includes(subject);
    
    Object.entries(MAJORS).forEach(([key, major]) => {
        let score = 40;
        
        // 选科限制
        if (['工学', '理学', '医学'].includes(major.category) && !canScience) {
            score -= 25;
        }
        
        // 性格匹配
        major.traits.forEach(trait => {
            if (personality.includes(trait)) score += 12;
        });
        
        // 兴趣匹配
        major.interests.forEach(int => {
            if (interests.includes(int)) score += 10;
        });
        
        // 学科优势
        major.subjects.forEach(subj => {
            if (strongSubjects.includes(subj)) score += 8;
        });
        
        // 产业兴趣
        major.industries.forEach(ind => {
            if (futureIndustry.includes(ind)) score += 6;
        });
        
        // 深造规划
        if (furtherStudy === 'must' && ['理学', '医学'].includes(major.category)) score += 8;
        if (furtherStudy === 'work' && major.category === '工学') score += 5;
        
        // 就业方向
        if (careerDir === 'civil' && ['法学', '管理学', '文学'].includes(major.category)) score += 8;
        if (careerDir === 'academic' && ['理学', '医学'].includes(major.category)) score += 10;
        if (careerDir === 'big_corp' && major.category === '工学') score += 8;
        if (careerDir === 'professional' && ['临床医学', '法学', '会计学'].includes(major.name)) score += 12;
        
        // 热度加成
        score += major.heat * 2;
        
        scores[key] = Math.min(99, Math.max(30, Math.round(score)));
    });
    
    return Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([key, score]) => ({ key, ...MAJORS[key], score }));
}

function analyzeProfile(responses) {
    const personality = responses.personality || [];
    const interests = responses.interest || [];
    const riskPref = responses.risk_pref || 'balanced';
    const stress = responses.stress || 'manage';
    const learnStyle = responses.learn_style || 'practice';
    
    const dims = { analytical: 40, creative: 40, social: 40, practical: 40, leadership: 40, research: 40 };
    
    personality.forEach(p => {
        if (dims[p] !== undefined) dims[p] += 25;
        if (p === 'organized') { dims.analytical += 10; dims.practical += 10; }
        if (p === 'caring') { dims.social += 15; }
    });
    
    interests.forEach(i => {
        if (['tech', 'finance'].includes(i)) dims.analytical += 8;
        if (['art', 'media'].includes(i)) dims.creative += 12;
        if (['education', 'law'].includes(i)) dims.social += 8;
        if (['engineering', 'nature'].includes(i)) dims.practical += 8;
        if (['medicine', 'nature'].includes(i)) dims.research += 8;
    });
    
    if (riskPref === 'risk' || riskPref === 'lean_risk') { dims.leadership += 12; dims.creative += 8; }
    if (stress === 'thrive') dims.leadership += 10;
    if (learnStyle === 'theory') dims.research += 10;
    if (learnStyle === 'practice') dims.practical += 10;
    
    Object.keys(dims).forEach(k => dims[k] = Math.min(100, Math.max(20, dims[k])));
    
    const topTraits = Object.entries(dims).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const traitNames = {
        analytical: '逻辑分析', creative: '创意创新', social: '人际沟通',
        practical: '动手实践', leadership: '组织领导', research: '探索研究'
    };
    
    const tags = topTraits.map(([k]) => traitNames[k]);
    
    let summary = `您是一个以【${tags[0]}】和【${tags[1]}】见长的学生，`;
    if (riskPref === 'stable' || riskPref === 'lean_stable') {
        summary += '偏好稳定的发展环境，';
    } else {
        summary += '愿意接受挑战和不确定性，';
    }
    
    if (responses.further_study === 'must') {
        summary += '有明确的深造规划，适合选择学术性或专业性较强的方向。';
    } else if (responses.further_study === 'work') {
        summary += '倾向于尽早进入职场，适合选择实用性强、就业面广的专业。';
    } else {
        summary += '保持开放心态，可以在大学期间继续探索适合自己的方向。';
    }
    
    return { dims, tags, summary };
}

// ==================== 报告生成 ====================
function generateReport(responses) {
    document.getElementById('analyzing-section').style.display = 'none';
    const reportSection = document.getElementById('report-section');
    reportSection.style.display = 'block';
    
    const profile = analyzeProfile(responses);
    const cities = calculateCityMatch(responses);
    const majors = calculateMajorMatch(responses);
    
    reportSection.innerHTML = generateReportHTML(profile, cities, majors, responses);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 延迟绘制图表
    setTimeout(() => {
        drawProfileRadar(profile.dims);
        drawCityChart(cities);
        drawMajorChart(majors);
    }, 300);
}

function generateReportHTML(profile, cities, majors, responses) {
    const time = new Date().toLocaleString('zh-CN');
    
    return `
    <div class="report-container">
        <div class="report-header">
            <h2>🎯 您的专属匹配分析报告</h2>
            <p>基于您的特质、偏好与发展期望生成</p>
            <div class="report-time">生成时间：${time}</div>
        </div>
        
        <!-- 个人特质画像 -->
        <div class="report-card">
            <div class="card-header"><h3>📊 个人特质画像</h3></div>
            <div class="profile-content">
                <div class="radar-chart-container"><canvas id="profile-radar" width="280" height="280"></canvas></div>
                <div class="profile-summary">
                    <h4>特质分析</h4>
                    <p>${profile.summary}</p>
                </div>
            </div>
            <div class="profile-tags">
                ${profile.tags.map(t => `<span class="profile-tag">${t}型</span>`).join('')}
                <span class="profile-tag" style="background:#e8f5e9;color:#2e7d32;">
                    ${responses.risk_pref === 'stable' || responses.risk_pref === 'lean_stable' ? '稳定偏好' : '挑战偏好'}
                </span>
            </div>
        </div>
        
        <!-- 城市匹配 -->
        <div class="report-card">
            <div class="card-header">
                <h3>🏙️ 城市匹配推荐 TOP 5</h3>
                <p class="card-subtitle">根据您的偏好与发展期望匹配</p>
            </div>
            <div class="city-chart-container"><canvas id="city-chart" height="200"></canvas></div>
            <div class="city-list">
                ${cities.map((city, i) => `
                <div class="city-item">
                    <div class="city-rank rank-${i+1}">${i+1}</div>
                    <div class="city-info">
                        <div class="city-name">${city.name}</div>
                        <div class="city-tags">
                            ${city.industries.slice(0,3).map(ind => `<span class="city-tag">${getIndustryName(ind)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="city-score">
                        <div class="score-value">${city.score}</div>
                        <div class="score-label">匹配度</div>
                        <div class="score-bar"><div class="score-fill" style="width:${city.score}%"></div></div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        
        <!-- 专业匹配 -->
        <div class="report-card">
            <div class="card-header">
                <h3>🎓 专业匹配推荐 TOP 10</h3>
                <p class="card-subtitle">根据您的特质、兴趣与能力匹配</p>
            </div>
            <div class="major-chart-container"><canvas id="major-chart" height="250"></canvas></div>
            <div class="major-list">
                ${majors.map((major, i) => `
                <div class="major-item">
                    <div class="major-rank">${i+1}</div>
                    <div class="major-info">
                        <div class="major-name">${major.name}</div>
                        <div class="major-category">${major.category}</div>
                    </div>
                    <div class="major-match">${major.score}%</div>
                </div>
                `).join('')}
            </div>
        </div>
        
        <!-- 职业建议 -->
        <div class="report-card">
            <div class="card-header"><h3>💼 职业发展建议</h3></div>
            <div class="career-content">
                ${generateCareerAdvice(responses, profile, majors)}
            </div>
        </div>
        
        <!-- 温馨提示 -->
        <div class="report-card warning-card">
            <div class="card-header"><h3>⚠️ 温馨提示</h3></div>
            <div class="warning-content">
                ${generateWarnings(responses)}
            </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="report-actions">
            <button class="btn-secondary" onclick="restartSurvey()">重新测评</button>
            <button class="btn-primary" onclick="window.print()">打印/保存报告</button>
            <button class="btn-primary" onclick="shareReport()">分享报告</button>
        </div>
    </div>
    `;
}

function getIndustryName(key) {
    const map = {
        tech: '科技', finance: '金融', education: '教育', manufacturing: '制造',
        biotech: '生物医药', ecommerce: '电商', trade: '贸易', media: '传媒',
        aerospace: '航天', gaming: '游戏', hardware: '硬件', chip: '芯片',
        port: '港口', auto: '汽车', tourism: '旅游', software: '软件'
    };
    return map[key] || key;
}

function generateCareerAdvice(responses, profile, majors) {
    const career = responses.career_dir;
    const topMajor = majors[0];
    
    let pathAdvice = [], skillAdvice = [], mindsetAdvice = [];
    
    if (career === 'civil') {
        pathAdvice = ['关注选调生、公务员招考政策', '选择法学、公共管理、中文等对口专业', '大学期间积累学生干部经历'];
    } else if (career === 'big_corp') {
        pathAdvice = ['优先选择一线城市或新一线城市高校', '积极参与实习，建立职业人脉', '培养数据分析、项目管理等通用技能'];
    } else if (career === 'professional') {
        pathAdvice = ['做好长期深造准备', '了解职业资格考试要求', '注重专业实践能力培养'];
    } else if (career === 'academic') {
        pathAdvice = ['选择科研实力强的高校', '本科阶段参与科研项目', '培养论文写作和学术交流能力'];
    } else {
        pathAdvice = ['选择通用性强的专业', '利用大学时光探索兴趣', '建立广泛的知识面'];
    }
    
    const topTrait = Object.entries(profile.dims).sort((a, b) => b[1] - a[1])[0][0];
    if (topTrait === 'analytical') {
        skillAdvice = ['强化数据分析和编程能力', '学习量化思维方法', '培养系统化解决问题的能力'];
    } else if (topTrait === 'creative') {
        skillAdvice = ['保持好奇心和创新思维', '尝试跨领域学习', '学习设计思维方法论'];
    } else if (topTrait === 'social') {
        skillAdvice = ['提升公众表达能力', '参与社团活动锻炼协作能力', '学习谈判和沟通技巧'];
    } else {
        skillAdvice = ['积极参与实践项目', '考取专业技能证书', '培养项目管理能力'];
    }
    
    mindsetAdvice = ['保持终身学习的习惯', '建立健康的压力管理机制', '不随波逐流，做适合自己的选择'];
    
    return `
    <div class="career-section">
        <h4>🎯 发展路径建议</h4>
        <ul>${pathAdvice.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    <div class="career-section">
        <h4>💡 能力提升建议</h4>
        <ul>${skillAdvice.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    <div class="career-section">
        <h4>🌱 成长心态建议</h4>
        <ul>${mindsetAdvice.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    `;
}

function generateWarnings(responses) {
    const warnings = [];
    
    if (responses.expected_salary === 'above20k') {
        warnings.push({ icon: '💰', text: '高薪期望需要名校+热门专业+优秀实习经历的组合支撑，建议制定现实可行的目标。' });
    }
    
    if (responses.career_dir === 'civil' && !['top985', '985'].includes(responses.score_level)) {
        warnings.push({ icon: '📋', text: '选调生对学校层次有要求，普通公务员考试竞争激烈，建议同时准备其他出路。' });
    }
    
    if (responses.ai_impact === 'limited') {
        warnings.push({ icon: '🤖', text: 'AI技术发展迅速，建议关注所选专业的技术变革趋势，培养难以被替代的能力。' });
    }
    
    if (responses.know_level === 'none') {
        warnings.push({ icon: '📚', text: '建议进一步了解志愿填报政策和各专业详情，可以咨询学校老师或专业顾问。' });
    }
    
    warnings.push({ icon: '📌', text: '本报告基于算法分析仅供参考，请结合招生简章、专业介绍、学长学姐经验等综合决策。' });
    
    return warnings.map(w => `
        <div class="warning-item">
            <span class="warning-icon">${w.icon}</span>
            <span class="warning-text">${w.text}</span>
        </div>
    `).join('');
}

// ==================== 图表绑定 ====================
function drawProfileRadar(dims) {
    const canvas = document.getElementById('profile-radar');
    if (!canvas) return;
    
    new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['分析力', '创造力', '社交力', '实践力', '领导力', '研究力'],
            datasets: [{
                label: '能力画像',
                data: [dims.analytical, dims.creative, dims.social, dims.practical, dims.leadership, dims.research],
                backgroundColor: 'rgba(26, 115, 232, 0.2)',
                borderColor: '#1a73e8',
                borderWidth: 2,
                pointBackgroundColor: '#1a73e8'
            }]
        },
        options: {
            scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
            plugins: { legend: { display: false } }
        }
    });
}

function drawCityChart(cities) {
    const canvas = document.getElementById('city-chart');
    if (!canvas) return;
    
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: cities.map(c => c.name),
            datasets: [{
                label: '匹配度',
                data: cities.map(c => c.score),
                backgroundColor: ['#ffd700', '#c0c0c0', '#cd7f32', '#1a73e8', '#1a73e8'],
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { beginAtZero: true, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });
}

function drawMajorChart(majors) {
    const canvas = document.getElementById('major-chart');
    if (!canvas) return;
    
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: majors.map(m => m.name),
            datasets: [{
                label: '匹配度',
                data: majors.map(m => m.score),
                backgroundColor: '#34a853',
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { beginAtZero: true, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });
}

// ==================== 管理面板 ====================
function toggleAdminPanel() {
    const panel = document.getElementById('admin-panel');
    panel.classList.toggle('show');
    
    if (panel.classList.contains('show')) {
        renderAdminStats();
    }
}

function renderAdminStats() {
    const stats = SurveyApp.stats;
    
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-complete').textContent = stats.complete;
    document.getElementById('stat-rate').textContent = stats.total > 0 ? Math.round(stats.complete / stats.total * 100) + '%' : '0%';
    document.getElementById('stat-today').textContent = stats.today;
    
    // 地区分布图
    const regionCanvas = document.getElementById('admin-region-chart');
    if (regionCanvas && Object.keys(stats.byRegion).length > 0) {
        const regionLabels = Object.keys(stats.byRegion).slice(0, 8).map(getProvinceName);
        const regionData = Object.values(stats.byRegion).slice(0, 8);
        
        if (regionCanvas.chart) regionCanvas.chart.destroy();
        regionCanvas.chart = new Chart(regionCanvas, {
            type: 'pie',
            data: {
                labels: regionLabels,
                datasets: [{ data: regionData, backgroundColor: ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9c27b0', '#00bcd4', '#ff5722', '#795548'] }]
            },
            options: { plugins: { legend: { position: 'right' } } }
        });
    }
    
    // 成绩分布图
    const scoreCanvas = document.getElementById('admin-score-chart');
    if (scoreCanvas && Object.keys(stats.byScore).length > 0) {
        const scoreLabels = { top985: '顶尖985', '985': '普通985', '211': '211院校', tier1: '一本', tier2: '二本', specialist: '专科' };
        const labels = Object.keys(stats.byScore).map(k => scoreLabels[k] || k);
        const data = Object.values(stats.byScore);
        
        if (scoreCanvas.chart) scoreCanvas.chart.destroy();
        scoreCanvas.chart = new Chart(scoreCanvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{ data: data, backgroundColor: ['#7c3aed', '#1a73e8', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'] }]
            },
            options: { plugins: { legend: { position: 'right' } } }
        });
    }
    
    // 趋势图
    const trendCanvas = document.getElementById('admin-trend-chart');
    if (trendCanvas && stats.byDate.length > 0) {
        const dates = stats.byDate.slice(-7).map(d => d.date.slice(5));
        const counts = stats.byDate.slice(-7).map(d => d.count);
        
        if (trendCanvas.chart) trendCanvas.chart.destroy();
        trendCanvas.chart = new Chart(trendCanvas, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{ label: '填写人数', data: counts, borderColor: '#1a73e8', tension: 0.3, fill: true, backgroundColor: 'rgba(26,115,232,0.1)' }]
            },
            options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });
    }
}

function getProvinceName(key) {
    const map = {
        beijing: '北京', shanghai: '上海', guangdong: '广东', jiangsu: '江苏', zhejiang: '浙江',
        shandong: '山东', henan: '河南', sichuan: '四川', hubei: '湖北', hunan: '湖南'
    };
    return map[key] || key;
}

function exportData() {
    const data = JSON.stringify(SurveyApp.stats, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey_stats_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('数据已导出');
}

function refreshStats() {
    renderAdminStats();
    showToast('统计已刷新');
}

// ==================== 提交问卷 ====================
function submitSurvey() {
    // 验证最后一部分
    if (!validateSection(SurveyApp.totalSections)) {
        showValidationError();
        return;
    }
    
    // 收集所有表单数据
    const form = document.getElementById('survey-form');
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        if (SurveyApp.responses[key] === undefined) {
            SurveyApp.responses[key] = value;
        }
    });
    
    // 收集多选框数据
    form.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        const name = cb.name;
        if (!SurveyApp.responses[name]) {
            SurveyApp.responses[name] = [];
        }
        if (!SurveyApp.responses[name].includes(cb.value)) {
            SurveyApp.responses[name].push(cb.value);
        }
    });
    
    // 记录统计
    SurveyApp.recordSubmission();
    
    // 显示分析页面
    showAnalyzingPage();
    
    // 延迟生成报告
    setTimeout(() => {
        generateReport(SurveyApp.responses);
    }, 4000);
}

// ==================== 其他功能 ====================
function restartSurvey() {
    SurveyApp.responses = {};
    SurveyApp.currentSection = 1;
    
    document.getElementById('survey-form')?.reset();
    document.querySelectorAll('.question-card.error').forEach(c => c.classList.remove('error'));
    
    document.getElementById('report-section').style.display = 'none';
    document.getElementById('analyzing-section').style.display = 'none';
    document.getElementById('intro-section').style.display = 'block';
    
    for (let i = 2; i <= SurveyApp.totalSections; i++) {
        const el = document.getElementById(`section-${i}`);
        if (el) el.style.display = 'none';
    }
    const s1 = document.getElementById('section-1');
    if (s1) s1.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareReport() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: '高考志愿匹配报告', text: '我完成了高考志愿智能匹配测评，快来测测！', url }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url).then(() => showToast('链接已复制'));
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-5px)}20%,40%,60%,80%{transform:translateX(5px)}}`;
document.head.appendChild(style);

// 初始化
document.addEventListener('DOMContentLoaded', () => SurveyApp.init());
