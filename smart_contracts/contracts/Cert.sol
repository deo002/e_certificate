pragma solidity ^0.8.17;

contract Cert {
    struct Certificate {
        string firstName;
        string lastName;
        uint256 yearOfPassing;
        uint256 gpa;
        uint256 index;
    }

    // certificates are mapped to roll numbers
    mapping(string => Certificate) private certificates;

    // helps us know if a particular key exists or not
    string[] private certificateKeys;

    function studentALreadyExists(
        string memory rollNo
    ) internal view returns (bool) {
        if (certificateKeys.length == 0) return false;
        return (keccak256(bytes(certificateKeys[certificates[rollNo].index])) ==
            keccak256(bytes(rollNo)));
    }

    function createCertificate(
        string memory firstName,
        string memory lastName,
        uint256 yearOfPassing,
        uint256 gpa,
        string memory rollNo
    ) external returns (bool) {
        require(bytes(firstName).length > 0, "First Name cannot be empty");
        require(bytes(lastName).length > 0, "Last Name cannot be empty");
        require(bytes(rollNo).length > 0, "Roll Number cannot be empty");

        if (studentALreadyExists(rollNo)) revert("duplicate");
        certificates[rollNo].firstName = firstName;
        certificates[rollNo].lastName = lastName;
        certificates[rollNo].yearOfPassing = yearOfPassing;
        certificates[rollNo].gpa = gpa;

        certificateKeys.push(rollNo);
        certificates[rollNo].index = certificateKeys.length - 1;

        return true;
    }

    function updateCertificate(
        string memory firstName,
        string memory lastName,
        uint256 yearOfPassing,
        uint256 gpa,
        string memory rollNo
    ) external returns (bool) {
        require(bytes(firstName).length > 0, "First Name cannot be empty");
        require(bytes(lastName).length > 0, "Last Name cannot be empty");
        require(bytes(rollNo).length > 0, "Roll Number cannot be empty");

        if (!studentALreadyExists(rollNo)) revert("Student does not exist");
        certificates[rollNo].firstName = firstName;
        certificates[rollNo].lastName = lastName;
        certificates[rollNo].yearOfPassing = yearOfPassing;
        certificates[rollNo].gpa = gpa;

        return true;
    }

    function showCertificate(
        string memory rollNo
    ) external view returns (Certificate memory) {
        if (!studentALreadyExists(rollNo)) revert("Student does not exist");
        Certificate memory c = certificates[rollNo];
        return c;
    }
}

// https://dev.to/daltonic/how-to-code-solidity-smart-contract-crud-functions-the-right-way-3h31
