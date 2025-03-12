// Initialize GSAP and Locomotive Scroll for smooth scrolling and scroll-triggered animations
function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"), // Target element for smooth scrolling
        smooth: true
    });

    // Sync ScrollTrigger with Locomotive Scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    // Setup scroller proxy for Locomotive Scroll
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // Update Locomotive Scroll on ScrollTrigger refresh
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

init(); // Call the initialization function

// Cursor movement effect
var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

document.addEventListener("mousemove", function(dets) {
    // Update cursor position based on mouse coordinates
    crsr.style.left = dets.x + 20 + "px";
    crsr.style.top = dets.y + 20 + "px";
});

// GSAP animation for headings in .page1
gsap.from(".page1 h1, .page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
});

// GSAP timeline for scroll-triggered animation on .page1
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1", // Trigger animation when this element is in view
        scroller: ".main", // Use Locomotive Scroll
        start: "top 27%",
        end: "top 0",
        scrub: 3 // Smooth animation during scroll
    }
});

// Move h1 and h2 horizontally and resize video on scroll
tl.to(".page1 h1", { x: -100 }, "anim");
tl.to(".page1 h2", { x: 100 }, "anim");
tl.to(".page1 video", { width: "70%", maxWidth: "1000px" }, "anim");

// Change background to white and text to black at specific scroll position
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -115%",
        end: "top -120%",
        scrub: 3
    }
});

tl2.to(".main", { backgroundColor: "#fff" });
tl2.to("#nav h4, #logo", {
    backgroundColor: "transparent",
    clearProps: "backgroundColor"
});

// Change background back to black and text to white at specific scroll position
var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
});

tl3.to(".main", { backgroundColor: "#0F0D0D" });
tl3.to("#nav h4, #logo", {
    color: "#fff", // Reset text color
    backgroundColor: "transparent",
    clearProps: "backgroundColor"
});

// Hover effect for boxes (shows an image on hover)
var boxes = document.querySelectorAll(".box");
boxes.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var att = elem.getAttribute("data-image");
        crsr.style.width = "470px";
        crsr.style.height = "370px";
        crsr.style.borderRadius = "0";
        crsr.style.backgroundImage = `url(${att})`;
    });

    elem.addEventListener("mouseleave", function() {
        elem.style.backgroundColor = "transparent";
        crsr.style.width = "20px";
        crsr.style.height = "20px";
        crsr.style.borderRadius = "50%";
        crsr.style.backgroundImage = `none`;
    });
});

// Hover effect for navigation links (show/hide purple background)
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");
h4.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        purple.style.display = "block";
        purple.style.opacity = "1";
    });
    elem.addEventListener("mouseleave", function() {
        purple.style.display = "none";
        purple.style.opacity = "0";
    });
});

