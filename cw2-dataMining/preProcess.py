import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import string

list_of_stop_words = set(stopwords.words('english'))
punctuations = list(string.punctuation)


def removeNonalpha(sentence):
    '''
    Remove the letter which are not alphabets in this text 
    '''
    newSentence = ''
    for i in sentence:
        if i.isalpha():
            newSentence = newSentence + i
        else:
            newSentence = newSentence + ' '
    return newSentence


def tokenizeText(sentence):
    '''
    This function is used to tokenize the book text.
    Input:
        a single book
    Return:
        book text which is tokenized.
    '''
    # strip and change it to lowwer case
    sentence = removeNonalpha(sentence)
    sentence = sentence.strip().lower()
    # tokenize the sentence
    sentence_word_tokenized = word_tokenize(sentence)

    sentence_word_tokenized_without_punc = []
    for word in sentence_word_tokenized:
        # length is bigger than 2 or only contains alphabets and don't only contain one letter
        if (word.isalpha() or len(word) > 2) and (not len(word) == 1):
            if (not word.isdigit()) and (word not in punctuations):
                sentence_word_tokenized_without_punc.append(word)
    return sentence_word_tokenized_without_punc


def removeStopwords(tokenizedSentence):
    '''
    This function is used to tokenize the book text.
    Input:
        a single book
    Return:
        book text which is already removed stopwords.
    '''
    sentence_word_tokenized_without_punc_stop = []
    # remove the stopwords
    for word in tokenizedSentence:
        if word not in list_of_stop_words:
            sentence_word_tokenized_without_punc_stop.append(word)
    return sentence_word_tokenized_without_punc_stop


def outputFile(data, path, filename):
    '''
    Use for output
    Input: list of the word after pre-processing
    Ouput: The local file path
    '''
    f = open(path + "/textFile/" + filename, "w")
    f.write(" ".join(data))
    f.close()
    return
