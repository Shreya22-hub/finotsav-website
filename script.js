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
