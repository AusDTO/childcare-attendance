
function initHelp(helpID, linkClass) {
    // default values when none provided:
    helpID = helpID ? helpID : "#help";
    linkClass = linkClass ? linkClass : ".cd-btn, .cd-help-link";

    /* Expand collapse headings config */
    var help = new jQueryCollapse($(helpID).find(".showhide"), {
        query: 'h3',
        open: function () {
            this.slideDown(150);
        },
        close: function () {
            this.slideUp(150);
        }
    });
    $(helpID).find('.cd-panel').on('click', function (event) {
        if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
            help.close();
            $(helpID).find('.cd-panel').removeClass('is-visible');
            event.preventDefault();
            help.element.focus();
        }
    });
    $(linkClass).on('click', function (event) {
        help.element = $(this);
        var href = $(this).attr("href");
        notifyGAofHelpRequest(href);
        var helpAnchors = $(helpID + " .help-anchor");
        var anchor = helpAnchors.eq(helpAnchors.index($(href)));
        var section = anchor.nextAll("h3").first();
        var index = $(helpID + " h3").index($(section));
        //var index = $(helpID + " .help-anchor").index($(href));
        $(helpID + " .cd-panel-content").scrollTop(0);
        help.open(index);
        event.preventDefault();
        $(helpID).find('.cd-panel').addClass('is-visible').promise().done(function() {
            window.setTimeout(function () {
                scrollInParent($(helpID + " h3.open"));
                $(helpID + " h3.open a").focus();
            }, 500);
        });
    });

    $(helpID).keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 9) {
            var links = $(helpID).find("a:visible");
            var index = links.index(e.target);
            index += e.shiftKey ? -1 : 1;
            //alert($(e.target).html() + ": " + index);
            if (index < 0 || index >= links.length) {
                help.close();
                $(helpID).find('.cd-panel').removeClass('is-visible');
                e.preventDefault();
                help.element.focus();
            }
        }
    });
}
function initSaveForLater() {
    $("#saveForLater").load("save-for-later-content.html?t=" + (new Date()).getTime(), function () {
        setTimeout(function() {
            var saveForLater = new jQueryCollapse($("#saveForLater").find(".saveforlater"), {
                open: function () {
                    this.slideDown(150);
                },
                close: function () {
                    this.slideUp(150);
                }
            });
            $("#saveForLater").find('.cd-panel').on('click', function (event) {
                if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ||
                    $(event.target).is('#save-cancel') || $(event.target).is('#save-save')) {
                    saveForLater.close();
                    $("#saveForLater").find('.cd-panel').removeClass('is-visible');
                    event.preventDefault();
                    $('#settings').toggle();
                }
            });
            $('.btn-panel').on('click', function (event) {
                saveForLater.open();
                event.preventDefault();
                $('#settings').toggle();
                $("#saveForLater").find('.cd-panel').addClass('is-visible');$("#saveForLater").find('.cd-panel').addClass('is-visible');
            });
        }, "10");
    });    
}