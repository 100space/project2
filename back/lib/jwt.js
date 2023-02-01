const crypto = require("crypto")
const dotenv = require("dotenv").config({ path: "../.env" })
const SALT = process.env.SALT || "test"

class JWT {
    constructor({ crypto }) {
        this.crypto = crypto
    }

    Sign(data, options = {}) {
        const header = this.encode({ tpy: "JWT", alg: "sha256" })
        const payload = this.encode({ ...data, ...options })
        console.log(payload)
        const signature = this.createSignature([header, payload])
        return [header, payload, signature].join(".")
    }

    verify(token, salt) {
        const [header, payload, signature] = token.split(".")
        const newSignature = this.createSignature([header, payload], salt)
        if (newSignature !== signature) throw new Error("Token is Invalid, Pleas check the your token")

        return this.decode(payload)
    }

    encode(obj) {
        console.log(obj)
        return Buffer.from(JSON.stringify(obj)).toString("base64url")
    }

    decode(base64url) {
        return JSON.parse(Buffer.from(base64url, "base64url").toString("utf8"))
    }

    createSignature(base64urls, salt = SALT) {
        const data = base64urls.join(".")
        return this.crypto.createHmac("sha256", salt).update(data).digest("base64url")
    }
}

module.exports = JWT
