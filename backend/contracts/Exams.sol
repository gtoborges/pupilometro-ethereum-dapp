// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Exams {

  struct ExamResult {
    string[] videos;
    string[] images;
    string[] texts;
    uint timestamp;
  }

  mapping(address => ExamResult[]) exams;
  mapping(address => address[]) permissions;

  function storeExam(address _pacientAddress, string[] memory _videos, string[] memory _images, string[] memory _texts, uint _timestamp) public { 
    exams[_pacientAddress].push(ExamResult(_videos, _images, _texts, _timestamp));
  }

  function addPermission(address _addressToPermit) public {
    for(uint i = 0; i < permissions[msg.sender].length; i++) {
      if(permissions[msg.sender][i] == _addressToPermit) {
        revert("Permission already granted");
      }
    }

    permissions[msg.sender].push(_addressToPermit);
  }

  function getPermissions() public view returns (address[] memory) {
    return permissions[msg.sender];
  }

  function removePermission(address _addressToRemove) public {
    for(uint i = 0; i < permissions[msg.sender].length; i++) {
      if(permissions[msg.sender][i] == _addressToRemove) {
        return delete permissions[msg.sender][i];
      }
    }

    revert("Address not found");
  }

  function getOwnExams() public view returns (ExamResult[] memory) {
    return exams[msg.sender];
  }

  function searchPatientExam(address _pacientAddress) public view returns (ExamResult[] memory) {
    for(uint i = 0; i < permissions[_pacientAddress].length; i++) {
      if(msg.sender == permissions[_pacientAddress][i]) {
        return exams[_pacientAddress];
      }
    }

    revert("Permission not found");
  }
  
}

