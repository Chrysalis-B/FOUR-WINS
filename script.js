var curPlayer = "player1";

$(".column").on("click", function(e) {
    var slotsInColumn = $(e.currentTarget).find(".slot");
    for (var i = 5; i >= 0; i--) {
        if (!slotsInColumn.eq(i).hasClass("player1")) {
            if (!slotsInColumn.eq(i).hasClass("player2")) {
                break;
            }
        }
    }
    slotsInColumn.eq(i).addClass(curPlayer);

    if (checkForVictory(slotsInColumn)) {
        $(".win").css("display", "block");
        $(".board").css("pointer-events", "none");
        winDeclaration();
    } else if (checkForVictory($(".row" + i))) {
        $(".win").css("display", "block");
        $(".board").css("pointer-events", "none");
        winDeclaration();
    } else if (checkDiagonal($(".slot"))) {
        $(".win").css("display", "block");
        $(".board").css("pointer-events", "none");
        winDeclaration();
    }
    switchPlayer();
});

function switchPlayer() {
    if (curPlayer == "player1") {
        curPlayer = "player2";
    } else {
        curPlayer = "player1";
    }
}

function checkForVictory(slots) {
    var counter = 0;
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(curPlayer)) {
            counter++;
            if (counter == 4) {
                slots
                    .eq(i)
                    .find(".hole")
                    .addClass("victory");
                slots
                    .eq(i - 1)
                    .find(".hole")
                    .addClass("victory");
                slots
                    .eq(i - 2)
                    .find(".hole")
                    .addClass("victory");
                slots
                    .eq(i - 3)
                    .find(".hole")
                    .addClass("victory");
                return true;
            }
        } else {
            counter = 0;
        }
    }
}

function checkDiagonal(slots) {
    for (var i = 0; i < slots.length; i++) {
        if (
            slots.eq(i).hasClass(curPlayer) &&
            slots.eq(i + 7).hasClass(curPlayer) &&
            slots.eq(i + 14).hasClass(curPlayer) &&
            slots.eq(i + 21).hasClass(curPlayer)
        ) {
            slots
                .eq(i)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 7)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 14)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 21)
                .find(".hole")
                .addClass("victory");
            return true;
        } else if (
            slots.eq(i).hasClass(curPlayer) &&
            slots.eq(i + 5).hasClass(curPlayer) &&
            slots.eq(i + 10).hasClass(curPlayer) &&
            slots.eq(i + 15).hasClass(curPlayer)
        ) {
            slots
                .eq(i)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 5)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 10)
                .find(".hole")
                .addClass("victory");
            slots
                .eq(i + 15)
                .find(".hole")
                .addClass("victory");
            return true;
        }
    }
}

function winDeclaration() {
    if (curPlayer == "player1") {
        $(".win-declaration").html("lavender mist wins");
        $(".restart").css("background", "#eae1fd");
    }
    if (curPlayer == "player2") {
        $(".win-declaration").html("piggy pink wins");
        $(".restart").css("background", "#fbddeb");
    }
}

$(".column").on("mouseenter", function(e) {
    console.log(e);
    e.stopPropagation();
    $(e.currentTarget)
        .find(".empty")
        .addClass(curPlayer);
});

$(".column").on("mouseleave", function() {
    $(".empty").removeClass("player1");
    $(".empty").removeClass("player2");
});

$(".column").on("click", function() {
    $(".empty").removeClass("player1");
    $(".empty").removeClass("player2");
});

$(".restart").on("click", function() {
    $(".player1")
        .find(".hole")
        .addClass("fall");
    $(".player2")
        .find(".hole")
        .addClass("fall");
    setTimeout(function() {
        location.reload();
    }, 1000);
});
