var $articleList = $(".articleList"), $articleDetail = $(".activeDetail"), $indexDiv = $(".indexDiv"),
    $menuLi;

$(document).ready(function () {
    var $ul = $(".msNav");
    news.forEach(function (obj) {
        var html = [];
        if (obj.menu && obj.display) {
            if (hasShowBoard(obj)) {
                html.push(" <li class='dropdown'>" +
                    "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'" +
                    " aria-expanded='false' data-menu='" + obj.menu + "'>" + obj.menu + "<span class='caret'></span></a><ul class='dropdown-menu'>");
                obj.board.forEach(function (board) {
                    if (board.display) {
                        html.push("<li><a href='#' data-menu='" + obj.menu + "' data-type='board' data-page='" + board.name + "'>" + board.name + "</a></li><li role='separator' class='divider'></li>")
                    }
                });
                html.push("</ul></li>");
            } else {
                html.push("<li><a href='#' data-menu='" + obj.menu + "' data-page='" + obj.menu + "' data-type='noBoard'>" + obj.menu + "</a></li>");
            }
            $ul.append(html.join(''));
        }
    });
    $menuLi = $ul.find('li');

    $("#indexPage").click(function () {
        $indexDiv.show();
        $articleDetail.children().remove();
        $articleDetail.text('');
        $articleList.children().remove();
        $menuLi.removeClass('active');
        $(this).parent().addClass('active');
    });

    genCarousel();
    genBoardDiv();
    regImgClick();
    regMenuClick();
    regArticleClick();
});

/**
 * 生成首页图片轮播
 */
function genCarousel() {
    var $carouselInner = $(".carousel-inner");
    news.forEach(function (obj) {
        if (obj.menu && obj.display) {
            if (hasShowBoard(obj)) {
                obj.board.forEach(function (board) {
                    if (board.display && board.article && board.article.length > 0) {
                        board.article.forEach(function (article) {
                            if (article.display && article.carousel && article.img && article.img.length > 0 && article.url && article.url.length > 0) {
                                $carouselInner.append("<div class='item'>" +
                                    "<img src='" + article.img + "'>" +
                                    "<div class='carouselDiv'><a href='#' data-menu='" + obj.menu + "' class='carouselTitle' data-type='article' data-page='" + article.url + "'>" + article.title + "</a></div></div>")
                            }
                        })
                    }
                })
            } else if (obj.article && obj.article.length > 0) {
                obj.article.forEach(function (article) {
                    if (article.display && article.carousel && article.img && article.img.length > 0 && article.url && article.url.length > 0) {
                        $carouselInner.append("<div class='item'>" +
                            "<img src='" + article.img + "'>" +
                            "<div class='carouselDiv'><a href='#' data-menu='" + obj.menu + "' class='carouselTitle' data-type='article' data-page='" + article.url + "'>" + article.title + "</a></div></div>")
                    }
                })
            }
        }
    });
    var item = $carouselInner.find(".item");
    if (item.length === 0) {
        $(".carousel").parent().remove();
    } else {
        $(item[0]).addClass('active');
    }

    $(".carousel").append("<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>\n" +
        "                <span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>\n" +
        "                <span class='sr-only'>Previous</span>\n" +
        "            </a>\n" +
        "            <a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>\n" +
        "                <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>\n" +
        "                <span class='sr-only'>Next</span>\n" +
        "            </a>")
}

/**
 * 生成首页各模块文章列表
 */
function genBoardDiv() {
    var num = 1;
    news.forEach(function (obj) {
        var html = [];
        if (obj.display) {
            html.push("<div class='boardDiv " + ((num % 2) ? 'odd' : '') + "'><div class='bdTitle'><a class='boardAll' href='#' data-menu='" + obj.menu + "'>" + obj.menu + "</a></div>");
            html.push("<div><ul class='article'>");
            var count = 0;
            if (obj.board && obj.board.length > 0) {
                obj.board.forEach(function (board) {
                    if (board.display && count < 10) {
                        if (board.article && board.article.length > 0) {
                            board.article.forEach(function (article) {
                                if (article.display && article.title && count < 10) {
                                    count++;
                                    html.push("<li><a href='#' style='" + article.style + "' data-menu='" + obj.menu + "' data-page='" + article.url + "'>" + article.title + "</a></li>")
                                }
                            })
                        }
                    }
                })
            } else if (obj.article && obj.article.length > 0) {
                obj.article.forEach(function (article) {
                    if (article.display && article.title && count < 10) {
                        count++;
                        html.push("<li><a href='#' style='" + article.style + "' data-menu='" + obj.menu + "' data-page='" + article.url + "'>" + article.title + "</a></li>")
                    }
                })
            }
            if (count === 0) {
                return;
            }
            html.push("</ul></div></div>");
            $indexDiv.append(html.join(''));
            num++;
        }
    });

    $indexDiv.append("<div class='boardDiv odd'><img src='/img/img1.jpg' style=' height: 175px;width: 500px;'></div>");

}

/**
 * 搜索点击事件
 */
