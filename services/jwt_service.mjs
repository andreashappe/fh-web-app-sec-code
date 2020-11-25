import njwt from 'njwt';

/* helper method for createing a new JWT */
export function generateJWT(user) {
    const claims = {
        "sub" : user.id,
        "scope": {
            "todos": ["index"]
        },
        "iss": "http://localhost:3000"
    }
    return njwt.create(claims, process.env.JWT_SECRET).compact();
}

export function verifyJWT(token) {
    // check expiry date, checks signature
    const verifiedJwt = njwt.verify(token, process.env.JWT_SECRET);

    if (verifiedJwt.body.iss === "http://localhost:3000") {
        return verifiedJwt;
    }
    return null;
}