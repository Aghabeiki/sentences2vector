# sentences2vector
Get Similarity of two sentences based gensim word2vec trained model.

* A working Example exist on example directory.
* Docs available [here](https://aghabeiki.github.io/sentences2vector/)



For saving your model from Gensim to our Module use this steps:


1- Train your Word2Vec model in Python Gensim.

2- Then store it as a plain text Google Word2Vec format.

```python
model.wv.save_word2vec_format('./data/text.model', binary = False)
model.intersect_word2vec_format('./data/text.model', lockf=0.0, binary=False, encoding='utf8', unicode_errors='strict')
```


Aether: Amin Aghabeiki.


License MIT.

If you updated/improved it, please keep the code open source as is it!
let make Open Source Greater!