$("#submit").click(function () {
    var title = $("#searchTitle").val();
    if (title && title.length > 0) {
        var html = [];
        var count = 0;
        html.push("<ul class='articleListUl article'>");
        news.forEach(function (obj) {
            if (obj.display) {
                if (obj.board && obj.board.length > 0) {
                    obj.board.forEach(function (board) {
                        if (board.display) {
                            if (board.article && board.article.length > 0) {
                                board.article.forEach(function (article) {
                                    if (article.display && article.title && article.title.indexOf(title) >= 0) {
                                        html.push("<li><a href='#' style='" + article.style + "' data-menu='" + obj.menu + "' data-page='" + article.url + "'>" + article.title + "</a></li>")
                                        count++;
                                    }
                                })
                            }
                        }
                    })
                }
                else if (obj.article && obj.article.length > 0) {
                    obj.article.forEach(function (article) {
                        if (article.display && article.title && article.title.indexOf(title) >= 0) {
                            html.push("<li><a href='#' style='" + article.style + "' data-menu='" + obj.menu + "' data-page='" + article.url + "'>" + article.title + "</a></li>")
                            count++;
                        }
                    })
                }
            }
        });
        html.push("</ul>");
        if (count === 0) {
            html = [];
            html.push("未查找到包含搜索值的文章！")
        }
        $menuLi.removeClass('active');
        $indexDiv.hide();
        $articleDetail.children().remove();
        $articleDetail.text('');
        $articleList.children().remove();
        $articleList.append(html.join(''));
        if (count !== 0) {
            regArticleClick();
        }
    }
});

/**
 * 注册文章列表点击事件
 */
function regArticleClick() {
    $("ul.article a").off('click').click(function () {
        var dataMenu = $(this).attr("data-menu"),
            dataPage = $(this).attr("data-page"),
            dataType = $(this).attr("data-type");
        if (dataMenu && dataPage && !dataType) {
            articleLinkClick(this);
        }
    })
}


/**
 * 注册菜单栏点击事件
 */
function regMenuClick() {
    $menuLi.find('a').click(function () {
        if ($(this).text() === '首页') {
            return;
        }
        var dataPage = $(this).attr('data-page');
        if (!dataPage) {
            return;
        }
        var article = [];
        var dateType = $(this).attr('data-type'), dataMenu = $(this).attr('data-menu');
        if (dateType === 'board') {
            article = findArticleByBoardName(dataPage);
        }
        else if (dateType === 'noBoard') {
            article = findArticleByMenuName(dataPage);
        }

        genArticleList(article, dataMenu);
        regArticleClick();
        $menuLi.removeClass('active');
        $(".msNav a[data-menu=" + dataMenu + "]").parent().addClass('active');
        $indexDiv.hide();
        $articleDetail.children().remove();
        $articleDetail.text('');
    })
}

/**
 * 生成文章列表
 * @param article
 */
function genArticleList(article, dataMenu) {
    var html = [];
    if (article && article.length > 0) {
        html.push("<ul class='articleListUl article'>");
        article.forEach(function (article) {
            if (article.display) {
                html.push(" <li><a href='#' data-menu='" + dataMenu + "' style='" + article.style + "' data-page='" + article.url + "'>" + article.title + "</a></li>")
            }
        });
        html.push("</ul>")
    }
    $indexDiv.hide();
    $articleList.children().remove();
    $articleDetail.children().remove();
    $articleList.append(html.join(''));
}

/**
 * 根据版块名查找文章列表
 * @param boardName
 */
function findArticleByBoardName(boardName) {
    var articles = [], find = false;
    news.every(function (obj) {
        obj.board.every(function (board) {
            if (board.name === boardName) {
                articles = board.article;
                find = true;
                return false;
            }
            return true;
        });
        return !find;
    });
    return articles;
}

/**
 * 没有版块的菜单根据菜单名查找文章列表
 * @param menuName
 */
function findArticleByMenuName(menuName) {
    var articles = [];
    news.every(function (obj) {
        if (obj.menu === menuName) {
            articles = obj.article;
            return false;
        }
        return true;
    });
    return articles;
}

/**
 * 注册首页图片及文字链接点击事件
 */
function regImgClick() {
    $(".carousel-inner img").click(function () {
        var a = $(this).next().find('a');
        articleLinkClick(a);
    });

    $(".carousel-inner .carouselDiv a").click(function () {
        articleLinkClick(this);
    })
}

/**
 * 文章链接点击事件
 */
function articleLinkClick(a) {
    var url = $(a).attr('data-page'),
        menu = $(a).attr('data-menu');
    $.ajax({
        url: 'article/' + url,
        type: 'get',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            $menuLi.removeClass('active');
            $(".msNav a[data-menu=" + menu + "]").parent().addClass('active');
            $indexDiv.hide();
            $articleList.children().remove();
            $articleDetail.append(data);
        },
        error: function () {
            $menuLi.removeClass('active');
            $(".msNav a[data-menu=" + menu + "]").parent().addClass('active');
            $indexDiv.hide();
            $articleList.children().remove();
            $articleDetail.append("该文章已不存在！");
        }
    })
}

/**
 * 是否有可以显示的版块
 * @param obj
 * @returns {boolean}
 */
function hasShowBoard(obj) {
    if (!obj.board || obj.board.length === 0) {
        return false;
    }
    var has = false;
    obj.board.every(function (board) {
        if (board.display) {
            has = true;
            return false;
        }
        return true;
    });
    return has;
}
