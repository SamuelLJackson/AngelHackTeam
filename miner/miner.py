
# coding: utf-8

# In[9]:

import web3
from web3 import Web3
import requests,json, time,random
import pandas as pd
from Naked.toolshed.shell import execute_js, muterun_js, run_js

public_address = "0xe010ac6e0248790e08f42d5f697160dedf97e024";
private_key = "3a10b4bc1258e8bfefb95b498fb8c0f0cd6964a811eabca87df5630bcacd7216";
contract_address = "0xe7dd7e79548817695e89fb418e748fdfef34f3b7"


def generate_random_number():
    return str(random.randint(1000000,9999999))

# difficulty is an int 


def mine(challenge, public_address, difficulty):
	x = 0;
	while True:
		x += 1;
		nonce = generate_random_number()
		hash1 = int(Web3.sha3(hexstr=Web3.toHex(challenge+public_address+nonce)), 16)
		if hash1 % difficulty == 0:
			return nonce;
		if x % 10000 == 0:
			_challenge,_nonce,_difficulty = getVariables();
			if _challenge == challenge:
				pass;
			else:
				return 0;

def getAPIvalue():
	url = "https://api.gdax.com/products/BTC-USD/ticker"
	response = requests.request("GET", url)
	price = response.json()['price'] 
	print(price)
	return price

# In[58]:
def masterMiner():
	while True:
		challenge,nonce,difficulty = getVariables();
		nonce = mine(challenge,nonce,difficulty);
		if(nonce > 0):
			print ("You guessed the hash");
			value = getAPIvalue();
			arg_string =""+ str(nonce) + " "+str(value)+" "+str(contract_address)+" "+str(public_address)
			run_js('submitter.js',arg_string);
		else:
			pass
# In[59]:

def getVariables():
	payload = {"jsonrpc":"2.0","id":3,"method":"eth_call","params":[{"to":contract_address,"data":"0x94aef022"}, "latest"]}
	r = requests.post("https://rinkeby.infura.io/", data=json.dumps(payload));
	print(r.content)
	val = r.content
	val2 = val[100:]
	val1 = val[34:99]
	print(val1);
	val3 = bytes_to_int(val2)
	print(val3)
	#return _challenge,_difficulty;

def bytes_to_int(bytes):
    result = 0

    for b in bytes:
        result = result * 256 + int(b)

    return result
getVariables()