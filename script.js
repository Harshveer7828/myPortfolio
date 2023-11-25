gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


let tablinks=document.querySelectorAll(".tab-links");
let tabcontents=document.querySelectorAll(".tab-container");
function opentab(tabname){
  for(tablink of tablinks){
    tablink.classList.remove('active-link');
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove('active-tab');
  }
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');

}

let navTitle=document.querySelector(".navbar .navTitle h1");
window.addEventListener("scroll",function(){
  if(window.scrollY>=50){
    gsap.to(navTitle,{
      y:"-150%",
    })
   
    gsap.to(".sech1",{
      y:"-150%",
      opacity:1
    })
  
   
  }
  else{
    gsap.to(navTitle,{
      y:0,
    })
     
    gsap.to(".sech1",{
      y:"0%",
      opacity:0
    })
  }
})


function home(){
  let nav=document.querySelectorAll(".navbar ul li");
  var tl=gsap.timeline();
  gsap.from(".navbar h1",{
    opacity:0,
    scale:0,duration:1
  })
  tl.from(nav,{
    y:-100,
    opacity:0
    ,stagger:0.1
  })
  
  .from(".page1text p,.page1text h1",{
    opacity:0,
    stagger:0.2,
    x:-200
  },"anime")
  .from(".innerlinktabs",{
    y:100,
    opacity:0,
    stagger:0.1
  })
  .from(".page1text button",{
    y:100,
    opacity:0,
    stagger:0.1
  })
  .from(".image1",{
    rotate:360,
    scale:0,
    duration:1
  },"anime")
}
home()

function about(){
  gsap.from(".container-left-part img",{
    x:-200,
    opacity:0,
    scrollTrigger:{
      scroller:"#main",
      trigger:"#about",
      start:"top 50%",
    }
  })
 let tl=gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger:"#about",
    start:"top 50%",
    end:"top 40%"
  }
 })
 tl.from(".right-part h1",{
  y:100
  ,opacity:0
 })
  .from(".summary",{
  y:100
  ,opacity:0
 })
  .from(".tab-titles",{
  y:100
  ,opacity:0
 },"anime1")
  .from(".tab-container",{
  y:100
  ,opacity:0
 },"animw1")

}
about()

function servicepage(){
  var top=document.querySelector(".top");
  var end=document.querySelector(".end");
  gsap.to(top,{
    top:"-50%",
    scrollTrigger:{
      scroller:"#main",
      trigger:"#skills",
      scrub:1,
      // pin:true,
      start:"top 0%",
      end:"top -20%",
      // markers:true
    }
  },"animation")
  gsap.to(end,{
    bottom:"-50%",
    scrollTrigger:{
      scroller:"#main",
      trigger:"#skills",
      scrub:1,
      pin:true,
      start:"top 0",
      end:"top -20%",
      // markers:true
    }
  },"animation")

  var tl = gsap.timeline({
    scrollTrigger:{
      scroller:"#main",
      trigger:"#skills",
      start:"top -0%",
      scrub:2,
      end:"top -20%",
    }
  })
  tl.from(".img-container img",{
    scale:0,
    stagger:0.2
  })

}
servicepage()

function projectsPage(){
  gsap.from(".head-titles",{
    width:0,
    opacity:0,
    stagger:0.3,
    scrollTrigger:{
      scroller:"#main",
      trigger:"#projects-page",
      start:"top 30%",
      end:"top -20%",
    }
  })
}
projectsPage()

function menuEvent(){
  let menu=document.querySelector(".menuButton");
  let lines=document.querySelectorAll(".menuButton .lines");
  let sidepage= document.querySelector(".sidepage");
  let flag=0;
  menu.addEventListener("click",function(){
    if(flag===0){
      gsap.to(lines[0],{
        rotate:-50,
        y:2
      })
      gsap.to(lines[1],{
        x:2.5,
      })
    
      gsap.to(lines[2],{
        rotate:50,
        y:-2
      })
      gsap.to(sidepage,{
        right:0,
        
      })
      flag=1;
    }
    else{
      gsap.to(lines[0],{
        rotate:0,
        y:0
      })
      gsap.to(lines[1],{
        x:0,
      })
      gsap.to(sidepage,{
        right:"-70vw",
      })
      gsap.to(lines[2],{
        rotate:0,
        y:0
      })
      flag=0;
    }
  
  })
}
function contactMe(){
  let tl=gsap.timeline({
    stagger:0.1,
    scrollTrigger:{
      scroller:"#main",
      trigger:"#contactMe",
      start:"top 50%",
    }
  },"anime");
  tl.from(".leftPart h1",{
    opacity:0,
    y:20,
    
  },"anime1")
  .from(".leftPart .info-contact",{
    opacity:0,
    y:20,
  },"anime2")
  .from(".leftPart .mediaIcons",{
    opacity:0,
    y:20,
  },"anime3")
  .from(".leftPart button",{
    opacity:0,
    y:20,
  },"anime4")
  let tl1=gsap.timeline({
    scrollTrigger:{
      scroller:"#main",
      trigger:"#contactMe",
      start:"top 50%",
    }
  },"anime");
  tl.from(".rightPart form input",{
    y:20,
    opacity:0
  },"anime1")
  .from(".rightPart form textarea",{
    y:20,
    opacity:0
  },"anime2")
  .from(".rightPart form button",{
    y:20,
    opacity:0
  },"anime4")

}
contactMe()

menuEvent()

function formScript(){
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxPBl-PDTn9h1dhfZ3I3xVXuwSUK7F6rqrjszna9ehFAnHhECNfDC_rT8LVzveOdrRh/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
}
formScript();

function messagePage(){
  let button=document.querySelector(".rightPart form button");
  let popUp=document.querySelector("#reset-form");
  let cross=document.querySelector(".ri-close-fill");

  button.addEventListener("click",function(){
    popUp.style.scale=1;
    popUp.style.width="40%";

  })
  cross.addEventListener("click",function(){
    document.querySelector(".rightPart form").reset()
    popUp.style.scale=0;
    popUp.style.width=0;

  })
}
messagePage();