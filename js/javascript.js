// видео https://www.youtube.com/watch?v=kupwmF72Plo

// найти и объявить все переменные, которые будут поддаваться анимации
const animItems = document.querySelectorAll('._anim-items');
// проверяем существуют ли такие классы
if (animItems.length) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4; // коэфициент регулирующий старт анимации
            // настройка старта анмации
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            // если анимированный объект выше окна браузера, нужно перестроть момент старта
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            // pageYOffset - переменная в которую поступает информация о колличестве проскролленых пикселей
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}


