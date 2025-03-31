const { assert } = require("chai");

const Business = artifacts.require("Business");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Business", (accounts) => {
  let business;

  before(async () => {
    business = await Business.deployed();
  });

  describe("Deployment", async () => {
    it("deploys successfully", async () => {
      const address = business.address;
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
    });
  });

  describe("storage", async () => {
    it("updates prescription hash", async () => {
      let businessHash = "abc123";
      await business.set(businessHash);
      const result = await business.get();
      assert.equal(result, businessHash);
    });
  });
});
