// Close and Menu 

const elMenuBtn = get('js-menu-btn');
const elCloseBtn = get('js-close-btn');
const elInnerHeader = get('js-inner-header');
const elOverlay = get('js-overlay');
let switched = false;


elMenuBtn.addEventListener('click', (evt) => {
    switched = true;
    elOverlay.style.display = 'block';    
    setTimeout(() => {
        elOverlay.classList.add('move');
    }, 0);
    setTimeout(() => {
        elInnerHeader.style.display = 'flex';
    }, 100);
    setTimeout(() => {
        elInnerHeader.classList.add('move'); 
    }, 150);
});


elCloseBtn.addEventListener('click', (evt) => {
    switched = false;
    elInnerHeader.classList.remove('move');
    elOverlay.classList.remove('move');
    setTimeout(() => {
        elInnerHeader.style.display = 'none';
        elOverlay.style.display = 'none';   
    }, 300); 
});



window.addEventListener('resize', (evt) => { 

   if(window.matchMedia('(min-width: 1045px)').matches) {
    elInnerHeader.style.display = 'flex';    
    elOverlay.style.display = 'none'; 
   }

   if(!window.matchMedia('(min-width: 1045px)').matches && switched) {
        elOverlay.style.display = 'block'; 
   }

   if(!window.matchMedia('(min-width: 1045px)').matches && !switched) {
        elInnerHeader.style.display = 'none';    
        elOverlay.style.display = 'none'; 
   }

});


// Slider controllers 

const elPrevBtn = get('slider-prev-btn');
const elNextBtn = get('slider-next-btn');
const elSliderWrapper = get('hero__slider-wrapper');
const slides = Array.from(elSliderWrapper.children);
const slideHeight = slides[0].clientHeight + 35;
let height = elSliderWrapper.scrollHeight;
let currentSlide;
let currentSlideIndex;
const elSliderViewWrapper = get('hero__slider-view');
const views = Array.from(elSliderViewWrapper.children);
elNextBtn.addEventListener('click', (evt) => {

    currentSlide = slides.find(slide => {
        return slide.classList.contains('active-slide');
    });
    currentSlideIndex = slides.findIndex(slide => {
        return slide.classList.contains('active-slide');
    });

    currentSlideIndex += 1;

    if(currentSlideIndex == slides.length - 1) {
    elSliderWrapper.scrollTo(0, height);
    }else {
    elSliderWrapper.scrollTo(0, currentSlideIndex * slideHeight);
    }

    if(currentSlide.nextElementSibling) {
        currentSlide.classList.remove('active-slide');
        currentSlide.nextElementSibling.classList.add('active-slide');
    }

    changeItemView();


});

elPrevBtn.addEventListener('click', (evt) => {

    currentSlide = slides.find(slide => {
        return slide.classList.contains('active-slide');
    });
    currentSlideIndex = slides.findIndex(slide => {
        return slide.classList.contains('active-slide');
    });


    if(currentSlide.previousElementSibling) {
        elSliderWrapper.scrollTo(elSliderWrapper.scrollTop, elSliderWrapper.scrollTop - slideHeight);
        currentSlide.classList.remove('active-slide');
        currentSlide.previousElementSibling.classList.add('active-slide');
    }

    changeItemView();


});

// Hero Slider view items 

elSliderViewWrapper.addEventListener('click', (evt) => {
    if(evt.target.localName === 'span') {
        const viewIndex = views.findIndex(item => item === evt.target);
        views.forEach(item => {
            item.classList.remove('active-slider-item');
        }); 

        evt.target.classList.add('active-slider-item');
        
        elSliderWrapper.scrollTo(0, slideHeight * viewIndex);
        
    }
})

function changeItemView() {
    
    if(!isNaN(currentSlideIndex)) {
        let currentSlideInd = slides.findIndex(item => {
        return item.classList.contains('active-slide');
        });
        views.forEach((item, index) => {
            if(index != currentSlideInd) {
            item.classList.remove('active-slider-item');
            }else {
            if(!item.classList.contains('active-slider-item')) {
                item.classList.add('active-slider-item');
            }
            }
        });
      
}


}


// View Products 

const fragment = new DocumentFragment();
const elList = get('js-product-list');
const elListTemp = get('js-product-temp');
const elBtns = Array.from(get('js-btn-wrapper').children);
const elCompactBtn = get('js-compact-btn');
const elSportCarBtn = get('js-sport-car-btn');
const elVansBtn = get('js-vans-btn');
const elAllBtn = get('js-all-btn');


