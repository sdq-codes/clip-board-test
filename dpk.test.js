const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given empty string", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given the boolean value false", () => {
    const trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe("0");
  });

  it("Returns the correct literal when given the integer 2", () => {
    const trivialKey = deterministicPartitionKey(2);
    expect(trivialKey).toBe("564e1971233e098c26d412f2d4e652742355e616fed8ba88fc9750f869aac1c29cb944175c374a7b6769989aa7a4216198ee12f53bf7827850dfe28540587a97");
  });

  it("Returns the correct literal when given the boolean value true", () => {
    const trivialKey = deterministicPartitionKey(true);
    expect(trivialKey).toBe("ff2c82ed266dc30b1afe862bee32cf996b213513bc6b3e242ff605ddd9d5bbd1e7eebf6dde586b8700125cb7b95d35aec2f4e750d092cd359b202e3d2be41e1a");
  });

  it("Returns the correct literal when given empty array", () => {
    const trivialKey = deterministicPartitionKey([]);
    expect(trivialKey).toBe("888b858b73d5d34fedab0f07663436931a95c73d6d7808edc868767bb9172f9e542fb7bb1ad1dbe988ceff0aaffde2012bc0e7d1914e986269f46d93651436a5");
  });

  it("Returns the correct literal when given long string as input", () => {
    const testInput = new Array(200).fill("placeholder").join("")
    const trivialKey = deterministicPartitionKey(testInput);
    expect(trivialKey).toBe("8f91aad1fc3dc09b5e20205310c14b6e05f7acb7e1b5a6b3ee4ed987d2768d3ab237a114f9bfcf34c210fa891d17955610143745af54fd99592dbab6a9905e27");
  });

  it("Returns the correct literal when given empty object as input", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });

  it("Returns the partition key when given an object with partitionKey field", () => {
    const testInput = deterministicPartitionKey({
      partitionKey: "example-key-partition",
    });
    expect(testInput).toBe("example-key-partition");
  });

  it("Returns the partition key when given an object with partitionKey field value as '0'", () => {
    const event = {
      partitionKey: 0,
    };
    expect(deterministicPartitionKey(event)).toBe(
      "e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7"
    );
  });

  it("Does not return the partition key when given an object with partitionKey field as a long string", () => {
    const testPartitionKey = new Array(200).fill("placeholder").join("")
    const testInput = deterministicPartitionKey({
      partitionKey: testPartitionKey,
    });
    expect(testInput).not.toBe(testPartitionKey);
  });
});
