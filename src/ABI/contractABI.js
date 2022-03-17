export const jsonABI = [
	{
		"inputs": [],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const hrABI = [
    // Setter Function (Write)
    "function setMessage(string _message)",

    // Getter Function (Read)
    "function getMessage() view returns (string _message)"
] 

export const contractAddress = '0x5Ba1456B13a8CEdA69A085DcfdDB1fb17ff9f896'
