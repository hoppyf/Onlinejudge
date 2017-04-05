# coding=utf-8
from django.core.paginator import Paginator


def do_pages(obj_list, per_page_num, page):
    paginator = Paginator(obj_list, per_page_num)
    error = 0
    after_range_num = 4
    before_range_num = 5

    if page >= before_range_num:
        page_range = range(page - after_range_num, min(page + before_range_num + 1, paginator.num_pages + 1))
    else:
        page_range = range(1, min(paginator.num_pages + 1, page + after_range_num + 1))
    try:
        current_page = paginator.page(page)
    except:
        error = 1
        current_page = None
    previous_page = next_page = None
    try:
        previous_page = paginator.page(page).previous_page_number()
    except Exception:
        pass
    try:
        next_page = paginator.page(page).next_page_number()
    except Exception:
        pass
    if obj_list.count() <= per_page_num:
        one_page = True
    else:
        one_page = False

    return current_page, previous_page, next_page, page_range, error, one_page
