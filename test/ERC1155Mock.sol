pragma solidity ^0.5.0;

import "../contracts/ERC1155/ERC1155.sol";

/**
 * @title ERC1155Mock
 * This mock just publicizes internal functions for testing purposes
 */
contract ERC1155Mock is ERC1155 {
  function mint(address to, uint256 id, uint256 value, bytes memory data) public {
    _mint(to, id, value, data);
  }

  function burn(address owner, uint256 id, uint256 value) public {
    _burn(owner, id, value);
  }

  function doSafeTransferAcceptanceCheck(address operator, address from, address to, uint256 id, uint256 value, bytes memory data) public {
    _doSafeTransferAcceptanceCheck(operator, from, to, id, value, data);
  }

  function doSafeBatchTransferAcceptanceCheck(address operator, address from, address to, uint256[] memory ids, uint256[] memory values, bytes memory data) public {
    _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, values, data);
  }
}
