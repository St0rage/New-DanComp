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


// Ajax

$.ajax({
    url : `data/product.json`,
    success : (results) => {
        const label = $('.label-product').html().toLowerCase();
        const imgModal = $('.img-modal');
        let data;
        $('.form-check-input').on('click', function() {
            if($(this).prop('checked') == false) {
                if($('.form-check-input').not(this).prop('checked') == false) {
                    $('.sidebar-right').html('');
                } else if($('.form-check-input').not(this).prop('checked') == true) {
                    const id = $('.form-check-input').not(this).val();
                    data = strConcat(results[label].filter(p => p.tipe === id));
                    $('.sidebar-right').html(data);
                } else {
                    $('.sidebar-right').html('');
                }
            }
            if($(this).prop('checked') == true) {
                if($('.form-check-input').not(this).prop('checked') == true) {
                    data = strConcat(results[label]);
                    $('.sidebar-right').html(data);
                } else if($('.form-check-input').not(this).prop('checked') == false){
                    const id = $(this).val();
                    data = strConcat(results[label].filter(p => p.tipe === id));
                    $('.sidebar-right').html(data);
                } else {
                    data = strConcat(results[label]);
                    $('.sidebar-right').html(data);
                }
            }

            $('.show-detail').on('click', function() {
                $.ajax({
                    url: `data/detail.json`,
                    success : (result) => {
                        const id = $(this).data('id');
                        const data_2 = result[id];
                        const str = results[label].filter(f => f.id == id);
                        const imgModal = $('.img-modal');
                        const judulModal = $('.judul-modal');
                        imgModal.attr('src', `img/products/${str[0].gambar}`);
                        judulModal.html(str[0].nama);
                        console.log(id);
                        let hasil;
                        for(const p in data_2) {
                            hasil += showDetail(p, data_2[p])
                        }
                        $('.t-body').html(hasil)
                    }
                })
            })
        })
    } 
})

function showCards(m) {
    return `<div class="card bg-transparent border-0">
                <img src="img/products/${m.gambar}" class="card-img-top img-fluid">
                <div class="card-body d-flex flex-column justify-content-end align-items-center">
                    <h5 class="card-title">${m.nama}</h5>
                    <button type="button" class="btn btn-primary show-detail" style="width: 80px;" data-bs-toggle="modal" data-bs-target="#detailModal" data-id="${m.id}">
                        Detail
                    </button>
                </div>
            </div>`
}
function showDetail(p, d) {
    let li;
    d.forEach(t => {
        li += `<li>${t}</li>`
    })
    return `<tr>
                <td>${p}</td>
                <td><ol>${li}<ol></td>
            </tr>`
}

function strConcat(data) {
    let cards = '';
        data.forEach(m => {
            cards += showCards(m);
        });
    return cards;
}