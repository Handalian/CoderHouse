const mongoDBConfig = {
    db: {
        host: '127.0.0.1',
        port: 27017,
        dbName: 'ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    strConnAtlas: "mongodb+srv://CoderHouse:coderhouse@cluster0.vnvfkkd.mongodb.net/ecommerce"
}

const firebaseConfig = {
    "type": "service_account",
    "project_id": "pruebas-b65ed",
    "private_key_id": "20fb852ef3b0dbaf2d57e4f4ea22d2415865e269",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSkWbaZ/Zvi1CT\nI6HSByrzAuLsUhygALS0iDMX22Z9goUmwXMVQmzsMjcFWdo2U3TQ0zrayE3QJ2GQ\nFP7YqBgSox+OXp7mtmnXdCfbuTh5dpUMOofPXKNV28wzNoEr1udS3NKfg7R8alss\n11m82bs0o2wHPlhVsA5vjLKVxr+Az8BtICxGYOR2D1t1a4MpyezvZvZmvpcjJSl0\n8Qsem+pFDRoKRHetF7+zAFCdObrbW4krq5DSIKdnU17dvJo3cTdqwtgdfiWZGsI1\n/PLfls2qbNRgH77uzxBlbkgBZB4dPoh8m4HMKVL8E789uymGwxqYM2IV1S/jASFJ\nxF2zT99RAgMBAAECggEACxiqV8iygJlkh+8/q2ioLhkULbNoaritoFQGF5KgZ3TV\nOIJBgI+J3Yv5BxUED0Qxk4nFFUFARY0QYYR6vX5kbCzLZnpFaiQko+TYYQCHL7L0\nRSZn7SFkqvW8DPiIaQBD0niDaFjj9jNlzwxIGqMaqDk4eYfqeiTybYGSbQJ3XHzA\nt/VZz7Dt3Kpww2Zl4uditLg1uNDzCwEekd8ZmiWnPr7VGGYNa/P4C7psnmAtjpIE\nOuvKZHTtjhDHl3BN9Yiq04U9oZ+VYRUctGazW+0OJjP0itCWK/7Bd5dsHE4IH8i+\niRmdb1Zc1SqwWF+lrWfYBMvNMwW8D8gOHT0DsRZQfQKBgQDFPt6/JXnwXOM22ZFK\nbes4sachf5IN+uwGhWaG3UHGyrlmnCkw2BK45qoQ9O9oiXZ130drN5NiR9qqeWoG\nSz9+JuLlyVMY4N9yyLuGIgqSVVSNwaXeReQDQZDG02HAxxu800wmhK2W3imEuJ6X\nExhDxjslmhtPvZXFa4w/3xw25wKBgQC+OhE/dttIFRkVBJmtkKc5fWwwjXdbSoI3\nvxNS2S9G3nhOvO/cFKJOnh4PddK5/QZhy7GO9194QSVppy230wSGS9WRbBAiRPnq\nTrCo9Fr0QTmjDkbrRpSsd2vfRQxEGTm9NJfSGzUksOJBp3UbgQ4n6aB9WRd3MPzq\nU1E63znJBwKBgQCaybm3u0s0C1DrrFVOWXAsL43+xcPyYKV0gJ9y2pNR06knEwlo\nIUif/bQcVnrCSI3D9pJvW0+34reA7IL9qXOMJiwNM66YaXAw/cHbgz9Uks4l6H+o\nLKTAwWVCAoRF6nqj9hVebORk7rcaRl9+Iyf5l8i2u3cPXrH4GWwYe5gCpQKBgB5S\nxVMXkEcCTfhCvnijeXS5oJhwxJkB3JYkWGE5i8bBSe5LQfUUOPdNTz9pqcjKI81N\nGiXPGyHhSKR56NjHw43g4s+GqV+9HRWTq6eTJDiReS2b5gQ1QRfpBYIW0Ki+WKzn\niFgOzD7oD3klx4412VrVbCbvH8V5Qqfb1jQLR3vbAoGBAI/UIMJ55WtgHFEBnuM1\npbnAShQWzGXJ7ojD9jhn/1+BD6gMFuvAH/TThDs2JQi3eeWrm71wuv9yeYFa30bh\nyZ1L0zahPbtNZZp2nxiVceyvM9AfZHCHc9bE5SaWZNRkqF0olZuMVeNrXJTDd6sg\nOq2Ph+jRBouQcZ5cjcKXBL8N\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xxg9w@pruebas-b65ed.iam.gserviceaccount.com",
    "client_id": "103012635411544789760",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxg9w%40pruebas-b65ed.iam.gserviceaccount.com"
}

const selectDao = "MongoDB";
//  const selectDao = "File";
// const selectDao = "Firebase";

export { mongoDBConfig, firebaseConfig, selectDao }