// copied here because I can't get it to work with importing it from node_modules

const { makeInterfaceId } = require("openzeppelin-test-helpers");

const INTERFACES = {
  ERC165: ["supportsInterface(bytes4)"],
  ERC721: [
    "balanceOf(address)",
    "ownerOf(uint256)",
    "approve(address,uint256)",
    "getApproved(uint256)",
    "setApprovalForAll(address,bool)",
    "isApprovedForAll(address,address)",
    "transferFrom(address,address,uint256)",
    "safeTransferFrom(address,address,uint256)",
    "safeTransferFrom(address,address,uint256,bytes)"
  ],
  ERC721Enumerable: [
    "totalSupply()",
    "tokenOfOwnerByIndex(address,uint256)",
    "tokenByIndex(uint256)"
  ],
  ERC721Metadata: ["name()", "symbol()", "tokenURI(uint256)"],
  ERC1155: [
    "balanceOf(address,uint256)",
    "balanceOfBatch(address[],uint256[])",
    "setApprovalForAll(address,bool)",
    "isApprovedForAll(address,address)",
    "safeTransferFrom(address,address,uint256,uint256,bytes)",
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"
  ]
};

const INTERFACE_IDS = {};
const FN_SIGNATURES = {};
for (const k of Object.getOwnPropertyNames(INTERFACES)) {
  INTERFACE_IDS[k] = makeInterfaceId.ERC165(INTERFACES[k]);
  for (const fnName of INTERFACES[k]) {
    // the interface id of a single function is equivalent to its function signature
    FN_SIGNATURES[fnName] = makeInterfaceId.ERC165([fnName]);
  }
}

function shouldSupportInterfaces(interfaces = []) {
  describe("Contract interface", function() {
    beforeEach(function() {
      this.contractUnderTest = this.mock || this.token;
    });

    for (const k of interfaces) {
      const interfaceId = INTERFACE_IDS[k];
      describe(k, function() {
        describe("ERC165's supportsInterface(bytes4)", function() {
          it("should use less than 30k gas", async function() {
            (await this.contractUnderTest.supportsInterface.estimateGas(
              interfaceId
            )).should.be.lte(30000);
          });

          it("should claim support", async function() {
            (await this.contractUnderTest.supportsInterface(
              interfaceId
            )).should.equal(true);
          });
        });

        for (const fnName of INTERFACES[k]) {
          const fnSig = FN_SIGNATURES[fnName];
          describe(fnName, function() {
            it("should be implemented", function() {
              this.contractUnderTest.abi
                .filter(fn => fn.signature === fnSig)
                .length.should.equal(1);
            });
          });
        }
      });
    }
  });
}

module.exports = {
  shouldSupportInterfaces
};
