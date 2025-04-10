document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 关闭移动菜单
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // 页面滚动时固定头部
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // 画廊灯箱效果
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            selector: '.gallery-item',
            download: false,
            counter: false
        });
    }
    
    // 画廊筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const eventCards = document.querySelectorAll('.event-card');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 获取筛选类别
            const filter = this.dataset.filter || this.dataset.category;
            
            // 确定要筛选的元素
            let itemsToFilter;
            if (galleryItems.length > 0) {
                itemsToFilter = galleryItems;
            } else if (eventCards.length > 0) {
                itemsToFilter = eventCards;
            } else if (productCards.length > 0) {
                itemsToFilter = productCards;
            }
            
            // 筛选元素
            if (itemsToFilter) {
                itemsToFilter.forEach(item => {
                    if (filter === 'all' || item.dataset.filter === filter || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加active类
            this.classList.add('active');
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 常见问题折叠
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // 切换当前答案的显示
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
			
            // 关闭其他打开的答案
                       faqQuestions.forEach(otherQuestion => {
                           if (otherQuestion !== question) {
                               otherQuestion.nextElementSibling.classList.remove('active');
                               const otherIcon = otherQuestion.querySelector('i');
                               otherIcon.classList.add('fa-chevron-down');
                               otherIcon.classList.remove('fa-chevron-up');
                           }
                       });
                   });
               });
               
               // 联系表单提交
               const contactForm = document.querySelector('.contact-form');
               if (contactForm) {
                   contactForm.addEventListener('submit', function(e) {
                       e.preventDefault();
                       alert('感谢您的留言！我们会尽快与您联系。');
                       this.reset();
                   });
               }
               
               // 新闻订阅表单
               const newsletterForm = document.querySelector('.newsletter-form');
               if (newsletterForm) {
                   newsletterForm.addEventListener('submit', function(e) {
                       e.preventDefault();
                       const email = this.querySelector('input[type="email"]').value;
                       if (email) {
                           alert(`感谢订阅！确认邮件已发送至 ${email}`);
                           this.reset();
                       }
                   });
               }
               
               // 工作坊报名按钮
               const workshopBtns = document.querySelectorAll('.workshop-signup');
               workshopBtns.forEach(btn => {
                   btn.addEventListener('click', function(e) {
                       e.preventDefault();
                       const workshopTitle = this.closest('.event-details').querySelector('h3').textContent;
                       alert(`您已成功报名参加 "${workshopTitle}"`);
                   });
               });
               
               // 产品加入购物车
               const addToCartBtns = document.querySelectorAll('.add-to-cart');
               addToCartBtns.forEach(btn => {
                   btn.addEventListener('click', function() {
                       const productName = this.closest('.product-info').querySelector('h3').textContent;
                       alert(`"${productName}" 已加入购物车`);
                   });
               });
           });
