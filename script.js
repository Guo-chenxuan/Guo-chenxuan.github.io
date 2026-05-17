// 项目数据
const projectsData = {
    1: {
        title: '有限元分析平台',
        description: '开发了一个基于Python的有限元分析工具，能够进行二维结构应力分析。包含网格生成、边界条件设置和结果后处理功能。',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        info: '使用Python开发，实现了完整的有限元分析流程，支持各类工程问题的求解。',
        tags: ['Python', '有限元法', '数值计算']
    },
    2: {
        title: '流体动力学模拟',
        description: '基于CFD方法实现的二维不可压缩流体流动模拟，使用MATLAB进行求解。包含圆柱绕流、沟道流等经典算例。',
        image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        info: '使用MATLAB进行CFD求解，模拟了多个经典流体力学算例，验证了模型的正确性。',
        tags: ['MATLAB', 'CFD', '流体力学']
    },
    3: {
        title: '机械结构优化设计',
        description: '运用拓扑优化和形状优化方法，对工程结构进行轻量化设计。利用Abaqus进行有限元分析，实现了20%的质量减少。',
        image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        info: '采用多种优化算法，在满足性能要求的前提下显著降低了结构质量，具有显著的工程应用价值。',
        tags: ['优化设计', 'Abaqus', '工程应用']
    },
    4: {
        title: '振动分析系统',
        description: '开发的振动信号处理和分析系统，支持时域、频域、时频分析。可用于机械故障诊断和结构健康监测。',
        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        info: '提供全面的振动信号分析工具，支持多种分析方法，在故障诊断和结构监测中有实际应用。',
        tags: ['信号处理', 'Python', '故障诊断']
    },
    5: {
        title: '复合材料性能预测',
        description: '基于微观力学理论，建立了复合材料宏观性能预测模型。使用Python实现了多尺度分析框架。',
        image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        info: '建立了从微观到宏观尺度的多尺度分析模型，实现了复合材料性能的准确预测。',
        tags: ['复合材料', '微观力学', '多尺度分析']
    },
    6: {
        title: '个人网站开发',
        description: '设计并开发了这个个人作品展示网站，展示学术成果和项目经历。采用现代化的Web设计和响应式布局。',
        image: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
        info: '使用HTML、CSS、JavaScript开发，具有响应式设计和现代化交互效果，通过GitHub Pages部署。',
        tags: ['HTML/CSS', 'Web设计', 'GitHub Pages']
    }
};

// Modal 功能
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

// 打开模态框
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project-id');
        const project = projectsData[projectId];
        
        if (project) {
            // 填充模态框内容
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalInfo').textContent = project.info;
            document.querySelector('.modal-image').style.background = project.image;
            
            // 填充标签
            const tagsContainer = document.getElementById('modalTags');
            tagsContainer.innerHTML = project.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
            
            // 显示模态框
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

// 关闭模态框
closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// 点击模态框外部关闭
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// 按 Esc 键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // 排除项目卡片的链接
        if (href === '#' || this.classList.contains('project-link')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('感谢您的消息！我会尽快回复您。');
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.project-card, .skill-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('个人网站已加载！');
console.log('Welcome to 郭辰暄\'s Personal Website');
