
# coding: utf-8

# In[9]:

import web3
from web3 import Web3
import requests,json, time,random
import pandas as pd
from Naked.toolshed.shell import execute_js, muterun_js, run_js

def generate_random_number():
    return str(random.randint(1000000,9999999))

# difficulty is an int 


def mine(challenge, public_address, difficulty):
	x = 0;
    while True:
    	x++;
        nonce = generate_random_number()
#         print(challenge+public_address+nonce)
        hash1 = int(Web3.sha3(hexstr=Web3.toHex(challenge+public_address+nonce)), 16)
        if hash1 % difficulty == 0:
            return nonce;
        if x % 10000 == 0:
        	_challenge,_nonce,_difficulty getVariables();
        	if _challenge == challenge:
        		pass;
        	else:
        		return 0;

# In[58]:
def masterMiner():
	while True:
		challenge,nonce,difficulty = getVariables():
		nonce = mine(challenge,nonce,difficulty);
		if(nonce > 0):
			print ("You guessed the hash");
			value = getAPIvalue();
			arg_string =""+ str(nonce) + " "+str(value)
			run_js('ethoracle_date.js',arg_string);
		else:
			pass
# In[59]:

def getVariables():
	payload = {"jsonrpc":"2.0","id":3,"method":"eth_call","params":[{"to":"0x177e66ad4cdf0c0f3df92a744a667108bd95c305","data":"0xc16fe907"}, "latest"]}
	r = requests.post("http://40.117.249.181:8545", data=payload);

	return _challenge,_nonce,_difficulty;

masterMiner();