document.addEventListener('DOMContentLoaded', () => {
    // نظام التقييم
    const stars = document.querySelectorAll('.stars i');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            currentRating = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('fas');
                    s.classList.remove('far');
                } else {
                    s.classList.add('far');
                    s.classList.remove('fas');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('fas');
                    s.classList.remove('far');
                } else {
                    s.classList.add('far');
                    s.classList.remove('fas');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.add('fas');
                    s.classList.remove('far');
                } else {
                    s.classList.add('far');
                    s.classList.remove('fas');
                }
            });
        });
    });

    // نظام التعليقات
    const commentsForm = document.querySelector('.comments-form');
    const commentsList = document.querySelector('.comments-list');

    // تحميل التعليقات المحفوظة
    let savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(comment => {
        addCommentToDOM(comment);
    });

    commentsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = commentsForm.querySelector('textarea');
        const comment = textarea.value.trim();

        if (comment) {
            const newComment = {
                text: comment,
                rating: currentRating,
                date: new Date().toLocaleString('ar-SA')
            };

            // إضافة التعليق إلى القائمة المحفوظة
            savedComments.unshift(newComment);
            localStorage.setItem('comments', JSON.stringify(savedComments));

            // إضافة التعليق إلى الصفحة
            addCommentToDOM(newComment);

            // إعادة تعيين النموذج
            textarea.value = '';
            currentRating = 0;
            stars.forEach(star => {
                star.classList.add('far');
                star.classList.remove('fas');
            });
        }
    });

    function addCommentToDOM(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-content">
                <p>${comment.text}</p>
                <div class="comment-meta">
                    <span class="comment-date">${comment.date}</span>
                    <span class="comment-rating">التقييم: ${comment.rating}/5</span>
                </div>
            </div>
        `;
        commentsList.prepend(commentElement);
    }

    // إضافة تأثيرات حركية للعناصر عند التمرير
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // إضافة زر العودة للأعلى
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // إضافة تنسيق لزر العودة للأعلى
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--secondary-color);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: none;
            transition: background-color 0.3s ease;
            z-index: 1000;
        }

        .scroll-to-top:hover {
            background-color: var(--primary-color);
        }

        .comment {
            background-color: var(--light-color);
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .comment-content {
            margin-bottom: 0.5rem;
        }

        .comment-meta {
            display: flex;
            justify-content: space-between;
            color: var(--dark-color);
            font-size: 0.9rem;
        }

        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .info-card {
            background-color: var(--light-color);
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .info-card:hover {
            transform: translateY(-5px);
        }

        .info-card i {
            font-size: 2rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
}); 