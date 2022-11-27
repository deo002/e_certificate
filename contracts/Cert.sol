pragma solidity 0.8.17;

contract Cert{
    // smart contract code goes here
    string certHash;
    string name;
    string roll;
    string email;

    mapping (string => bool) public hashvalue;

    // write function
    function set(string memory _certHash,string memory _name, string memory _roll, string memory _email) public {
        certHash = _certHash;
        name=_name;
        roll =_roll;
        email=_email;
        hashvalue[_certHash]=true;
    }
     //Read function
    function get(string memory _certHash) public view returns(bool){
        
        if(hashvalue[_certHash]){
            return true;
        }

        return false;
    }
}