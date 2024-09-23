let credential = await navigator.credentials.create({
    publicKey: {
      challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]),
      rp: { id: window.location.hostname, name: "ACME Corporation" },  // 동적으로 현재 도메인 설정
      user: {
        id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
        name: "sumin",
        displayName: "sumin"
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },    // ES256 알고리즘 (ECDSA with SHA-256)
        { type: "public-key", alg: -257 }   // RS256 알고리즘 (RSASSA-PKCS1-v1_5 with SHA-256)
      ]
    }
  });
  
  export { credential };
  