from bs4 import BeautifulSoup as bs
import os


def parse(path):
    '''
    Parse single html file to text string.
    '''
    soup = bs(open(path).read(), features="html.parser")
    content = soup.find_all("span", class_="ocr_cinfo")
    text = ' '.join([i.contents[0] for i in content])
    return text


def get_dir_tree(path):
    '''
    Get the dir tree, store it into dict and return it.
    '''
    dir_tree = {}
    first_level_list = sorted(os.listdir(path))
    for item in first_level_list:
        # Be careful to ignore the `.DS_store` file.
        if not item.startswith('.'):
            # .DS_Store not in list of this level dir
            dir_tree[item] = sorted(os.listdir(path + item))
    return dir_tree
