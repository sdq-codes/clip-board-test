const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY
  let candidate = event.partitionKey ? event.partitionKey : crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  candidate = candidate ? (typeof candidate !== "string" ?  JSON.stringify(candidate): candidate): TRIVIAL_PARTITION_KEY
  return candidate.length > MAX_PARTITION_KEY_LENGTH ?
    crypto.createHash("sha3-512").update(candidate).digest("hex"):
    candidate
};
