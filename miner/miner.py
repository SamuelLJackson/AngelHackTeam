
# coding: utf-8

# In[9]:


import web3

from web3 import Web3


# In[48]:


import random
def generate_random_number():
    return str(random.randint(1000000,9999999))


# In[57]:


# difficulty is an int 


def mine(challenge, public_address, difficulty):
    while True:
        nonce = generate_random_number()
#         print(challenge+public_address+nonce)
        hash1 = int(Web3.sha3(hexstr=Web3.toHex(challenge+public_address+nonce)), 16)
        if hash1 % difficulty == 0:
            return print(nonce, hash1)


# In[58]:


mine('a','b',10)


# In[59]:



