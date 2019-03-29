import dataParser
import pickle
import os
import pandas as pd


class OCRText(object):
    '''
    The dataset of the OCR files.
    (imitaing the code style of MNIST in torhcvision.datasets)
    Method:
        .data: to see the data
        .dirTree: to see the directory
    '''

    dataName = "OCRText"

    @property
    def data(self):
        return self._data

    @property
    def dirTree(self):
        return self._dirTree

    @property
    def catalog(self):
        return self._catalog

    @property
    def bookid(self):
        return self._bookId

    def __init__(self, root, reParse=False):
        '''
        Args:
            root(string): append the string to the current path
            reParse(bool,optional): If True, re-parse the data, if not parsed.
        '''
        self.dirPath = os.getcwd() + '/gap-html/'
        self.pickledDataPath = os.getcwd() + '/' + root + '/' + self.dataName
        self._dataFrame = pd.DataFrame(
            columns=['book_title', 'contents', 'book_id'])
        self._dirTree = dataParser.get_dir_tree(self.dirPath)
        self._catalog = self.getCatalog()
        self._bookId = self.getBookId()

        if reParse:
            print("Check whether the data needs to be reparsed..")
            self.reParse()

        if not self._check_exist():
            raise RuntimeError(
                "Parsed dataset is not found, reparse it by `reParse=True`")

        self._data = pickle.load(open(self.pickledDataPath, 'rb'))
        print('Done.')

    def _check_exist(self):
        '''
        check the data whether is has been pickled to store
        '''
        # print("yes, you already have the dataset")
        return os.path.exists(self.pickledDataPath)

    def reParse(self):
        '''
        To re-parse the data set is the 'reParse=True'
        '''
        if self._check_exist():
            print("It is already stored. Loading dataset...")
            return
        self._dataFrame['book_title'] = self._catalog
        self._dataFrame['book_id'] = self._bookId
        # print(self._catalog)
        for index, tree_list in enumerate(self._dirTree.items()):
            first, second = tree_list
            temp_book = ''
            print("Parsing...", self._catalog[index])
            for item in second:
                singleFilePath = self.dirPath + first + '/' + item
                # parse single file, is temp
                temp_book = temp_book + ' ' + dataParser.parse(singleFilePath)
            self._dataFrame.iloc[index][1] = temp_book
            # this line of code, may need to be changed when it comes error. a[index][index]=value

        self._storeFile()

    def _storeFile(self):
        '''
        Store the DataFrame into disk using pickle module
        '''
        pickle.dump(self._dataFrame, open("OCRText", "wb"))
        print("Reparse and restore successfully..")
        # pickle.dump(self._dataFrame, open("OCRText", "wb"))

    def getCatalog(self):
        '''
        It seems that some books are same. But different edition from different year.
        '''
        titles = [
            "DICTIONARY GREEK AND ROMAN GEOGRAPHY",
            "THE HISTORY OF TACITUS",
            "THE HISTORY OF THE PELOPONNESIAN WAR",
            "THE HISTORY OF ROME",
            "THE HISTORY OF THE DECLINE AND FALL OF THE ROMAN EMPIRE",
            "THE WHOLE GENUINE WORKS OF FLAVIUS JOSEPHUS",
            "THE DESCRIPTION OF GREECE",
            "HISTORY OF ROME",
            "GIBBON'S HISTORY OP THE DECLINE AND FALL OF THE ROMAN EMPIRE",
            "GIBBON'S HISTORY OP THE DECLINE AND FALL OF THE ROMAN EMPIRE",
            "THE HISTORICAL ANNALS OF  CORNELIUS TACITUS",
            "HISTORY OF ROME",
            "THE GENUINE WORKS OF FLAVIUS JOSEPHUS",
            "THE HISTORY OF THE DECLINE AND FALL OF THE ROMAN EMPIRE"
            "THE HISTORIES OF CAIUS COBNELIUS TACITUS: NOTES FOR COLLEGES",
            "THE HISTORY OF THE DECLINE AND FALL OF THE ROMAN EMPIRE",
            "THE HISTORY OF THE DECLINE AND FALL OF THE ROMAN EMPIRE",
            "THE HISTORY OF ROME",
            "THE HISTORY OF THE PELOPONNESIAN WAR",
            "TITUS LIVIUS' ROMAN TRANSLATED INTO ENGLISH",
            "THE WORKS OF JOSEPHUS",
            "THK ANNALS OF TACITUS",
            "THE FIRST AND THIRTY-THIRD BOOKS OF PLINY'S NATURAL HISTORY",
            "THE WORKS OF FLAVIUS JOSEPHUS"
        ]
        return titles

    def getBookId(self):
        bookId = ['-C0BAAAAQAAJ',
                  '2X5KAAAAYAAJ',
                  '9ksIAAAAQAAJ',
                  'Bdw_AAAAYAAJ',
                  'CSEUAAAAYAAJ',
                  'CnnUAAAAMAAJ',
                  'DhULAAAAYAAJ',
                  'DqQNAAAAYAAJ',
                  'GIt0HMhqjRgC',
                  'IlUMAQAAMAAJ',
                  'MEoWAAAAYAAJ',
                  'RqMNAAAAYAAJ',
                  'TgpMAAAAYAAJ',
                  'VPENAAAAQAAJ',
                  'WORMAAAAYAAJ',
                  'XmqHlMECi6kC',
                  'aLcWAAAAQAAJ',
                  'dIkBAAAAQAAJ',
                  'fnAMAAAAYAAJ',
                  'm_6B1DkImIoC',
                  'ogsNAAAAIAAJ',
                  'pX5KAAAAYAAJ',
                  'udEIAAAAQAAJ',
                  'y-AvAAAAYAAJ']

        return bookId
