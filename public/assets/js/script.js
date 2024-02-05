$(document).ready(function () {
    /* === MOUSE TRAIL === */
    let point = [];
    let mouse = {
        a: 0,
        b: 0,
    };

    function Points() {
        this.a = 0;
        this.b = 0;
        this.node = $("<div>").addClass("mouse-trail").appendTo("body")[0];
    }

    Points.prototype.draw = function () {
        $(this.node).css({ left: this.a + "px", top: this.b + "px" });
    };

    for (let i = 0; i < 100; i++) {
        point.push(new Points());
    }

    function draw() {
        let a = mouse.a;
        let b = mouse.b;

        point.forEach(function (points, index, pointsArray) {
            let mark = pointsArray[index + 1] || pointsArray[0];

            points.a = a;
            points.b = b;
            points.draw();
            a += (mark.a - points.a) * 0.5;
            b += (mark.b - points.b) * 0.5;
        });
    }

    $(document).on("mousemove", function (e) {
        mouse.a = e.pageX;
        mouse.b = e.pageY;
    });

    function animation() {
        draw();
        requestAnimationFrame(animation);
    }

    animation();
    /* === MOUSE TRAIL END === */
    /* === H1 Blob effect === */
    $(".letter").on("mouseenter", function () {
        $(this).addClass("rubberBand").on("animationend", function () {
            $(this).removeClass("rubberBand");
        });
    });
    /* === H1 Blob effect END === */
    /* === MAIN SECTIONS START === */
    function handleSectionClick(sectionClass) {
        $("body").addClass(`${sectionClass}-on`);
        ["about", "skills", "portfolio", "contact"].forEach((s) => {
            if (s !== sectionClass) {
                $("body").removeClass(`${s}-on`);
            }
        });
    }
    // Main section
    $("#main-link").on("click", function () {
        handleSectionClick("main");
    });
    // About section
    $("#about-link").on("click", function () {
        handleSectionClick("about");
    });
    // Portfolio section
    $("#portfolio-link").on("click", function () {
        handleSectionClick("portfolio");
    });
    // Contact section
    $("#contact-link, .contact-me-button").on("click", function () {
        handleSectionClick("contact");
    });
    /* === MAIN SECTIONS END === */
    /* ===  === */
    $('a').each(function () {
        $(this).on('click', function (e) {
            window.addEventListener('hashchange', () => window.history.pushState({}, '',
                '/'), {});
        })
    })
    const docTitle = document.title;
    $(window).on({
        blur: function () { document.title = "Hey, come back :)"; },
        focus: function () { document.title = docTitle; }
    });
});