function setup() {
    window.addEventListener('scroll', scrollUpdate)
    document.scrollAnimations = [];
    let animations = Array.from(document.getElementsByClassName("onscroll"));
    animations.forEach(a => addScollAnimationFor(a));
}

function addScollAnimationFor(element) {
    console.log('adding scroll animation')
    let toAdd = Array.from(element.classList)
        .filter(className => className.startsWith("scroll:"))
        .map(className => className.substring(className.indexOf(":") + 1));
    let toRemove = Array.from(element.classList)
        .filter(className => className.startsWith("-scroll:"))
        .map(className => className.substring(className.indexOf(":") + 1));

    element.classList.add(...toRemove);

    document.scrollAnimations.push({
        element,
        active: false,
        toAdd,
        toRemove
    });
}

function scrollUpdate(event) {
    for (let item of document.scrollAnimations) {
        let top = item.element.getBoundingClientRect().top;
        let dist = window.innerHeight - top;
        if (dist > 10 && !item.active) {
            item.element.classList.add(...item.toAdd);
            item.element.classList.remove(...item.toRemove);
            item.active = true;
        } else if (dist < -10 && item.active) {
            item.element.classList.remove(...item.toAdd);
            item.element.classList.add(...item.toRemove);
            item.active = false;
        }
    }
}

window.onload = setup;
