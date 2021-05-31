// Breakpoints
function sliderBreakPoint(x) {
    const img = $('.slide-break');

    if(x.matches) {
        img.each(function(i) {
            $(this).attr('src', `img/slider/img-res${i+1}.jpg`)
        })
    }else {
        img.each(function(i) {
            $(this).attr('src', `img/slider/img${i+1}.jpg`)
        })
    }
}

function itemBreakPoint(x) {
    const arr = ['motherboard', 'graphic-card', 'processor', 'memory', 'storage', 'power-supply', 'case', 'monitor', 'laptop', 'accessories'];
    let newItem = '';
    const itm = $('.items');
    const resItm = $('.res-items');

    arr.forEach(n => {
        newItem += resItems(n);
    });

    if(x.matches) {
        itm.css('display', 'none');
        resItm.css('display', 'block');

        $('.res-items > .container > .row').append(newItem);

    }else {
        resItm.css('display', 'none')
        itm.css('display', 'block');
    }
}

const x = window.matchMedia("(max-width: 991px)");
sliderBreakPoint(x);
itemBreakPoint(x);
x.addListener(sliderBreakPoint);
x.addListener(itemBreakPoint);



// elements
function resItems(n) {
    return `<div class="col-6 offset-3">
                <figure class="figure">
                    <a href="${n}.html">
                    <img src="img/items/xd/${n}.png" class="figure-img img-fluid">
                    </a>
                    <figcaption class="figure-caption">
                        <p>${n.toUpperCase()}</p>
                    </figcaption>
                </figure>
            </div>`;
}