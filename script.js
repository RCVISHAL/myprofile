document.addEventListener('DOMContentLoaded',function(){
  const hamburger=document.querySelector('.hamburger');
  const navMenu=document.querySelector('.nav-menu');
  hamburger && hamburger.addEventListener('click',()=>{
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        if(navMenu.classList.contains('open')) navMenu.classList.remove('open');
      }
    });
  });

  // Animate linear progress bars when visible
  const progressFills=document.querySelectorAll('.progress-fill');
  const circulars=document.querySelectorAll('.circular-progress');

  function animateProgress(){
    progressFills.forEach(p=>{
      const rect=p.getBoundingClientRect();
      if(rect.top < window.innerHeight - 40){
        const percent=Number(p.dataset.progress||0);
        p.style.width = percent + '%';
      }
    });

    circulars.forEach(c=>{
      const rect=c.getBoundingClientRect();
      if(rect.top < window.innerHeight - 40){
        const percent=Number(c.dataset.percentage||0);
        const circle=c.querySelector('.progress-ring-circle');
        if(circle){
          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;
          circle.style.strokeDasharray = `${circumference}`;
          const offset = circumference - (percent/100) * circumference;
          circle.style.strokeDashoffset = offset;
        }
      }
    });
  }
  animateProgress();
  window.addEventListener('scroll',animateProgress);
});
