<<<<<<< HEAD
function scrollToForm(){
    document.getElementById("contactForm").scrollIntoView({
        behavior: "smooth"
    });
}
function calculateBudget(){

    let guests = document.getElementById("guests").value;
    let catering = document.getElementById("catering").value;
    let decoration = document.getElementById("decoration").value;
    let misc = document.getElementById("misc").value;

    guests = Number(guests);
    catering = Number(catering);
    decoration = Number(decoration);
    misc = Number(misc);

    let cateringTotal = guests * catering;
    let total = cateringTotal + decoration + misc;

    document.getElementById("totalCost").innerHTML =
        "Estimated Total Budget: ₹ " + total.toLocaleString();
}
function revealOnScroll(){
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((el)=>{
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", function(){
    if(window.scrollY > 300){
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
});

document.getElementById("topBtn").onclick = function(){
    window.scrollTo({top:0, behavior:"smooth"});
};
=======
function scrollToForm(){
    document.getElementById("contactForm").scrollIntoView({
        behavior: "smooth"
    });
}
function calculateBudget(){

    let guests = document.getElementById("guests").value;
    let catering = document.getElementById("catering").value;
    let decoration = document.getElementById("decoration").value;
    let misc = document.getElementById("misc").value;

    guests = Number(guests);
    catering = Number(catering);
    decoration = Number(decoration);
    misc = Number(misc);

    let cateringTotal = guests * catering;
    let total = cateringTotal + decoration + misc;

    document.getElementById("totalCost").innerHTML =
        "Estimated Total Budget: ₹ " + total.toLocaleString();
}
function revealOnScroll(){
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach((el)=>{
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", function(){
    if(window.scrollY > 300){
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
});

document.getElementById("topBtn").onclick = function(){
    window.scrollTo({top:0, behavior:"smooth"});
};
>>>>>>> 097a49244a16a1e65b080bb9d49204dd5bf91740