function renderProducts(data, node, type) {
   
    if(type === 'compact') {
        data = data.filter(item => item.group === 'compact');
    }

    if(type === 'sports') {
        data = data.filter(item => item.group === 'sports');
    }

    if(type === 'vans') {
        data = data.filter(item => item.group === 'vans');
    }

    node.innerHTML = '';
    data.forEach(item => {
        const temp = elListTemp.content.cloneNode(true);

        temp.querySelector('.products__item-title').title = item.title;
        temp.querySelector('.products__item-title').textContent = item.title;

        temp.querySelector('.products__item-desc').title = item.type;
        temp.querySelector('.products__item-desc').textContent = item.type;

        temp.querySelector('.products__img').src = item.image[0];
        temp.querySelector('.products__img').srcset = `${item.image[0]} 1x, ${item.image[1]} 2x`;
        temp.querySelector('.products__img').alt = item.title;
        
        temp.querySelector('.js-seats').textContent = `${item.seats} Seats`;
        temp.querySelector('.js-transmission').textContent = item.transmission;
        temp.querySelector('.js-years').textContent = `${item.years}+ Years`;
        temp.querySelector('.js-consumption').textContent = item.consumption;
        
        fragment.appendChild(temp);

    });

    node.appendChild(fragment);
}

function printsProducts(btn, type, isAll = false) {
    btn.addEventListener('click', (evt) => {
        renderProducts(cars, elList, `${type}`);
        
        if(isAll) {
            elBtns.forEach(btn => btn.classList.remove('active-btn'));
            btn.style.display = 'none';
        }
    });   
    
   
}

function get(className, getAll = false) {
    if(getAll) {
      return document.querySelectorAll(`.${className}`);
    }
    return document.querySelector(`.${className}`);
}



// Default render compact 

renderProducts(cars, elList, 'compact');

// Btn color changer

elBtns.forEach(btn => {
   btn.addEventListener('click', (evt) => {
    elBtns.forEach(btn => btn.classList.remove('active-btn'));
      if(!btn.classList.contains('.active-btn')) {
           btn.classList.add('active-btn');
       }
    //    View all btn visible

       if(elAllBtn.style.display == 'none') {
          elAllBtn.style.display = 'block';
        }
   }); 
    
   
});

// View other types 

printsProducts(elCompactBtn, 'compact');
printsProducts(elSportCarBtn, 'sports');
printsProducts(elVansBtn, 'vans');
printsProducts(elAllBtn, 'all', true);




// Testimonials Controllers 

const elTestimonialList = get('js-testimonial-list');
const elTestimonialItems = Array.from(elTestimonialList.children);
const elTestimonialPrevBtn = get('js-testimonials-prev-btn');
const elTestimonialNextBtn = get('js-testimonials-next-btn');
const elTestimonialBarWrapper = get('js-bar-wrapper');
const elTestimonialBarValue = get('js-bar-value');
const elTestimonialItemWidth = elTestimonialItems[0].offsetWidth;
const barValue = elTestimonialBarValue.offsetWidth;

let activeTestimonialItem = elTestimonialItems.find(item => item.classList.contains('active-testimonial-item'));
let activeTestimonialItemIndex = elTestimonialItems.findIndex(item => item.classList.contains('active-testimonial-item'));
let is_first = activeTestimonialItemIndex == 0 ? true : false;
let is_last = activeTestimonialItemIndex == (elTestimonialItems.length - 1) ? true : false;

elTestimonialPrevBtn.addEventListener('click', (evt) => {
    if(!is_first) {

        elTestimonialItems[activeTestimonialItemIndex].classList.remove('active-testimonial-item');
        elTestimonialItems[activeTestimonialItemIndex - 1].classList.add('active-testimonial-item');
        changeTestimonialView();
        elTestimonialList.scrollTo({
            left: activeTestimonialItemIndex  * elTestimonialItemWidth - 20
        });
    }
    elTestimonialBarWrapper.scrollLeft += elTestimonialItemWidth - 20;
    elTestimonialBarValue.style.width = (activeTestimonialItemIndex + 1) * barValue + "px";
    
    changeTestimonialView();
    
});


elTestimonialNextBtn.addEventListener('click', (evt) => {
    if(!is_last) {
        elTestimonialList.scrollTo({
            left: (activeTestimonialItemIndex + 1) * (elTestimonialItemWidth + 20)
        });

        elTestimonialItems[activeTestimonialItemIndex].classList.remove('active-testimonial-item');
        elTestimonialItems[activeTestimonialItemIndex + 1].classList.add('active-testimonial-item');
        changeTestimonialView();
        elTestimonialBarWrapper.scrollLeft += elTestimonialItemWidth + 20;
        if(activeTestimonialItemIndex == elTestimonialItems.length - 1) {
            elTestimonialBarValue.style.width = '100%';
        }else {
            elTestimonialBarValue.style.width = (activeTestimonialItemIndex + 1) * barValue + "px";
        }
        
    }
    changeTestimonialView();
    
});


function changeTestimonialView() {
    
    activeTestimonialItem = elTestimonialItems.find(item => item.classList.contains('active-testimonial-item'));
    activeTestimonialItemIndex = elTestimonialItems.findIndex(item => item.classList.contains('active-testimonial-item'));
    is_first = activeTestimonialItemIndex == 0 ? true : false;
    is_last = activeTestimonialItemIndex == (elTestimonialItems.length - 1) ? true : false;



}






